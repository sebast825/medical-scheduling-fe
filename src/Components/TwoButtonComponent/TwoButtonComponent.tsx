import React from 'react';
import { Button } from 'react-bootstrap';
import './TwoButtonComponent.scss'
interface ITwoButtonComponent {
  textButton1: string;
  textButton2: string;
  variantButton1?: string;
  variantButton2?: string;
  onClickButton1: () => void;
  onClickButton2: () => void;
  layout?: string;
}

const TwoButtonComponent: React.FC<ITwoButtonComponent> = ({
  textButton1,
  textButton2,
  variantButton1,
  variantButton2,
  onClickButton1,
  onClickButton2,
  layout
}) => {
   console.log(variantButton1)
  return (
    <div className={`d-flex gap-1  gap-sm-2 m-1  m-sm-4 ${layout} contaiener`}>
      <Button
        variant={variantButton1 != undefined ? variantButton1 : "primary"}
        onClick={onClickButton1}
        size="lg"
        className="w-100 w-lg-50"
      >
        {textButton1}
      </Button>
      <Button
        variant={variantButton2 != undefined ? variantButton2 : "secondary"}
        onClick={onClickButton2}
        size="lg"
        className="w-100 w-lg-50"
      >
        {textButton2}
      </Button>
    </div>
  );
};

export default TwoButtonComponent;
