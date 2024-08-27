import { MdOutlineAccountBalance } from "react-icons/md";
import { FaScaleBalanced } from "react-icons/fa6";
import { FaBuildingShield } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";



interface BoxInfoProps {
    icon: "document" | "shield" | "balance" | "house" | "quote";
    title: string;
    text: string;
}

export function BoxInfo({icon, title, text}: BoxInfoProps) {
    return(
        <div>
            <div>
                {icon == 'document' ? <IoDocument/> : ''}
                {icon == 'shield' ? <FaBuildingShield/> : ''}
                {icon == 'balance' ? <FaScaleBalanced/> : ''}
                {icon == 'house' ? <MdOutlineAccountBalance/> : ''}
                {icon == 'quote' ? <FaQuoteLeft/> : ''}
                <h3>{title}</h3>
            </div>
            <div>
                <p>{text}</p>
            </div>
        </div>
    )
}