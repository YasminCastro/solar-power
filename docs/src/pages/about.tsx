import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AboutProject from "../components/AboutProject";

export default function Project(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Sobre`} description="Sobre o projeto Solar power">
      <main>
        <AboutProject />
      </main>
    </Layout>
  );
}
