import { useState } from "react";
import { IGenericObject } from "../types/IGenericObject.type";

function useManageObjectList(initialValues: IGenericObject[]) {
  const [inputValues, setinputValues] =
    useState<IGenericObject[]>(initialValues);

  function handleChange(key: string, value: string) {
    setinputValues((prevValues) =>
      prevValues.map((elem) => {
        if (elem.key === key) {
          return { ...elem, value: value };
        }
        return elem;
      })
    );
  }
  function getValue  (key : string) : string{
   var value = inputValues.find(elem => elem.key === key)?.value || "";   
   return value;
}
  return {
    inputValues,
    handleChange,
    getValue
  };
}

export default useManageObjectList;
