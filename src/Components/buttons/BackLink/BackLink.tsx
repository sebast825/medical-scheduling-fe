import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BackLink.scss'

interface IBackLink{
   variant?: string;
}

function BackLink({variant}:IBackLink) {
  const navigate = useNavigate();

  return (
   <div className="container justify-content-center d-flex p-md-4 p-2 ">
      <Button
         variant={variant != undefined ? variant : "secondary"}
         onClick={() => navigate(-1)}
         size="lg"
         className='btn-back'
     

        > Volver
         </Button>

   </div>
  
  );
}

export default BackLink;
