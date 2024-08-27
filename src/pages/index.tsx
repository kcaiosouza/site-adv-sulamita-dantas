import { useEffect, useRef } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { BoxInfo } from '@/components/BoxInfo';
import Image from 'next/image';
import Link from 'next/link';
import { FaShield } from "react-icons/fa6";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

export default function Home() {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if(divRef.current) {
        divRef.current.scrollLeft = window.scrollY;
      };
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main>
      <header className='flex flex-col w-full min-h-screen bg-[var(--header-white)] bg-[url("/lines_background.svg")] bg-cover'>
        <nav className='flex flex-row w-full px-12'>
          <div className=''>
            <Image src="/logo_horizontal_header.png" width={246} height={82} alt='Logomarca Sulamita Dantas Advocacia'/>
          </div>
          <div className='flex-1'>
            <ul className='flex gap-5 items-center justify-center h-full'>
              <li>Serviços</li>
              <li>Sobre mim</li>
              <li>Depoimentos</li>
              <li>Blog</li>
              <li>Contato</li>
            </ul>
          </div>
          <div className='w-[246px] flex items-center justify-end'>
            <button className='bg-[var(--light-brown)] px-8 py-2 rounded-md'>Marcar Reunião</button>
          </div>
        </nav>
        <div>
          <div>
            <div>
              <h1>
                Advocacia que faz a diferença: Defendendo seus direitos com paixão e expertise.
              </h1>
              <span><FaShield size={14}/> +99 <b>Casos</b></span>
            </div>
            <button>Saiba Mais</button>
          </div>
          <div>
            {/* FOTO DE SULAMITA AQUI */}
          </div>
        </div>
      </header>
      <div ref={divRef} className='w-full flex overflow-hidden py-3 bg-[var(--light-brown)] text-[var(--white-brown)]'>
        <span className='text-[26px] font-bold text-nowrap'>Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde • Dra. Sulamita Dantas • Advogada • Especialista em saúde</span>
      </div>
      <div>
        <h2>Minhas Especialidades</h2>

        <div>
          <BoxInfo key={0} icon='document' title='Titulo' text='eu sou um texto de exemplo'/>
          <BoxInfo key={1} icon='balance' title='Titulo' text='eu sou um texto de exemplo'/>
          <BoxInfo key={2} icon='house' title='Titulo' text='eu sou um texto de exemplo'/>
          <BoxInfo key={3} icon='shield' title='Titulo' text='eu sou um texto de exemplo'/>
        </div>

        <button>Marcar Reunião</button>
      </div>
      <div>
        <div>
          {/* IMAGEM DE SULAMITA 2 AQUI */}
        </div>
        <div>
          <h2>Um Pouco Sobre Mim</h2>
          <p>
            Me chamo Sulamita, sou advogada especialista em Direito à saúde.
            Ingressei no curso de direito com 16 anos de idade e no penúltimo período passei na OAB.
            Desde de sempre, soube que minha vocação era ser advogada. Meus olhos brilham por essa profissão!
            Algum tempo depois de me formar, tive, da pior forma possível...
          </p>
          <button>Continuar Lendo</button>
        </div>
      </div>
      <div>
        <h2>O Que Meus Clientes Têm a Dizer</h2>
        <div>
          <BoxInfo key={4} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={5} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={6} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={7} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={8} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={9} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
          <BoxInfo key={10} icon='quote' title='Caio' text='Simplesmente a melhor, conseguiu tudo e mais um pouco'/>
        </div>
        <div>
          <IoMdArrowDropleft/>
          <IoMdArrowDropright/>
        </div>
      </div>
      <div>
        <h2>Leia Meus Artigos</h2>
        <div>
          <BlogCard key={0} text='Texto sobre meu ultimo artg' link='https://google.com.br/' title='Titulo' imageUrl='#link'/>
          <BlogCard key={1} text='Texto sobre meu ultimo artg' link='https://google.com.br/' title='Titulo' imageUrl='#link'/>
          <BlogCard key={2} text='Texto sobre meu ultimo artg' link='https://google.com.br/' title='Titulo' imageUrl='#link'/>
        </div>
        <button>Ler Mais</button>
      </div>
      <div>
        <h2>Perguntas Frequentes</h2>
        <div>
          {/* ACORDEON AQUI */}
        </div>
      </div>
      <div>
        <div>
          {/* IMAGEM DE SULAMITA 3 AQUI */}
        </div>
        <div>
          <h2>Minha Newsletter</h2>
          <span>Receba um email toda vez que eu publicar um artigo</span>
          <form>
            <input type='email' placeholder='seuemail@email.com'></input>
            <button>Receber</button>
          </form>
        </div>
      </div>
      <footer>
        <div>
          <div>
            <Image src="/logo_horizontal_header.png" width={246} height={82} alt='Logomarca Sulamita Dantas Advocacia'/>
          </div>
          <div>
            <h3>Links</h3>
            <ul>
              <li>Inicio</li>
              <li>Sobre</li>
              <li>Blog</li>
              <li>Marcar Reniao</li>
            </ul>
          </div>
          <div>
            <h3>Midias Sociais</h3>
            <ul>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Facebook</li>
              <li>Youtube</li>
              <li>Twitter (X)</li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>sulamita@email.com</li>
              <li>+81 9 9999-9999</li>
            </ul>
          </div>
        </div>
        <div>
          <span>Dra. Sulamita Dantas © Todos os direitos reservados</span>
          <span>Desenvolvido por <Link href="https://instagram.com/mink_oficial" target='_blank'>Mink Digital</Link></span>
        </div>
      </footer>
    </main>
  );
}
