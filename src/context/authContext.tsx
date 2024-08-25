import React, { useState, useContext, ReactNode } from "react";
import { IPacienteResponse } from "../types/Paciente/PacienteResponse.type";
import { IMedicoResponse } from "../types/MedicoResponse.type";
import { IPersonaResponse } from "../types/Persona/PersonaResponse.type";

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
    React.SetStateAction<IPacienteResponse | null>
  >;
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

export function usePersonaInfoContext() {
  const context = useUserContext();
  return {
    personaInfo: context.personaInfo,
    setPersonaInfo: context.setPersonaInfo,
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
  const [pacienteInfo, setPacienteInfo] = useState<IPacienteResponse | null>(
    null
  );
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
