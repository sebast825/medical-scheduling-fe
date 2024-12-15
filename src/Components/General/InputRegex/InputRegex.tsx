import { useState } from "react"
import "./InputRegex.scss"

interface IInputRegex{
   onFraseRegexChage : (newFrase : string) => void,
   placeholder ?: string,
   lupa ?: boolean
}

function InputRegex({onFraseRegexChage,placeholder = "Buscar",lupa = true}: IInputRegex) {
   const [fraseRegex, setFraseRegex] = useState<string>();

   function updateRegEx(expresion: string) {
      setFraseRegex(expresion);
      onFraseRegexChage(expresion)
    }

   return(
      <div className="row m-3 m-2  d-flex flex-column justify-content-center align-items-center">
      <input
        className= {`form-control input ${lupa ? "input-con-lupa":""}`}
        placeholder={placeholder}
        type="text"
        value={fraseRegex}
        onChange={(e) => updateRegEx(e.target.value)}
      />
    </div>
   )
}

export default InputRegex;