import Image from "next/image";
import { Poppins } from 'next/font/google'
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"]
})

interface BlogCardProps {
    title: string;
    text: string;
    link: string;
    imageUrl: string;
}

export function BlogCard({title, text, link, imageUrl}: BlogCardProps) {
    return (
        <div className={`bg-[#B1957410] border-[var(--light-brown)] border-[2px] rounded-xl w-96 h-[518px] flex flex-col ${poppins.className}`}>
            <div className="relative w-full h-48 rounded-xl">
                <Image 
                    src={imageUrl} 
                    alt={`Imagem do artigo de título: ${title}`} 
                    fill
                    className="rounded-t-[10px] object-cover"
                />
            </div>
            <div className="flex flex-col flex-[1] gap-6 px-6">
                <h3 className="font-bold mt-4 text-[18px] text-center text-[var(--gray-brown)]">{title}</h3>
                <p className="font-light text-[var(--gray-brown)] text-justify">{text}</p>
            </div>
            <div className="flex self-end mr-4 mb-2">
                <Link className="text-[var(--gray-brown)] font-light italic underline" href={link}>Continuar lendo</Link>
            </div>
        </div>
    )
}