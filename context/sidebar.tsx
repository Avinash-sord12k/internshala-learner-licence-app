'use client';
import { createContext, useContext, useState } from "react";


type sidebarContextType = {
  isCollapsed: boolean;
  showText: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setShowText: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<sidebarContextType>({
  isCollapsed: true,
  showText: false,
  setIsCollapsed: () => null,
  setShowText: () => null,
});

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showText, setShowText] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{
      isCollapsed, setIsCollapsed,
      showText, setShowText
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar: () => sidebarContextType = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}


export default SidebarProvider;