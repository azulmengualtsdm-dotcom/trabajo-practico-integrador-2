import { Link, useNavigate } from "react-router"

export const Navbar = () => {
    const navigate = useNavigate(); 
   
    const handleLogout = async () => {
        try {
           
            const response = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                
                credentials: "include" 
            });

            if (!response.ok) {
                console.warn("La cookie de sesión no se pudo limpiar en el servidor, forzando cierre local.");
            }

        } catch (error) {
            console.error("Error al conectar con la aduana de logout:", error.message);
        } finally {
            
            localStorage.removeItem("isLogged")
            navigate("/login");
        }
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700/60 text-white px-6 py-4 shadow-xl font-sans sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                
                
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                        BLOG.DEV
                    </span>
                    <span className="h-5 w-px bg-slate-700 hidden sm:inline"></span>
                    
                    <Link 
                        to="/" 
                        className="text-sm font-semibold text-slate-300 hover:text-sky-400 transition-colors hidden sm:inline"
                    >
                        Inicio
                    </Link>
                </div>

                
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-sky-400 transition-colors sm:hidden">
                        Home
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-red-500/10 to-rose-500/10 hover:from-red-500 hover:to-rose-500 border border-red-500/30 hover:border-transparent text-red-400 hover:text-white font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-red-500/10"
                    >
                        Cerrar Sesión 
                    </button>
                </div>

            </div>
        </nav>
    );
};
