import React, { useState, useContext, ReactNode } from "react";
import IPacienteResponse  from "../types/Paciente/PacienteResponse.type";
import { IMedicoResponse } from "../types/Medico/MedicoResponse.type";
import { IPersonaResponse } from "../types/Persona/PersonaResponse.type";
import { CreateUsuarioRequest } from "../types/usuario/CreateUsuarioRequest";

type User = string | null;
type PersonaInfo = any | IPersonaResponse; // Reemplaza 'any' con el tipo correcto para personaInfo
type MedicosList = any; // Reemplaza 'any' con el tipo correcto para medicosList

interface UserContextType {
  user: string | null;
  cambiaLogin: (jwt: string | null) => void;
  personaInfo: PersonaInfo;
  setPersonaInfo: React.Dispatch<React.SetStateAction<IPersonaResponse>>;
  medicosList: MedicosList;
  setMedicosList: React.Dispatch<React.SetStateAction<IMedicoResponse[]>>;
  pacienteInfo: IPacienteResponse | null;
  setPacienteInfo: React.Dispatch<
    React.SetStateAction<IPacienteResponse | null>>;
    medicoInfo: IMedicoResponse | null;
    setMedicoInfo :  React.Dispatch<
    React.SetStateAction<IMedicoResponse | null>>;
    administrativoInfo : PersonaInfo;
    setAdministrativoInfo: React.Dispatch<React.SetStateAction<IPersonaResponse>>;
    createUserInfo : CreateUsuarioRequest | null;
    setCreateUserInfo: React.Dispatch<React.SetStateAction<CreateUsuarioRequest | null>>;
    
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export function useUserInfo() {
  const context = useUserContext();
  return context.user;
}
export function useUserToggleContext() {

  const context = useUserContext();
  return context.cambiaLogin;
}
export function useCreateUserInfoContext() {
  const context = useUserContext();
  return {
    createUserInfo: context.createUserInfo,
    setCreateUserInfo: context.setCreateUserInfo,
  };
}
export function useAdministrativoInfoContext() {
  const context = useUserContext();
  return {
    administrativoInfo: context.administrativoInfo,
    setAdministrativoInfo: context.setAdministrativoInfo,
  };
}
export function usePersonaInfoContext() {
  const context = useUserContext();
  return {
    personaInfo: context.personaInfo,
    setPersonaInfo: context.setPersonaInfo,
  };
}
export function useMedicoInfoContext() {
  const context = useUserContext();
  return {
    medicoInfo: context.medicoInfo,
    setMedicoInfo: context.setMedicoInfo,
  };
}
export function useMedicosContext() {
  const context = useUserContext();
  return {
    medicosList: context.medicosList,
    setMedicosList: context.setMedicosList,
  };
}
export function usePacienteContext() {
  const context = useUserContext();
  return {
    pacienteInfo: context.pacienteInfo,
    setPacienteInfo: context.setPacienteInfo,
  };
}
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [personaInfo, setPersonaInfo] = useState<PersonaInfo>("");
  const [medicosList, setMedicosList] = useState<MedicosList>("");
  const [medicoInfo, setMedicoInfo] = useState<IMedicoResponse | null>(null);
  const [pacienteInfo, setPacienteInfo] = useState<IPacienteResponse | null>(
    null
  );
  const [administrativoInfo, setAdministrativoInfo] = useState<PersonaInfo>("");
  const [createUserInfo, setCreateUserInfo] = useState<CreateUsuarioRequest | null>(null);
  
  const cambiaLogin = (jwt: string | null) => {
    if (user) {
      setUser(null);
    } else {
      setUser(jwt);
    }
  };

  const value: UserContextType = {
    user,
    cambiaLogin,
    personaInfo,
    setPersonaInfo,
    medicosList,
    setMedicosList,
    pacienteInfo,
    setPacienteInfo,
    medicoInfo,
    setMedicoInfo,
    administrativoInfo,
    setAdministrativoInfo,
    createUserInfo,
    setCreateUserInfo
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
