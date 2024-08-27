interface BlogCardProps {
    title: string;
    text: string;
    link: string;
    imageUrl: string;
}

export function BlogCard({title, text, link, imageUrl}: BlogCardProps) {
    return (
        <div>
            <div>
                {/* IMAGEM DA CAPA AQUI */}
            </div>
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
            <div>
                <a href={link}>Continuar lendo</a>
            </div>
        </div>
    )
}