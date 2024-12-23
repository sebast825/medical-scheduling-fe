import { useEffect, useState } from "react";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { Table } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import useMedicos from "../../hooks/medicos/useMedicos";

function NuestrosMedicos() {
  const [listaMedicos, setListaMedicos] = useState<IMedicoResponse[]>([]);
  const { getMedicos, medicos } = useMedicos();


  useEffect(() => {
    if (medicos == undefined) {
      getMedicos();

    }else{
      setListaMedicos(medicos)
    }
  }, [medicos]);



  useEffect(()=>{},[listaMedicos])


  return (
    <>
    
      <Opening title="Nuestros Medicos" smallOpening={false} />
      <Table
        striped
        bordered
        hover
        className="container mt-5 overflow-hidden"
        style={{ maxWidth: "700px" }}
      >
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {listaMedicos.map((item, index) => (
            <tr className="text-center " key={index}>
              <td>{item.apellido + " " + item.nombre}</td>
              <td>{item.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BackLink variant="primary" />
    </>
  );
}

export default NuestrosMedicos;
