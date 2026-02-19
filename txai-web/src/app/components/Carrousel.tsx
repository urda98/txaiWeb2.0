export default function Carrousel () {
    return (
        <div>
            <div className="flex items-center aling flex flex-col gap-2 px-8 text-4 font-bold">
                <h1>TXAI</h1>
                    <div>
                        <p className="px-8">Ambos de diseño</p>
                        <p>Elegancia en cada guardia</p>
                    </div>
                <a
                    className="flex h-12 w-50 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Comprar Ahora
                </a>
            </div>
        </div>
    )
}