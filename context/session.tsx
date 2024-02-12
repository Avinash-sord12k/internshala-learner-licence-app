'use client';
import GET_SESSION from "@/gql/auth/session";
import { useLazyQuery, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

interface SessionUserType {
  id: string;
  email: string;
  fname: string;
  lname: string;
  role: string;
  createdAt: string;
}

interface SessionType {
  sessionUser: SessionUserType | null;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUserType | null>>;
  refetch?: () => void;
}

const SessionContext = createContext<SessionType>({
  sessionUser: null,
  setSessionUser: () => null,
})

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionUser, setSessionUser] = useState<SessionUserType | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_SESSION);
  // console.log("🚀 ~ SessionProvider ~ data:", data)

  useEffect(() => {
    if (data) {
      setSessionUser(data.getUserSession);
    }
  }, [data]);

  return (
    <SessionContext.Provider value={{ sessionUser, setSessionUser, refetch }}>
      {children}
    </SessionContext.Provider>
  )
}

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export {
  SessionProvider,
  useSession,
}