import React from "react";
import Layout from "@theme/Layout";
import AboutProject from "../components/AboutProject";

export default function Project() {
  return (
    <Layout title={`Sobre`} description="Sobre o projeto Solar power">
      <main>
        <AboutProject />
      </main>
    </Layout>
  );
}
