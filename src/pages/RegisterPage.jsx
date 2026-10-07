import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage=()=>{
    const navigate=useNavigate()

    const {formState:form, handleInputChange:handleChange, handleReset}=useForm({
        username:"",
        email:"",
        password:"",
        first_name:"",
        last_name:""
    })

    const {username, email, password, first_name, last_name}=form

    const [isLoading, setIsLoading]=useState(false)
    const [error,  setError]=useState(false)

    const [errorsList, setErrorsList]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            setIsLoading(true)
            setError(false)
            setErrorsList([])

            const response=await fetch("http://localhost:3000/api/auth/register", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username, email, password, first_name, last_name})
            })
            const data=await response.json

            if(!response.ok){
              if (data.errors) {
          setErrorsList(data.errors); 
          throw new Error("Errores de validación en el formulario.");
        }
        throw new Error(data.error || "No se pudo registrar el usuario.");
      }

      
      handleReset();
      alert("¡Usuario y perfil creados con éxito relacional!");

     
      navigate("/login");

    } catch (error) {
      setError(true);
      
   
      setTimeout(() => {
        setError(false);
      }, 3000);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Register
          </h1>
          <p className="text-slate-400 text-sm mt-1">Crea tu cuenta relacional y perfil físico</p>
        </div>

        
        {errorsList.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs mb-5 space-y-1">
            <p className="font-bold">⚠️ Errores de aduana detectados:</p>
            {errorsList.map((error, index) => (
              <p key={index}>• Campo <span className="font-semibold">{error.campo || error.path}</span>: {error.mensaje || error.msg}</p>
            ))}
          </div>
        )}

      
        {error && errorsList.length === 0 && (
          <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-xl text-sm text-center mb-5 font-semibold">
            ⚠️ Email o Username ya están en uso.
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Nombre</label>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Gonza"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Apellido</label>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Alonzo"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="gonza_alonzo"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="gonza@comercio.com"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold p-3 rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-40 mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando relacional..." : "Register"}
          </button>
        </form>

       
        <p className="mt-6 text-center text-sm text-slate-400 font-medium">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-indigo-400 font-bold hover:underline">
            Iniciá sesión acá
          </Link>
        </p>

      </div>
    </div>
  );
};