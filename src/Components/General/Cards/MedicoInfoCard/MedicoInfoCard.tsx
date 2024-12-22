import CardItem from "../cardItem/CardItem";
import GenericCard from "../GenericCard/GenericCard";

function MedicoInfoCard(){
   return( <GenericCard
      title={"title"}
      handleEvent={()=>{}}
    >
      {true && (
        <>
          <CardItem
            key={"nombre"}
            text={"nombre"}
            propertyName="Nombre"
          />
         
        </>
      )}
    
    </GenericCard>)
}

export default MedicoInfoCard;