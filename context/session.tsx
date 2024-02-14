'use client';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSession } from "./actions/getSession";

interface SessionUserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

interface SessionType {
  sessionUser: SessionUserType | null;
  refetch?: () => void;
  loading?: boolean;
}

const SessionContext = createContext<SessionType>({
  sessionUser: null,
  refetch: () => { }
})

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionUser, setSessionUser] = useState<SessionUserType | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    setLoading(true);
    await getSession().then((res: any) => {
      setSessionUser(res);
    }).catch((error) => {
      console.log('error', error);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    setLoading(true);
    getSession().then((res: any) => {
      console.log('res', res);
      setSessionUser(res);
      setLoading(false);
    }).catch((error) => {
      console.log('error', error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const contextValue = useMemo(() => ({ sessionUser, refetch, loading }), [sessionUser, refetch, loading]);

  return (
    <SessionContext.Provider value={contextValue}>
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