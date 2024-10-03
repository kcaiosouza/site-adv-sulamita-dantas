import dynamic from 'next/dynamic';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/services/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies, destroyCookie } from 'nookies';
import { PiPenNib } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';
import { toolbarOptions, renameHeading } from '@/utils/quillUtils';
import 'react-quill/dist/quill.snow.css';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

interface AuthContextType {
  user: User | null;
}

export default function NewPost({AllUsersInfo}:any) {
    const router = useRouter()
    const { user } = useContext(AuthContext) as AuthContextType;
		const [content, setContent] = useState('');

    const handleLogOut = async () => {
		destroyCookie(null, "sulaadv.AuthToken")
		await auth.signOut();
	}

    useEffect(() => {
		const allUsers = JSON.parse(AllUsersInfo)
		let allUsersFormated: User[] = []
		allUsers.map((resUser: any) => {
			console.log(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`)
			allUsersFormated.push(JSON.parse(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`))
		})
		console.log(allUsersFormated)

		renameHeading()
	}, [])

    return(
        <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)]">
			<aside className="bg-[var(--dark-brown)] w-[245px] min-h-full flex flex-col justify-between">
				<div className="flex w-full relative items-center justify-center mt-3">
					<Image src="/logo_horizontal_footer.png" width={172} height={60} alt="Logo de Sulamita"/>
				</div>
				<div className="flex-[1]">
					<span>Menu</span>
				</div>
				<div className="p-6">
					<div className="flex w-full min-h-[60px] border-t">
						<div className="flex-[1] flex flex-col justify-center">
							<h3 className="font-semibold text-[16px] text-[var(--white-brown)]">{`${user?.name} ${(user?.lastName)?.split(' ')[0]}`}</h3>
							<span className="italic font-light text-[12px] leading-[0] text-[var(--white-brown)] pb-1">{user?.email}</span>
						</div>							
						<div
						 className="flex flex-col justify-center cursor-pointer"
						 onClick={handleLogOut}
						>
							<TbLogout color="var(--white-brown)" size={22} />
							<span className="italic font-light text-[12px] leading-none text-[var(--white-brown)]">Sair</span>
						</div>
					</div>
				</div>
			</aside>
			<main className="flex-[1] h-full">
				<header className="flex flex-row items-center justify-between border-b px-8 py-2">
					<h2 className="font-semibold text-[24px] text-[var(--gray-brown)]">Nova Postagem</h2>
				</header>

				<section className="p-8">
          {/* Editor React Quill */}
          <ReactQuill
            theme="snow" // Tema do editor
            value={content}
            onChange={setContent} // Atualiza o estado com o conteúdo do editor
            modules={{toolbar: toolbarOptions}}
          />

          {/* Botão para exibir o conteúdo ou enviá-lo para o back-end */}
          <button
            className="mt-12 p-2 bg-blue-500 text-white rounded"
            onClick={() => console.log(content)} // Aqui você pode enviar o conteúdo para o back-end
          >
            Publicar Postagem
          </button>
        </section>
			</main>
		</div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const {'sulaadv.AuthToken': token} = parseCookies(ctx);

	if(!token) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false,
			}
		}
	}

	const docRef = doc(firestore, "Users", token);
	const docSnap = await getDoc(docRef)
	if(docSnap.exists()){
		const userInfo = docSnap.data() as User
		if(userInfo.type == "user"){
			return {
				redirect: {
					destination: '/blog',
					permanent: false,
				}
			}
		}
	}

	const collectionRef = collection(firestore, "Users");
	const collectionSnap = await getDocs(collectionRef)
	const AllUsersInfo = collectionSnap.docs

	return {
		props: {
			AllUsersInfo: JSON.stringify(AllUsersInfo)
		}
	}
}