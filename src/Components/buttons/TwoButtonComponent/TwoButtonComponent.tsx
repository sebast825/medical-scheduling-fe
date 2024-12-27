import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./TwoButtonComponent.scss";
interface ITwoButtonComponent {
  textButton1: string;
  textButton2: string;
  variantButton1?: string;
  variantButton2?: string;
  onClickButton1: () => void;
  onClickButton2: () => void;
  layout?: string;
  setShadowDefault ?: boolean
}

const TwoButtonComponent: React.FC<ITwoButtonComponent> = ({
  textButton1,
  textButton2,
  variantButton1,
  variantButton2,
  onClickButton1,
  onClickButton2,
  layout,
  setShadowDefault = true

}) => {
  const [colorSelected, setColorSelected] = useState<string>("");

  useEffect(()=>{
    if(setShadowDefault){
      setColorSelected("primary")
    }
  },[])

  function activeBtnPrimary() {
    onClickButton1();
    setColorSelected("primary");
  }
  function activeBtnSecondary() {
    onClickButton2();
    setColorSelected("secondary");
  }
  return (
    <div className="gap-sm-2  m-3  m-sm-4">
      <div className={`d-flex gap-1 gap-sm-2 ${layout} container`}>
        <Button
          variant={variantButton1 != undefined ? variantButton1 : "primary"}
          onClick={activeBtnPrimary}
          size="lg"
          className={`w-100 w-md-50 ${colorSelected === "primary" ? "active" : ""} p-md-3`}
        >
          {textButton1}
        </Button>
        <Button
          variant={variantButton2 != undefined ? variantButton2 : "secondary"}
          onClick={activeBtnSecondary}
          size="lg"
          className={`w-100 w-md-50 ${colorSelected === "secondary" ? "active" : ""} p-md-3`}
        >
          {textButton2}
        </Button>
      </div>
  
     
    </div>
  );
}  

export default TwoButtonComponent;
