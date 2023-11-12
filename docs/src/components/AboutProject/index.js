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
              O Solar Power é um projeto que está sendo desenvolvido por dois
              estudantes de Sistemas de informação,{" "}
              <a
                href="https://www.linkedin.com/in/yasmin-castro-b579451b8/"
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
              , como parte do seu TCC. A escolha desse tema foi feita porque a
              energia solar é uma tecnologia que está em grande ascensão e
              oferece uma solução sustentável para nossos problemas de geração
              de energia. A ideia do Solar Power, é que seja criado um
              aplicativo móvel que conecta os inversores de energia solar à
              nuvem, permitindo que os usuários monitorem sua produção de
              energia e economizem dinheiro em suas contas de luz.
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
              O aplicativo irá incluir recursos inovadores, como gráficos de
              projeção de energia futura com base na previsão do tempo e
              notificações para limpeza de painéis solares, tornando a energia
              solar ainda mais acessível e fácil de usar. Além disso, o
              aplicativo é desenvolvido com as melhores práticas de engenharia
              de software, garantindo sua eficiência e confiabilidade. O Solar
              Power é mais do que apenas um aplicativo, é uma solução completa
              para aqueles que querem economizar dinheiro e ajudar o planeta ao
              mesmo tempo.
            </p>
          </div>

          {isMobile && (
            <img
              src={require("@site/static/img/about/bio-energy.png").default}
            />
          )}
        </div>

        <div className={styles.modulo}>
          <div>
            <h2>Equipe</h2>
            <br />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
              iste cum incidunt maiores quam? Eum, omnis aliquid nam, incidunt,
              ullam consectetur sint voluptatibus voluptatem enim minus quasi
              veritatis et eveniet.
            </p>
          </div>
          <img
            src={require("@site/static/img/about/save-the-planet.png").default}
          />
        </div>
      </div>
    </section>
  );
}
