import { createContext, useState, useEffect, ReactNode } from "react";
import { parseCookies } from "nookies";
import { doc, getDoc } from "firebase/firestore";
import { firestore, auth } from "@/services/firebase";

interface AuthProviderProps {
	children: ReactNode;
}

interface User {
	email: string;
	lastName: string;
	name: string;
	type: string;
}

export const AuthContext = createContext({});

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const {'sulaadv.AuthToken' : token} = parseCookies(null)
		if(token){
			const docRef = doc(firestore, "Users", token);
			getDoc(docRef).then((infoUser) => {
				if(infoUser.exists()){
					setUser(infoUser.data() as User)
					console.log(infoUser.data())
				}
			});
		}else {
			auth.signOut();
			setUser(null);
		}
	}, [])
	
	return (
		<AuthContext.Provider value={{
			user,
		}}>
			{children}
		</AuthContext.Provider>
	)
}