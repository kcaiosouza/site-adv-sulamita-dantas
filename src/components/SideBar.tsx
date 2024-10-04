import styles from '@/styles/_sidebar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { destroyCookie } from 'nookies';
import { AuthContext } from "@/contexts/authContext";
import { auth } from '@/services/firebase';
import { FaHouse, FaChartPie, FaComments  } from "react-icons/fa6";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { MdPermMedia } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { IoExit } from "react-icons/io5";

interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

interface AuthContextType {
  user: User | null;
}

export default function SideBar() {
	const { user } = useContext(AuthContext) as AuthContextType;

	const handleLogOut = async () => {
		destroyCookie(null, "sulaadv.AuthToken")
		await auth.signOut();
	}

  return(
		<aside className={`bg-[var(--light-brown)] h-[calc(100dvh - 56px)] w-72 rounded-xl flex flex-col justify-between ${styles.sombraSideBar}`}>
			<div>
				<div className='flex w-full justify-center items-center py-7'>
					<Image src="/logo_horizontal_footer.png" width={162} height={48} alt='Logomarca Sulamita Dantas Advocacia'/>
				</div>

				<div>
					<div className='px-4 mb-1'>
						<span className='font-bold text-[14px] text-[var(--gray-brown)]'>Páginas</span>
					</div>
					<div className='flex flex-col w-full px-4 gap-1'>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<FaHouse size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Dashboard</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<PiNewspaperClippingFill size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Postagens</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<FaComments size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Comentários</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<HiUsers size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Usuários</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<MdPermMedia size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Imagens</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<FaChartPie size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Estatísticas</span>
						</Link>
						<Link href="#" className='hover:bg-[var(--sidebar-hover-brown)] bg-transparent transition-colors duration-300 rounded-md py-2 px-4 flex items-center gap-2'>
							<RiSettings4Fill size={24} color='var(--white-brown)'/>
							<span className='font-bold text-[16px] text-[var(--white-brown)]'>Configurações</span>
						</Link>
					</div>
				</div>
			</div>

			<div className='flex w-full justify-between px-6 pb-7'>
				<div className='flex gap-2'>
					<Image src="/sulamita_newsletter.png" width={56} height={56} alt='Foto de Perfil' className={`rounded-full border-2 border-[var(--white-brown)] ${styles.sombraFotoPerfil}`}/>
					<div className='flex flex-col justify-center'>
						<span className='font-bold mb-[-4px] text-[var(--gray-brown)]'>{(user?.name)?.split(' ')[0]}</span>
						<span className='font-thin italic mt-[-4px] text-[var(--gray-brown)]'>{user?.type}</span>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					<button onClick={handleLogOut}>
						<IoExit size={32} color='var(--white-brown)'/>	
					</button>
				</div>
			</div>
		</aside>
	)
}