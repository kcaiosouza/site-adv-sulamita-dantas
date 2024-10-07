interface DashboardHeaderProps {
    title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
    return(
        <header className="flex w-full items-center h-14 border-b-2 mb-5">
            <h2 className="font-bold text-[24px] text-[var(--gray-brown)]">{title}</h2>
        </header>
    )
}