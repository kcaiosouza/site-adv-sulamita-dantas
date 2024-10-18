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
		<div className="bg-[#B1957410] border-[var(--light-brown)] border-[2px] rounded-xl min-h-72 max-h-72 min-w-60 max-w-60">
			<div className="flex flex-row items-center justify-between p-4">
				{icon == 'document' ? <IoDocument size={35} color="var(--dark-brown)"/> : ''}
				{icon == 'shield' ? <FaBuildingShield size={40} color="var(--dark-brown)"/> : ''}
				{icon == 'balance' ? <FaScaleBalanced size={40} color="var(--dark-brown)"/> : ''}
				{icon == 'house' ? <MdOutlineAccountBalance size={40} color="var(--dark-brown)"/> : ''}
				{icon == 'quote' ? <FaQuoteLeft size={35} color="var(--dark-brown)"/> : ''}
				<h3 className="font-bold text-[18px] text-[var(--gray-brown)] text-right">{title}</h3>
			</div>
			<div className="p-4 text-justify">
				<p className="text-[var(--gray-brown)]">{text}</p>
			</div>
		</div>
	)
}