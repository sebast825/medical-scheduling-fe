import { useEffect, useState } from "react";
import { IGenericObject } from "../../utils/objectsField";

export interface IObjectField {
  key: string;
  label: string;
  value: string;
  //permite modificar formatos
}

function useGenericObjectFielf<T extends IObjectField>(
  initialFields: IGenericObject[],
  data: any
) {
  const [modalFields, setModalFields] =
    useState<IGenericObject[]>(initialFields);

  useEffect(() => {
    updateModalFields();
  }, [data]);

  function updateModalFields() {
    // Accediendo a las claves y valores
    console.log(data);
    const entries = Object.entries(data); // ["title", "nombre", "apellido", ...]
    console.log(entries);

    const updateFields = modalFields.map((modal) => {
      const findEntri = entries.find(([key, value]) => modal.key == key);
      if (findEntri == undefined || typeof findEntri[1] != "string") return;

      modal.value = findEntri[1];
      return modal;
    });
    console.log(updateFields);
    if (updateFields == undefined) {
      setModalFields(updateFields);
    }
  
  }
  return modalFields;
}

export default useGenericObjectFielf;
