import { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { useForm } from "../hooks/useForm.js"; 

export const LoginPage = () => {
    const navigate = useNavigate();

    const { formState: form, handleInputChange: handleChange } = useForm({
        email: "",
        password: ""
    });
    const { email, password } = form;
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMs, setErrorMg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(false);
            
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include" 
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Credenciales incorrectas.");
            }
            
         
            localStorage.setItem("isLogged", "true");
            navigate("/"); 
            
        } catch (error) {
            setError(true);
            setErrorMg(error.message);

            
            setTimeout(() => {
                setError(false);
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    }; 
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Iniciar Sesión
              </h2>
              <p className="text-slate-400 text-sm mt-1">Código adaptado al estilo de la cátedra</p>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center mb-6 font-medium">
                ⚠️ {errorMs}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={handleChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-sky-500" 
                  placeholder="nombre@comercio.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Contraseña</label>
                <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={handleChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-sky-500" 
                  placeholder="••••••••" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-bold p-3 rounded-xl transition-all duration-300 disabled:opacity-40"
              >
                
                {isLoading ? "Conectando al servidor..." : "Ingresar Seguro"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400 font-medium">
              ¿No tenés una cuenta?{" "}
              <Link to="/register" className="text-sky-400 font-bold hover:underline">
                Registrate acá
              </Link>
            </p>

          </div>
        </div>
    );
}; 
