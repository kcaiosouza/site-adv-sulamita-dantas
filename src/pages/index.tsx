import { useEffect, useRef } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { BoxInfo } from '@/components/BoxInfo';
import Image from 'next/image';
import Link from 'next/link';
import { FaShield } from "react-icons/fa6";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export default function Home() {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if(divRef.current) {
        divRef.current.scrollLeft = window.scrollY/3;
      };
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className={poppins.className}>
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
      <div ref={divRef} className='w-full flex overflow-hidden py-4 bg-[var(--light-brown)] text-[var(--white-brown)]'>
        <span className='text-[26px] font-semibold text-nowrap'>Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde • Dra. Sulamita Dantas • Advogada • Especialista em saúde</span>
      </div>
      <div className='flex flex-col justify-center items-center mt-20'>
        <h2 className='font-semibold text-[30px] mb-8'>Minhas Especialidades</h2>

        <div className='grid grid-cols-4 gap-4'>
          <BoxInfo key={0} icon='document' title='Consultoria Jurídica' text='Oferecemos consultoria especializada em planos de saúde, ajudando a resolver questões relacionadas a cobertura e reembolsos.'/>
          <BoxInfo key={1} icon='balance' title='Defesa dos seus Direitos' text='Defendemos seus direitos com base na legislação vigente, garantindo que você receba o tratamento e a cobertura que merece.'/>
          <BoxInfo key={2} icon='house' title='Representação Legal' text='Representamos você em processos administrativos e judiciais contra planos de saúde para assegurar a cobertura necessária.'/>
          <BoxInfo key={3} icon='shield' title='Proteção ao Consumidor' text='Protegemos seus interesses e lutamos para que você não sofra com negativas indevidas ou abusos por parte dos planos de saúde.'/>
        </div>

        <button className='mt-8 bg-[var(--light-brown)] font-medium px-8 py-2 rounded-md text-[var(--white-brown)]'>Marcar Reunião</button>
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
          <BoxInfo key={4} icon='quote' title='Ana Maria' text='A Dra. Sulamita Dantas resolveu rapidamente o problema com meu plano de saúde. Fiquei muito satisfeita com a agilidade e a atenção dela!'/>
          <BoxInfo key={5} icon='quote' title='Pedro Silva' text='Minha cobertura foi negada e a Dra. Sulamita Dantas conseguiu resolver tudo. Excelente trabalho!'/>
          <BoxInfo key={6} icon='quote' title='Juliana Costa' text='Ótimo atendimento! A Dra. Sulamita Dantas garantiu que meu tratamento fosse coberto sem complicações.'/>
          <BoxInfo key={7} icon='quote' title='Lucas Santos' text='Eu estava tendo dificuldades com o plano de saúde, e a Dra. Sulamita Dantas resolveu tudo de forma rápida e eficiente.'/>
          <BoxInfo key={8} icon='quote' title='Beatriz Almeida' text='Recebi um atendimento muito bom da Dra. Sulamita Dantas. Ela ajudou a conseguir a cobertura que eu precisava para o meu tratamento.'/>
          <BoxInfo key={9} icon='quote' title='Marcos Oliveira' text='A Dra. Sulamita Dantas fez um trabalho incrível resolvendo meu problema com o plano de saúde. Muito grato pela ajuda!'/>
          <BoxInfo key={10} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
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
