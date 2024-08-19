import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useUserInfo } from '../../../context/authContext';
import useRedicrects from '../../../hooks/useRedicrects';
import SideMenu from '../sideMenu/SideMenu';

function FillExample() {
   const [activeKey, setActiveKey] = useState<string>('link');
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const user = useUserInfo();

  const {redirectToNuestrosMedicos,redirectToLogin,redirectToHome} = useRedicrects();


   useEffect(()=>{
      if(user != null){
        setIsAuthenticated(true)
      }
   },[user])

   useEffect(()=>{console.log(isAuthenticated)},[isAuthenticated])

   const handleSelect = (selectedKey: string | null) => {
      if (selectedKey) {
        setActiveKey(selectedKey);
      }
    };
   
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    
    

    <Nav fill variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link onClick={redirectToHome} >
          <img src="/logo192.png" alt="Logo" style={{ height: '30px', marginRight: '10px', background:'transparent' }} />
        </Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link onClick={redirectToNuestrosMedicos} eventKey="a" >Nuestros Medicos</Nav.Link>
      </Nav.Item>
      { !isAuthenticated ? (
        <>
    


      <Nav.Item>
        <Nav.Link onClick={redirectToLogin}  eventKey="b" >Ingresar</Nav.Link>
      </Nav.Item>   
        </>

       
       ) :(
           <Nav.Item>
        <Nav.Link eventKey="c" onClick={handleShow}>Mi Perfil</Nav.Link>
      </Nav.Item>    
      )}
          <SideMenu show={show} handleClose={handleClose}/>

    </Nav>
    
  );
}

export default FillExample;