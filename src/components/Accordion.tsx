import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { TiArrowSortedDown } from "react-icons/ti";

// import chevron from "./chevron-down.svg";

const AccordionItem = ({ header, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <TiArrowSortedDown
          color={isEnter ? 'var(--white-brown)' : 'var(--gray-brown)'}
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter && "rotate-180"
          }`}
        />
      </>
    )}
    className="border-b rounded-xl"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left rounded-xl font-semibold text-[18px] transition-color duration-200 ease-out text-[var(--gray-brown)] hover:bg-[var(--light-brown)] ${
          isEnter && "bg-[var(--light-brown)] text-[var(--white-brown)]"
        }`
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

export default function App() {
  return (
    <div className="mx-2 my-4 rounded-xl border-t w-full">
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="Como posso agendar uma consulta?" initialEntered>
        Você pode agendar uma consulta entrando em contato pelo telefone ou e-mail disponíveis na página de contato.
        </AccordionItem>

        <AccordionItem header="O atendimento é presencial ou online?">
        Oferecemos atendimento tanto presencial quanto online, garantindo que você tenha a opção que melhor se adapta às suas necessidades e conforto.
        </AccordionItem>

        <AccordionItem header="Como funciona a cobrança dos honorários?">
        A cobrança pode variar de acordo com o serviço prestado. Podemos discutir isso durante a consulta inicial, onde explicarei as opções e o que é mais adequado para o seu caso.
        </AccordionItem>
      </Accordion>
    </div>
  );
}
