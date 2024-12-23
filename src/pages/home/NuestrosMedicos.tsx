import { useEffect, useState } from "react";
import { fetchMedicos } from "../../services/apiService";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { Table } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import BackLink from "../../Components/buttons/BackLink/BackLink";


function NuestrosMedicos() {
  const [listaMedicos, setListaMedicos] = useState<IMedicoResponse[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IMedicoResponse[] = await fetchMedicos();
        setListaMedicos(response);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
      }
    };

    fetchData();
  }, []);
  //filtra los medicos para tener la info encesaria
  var listaMedicosFiltered = listaMedicos.map((elem) => {
    var obj = {
      nombre: elem.nombre + " " + elem.apellido,
      especialidad: elem.especialidad,
    };
    return obj;
  });
  //listaMedicosFiltered.forEach(elm => console.log(elm))

  return (
    <>
         <Opening title="Nuestros Medicos" smallOpening={false} />
      <Table
        striped
        bordered
        hover
        className="container mt-5 overflow-hidden"
        style={{ maxWidth: "700px"}}
      >
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody >
          {listaMedicos.map((item, index) => (
            <tr className="text-center " key={index} >
              <td      
              >{item.apellido + " " + item.nombre }</td>
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
