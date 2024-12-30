
interface ITitleContent{
   title ?: string,
   pading ?: boolean 
} 
function TitleContent (props : ITitleContent){

      const {title = "No hay contenido disponible actualmente", pading = true} = props;

   return (
      <div className={`container d-flex flex-column justify-content-center ${pading ? "p-md-5" :"" }  p-2 pt-0`}>
      <h2 className="text-center">{title}</h2>
      <div className="border-bottom " style={{width:"100%"}}></div>
    </div>
   )
}

export default TitleContent;