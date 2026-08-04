import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './portfolio.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Aqui eu percorro os cards para disparar a animação sequencial no scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      }
    });
  }, []);

  const projetos = [
    { id: 1, title: 'Currículo Interativo', desc: 'Projeto SPA desenvolvido com React e animações GSAP.' },
    { id: 2, title: 'Painel de Controle', desc: 'Interface administrativa customizada com Bootstrap e SCSS.' },
    { id: 3, title: 'Landing Page Neon', desc: 'Página moderna focada em performance e alta conversão.' },
  ];

  return (
    <section className="container py-5 min-vh-100 d-flex flex-column justify-content-center">
      <h2 className={`mb-5 ${styles.title}`}>Projetos</h2>
      <div className="row g-4">
        {projetos.map((proj, idx) => (
          <div className="col-md-4" key={proj.id}>
            <div
              ref={(el) => (cardsRef.current[idx] = el)}
              className={styles.projectCard}
            >
              <div>
                <h3 className={styles.cardTitle}>{proj.title}</h3>
                <p className={styles.cardText}>{proj.desc}</p>
              </div>
              <button className={`btn ${styles.cardBtn}`}>Ver Mais</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;