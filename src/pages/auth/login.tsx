import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { auth, firestore } from '@/services/firebase';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MutatingDots } from 'react-loader-spinner'
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '@/contexts/authContext';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"]
})

interface loginForm {
	email: string;
	password: string;
	remember: boolean
}

interface User {
  email: string;
  lastName: string;
  name: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  setLogin: any;
}

export default function Login() {
	const router = useRouter();
	const [seePassword, setSeePassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errLogin, setErrLogin] = useState<String | Boolean>(false);
	const { register, handleSubmit } = useForm<loginForm>();
	const { setLogin } = useContext(AuthContext) as AuthContextType;


	const onSubmit: SubmitHandler<loginForm> = async (data) => {
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password).then((res) => {
				if(data.remember) {
					setCookie(null, 'sulaadv.AuthToken', res.user.uid, {
						maxAge: 30 * 24 * 60 * 60, // 30 Dias
						path: '/',
					});
				}else {
					setCookie(null, 'sulaadv.AuthToken', res.user.uid, {
						maxAge: 24 * 60 * 60, // 1 Dia
						path: '/',
					});
				}

				const docRef = doc(firestore, "Users", res.user.uid);
				getDoc(docRef).then((infoUser) => {
					if(infoUser.exists()){
						setLogin(infoUser.data() as User)
						router.push("/dashboard");
						console.log(infoUser.data())
					}
				});
			});
		}catch(err) {
			setIsLoading(false);
			setErrLogin(`${err == "FirebaseError: Firebase: Error (auth/invalid-credential)." ? "Credenciais incorretas" : "Erro não identificado."}`)
		}
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
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-balance text-muted-foreground">
              Informe suas credenciais para realizar o login
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input {...register("password")} id="password" placeholder='••••••••' type={seePassword ? "text" : "password"} required />
							{seePassword ? <RiEyeLine onClick={toggleSeePassword} className='absolute top-[38px] right-3 cursor-pointer'/> : <RiEyeCloseLine onClick={toggleSeePassword} className='absolute top-[38px] right-3 cursor-pointer'/>}
            </div>
						<div className='flex items-center gap-2'>
							<Checkbox {...register("remember")} id='remember'/>
							<Label htmlFor='remember'>Lembrar por 30 dias</Label>
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
            Não tem uma conta?{" "}
            <Link href="./signup" className="underline">
              Criar agora
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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {'sulaadv.AuthToken': token} = parseCookies(ctx);
	
	if(token) {
		return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
	}
	
	return {
		props: {}
	}
};