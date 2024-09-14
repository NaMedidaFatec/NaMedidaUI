import { Metadata } from "next";
import Layout from "../components/layout";
import { TitlesProvider } from "../context/titles";
import { AuthProvider } from "../hooks/useAuth";

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
