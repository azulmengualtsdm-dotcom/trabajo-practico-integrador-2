import { useFetch } from "../hooks/usefetch";

export const HomePage=()=>{
    const {data:articles, isLoading, error
    }=useFetch("http://localhost:3000/api/articles")

    eturn (
        <div className="min-h-screen bg-slate-900 text-white font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                
                <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                        </h1>
                        <p className="text-slate-400 mt-1">Explorá las publicaciones relacionales de la comunidad.</p>
                    </div>
                </header>

                
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
                    </div>
                )}

                
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center my-10">
                        <p className="font-semibold"> hubo un problema al conectar con el servidor</p>
                        <p className="text-sm mt-1 text-red-300/80">{error}</p>
                    </div>
                )}

                
                {!isLoading && !error && (!articles || articles.length === 0) && (
                    <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center my-10">
                        <p className="text-xl font-bold text-slate-300">No hay artículos publicados todavía.</p>
                        <p className="text-slate-500 text-sm mt-2">¡Sé el primero en inaugurar la plataforma subiendo un post!</p>
                    </div>
                )}

                
                {!isLoading && !error && articles && articles.length > 0 && (
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <article 
                                key={article.id} 
                                className="bg-slate-800/50 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-sky-500/5"
                            >
        
                                <h2 className="text-2xl font-bold text-slate-100 hover:text-sky-400 transition-colors">
                                    {article.title}
                               </h2>
                                
                              
                                <p className="text-slate-400 mt-3 leading-relaxed text-sm md:text-base">
                                    {article.excerpt || "Sin resumen disponible para este artículo."}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-slate-800/60 text-xs md:text-sm text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/50 font-medium text-slate-300">
                                             Autor: <span className="text-sky-400 font-semibold">@{article.author?.username || "Anónimo"}</span>
                                        </span>
                                        {article.author?.Profile && (
                                            <span className="text-slate-500 hidden sm:inline">
                                                ({article.author.Profile.first_name} {article.author.Profile.last_name})
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-slate-500 italic">
                                        Publicado el {new Date(article.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}