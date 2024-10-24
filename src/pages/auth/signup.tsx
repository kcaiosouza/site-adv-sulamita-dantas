import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
import { auth, firestore } from '@/services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setDoc, doc } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MutatingDots } from 'react-loader-spinner';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

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
	agreeTerms: string;
}

export default function SignUp() {
	const router = useRouter();
	const [seePassword, setSeePassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errLogin, setErrLogin] = useState<String | Boolean>(false);
	const { register, handleSubmit } = useForm<signUpForm>();

	const onSubmit: SubmitHandler<signUpForm> = async (data) => {
		if(data.password == data.confirmPassword) {
			setIsLoading(true);
			try{
				await createUserWithEmailAndPassword(auth, data.email, data.password).then((res) => {
					console.log(res.user)
					if(res.user) {
						setDoc(doc(firestore, "Users", res.user.uid), {
							email: data.email,
							name: data.name,
							lastName: data.lastName,
							type: 'user'
						}).then(() => {
							router.push("/auth/login");
						})
					}
				});
			}catch(err){
				console.log(err)
				setErrLogin("Ocorreu um erro, tente novamente mais tarde")
				setIsLoading(false);
			}
		}else{
			setErrLogin("Senhas são diferentes")
			setIsLoading(false);
		}
		console.log(data);
	}

	const toggleSeePassword = () => {
		setSeePassword(!seePassword)
	}

	return(
		<main className={poppins.className}>
			<div className="w-full lg:grid lg:grid-cols-2 h-[100dvh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Criar</h1>
            <p className="text-balance text-muted-foreground">
              Preencha o formulário para criar sua conta
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Nome</Label>
              <Input
								{...register("name")}
                id="name"
                type="text"
                placeholder="Fulano"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Sobrenome</Label>
              <Input
								{...register("lastName")}
                id="lastName"
                type="text"
                placeholder="de Tal"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
								{...register("email")}
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input {...register("password")} id="password" placeholder='••••••••' type={seePassword ? "text" : "password"} required />
							{seePassword ? <RiEyeLine onClick={toggleSeePassword} className='absolute top-8 right-3 cursor-pointer'/> : <RiEyeCloseLine onClick={toggleSeePassword} className='absolute top-8 right-3 cursor-pointer'/>}
            </div>
            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Confirmar senha</Label>
              </div>
              <Input {...register("confirmPassword")} id="confirmPassword" placeholder='••••••••' type={seePassword ? "text" : "password"} required />
							{seePassword ? <RiEyeLine onClick={toggleSeePassword} className='absolute top-8 right-3 cursor-pointer'/> : <RiEyeCloseLine onClick={toggleSeePassword} className='absolute top-8 right-3 cursor-pointer'/>}
            </div>
						<div className='flex items-center gap-2'>
							<Checkbox {...register("agreeTerms")} id='agreeTerms' required/>
							<Label htmlFor='agreeTerms'>Concordo com os <Link href="#" className='underline'>termos</Link></Label>
						</div>
						<span className='font-light text-sm text-red-400'>{errLogin != false ? `${errLogin}` : ""}</span>
						{isLoading ? 
						
						<div className='flex items-center justify-center'>
							<MutatingDots
								visible={true}
								height="100"
								width="100"
								color="var(--light-brown)"
								secondaryColor="var(--gray-brown)"
								radius="12.5"
								ariaLabel="mutating-dots-loading"
								wrapperStyle={{}}
								wrapperClass=""
							/> 
						</div>
						: 
            <Button type="submit" className="w-full">
              Login
            </Button>
						
						}
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="./login" className="underline">
              Faça login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/undraw_login.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
		</main>
	)
}