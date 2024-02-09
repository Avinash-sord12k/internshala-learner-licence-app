"use client"
import { Provider } from "react-redux";
import { ReactNode } from "react";
import store from "@/store/index";
import { AlertProvider } from "@/components/extras/Alert";

const AppProvider = ({ children }: {
  children: ReactNode
}) => {
  return (
    <Provider store={store}>
      <AlertProvider>
        {children}
      </AlertProvider>
    </Provider>
  );
};

export default AppProvider;