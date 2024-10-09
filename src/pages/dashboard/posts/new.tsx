import dynamic from 'next/dynamic';
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { auth, firestore } from "@/services/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies, destroyCookie } from 'nookies';
import { AuthContext } from "@/contexts/authContext";
import { toolbarOptions } from '@/utils/quillUtils';
import 'react-quill/dist/quill.snow.css';
import SideBar from '@/components/SideBar';
import DashboardHeader from '@/components/DashboardHeader';
import styles from '@/styles/_dashboard.module.css';


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
    const { user } = useContext(AuthContext) as AuthContextType;
		const [content, setContent] = useState('');

    // useEffect(() => {
		// 	const allUsers = JSON.parse(AllUsersInfo)
		// 	let allUsersFormated: User[] = []
		// 	allUsers.map((resUser: any) => {
		// 		console.log(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`)
		// 		allUsersFormated.push(JSON.parse(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`))
		// 	})
		// 	console.log(allUsersFormated)
		// }, [])

    return(
        <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
			<SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
				<DashboardHeader title="Nova postagem"/>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{toolbar: toolbarOptions}}
          />

          <button
            className="mt-12 p-2 bg-[var(--dark-brown)] text-white rounded"
            onClick={() => console.log(content)}
          >
            Publicar Postagem
          </button>
					<small>Caio é lindo e vc sabe disso</small>
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