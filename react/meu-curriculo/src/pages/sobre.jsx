import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './sobre.module.scss';

// Aqui eu registro o plugin de animação por rolagem
gsap.registerPlugin(ScrollTrigger);

const Sobre = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Aqui eu configuro a animação do card para revelar suavemente no scroll
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="container py-5 min-vh-100 d-flex align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-9">
          <div ref={cardRef} className={styles.aboutCard}>
            <h2 className={styles.title}>Sobre Mim</h2>
            <p className={styles.text}>
              Foco em construir experiências digitais limpas e responsivas. Combino a robustez do React com a modularidade do SCSS e a fluidez visual do GSAP.
            </p>
            <div className="mt-4">
              <h4 className={styles.subTitle}>Minhas Tecnologias</h4>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <span className={styles.badge}>React</span>
                <span className={styles.badge}>JavaScript (ES6+)</span>
                <span className={styles.badge}>SCSS / SASS</span>
                <span className={styles.badge}>Bootstrap 5</span>
                <span className={styles.badge}>GSAP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;