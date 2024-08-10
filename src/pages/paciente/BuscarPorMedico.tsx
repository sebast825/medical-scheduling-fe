import { useEffect, useState } from "react";
import { useUserContext } from "../../context/authContext";
import { fetchMedicos } from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import List from "../../Components/List/List";

function BuscarPorMedico() {
  const user = useUserContext();
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [error, setError] = useState<ErrorTypeAny>(null);

  const getMedicos = async () => {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();

      setMedicos(response);
    } catch (err: any) {
      console.log(err);

      setError("Error desconocido");
    }
  };
  useEffect(() => {
    getMedicos();
  }, []);

  function hayMedicos(e: number) {
    console.log(e);
  }
  const filterMedicos =
    medicos?.map((medico) => {
      return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
    }) || [];
  return (
    <div>
      <h2>Buscar Medico</h2>
      <List listItems={filterMedicos} handleSelect={hayMedicos} />
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default BuscarPorMedico;
