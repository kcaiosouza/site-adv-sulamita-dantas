import DashboardHeader from "@/components/DashboardHeader";
import SideBar from "@/components/SideBar";
import styles from "@/styles/_dashboard.module.css";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/services/firebase";

interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

export default function Users({AllUsersInfo}: any) {
	const [allUsers, setAllUsers] = useState<any>([]);

	useEffect(() => {
		if(AllUsersInfo){
			const allUsers = JSON.parse(AllUsersInfo)
			let allUsersFormated: User[] = []
			allUsers.map((resUser: any) => {
				// console.log(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`)
				allUsersFormated.push(JSON.parse(`{"${resUser._document.key.path.segments[6]}":{"email":"${resUser._document.data.value.mapValue.fields.email.stringValue}","lastName":"${resUser._document.data.value.mapValue.fields.lastName.stringValue}","name":"${resUser._document.data.value.mapValue.fields.name.stringValue}","type":"${resUser._document.data.value.mapValue.fields.type.stringValue}"}}`))
			})
			// console.log(allUsersFormated)
			setAllUsers(allUsersFormated)
		}
	}, [])

  return(
    <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
      <SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
        <DashboardHeader title="Todos os usuários"/>
        <div className="">
				<Table>
					<TableCaption>Lista com todos os usuários.</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px]"></TableHead>
							<TableHead>Nome</TableHead>
							<TableHead className="text-left">Email</TableHead>
							<TableHead className="text-center">Cargo</TableHead>
							<TableHead className="text-right">Ação</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							allUsers.map((user: any, index: number) => {
								const key = Object.keys(user)[0];
								const { name, email, lastName, type } = user[key];
								return(
									<TableRow key={index} className="hover:bg-[var(--light-brown)]">
										<TableCell className="font-medium">
											<Image src="/sulamita_newsletter.png" width={56} height={56} alt='Foto de Perfil' className={`rounded-md object-cover border-2 border-[var(--white-brown)]`}/>
										</TableCell>
										<TableCell>{`${name} ${lastName}`}</TableCell>
										<TableCell className="text-left">
											{email}
										</TableCell>
										<TableCell className="text-center">
											{type}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger className="border-2 px-3 py-1 rounded-md">Abrir</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuLabel>Cargos</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem>Leitor</DropdownMenuItem>
													<DropdownMenuItem>Escritor</DropdownMenuItem>
													<DropdownMenuItem>Moderador</DropdownMenuItem>
													<DropdownMenuItem>Administrador</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								)
							})
						}
					</TableBody>
				</Table>
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

	const collectionRef = collection(firestore, "Users");
	const collectionSnap = await getDocs(collectionRef)
	const AllUsersInfo = collectionSnap.docs

	return {
		props: {
			AllUsersInfo: JSON.stringify(AllUsersInfo),
		}
	}
}