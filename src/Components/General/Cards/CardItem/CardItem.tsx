import { Card } from "react-bootstrap";

interface ICardItem{
   text : string;
   propertyName : string;
}

function CardItem ({text, propertyName}:ICardItem){
   return(<Card.Text>
      <strong>{propertyName}:</strong> {text}
    </Card.Text>)
}

export default CardItem;