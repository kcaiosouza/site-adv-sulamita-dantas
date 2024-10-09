import DashboardHeader from "@/components/DashboardHeader";
import SideBar from "@/components/SideBar";
import styles from "@/styles/_dashboard.module.css";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CountUp from "react-countup";


export default function Posts() {
  return(
    <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
      <SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
        <DashboardHeader title="Todas as postagens"/>
        <div className="">
				<Table>
					<TableCaption>Lista com suas todas as postagens.</TableCaption>
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
						{[0,1,2,3,4,5,6,7,8,9,10,11,12].map((item: number) => 
						<TableRow key={item} className="hover:bg-[var(--light-brown)]">
							<TableCell className="font-medium">
								<Image src="/sulamita_newsletter.png" width={56} height={56} alt='Foto de Perfil' className={`rounded-md object-cover border-2 border-[var(--white-brown)]`}/>
							</TableCell>
							<TableCell>Como Navegar nas Questões de Cobertura de Saúde: O Que Você Precisa Saber</TableCell>
							<TableCell className="text-right">
								<CountUp end={161} duration={1}/>
							</TableCell>
							<TableCell className="text-right">
								<CountUp end={161} duration={1}/>
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger className="border-2 px-3 py-1 rounded-md">Abrir</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>Ações</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Editar</DropdownMenuItem>
										<DropdownMenuItem>Deletar</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
						)}
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

	return {
		props: {}
	}
}