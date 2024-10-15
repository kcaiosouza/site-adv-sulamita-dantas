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
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { FaRegEye, FaCommentDots, FaPenAlt } from "react-icons/fa";
import CountUp from "react-countup";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

interface AuthContextType {
  user: User | null;
}

const CustomLegend = ({ payload }:any) => {
	const categorias = ['Postagens', 'Visualizações', 'Comentários'];

  return (
    <div className="flex gap-2 items-center justify-center">
      {categorias.map((categoria, index) => (
        <div key={index} className="flex items-center justify-center mt-[-50px]">
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: payload?.find((item:any) => item.value.startsWith(categoria))?.color || '#000',
              marginRight: 5,
            }}
          />
          <span>{categoria}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard({AllUsersInfo, data01, data02}:any) {
	const { user } = useContext(AuthContext) as AuthContextType;

	return (
		<div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
			<SideBar currentPage="dashboard"/>
			<main className={`flex-[1] h-full ${styles.main}`}>
				<DashboardHeader title="Dashboard"/>
				<div className={styles.cardsContainerGrid}>
					<div className="h-36 w-full flex flex-col justify-between px-4 py-2 border-2 rounded-md">
						<div className="flex items-center justify-between">
							<span className="font-bold text-[16px] text-[var(--gray-brown)]">Postagens</span>
							<TbArticleFilled size={28} color="var(--gray-brown)"/>
						</div>
						<div className="flex">
							<CountUp end={320} duration={1} className="font-bold text-[40px] text-[var(--dark-brown)]"/>
						</div>
						<div className="flex items-center">
							<FiArrowUpRight size={18} color="var(--dark-brown)"/>
							<span><b className="text-[var(--dark-brown)]">+2,5%</b> referente ao mês passado</span>
						</div>
					</div>
					<div className="h-36 w-full flex flex-col justify-between px-4 py-2 border-2 rounded-md">
						<div className="flex items-center justify-between">
							<span className="font-bold text-[16px] text-[var(--gray-brown)]">Visualizações</span>
							<FaRegEye size={28} color="var(--gray-brown)"/>
						</div>
						<div className="flex">
							<CountUp end={1243} duration={1} className="font-bold text-[40px] text-[var(--dark-brown)]"/>
						</div>
						<div className="flex items-center">
							<FiArrowUpRight size={18} color="var(--dark-brown)"/>
							<span><b className="text-[var(--dark-brown)]">+3,2%</b> referente ao mês passado</span>
						</div>
					</div>
					<div className="h-36 w-full flex flex-col justify-between px-4 py-2 border-2 rounded-md">
						<div className="flex items-center justify-between">
							<span className="font-bold text-[16px] text-[var(--gray-brown)]">Comentários</span>
							<FaCommentDots size={28} color="var(--gray-brown)"/>
						</div>
						<div className="flex">
							<CountUp end={254} duration={1} className="font-bold text-[40px] text-[var(--dark-brown)]"/>
						</div>
						<div className="flex items-center">
							<FiArrowDownRight size={18} color="var(--dark-brown)"/>
							<span><b className="text-[var(--dark-brown)]">-1,4%</b> referente ao mês passado</span>
						</div>
					</div>
				</div>
				<div className={styles.listChartContainerGrid}>
					<div className={`h-[510px] w-full border-2 rounded-md overflow-auto ${styles.largeGrid}`}>
						<div className="p-3">
							<h2 className="border-b pb-1 text-[18px] font-semibold text-[var(--dark-brown)]">Postagens de sucesso</h2>
						</div>
						<div className="px-5">
							{[0,1,2,3,4].map(item => 
								<div key={item}>
									<div className="flex justify-between">
										<div className="flex items-center">
											<Image src="/sulamita_newsletter.png" width={56} height={56} alt='Foto de Perfil' className={`rounded-md object-cover border-2 border-[var(--white-brown)]`}/>
											<div className="ml-2">
												<h3>Lorem ipsum</h3>
											</div>
										</div>

										<div className="flex items-center gap-1">
											<FaRegEye/>
											<CountUp end={154} duration={1}/>
										</div>

										<div className="flex items-center gap-1">
											<FaCommentDots />
											<CountUp end={8} duration={1}/>
										</div>

										<div className="flex items-center justify-center">
											<FaPenAlt />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className={`h-[510px] w-full border-2 rounded-md ${styles.smallGrid}`}>
					<div className="p-3">
						<h2 className="border-b pb-1 text-[18px] font-semibold text-[var(--dark-brown)]">Últimos 4 meses</h2>
					</div>
					<ResponsiveContainer width="100%" height="89%">
						<PieChart width={400} height={400}>
							<Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="var(--dark-brown)" />
							<Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="var(--light-brown)" label />
							<Legend content={<CustomLegend />} />
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					</div>
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

	const data01 = [
		{ name: 'Postagens Janeiro', value: 2 },
		{ name: 'Postagens Fevereiro', value: 5 },
		{ name: 'Postagens Março', value: 12 },
		{ name: 'Postagens Abril', value: 8 },
	];
	const data02 = [
		{ name: 'Visualizações Janeiro', value: 43 },
		{ name: 'Comentários Janeiro', value: 6 },
		{ name: 'Visualizações Fevereiro', value: 112 },
		{ name: 'Comentários Fevereiro', value: 15 },
		{ name: 'Visualizações Março', value: 286 },
		{ name: 'Comentários Março', value: 22 },
		{ name: 'Visualizações Abril', value: 171 },
		{ name: 'Comentários Abril', value: 14 },
	];

	return {
		props: {
			data01,
			data02
		}
	}
}