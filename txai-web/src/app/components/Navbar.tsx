import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, User, Search} from "lucide-react";

export default function Navbar () {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white text-[var(--txai-red)] border-b border-neutral-200">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.svg" alt="txai" width={48} height={48} className="w-20 h-20 object-contain" />
                    </Link>
                </div>

                {/* Center: Links (Desktop) */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <div className="flex items-center gap-12 font-montserrat text-xs font-bold uppercase tracking-widest text-gray-700">
                        <Link className="hover:text-[var(--txai-red)] transition-colors border-b-2 border-transparent hover:border-[var(--txai-red)] pb-1" href="/">
                            MUJERES
                        </Link>
                        <Link className="hover:text-[var(--txai-red)] transition-colors border-b-2 border-transparent hover:border-[var(--txai-red)] pb-1" href="/">
                            HOMBRES
                        </Link>
                        <Link className="hover:text-[var(--txai-red)] transition-colors border-b-2 border-transparent hover:border-[var(--txai-red)] pb-1" href="/">
                            ABOUT US
                        </Link>
                    </div>
                </div>

                {/* Right: Search Bar & Icons */}
                <div className="flex items-center gap-6 lg:gap-8 flex-1 justify-end">
                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex relative items-center w-full max-w-[180px] lg:max-w-[240px]">
                        <Search className="absolute left-3 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-10 pr-4 font-montserrat text-xs focus:bg-white focus:ring-1 focus:ring-[var(--txai-red)] transition-all outline-none"
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1 md:gap-3">
                        <Link className="p-2 hover:bg-gray-50 rounded-full transition-colors" href="/" aria-label="Login">
                            <User size={20} className="text-gray-700" />
                        </Link>
                        <Link className="p-2 hover:bg-gray-50 rounded-full transition-colors relative" href="/" aria-label="Favoritos">
                            <Heart size={20} className="text-gray-700" />
                        </Link>
                        <Link className="p-2 hover:bg-gray-50 rounded-full transition-colors relative" href="/" aria-label="Carrito">
                            <ShoppingCart size={20} className="text-gray-700" />
                        </Link>
                    </div>
                </div>
            </div>  
        </nav>
    )
}

