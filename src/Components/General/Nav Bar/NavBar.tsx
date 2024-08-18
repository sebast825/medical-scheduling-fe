import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useUserContext, useUserToggleContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import useRedicrects from '../../../hooks/useRedicrects';
import { NavDropdown, Offcanvas } from 'react-bootstrap';
import SideMenu from '../sideMenu/SideMenu';

function FillExample() {
   const [activeKey, setActiveKey] = useState<string>('link');
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const user = useUserContext();
  const login = useUserToggleContext();

  const {useRedirectToNuestrosMedicos,useRedirectToLogin} = useRedicrects();


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
  
    const handleClick = (eventKey: string, event: React.MouseEvent) => {
      event.preventDefault();
      setActiveKey(eventKey);
    };
    const navigate = useNavigate();
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    
    

    <Nav fill variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link href="/" >
          <img src="/logo192.png" alt="Logo" style={{ height: '30px', marginRight: '10px', background:'transparent' }} />
        </Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link onClick={useRedirectToNuestrosMedicos} eventKey="a" >Nuestros Medicos</Nav.Link>
      </Nav.Item>
      { !isAuthenticated ? (
        <>
    


      <Nav.Item>
        <Nav.Link onClick={useRedirectToLogin}  eventKey="b" >Ingresar</Nav.Link>
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