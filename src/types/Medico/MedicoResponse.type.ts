import { IPersonaResponse } from "../Persona/PersonaResponse.type"

interface  IMedicoResponse extends IPersonaResponse{
  numeroLicencia: string
  especialidad :string
}
