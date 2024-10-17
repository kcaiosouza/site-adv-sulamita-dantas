import DashboardHeader from "@/components/DashboardHeader";
import SideBar from "@/components/SideBar";
import styles from "@/styles/_dashboard.module.css";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CountUp from "react-countup";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { useEffect, useState } from "react";
import { BiLinkExternal, BiPencil, BiTrash } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Post {
	text: string,
	title: string,
	author: string,
	views: number,
	posted_at: Date
}

export default function Posts({AllPostsInfo}: any) {
	const [allPosts, setAllPosts] = useState<any>([]);

	useEffect(() => {
		if(AllPostsInfo){
			const allPosts = JSON.parse(AllPostsInfo)
			let allPostsFormated: Post[] = []
			allPosts.map((resUser: any) => {
				// console.log(resUser._document.key.path.segments[6])
				// console.log(`{"${resUser._document.key.path.segments[6]}":{"title":"${resUser._document.data.value.mapValue.fields.title.stringValue}","text":"${resUser._document.data.value.mapValue.fields.text.stringValue}","author":"${resUser._document.data.value.mapValue.fields.author.stringValue}","posted_at":"${resUser._document.data.value.mapValue.fields.posted_at.stringValue}"}}`)
				console.log(`{"${resUser._document.key.path.segments[6]}":{"title":"${resUser._document.data.value.mapValue.fields.title.stringValue}","author":"${resUser._document.data.value.mapValue.fields.author.stringValue}","views":"${resUser._document.data.value.mapValue.fields.views.stringValue}","posted_at":"${resUser._document.data.value.mapValue.fields.posted_at.stringValue}"}}`)
				allPostsFormated.push(JSON.parse(`{"${resUser._document.key.path.segments[6]}":{"title":"${resUser._document.data.value.mapValue.fields.title.stringValue}","author":"${resUser._document.data.value.mapValue.fields.author.stringValue}","views":"${resUser._document.data.value.mapValue.fields.views.integerValue}","posted_at":"${resUser._document.data.value.mapValue.fields.posted_at.stringValue}"}}`))
			})
			console.log(allPosts)
			setAllPosts(allPostsFormated)
		}
	}, [])

  return(
    <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
      <SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
        <DashboardHeader title="Todas as postagens"/>
        <div className="">
					<Link href="/dashboard/posts/new">
						<Button className="mb-2">Nova Postagem</Button>
					</Link>
				<Table>
					<TableCaption>Lista com todas as postagens.</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px]"></TableHead>
							<TableHead>Titulo</TableHead>
							<TableHead className="text-right">Comentários</TableHead>
							<TableHead className="text-right">Visualizações</TableHead>
							<TableHead className="text-right">Ação</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{allPosts.map((post: any, index: number) => {
							const key = Object.keys(post)[0];
							const { title, author, views, posted_at } = post[key];
							return(
								<TableRow key={index} className="hover:bg-[var(--light-brown)]">
									<TableCell className="font-medium">
										<Image src="/sulamita_newsletter.png" width={56} height={56} alt='Foto de Perfil' className={`rounded-md object-cover border-2 border-[var(--white-brown)]`}/>
									</TableCell>
									<TableCell>{title}</TableCell>
									<TableCell className="text-right">
										<CountUp end={161} duration={1}/>
									</TableCell>
									<TableCell className="text-right">
										<CountUp end={views} duration={1}/>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger className="border-2 px-3 py-1 rounded-md">Abrir</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem className="cursor-pointer"><BiLinkExternal className="mr-1"/> Abrir</DropdownMenuItem>
												<Link href={`/dashboard/posts/edit/${key}`}>
													<DropdownMenuItem className="cursor-pointer"><BiPencil className="mr-1"/> Editar</DropdownMenuItem>
												</Link>
												<DropdownMenuItem className="cursor-pointer"><BiTrash className="mr-1"/> Deletar</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							)
						})}
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

	const collectionRef = collection(firestore, "Posts");
	const collectionSnap = await getDocs(collectionRef)
	const AllPostsInfo = collectionSnap.docs

	return {
		props: {
			AllPostsInfo: JSON.stringify(AllPostsInfo),
		}
	}
}