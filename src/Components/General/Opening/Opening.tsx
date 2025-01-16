import React from 'react';
import './Opening.scss'; // Importa el archivo CSS para los estilos

type IOpening = {
  title : string,
  subTitle?: string,
  smallOpening?: boolean,
  
}

function Opening({ title, subTitle,smallOpening = true  } :IOpening) : React.ReactElement {
  return (
    <div className={`opening-container ${smallOpening == true ? "miniOpening": "" }`}>
      <div className='bg-imgaen'style={{ backgroundImage: `url(/images/hospital.jpg)` }}></div>
      <div className="overlay">
        <div className=  {`text-content ${smallOpening == true ? "": "marginTop"  }`}>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subTitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default Opening;
