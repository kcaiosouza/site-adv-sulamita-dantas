import Image from 'next/image'
import { FaUser, FaKey } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Poppins } from 'next/font/google'
import { useForm, SubmitHandler } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"]
})

interface signUpForm {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignUp() {
	const { register, handleSubmit } = useForm<signUpForm>()
	const onSubmit: SubmitHandler<signUpForm> = async (data) => {
		if(data.password == data.confirmPassword) {
			try{
				await createUserWithEmailAndPassword(auth, data.email, data.password).then((res) => {
					console.log(res.user)
				});
			}catch(err){
				console.log("OCORREU UM ERR:", err)
			}
		}else{
			console.log("Senhas são diferentes")
		}
		console.log(data);
	}

	return(
		<main className={poppins.className}>
			<div className='w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[url("/lines_background.svg")] bg-cover'>
				<div className='mb-10'>
					<Image priority src="/logo_horizontal_header.png" alt='Logo Sulamita Dantas' width={224} height={75} className='w-auto h-auto'/>
				</div>
				<div className='min-w-[260px] bg-[var(--gray-brown)] rounded-xl p-7'>
					<form className='bg-[var(--gray-brown)] flex flex-col' onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nome:</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-gray-500 sm:text-sm">
									<FaUser />
								</span>
							</div>
							<input
							 {...register('name')}
							 type="text"
							 name="name"
							 id="name"
							 placeholder="Fulano"
							 className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20
							  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--light-brown)]
								sm:text-sm sm:leading-6"
							/>
						</div>
						<label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Sobrenome:</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-gray-500 sm:text-sm">
									<FaUser />
								</span>
							</div>
							<input
							 {...register('lastName')}
							 type="text"
							 name="lastName"
							 id="lastName"
							 placeholder="De Tal"
							 className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20
							  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--light-brown)]
								sm:text-sm sm:leading-6"
							/>
						</div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-gray-500 sm:text-sm">
									<IoMail />
								</span>
							</div>
							<input
							 {...register('email')}
							 type="email"
							 name="email"
							 id="email"
							 placeholder="exemplo@email.com"
							 className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20
							  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--light-brown)]
								sm:text-sm sm:leading-6"
							/>
						</div>
						<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha:</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-gray-500 sm:text-sm">
									<FaKey />
								</span>
							</div>
							<input
							 {...register('password')}
							 type="password"
							 name="password"
							 id="password"
							 placeholder="••••••••"
							 className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20
							  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--light-brown)]
								sm:text-sm sm:leading-6"
							/>
						</div>
						<label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirmar senha:</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-gray-500 sm:text-sm">
									<FaKey />
								</span>
							</div>
							<input
							 {...register('confirmPassword')}
							 type="password"
							 name="confirmPassword"
							 id="confirmPassword"
							 placeholder="••••••••"
							 className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20
							  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
								focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--light-brown)]
								sm:text-sm sm:leading-6"
							/>
						</div>

						<button type="submit" className="text-white bg-[var(--light-brown)] hover:bg-[var(--dark-brown)] transition-colors ease-in-out focus:ring-4 focus:outline-none focus:ring-[var(--dark-brown)] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-10">Entrar</button>
					</form>
				</div>
			</div>
		</main>
	)
}