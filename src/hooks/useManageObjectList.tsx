import { useState, useEffect } from "react";
import { IGenericObject } from "../utils/objectsField";

function useManageObjectList(initialValues: IGenericObject[]) {
  const [inputValues, setinputValues] =
    useState<IGenericObject[]>(initialValues);

//   useEffect(() => {
//     inputValues.forEach((elem) => {
//       console.log(elem);
//     });
//   }, [inputValues]);

  // {...inputValues,[key]:value}
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
