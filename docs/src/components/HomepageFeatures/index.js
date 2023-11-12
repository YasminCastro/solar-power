import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Yasmin",
    img: require("@site/static/img/book.png").default,
    description: (
      <>
        <a
          href="https://www.linkedin.com/in/yasmin-castro-b579451b8/"
          target="_blank"
        >
          Linkedin
        </a>
        <br />
        <a href="https://github.com/YasminCastro" target="_blank">
          Github
        </a>
        <br />
        <a href="mailto: yasminsdcastro@gmail.com" target="_blank">
          yasminsdcastro@gmail.com
        </a>
      </>
    ),
  },
  {
    title: "IFG",
    img: require("@site/static/img/light-bulb.png").default,
    description: (
      <>
        <a href="https://www.ifg.edu.br/">https://www.ifg.edu.br/</a>
      </>
    ),
  },
  {
    title: "Gabriel",
    img: require("@site/static/img/brainstorm.png").default,
    description: (
      <>
        <a href="https://www.linkedin.com/in/gabrielmarqso/" target="_blank">
          Linkedin
        </a>
        <br />
        <a href="https://github.com/gabrielmarqso" target="_blank">
          Github
        </a>
        <br />
        <a href="mailto: gabrielmarquesmtv123@gmail.com" target="_blank">
          gabrielmarquesmtv123@gmail.com
        </a>
      </>
    ),
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={img} className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
