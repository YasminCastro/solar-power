import React from "react";
import styles from "./styles.module.css";

export default function AboutProject(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div>
          <h2>Projeto</h2>
        </div>

        <div>
          <h2>Objetivo</h2>
        </div>

        <div>
          <h2>Equipe</h2>
        </div>
      </div>
    </section>
  );
}
