import { useEffect, useState } from "react";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { Table } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import useMedicosCacheQuery from "../../hooks/medicos/useMedicosCacheQuery";
import { Spinner } from "../../Components/statics/Spinner";

function NuestrosMedicos() {
  const [listaMedicos, setListaMedicos] = useState<IMedicoResponse[]>([]);

  const {medicos,isLoading}= useMedicosCacheQuery();

  useEffect(() => {
    if (medicos != undefined) 
      setListaMedicos(medicos)
    
  }, [medicos]);



  if(isLoading) return <Spinner/>
  return (
    <div className="pb-5">
    
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
          {listaMedicos && listaMedicos.map((item, index) => (
            <tr className="text-center " key={index}>
              <td>{item.apellido + " " + item.nombre}</td>
              <td>{item.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BackLink  />
    </div>
  );
}

export default NuestrosMedicos;
