import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function FillExample() {
   const [activeKey, setActiveKey] = useState<string>('link');

   const handleSelect = (selectedKey: string | null) => {
      if (selectedKey) {
        setActiveKey(selectedKey);
      }
    };
  
    const handleClick = (eventKey: string, event: React.MouseEvent) => {
      event.preventDefault();
      setActiveKey(eventKey);
    };

  return (
    <Nav fill variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link href="/" >
          <img src="/logo192.png" alt="Logo" style={{ height: '30px', marginRight: '10px', background:'transparent' }} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/home" eventKey="link" onClick={ (e) => handleClick('link', e)} >Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/asd" eventKey="link-1" onClick={ (e) => handleClick('link-1', e)}>Loooonger NavLink</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/ar" eventKey="link-2" onClick={ (e) => handleClick('link-2', e)}>Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default FillExample;