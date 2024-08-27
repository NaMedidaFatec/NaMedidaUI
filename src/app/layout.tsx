import { Metadata } from "next";
import Layout from "../components/layout";
import { TitlesProvider } from "../context/titles";
import { AuthProvider } from "../hooks/useAuth";

export const metadata: Metadata = {
  title: {
    template: '%s | Na Medida',
    default: 'Na Medida',
  },
  description: 'Descrição geral da aplicação',
}
  
function Application({ children }) {
  
  return (
    <AuthProvider>
      <TitlesProvider>
        <Layout>{children}</Layout>
      </TitlesProvider>
    </AuthProvider>
  );
}

export default Application;
