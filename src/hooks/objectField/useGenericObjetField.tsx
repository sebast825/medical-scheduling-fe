import { useState } from "react";
import { IGenericObject } from "../../types/IGenericObject.type";

export interface IObjectField {
  key: string;
  label: string;
  value: string;
  //permite modificar formatos
}

function useGenericObjectFielf(initialFields?: IGenericObject[], data?: any) {
  const [modalFields, setModalFields] = useState<IGenericObject[]>();

  // useEffect(() => {
  //   updateModalFields();
  // }, [data]);

  function updateModalFields(
    modalFields: IGenericObject[],
    data: any
  ): IGenericObject[] {
    const updateFields = modalFields.map((modal) => {
      const value = data[modal.key];
      // Actualizamos solo si el valor existe y es una cadena
      if (typeof value === "string") {
        var formatedValue = value;
        //si hay una funcion formate su valor
        if (modal.formatValue && typeof modal.formatValue == "function") {
          formatedValue = modal.formatValue(value);
        }
        return { ...modal, value: formatedValue };
      }
      return modal;
    });

    if (updateFields == undefined) {
      setModalFields(updateFields);
    }
    return updateFields;
  }

  //al actualizar informacion con un modal, permite mantener la estructura anterior
  //por ejemplo en caso de actualizar persona estando un paciente, la info de paciente no desaparece
  //target es el objeto a modificar
  //source de donde toma los valores nuevos
  function updatObjectFields(
    target: { [key: string]: any },
    source: { [key: string]: any }
  ): any {
    const keysSource = Object.keys(source);
    const keysTarget = Object.keys(target);
    //hay que crear un nuevo elemento porque si no react cree que es una mutacion directa y no actualiza los datos con un useffect
    const updatedTarget = {...target};

    keysSource.forEach((key) => {
      if (keysTarget.includes(key)) {
        updatedTarget[key] = source[key];
      }
    });
    return updatedTarget;
  }
  return { modalFields, updateModalFields, updatObjectFields };
}

export default useGenericObjectFielf;
