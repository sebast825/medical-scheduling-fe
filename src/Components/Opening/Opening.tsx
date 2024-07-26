import React from 'react';
import './Opening.scss'; // Importa el archivo CSS para los estilos

function Opening() {
  return (
    <div className="opening-container"style={{ backgroundImage: `url(/images/hospital.jpg)` }}>
      <div className="overlay">
        <div className="text-content">
          <h1 className="title">Título Principal</h1>
          <h2 className="subtitle">Subtítulo</h2>
        </div>
      </div>
    </div>
  );
};

export default Opening;
