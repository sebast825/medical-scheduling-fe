import { useState } from "react";
import { updateSourceFile } from "typescript";

function useConfirmBtnAviability() {
  const [btnStatus, setBtnStatus] = useState<boolean>(false);

  function changeStatusBtn() {
    setBtnStatus(true); // Cambiar a `true` temporalmente
    setTimeout(() => {
      setBtnStatus(false); // Volver a `false`
    }, 0);
  }

  async function handleFunctionnAndButton(fn: () => void): Promise<void> {
    await fn();
    changeStatusBtn();
  }

  return { btnStatus, handleFunctionnAndButton };
}

export default useConfirmBtnAviability;
