import dynamic from 'next/dynamic';
import { useContext, useMemo, useState } from "react";
import { firestore, storage } from "@/services/firebase";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from 'nookies';
import { toolbarOptions } from '@/utils/quillUtils';
import 'react-quill/dist/quill.snow.css';
import SideBar from '@/components/SideBar';
import DashboardHeader from '@/components/DashboardHeader';
import styles from '@/styles/_dashboard.module.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'; 
import { AuthContext } from '@/contexts/authContext';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

interface Post {
	text: string,
	title: string,
	author: string,
	views: number,
	posted_at: Date
}

interface AuthContextType {
  user: User | null;
}

interface InfoPostProps {
  PostInfo: Post;
}

export default function EditPost(serverData: InfoPostProps) {
	const [content, setContent] = useState(serverData.PostInfo.text);
	const { user } = useContext(AuthContext) as AuthContextType;
	const { register, handleSubmit } = useForm();

	const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const storageRef = ref(storage, `postsImages/${uuidv4()}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        insertToEditor(downloadURL);
      }
    };
  };

  const insertToEditor = (url: string) => {
		const editor = document.querySelector('.ql-editor'); // Seleciona o editor diretamente
		if (editor) {
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const img = document.createElement('img');
				img.src = url;
				img.alt = 'Imagem anexada';
				range.insertNode(img); // Insere a imagem diretamente no editor
				range.collapse(false);
			}else{
				console.error("Seleção nao diponivel")
			}
		}
  };

	const modules = useMemo(() => ({
		toolbar: {
			container: toolbarOptions,
			handlers: {
				image: handleImageUpload,
			}
		}
	}), []);

    return(
        <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
			<SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
				<DashboardHeader title="Editar postagem"/>
				<ReactQuill
					theme="snow"
					value={content}
					onChange={setContent}
					modules={modules}
					className={styles.shadowEditor}
				/>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Atualizar postagem</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Tudo certo?</DialogTitle>
							<DialogDescription>
								Tem certeza que deseja atualizar esse post? Esta ação não poderá ser desfeita.
							</DialogDescription>
						</DialogHeader>
            <DialogFooter>
              <Button onClick={() => {alert("Post deletado com sucesso! Brincadeira... Esse é apenas um alert para teste")}}>Atualizar</Button>
            </DialogFooter>
					</DialogContent>
				</Dialog>
			</main>
		</div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const {'sulaadv.AuthToken': token} = parseCookies(ctx);
  const { slug } = ctx.params as { slug: string };

	if(!token) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			}
		}
	}

	const docRefUser = doc(firestore, "Users", token);
	const docSnapUser = await getDoc(docRefUser)
	if(docSnapUser.exists()){
		const userInfo = docSnapUser.data() as User
		if(userInfo.type == "user"){
			return {
				redirect: {
					destination: '/blog',
					permanent: false,
				}
			}
		}
	}

	const docRefPost = doc(firestore, "Posts", slug);
	const docSnapPost = await getDoc(docRefPost)
	const PostInfo = docSnapPost.data() as Post

	return {
		props: {
      PostInfo,
    }
	}
}