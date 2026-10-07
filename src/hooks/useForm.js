import { useState } from "react";

export const useForm=(initialForm={})=>{
    const [formState, setFromState]=useState(initialForm)

    const handleInputChange=({ target })=>{
        const {name, value}=target

        setFromState((prevForm)=>({
            ...prevForm,
            [name]:value
        }))
    }

    const handleReset=()=>{
        setFromState(initialForm)
    }
    return {
        formState,
        ...formState,
        handleInputChange,
        handleReset
    }
}