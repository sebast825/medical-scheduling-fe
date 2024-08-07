import React from 'react';
import './Opening.scss'; // Importa el archivo CSS para los estilos

type IOpening = {
  title: string,
  subTitle: string
}

function Opening({ title = "asd", subTitle } :IOpening) : React.ReactElement {
  return (
    <div className="opening-container"style={{ backgroundImage: `url(/images/hospital.jpg)` }}>
      <div className="overlay">
        <div className="text-content">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subTitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default Opening;
