import React from "react";
import styles from "./styles.module.css";
import { useMediaQuery } from "react-responsive";

export default function AboutProject() {
  const isMobile = useMediaQuery({ query: "(max-width: 520px)" });
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.modulo}>
          <div>
            <h2>Projeto</h2>
            <br />
            <p>
              {" "}
              O Solar Power foi um projeto desenvolvido por{" "}
              <a
                href="https://www.linkedin.com/in/yasmin-sdcastro/"
                target="_blank"
              >
                Yasmin
              </a>{" "}
              e{" "}
              <a
                href="https://www.linkedin.com/in/gabrielmarqso/"
                target="_blank"
              >
                Gabriel
              </a>
              , como parte do seu Trabalho de Conclusão de Curso (TCC) em
              Sistemas de Informação no Instituto Federal de Goiás (IFG). A
              motivação para escolha desse tema foi abordar um desafio na área
              de energia renovável, especificamente na geração e monitoramento
              de energia solar. A equipe identificou a necessidade de um sistema
              de monitoramento mais intuitivo e acessível para usuários não
              especializados, uma vez que muitos sistemas existentes eram
              complexos e pouco amigáveis. O projeto do SolarPower surgiu como
              uma solução prática, visando desenvolver um aplicativo móvel que
              simplificasse o monitoramento da geração de energia solar e
              incentivasse práticas sustentáveis, combinando facilidade de uso
              com uma interface intuitiva e elementos lúdicos.
            </p>
          </div>
          <img
            src={require("@site/static/img/about/solar-panel.png").default}
          />
        </div>

        <div className={styles.modulo}>
          {!isMobile && (
            <img
              src={require("@site/static/img/about/bio-energy.png").default}
            />
          )}

          <div>
            <h2>Aplicativo</h2>
            <br />
            <p>
              O aplicativo permite monitoramento eficiente de sistemas
              fotovoltaicos. Com ele, os usuários podem visualizar dados de
              geração de energia solar em tempo real, incluindo informações
              detalhadas diárias, mensais e anuais. O aplicativo foi construído
              utilizando tecnologias como Node.js, React Native, Tailwind e
              MongoDB, garantindo uma experiência de usuário suave e confiável.
              Ideal para quem busca uma solução simples e eficaz para acompanhar
              a performance de sistemas de energia solar, o SolarPower torna o
              gerenciamento de energia solar mais acessível e informativo.
            </p>
          </div>

          {isMobile && (
            <img
              src={require("@site/static/img/about/bio-energy.png").default}
            />
          )}
        </div>
      </div>
    </section>
  );
}
