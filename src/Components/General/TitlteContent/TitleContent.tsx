
interface ITitleContent{
   title ?: string,
   pading ?: boolean 
} 
function TitleContent (props : ITitleContent){

      const {title = "No hay contenido disponible actualmente", pading = true} = props;

   return (
      <div className={`container d-flex justify-content-center ${pading ? "p-md-5" :"" }  p-2`}>
      <h2 className="text-center mb-4 border-bottom pb-2">{title}</h2>
    </div>
   )
}

export default TitleContent;