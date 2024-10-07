import { useContext, useEffect } from "react";
import { auth, firestore } from "@/services/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Image from "next/image";
import { parseCookies, destroyCookie } from 'nookies';
import { PiPenNib } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';
import SideBar from "@/components/SideBar";
import DashboardHeader from "@/components/DashboardHeader";
import styles from '@/styles/_dashboard.module.css';
import { TbArticleFilled } from "react-icons/tb";
import CountUp from "react-countup";


interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

interface AuthContextType {
  user: User | null;
}

export default function Dashboard({AllUsersInfo}:any) {
	const { user } = useContext(AuthContext) as AuthContextType;

	// PAGINA DE USUARIOS
	// useEffect(() => {
	// 	const allUsers = JSON.parse(AllUsersInfo)
	// 	let allUsersFormated: User[] = []
	// 	allUsers.map((resUser: any) => {
	// 		console.log(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`)
	// 		allUsersFormated.push(JSON.parse(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`))
	// 	})
	// 	console.log(allUsersFormated)
	// }, [])

	return (
		<div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
			<SideBar currentPage="dashboard"/>
			<main className={`flex-[1] h-full ${styles.main}`}>
				<DashboardHeader title="Dashboard"/>
				<div className={styles.cardsContainerGrid}>
					<div className="h-32 w-full px-4 py-2 border-2 rounded-md">
						<div className="flex items-center">
							<TbArticleFilled  size={32}/>
							<span className="font-bold text-[20px]">Postagens</span>
						</div>
						<div>
							<CountUp end={320} duration={1} className="font-bold text-[32px]"/>
						</div>
					</div>
					<div className="h-32 w-full border-2 rounded-md"></div>
					<div className="h-32 w-full border-2 rounded-md"></div>
				</div>
			</main>
		</div>
	)
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