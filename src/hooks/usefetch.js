import { useState } from "react";
import { useEffect } from "react";

export const useFetch=(url)=>{
    const [data, setData]=useState(null);
    const [isLoading, setIsLoading]=useState(true)
    const [error, setError]=useState(null)
}

const fetchData=async()=>{
    try{
        setIsLoading(true)
        setError(null)

        const response=await fetch(url, {
            method:"GET",
            credentials:"include"
        })

        if(!response.ok){
            throw new Error(`error en la consulta:${response.status} ${response.statusText}`)
        }
        const json=await response.json()
        setData(json)
    }catch(error){
        setError(error.message)
    } finally {setIsLoading(false)}
}

useEffect(()=>{
    if(!url) return

    fetchData()
}, [url])

return {data, isLoading, error}