import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { BoxInfo } from '@/components/BoxInfo';
import { FaShield } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { Poppins } from 'next/font/google'
import AccordionComponent from '@/components/Accordion';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"]
})

export default function Home() {
  const divTextScroll = useRef<HTMLDivElement | null>(null);
  const divDepoimentosScroll = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if(divTextScroll.current) {
        divTextScroll.current.scrollLeft = window.scrollY/3;
      };
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollDepoimentosLeft = () => {
    if (divDepoimentosScroll.current) {
      divDepoimentosScroll.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollDepoimentosRight = () => {
    if (divDepoimentosScroll.current) {
      divDepoimentosScroll.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className={poppins.className}>
      <header className='flex flex-col w-full min-h-[100dvh] bg-[var(--header-white)] bg-[url("/lines_background.svg")] bg-cover'>
        <nav className='flex flex-row w-full px-12'>
          <div className='p-3'>
            <Image loading='lazy' src="/logo_horizontal_header.png" width={224} height={75} alt='Logomarca Sulamita Dantas Advocacia'/>
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
            <button className='bg-[var(--light-brown)] font-medium px-8 py-2 rounded-md text-[var(--white-brown)]'>Marcar Reunião</button>
          </div>
        </nav>
        <div className='flex flex-row w-full flex-[1]'>
          <div className='flex-[1] flex flex-col justify-center items-start pl-24'>
            <div className='w-full flex flex-col'>
              <h1 className='font-bold text-[40px] text-[var(--gray-brown)]'>
                Advocacia que faz a diferença:<br/> Defendendo seus direitos com paixão e expertise.
              </h1>
              <span className='flex items-center gap-1 text-[var(--gray-brown)]'><FaShield className='mr-1' size={16} color='var(--light-brown)'/> +99 <b className='text-[var(--light-brown)]'>Casos</b></span>
            </div>
            <button className='mt-8 bg-[var(--light-brown)] font-medium px-8 py-2 rounded-md text-[var(--white-brown)]'>Saiba Mais</button>
          </div>
          <div className='flex-[1]'>
            <Image src="/sulamita_header.png" fill className='object-scale-down object-right pr-24 pt-12' alt='Imagem de Sulamita'/>
          </div>
        </div>
      </header>
      <div ref={divTextScroll} className='w-full flex overflow-hidden py-4 bg-[var(--light-brown)] text-[var(--white-brown)]'>
        <span className='text-[26px] font-semibold text-nowrap'>Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde  • Dra. Sulamita Dantas • Advogada • Especialista em saúde • Dra. Sulamita Dantas • Advogada • Especialista em saúde</span>
      </div>
      <div className='flex flex-col justify-center items-center mt-20 mb-16'>
        <h2 className='font-semibold text-[30px] mb-8 text-[var(--gray-brown)]'>Minhas Especialidades</h2>

        <div className='grid grid-cols-4 gap-4'>
          <BoxInfo key={0} icon='document' title='Consultoria Jurídica' text='Oferecemos consultoria especializada em planos de saúde, ajudando a resolver questões relacionadas a cobertura e reembolsos.'/>
          <BoxInfo key={1} icon='balance' title='Defesa dos seus Direitos' text='Defendemos seus direitos com base na legislação vigente, garantindo que você receba o tratamento e a cobertura que merece.'/>
          <BoxInfo key={2} icon='house' title='Representação Legal' text='Representamos você em processos administrativos e judiciais contra planos de saúde para assegurar a cobertura necessária.'/>
          <BoxInfo key={3} icon='shield' title='Proteção ao Consumidor' text='Protegemos seus interesses e lutamos para que você não sofra com negativas indevidas ou abusos por parte dos planos de saúde.'/>
        </div>

        <button className='mt-8 bg-[var(--light-brown)] font-medium px-8 py-2 rounded-md text-[var(--white-brown)]'>Marcar Reunião</button>
      </div>
      <div className='bg-[var(--light-brown)] flex flex-row px-10'>
        <div className='flex-[1] relative'>
          <Image src="/sulamita_about_me.png" fill className='object-contain' alt='Imagem de Sulamita'/>
        </div>
        <div className='flex flex-col flex-[1] py-14'>
          <h2 className='font-semibold text-[var(--white-brown)] text-[30px] text-center mb-5'>Um Pouco Sobre Mim</h2>
          <p className='font-[200] text-[var(--white-brown)] text-justify'>
            Me chamo Sulamita, sou advogada especialista em Direito à saúde.
            Ingressei no curso de direito com 16 anos de idade e no penúltimo período passei na OAB.
            Desde de sempre, soube que minha vocação era ser advogada. Meus olhos brilham por essa profissão!
            Algum tempo depois de me formar, tive, da pior forma possível...
          </p>
          <button className='mt-8 bg-[var(--white-brown)] font-medium px-8 py-2 rounded-md text-[var(--light-brown)] self-center'>Continuar Lendo</button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mt-20 mb-16 px-16'>
        <h2 className='font-semibold text-[30px] mb-8 text-[var(--gray-brown)]'>O Que Meus Clientes Têm a Dizer</h2>
        <div className='flex w-full'>
        <div ref={divDepoimentosScroll} className='flex overflow-x-hidden gap-4'>
          <BoxInfo key={4} icon='quote' title='Ana Maria' text='A Dra. Sulamita Dantas resolveu rapidamente o problema com meu plano de saúde. Fiquei muito satisfeita com a agilidade e a atenção dela!'/>
          <BoxInfo key={5} icon='quote' title='Pedro Silva' text='Minha cobertura foi negada e a Dra. Sulamita Dantas conseguiu resolver tudo. Excelente trabalho!'/>
          <BoxInfo key={6} icon='quote' title='Juliana Costa' text='Ótimo atendimento! A Dra. Sulamita Dantas garantiu que meu tratamento fosse coberto sem complicações.'/>
          <BoxInfo key={7} icon='quote' title='Lucas Santos' text='Eu estava tendo dificuldades com o plano de saúde, e a Dra. Sulamita Dantas resolveu tudo de forma rápida e eficiente.'/>
          <BoxInfo key={8} icon='quote' title='Beatriz Almeida' text='Recebi um atendimento muito bom da Dra. Sulamita Dantas. Ela ajudou a conseguir a cobertura que eu precisava para o meu tratamento.'/>
          <BoxInfo key={9} icon='quote' title='Marcos Oliveira' text='A Dra. Sulamita Dantas fez um trabalho incrível resolvendo meu problema com o plano de saúde. Muito grato pela ajuda!'/>
          <BoxInfo key={10} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
          <BoxInfo key={11} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
          <BoxInfo key={12} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
          <BoxInfo key={13} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
          <BoxInfo key={14} icon='quote' title='Cláudia Pereira' text='Estou muito satisfeita com o atendimento da Dra. Sulamita Dantas. Ela conseguiu garantir a cobertura que eu precisava sem dificuldades.'/>
        </div>
        </div>
        <div className='flex flex-row self-end mt-3'>
          <BiSolidLeftArrow size={35} color='var(--dark-brown)' onClick={scrollDepoimentosLeft} className='cursor-pointer'/>
          <BiSolidRightArrow size={35} color='var(--dark-brown)' onClick={scrollDepoimentosRight} className='cursor-pointer'/>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center mt-32'>
        <h2 className='font-semibold text-[30px] mb-8 text-[var(--gray-brown)]'>Leia Meus Artigos</h2>
        <div className='flex gap-4'>
          <BlogCard key={0} text='A cobertura de saúde pode ser um labirinto complicado. Muitas vezes, os beneficiários se deparam com negativas de cobertura que podem gerar insegurança e frustração. Neste artigo, discutiremos os direitos dos...' link='https://google.com.br/' title='Como Navegar nas Questões de Cobertura de Saúde: O Que Você Precisa Saber' imageUrl='https://www.conjur.com.br/img/b/advogado-trabalhando2.jpeg'/>
          <BlogCard key={1} text='A advocacia preventiva é uma ferramenta poderosa na proteção dos direitos dos pacientes. Neste artigo, vamos abordar como a atuação de um advogado pode evitar problemas futuros...' link='https://google.com.br/' title='A Importância da Advocacia Preventiva na Saúde: Protegendo Seus Direitos' imageUrl='https://www.conjur.com.br/img/b/advogado-trabalhando2.jpeg'/>
          <BlogCard key={2} text='Quando um procedimento médico é negado por seu plano de saúde, é natural sentir-se perdido. No entanto, existem caminhos legais que podem ser seguidos para contestar essa negativa...' link='https://google.com.br/' title='Planos de Saúde e Procedimentos Negados: O Que Fazer?' imageUrl='https://www.conjur.com.br/img/b/advogado-trabalhando2.jpeg'/>
        </div>
        <button className='mt-8 bg-[var(--light-brown)] font-medium px-8 py-2 rounded-md text-[var(--white-brown)]'>Ler Mais</button>
      </div>
      <div className='flex flex-col items-center justify-center mt-32'>
        <h2 className='font-semibold text-[30px] mb-8 text-[var(--gray-brown)]'>Perguntas Frequentes</h2>
        <div className='w-full px-24'>
          <AccordionComponent/>
        </div>
      </div>
      <div className='bg-[var(--light-brown)] flex flex-row px-10'>
        <div className='flex-[1] relative'>
          <Image src="/sulamita_newsletter.png" alt='Imagem de Sulamita' fill className='object-contain'/>
        </div>
        <div className='flex flex-col flex-[1] py-14'>
          <h2 className='font-semibold text-[var(--white-brown)] text-[30px] text-center mb-1'>Minha Newsletter</h2>
          <span className='font-[200] text-[var(--white-brown)] text-center mb-8'>Receba um email toda vez que eu publicar um artigo</span>
          <form className="flex items-center rounded-lg p-2">
            <input type='email' placeholder='seuemail@email.com' className="bg-[#00000030] rounded-s-xl text-white placeholder:text-[#d1b8a5] outline-[var(--dark-brown)] outline-1 outline px-4 py-3 w-full"></input>
            <button className="bg-[var(--white-brown)] text-[#5c3b26] font-semibold rounded-xl px-6 py-[13px] translate-x-[-12px]">Receber</button>
          </form>
        </div>
      </div>
      <footer className='flex flex-col items-center justify-center bg-[var(--gray-brown)] text-[var(--white-brown)]'>
        <div className='grid grid-cols-4 px-32 py-20 w-full'>
          <div>
            <Image src="/logo_horizontal_footer.png" width={246} height={82} alt='Logomarca Sulamita Dantas Advocacia'/>
          </div>
          <div>
            <h3 className='font-semibold text-[20px] mb-4'>Links</h3>
            <ul className='pl-5 list-disc font-light'>
              <li>Inicio</li>
              <li>Sobre</li>
              <li>Blog</li>
              <li>Marcar Reniao</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-[20px] mb-4'>Midias Sociais</h3>
            <ul className='pl-5 list-disc font-light'>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Facebook</li>
              <li>Youtube</li>
              <li className='opacity-35 select-none'>Twitter (X)</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-[20px] mb-4'>Contato</h3>
            <ul className='pl-5 list-disc font-light'>
              <li>sulamita@email.com</li>
              <li>+81 9 9999-9999</li>
            </ul>
          </div>
        </div>
        <div className='flex justify-between w-full border-t px-32 py-9 leading-[0]'>
          <span>Dra. Sulamita Dantas © Todos os direitos reservados</span>
          <span>Desenvolvido por <Link href="https://instagram.com/mink_oficial" target='_blank'>Mink Digital</Link></span>
        </div>
      </footer>

      {/* START CTA BTN WHATSAPP */}
      <button className='fixed right-4 bottom-4 bg-[var(--dark-brown)] rounded-full w-[71px] h-[71px] flex items-center justify-center'>
        <AiOutlineWhatsApp size={50} color='var(--white-brown)'/>
      </button>
      {/* END CTA BTN WHATSAPP */}
    </main>
  );
}
