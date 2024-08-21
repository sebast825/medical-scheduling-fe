import { useState } from "react";
import { IGenericObject } from "../../types/IGenericObject.type";

export interface IObjectField {
  key: string;
  label: string;
  value: string;
  //permite modificar formatos
}

function useGenericObjectFielf(
  initialFields?: IGenericObject[],
  data?: any
) {
  const [modalFields, setModalFields] =
    useState<IGenericObject[]>();

  // useEffect(() => {
  //   updateModalFields();
  // }, [data]);

  function updateModalFields(modalFields :  IGenericObject[],data : any) : IGenericObject[]{

    const updateFields = modalFields.map((modal) => {
      const value = data[modal.key];
      // Actualizamos solo si el valor existe y es una cadena
      if (typeof value === "string") {
          var formatedValue = value;
          //si hay una funcion formate su valor
          if(modal.formatValue && typeof modal.formatValue == "function" ){
            formatedValue = modal.formatValue(value);
          }
        return { ...modal, value : formatedValue };
      }
      return modal;
    });

    console.log(updateFields);

    if (updateFields == undefined) {
      setModalFields(updateFields);
    }
    return updateFields;
  }
  return {modalFields,updateModalFields};
}

export default useGenericObjectFielf;
