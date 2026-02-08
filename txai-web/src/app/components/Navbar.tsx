import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar () {
    return (
        <nav className="flex justify-between w-full px-16 py-2 bg-[var(--txai-blue)]  text-[var(--txai-red)] border-b border-neutral-200">
            <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="txai" width={48} height={48} className="w-20 h-20" />
            </Link>
            <div>
                <ul className="flex gap-8 list-none text-xl font-medium">
                    <li><Link className="py-8 px-3 relative inline-block text-[var(--txai-red)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[var(--txai-red)] after:transition-all after:duration-500 hover:after:w-full" href="/">MUJER</Link></li>
                    <li><Link className="py-8 px-3 relative inline-block text-[var(--txai-red)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[var(--txai-red)] after:transition-all after:duration-500 hover:after:w-full" href="/">HOMBRE</Link></li>
                    <li><Link className="py-8 px-3 relative inline-block text-[var(--txai-red)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-0 after:bg-[var(--txai-red)] after:transition-all after:duration-650 hover:after:w-full" href="/">ABOUT US</Link></li>
                </ul>
            </div>
            <div>
                <ul className="flex gap-4 list-none ">
                    <li><Link className="py-8 px-3 hover:opacity-80" href="/" aria-label="Favoritos"><Heart size={30} /></Link></li>
                    <li><Link className="py-8 px-3 hover:opacity-80" href="/" aria-label="Carrito"><ShoppingCart size={30} /></Link></li>
                    <li><Link className="py-8 px-3 hover:opacity-80" href="/" aria-label="Login"><User size={30} /></Link></li>
                </ul>
            </div>
        </nav>
    )
}

