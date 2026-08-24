import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF, FaSun } from 'react-icons/fa';
import profileImg from '../assets/profile.png';
import styles from './inicio.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Inicio = () => {
  const [openSection, setOpenSection] = useState('exp');
  
  const textBlocksRef = useRef([]);
  textBlocksRef.current = [];

  const addToTextRefs = (el) => {
    if (el && !textBlocksRef.current.includes(el)) {
      textBlocksRef.current.push(el);
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderScrollText = (text, customClass = '') => {
    const words = text.split(' ');
    return (
      <span className={`${styles.revealBlock} ${customClass}`} ref={addToTextRefs}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className={styles.wordWrapper}>
            {word.split('').map((char, cIdx) => (
              <span key={cIdx} className={styles.scrollChar}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    );
  };

  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    textBlocksRef.current.forEach((block) => {
      if (!block) return;
      const chars = block.querySelectorAll(`.${styles.scrollChar}`);

      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0.15, color: '#475569' },
          {
            opacity: 1,
            color: 'var(--text-color)',
            stagger: 0.03,
            ease: 'none',
            scrollTrigger: {
              trigger: block,
              start: 'top 95%', 
              end: 'bottom 80%', 
              scrub: 0.5,
            },
          }
        );
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [openSection]);

  return (
    <div className={styles.pageWrapper}>
      
   

      {/* Hero Section */}
      <section className={styles.heroLayout}>
        
        {/* Nome no Topo Esquerdo */}
        <div className={styles.nameBox}>
          <span className={styles.greetingText}>Olá, eu sou</span>
          <h1 className={styles.mainName}>João<br/>Pedro Rocha</h1>
        </div>

        {/* Redes Sociais no Centro-Esquerdo (Abaixo do Nome) */}
        <div className={styles.socialSidebar}>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
        </div>

        {/* Imagem Gigante e Deslocada para a Esquerda + Textos de Fundo */}
        <div className={styles.imageContainer}>
          <img src={profileImg} alt="João Pedro Rocha" className={styles.heroProfilePic} />
          
          <div className={styles.floatingRole}>
            <span className={styles.roleSmall}>Desenvolvedor</span>
            <span className={styles.roleMedium}>Web Desing</span>
          </div>
        </div>
      </section>

      {/* Sessão de Scroll e Accordions */}
      <section className={`container ${styles.scrollContentSection}`}>
        <div className={`mx-auto ${styles.quoteContainer}`}>
          <div className="mb-4">
            {renderScrollText(
              'Acredito que a tecnologia só faz sentido quando serve para diminuir distâncias entre o problema e a solução humana. Meu foco foi construir arquiteturas que não apenas funcionem, mas que facilitem a vida de quem as opera.',
              styles.quoteText
            )}
          </div>
          <div>
            {renderScrollText(
              'Em constante evolução na Arquitetura de Sistemas, buscando o equilíbrio entre código limpo e regras de negócio eficientes.',
              styles.subQuoteText
            )}
          </div>
        </div>

        <div className="mt-5 mb-5 text-center">
          <h2 className={styles.sectionHeadline}>
            {renderScrollText('Não acreditamos em soluções genéricas. Cada projeto é único.')}
          </h2>
        </div>

        <div className={styles.accordionsWrapper}>
          <div className={styles.accordionCard}>
            <button className={styles.accordionHeader} onClick={() => toggleSection('exp')}>
              <span>EXPERIÊNCIA PROFISSIONAL</span>
              <span className={`${styles.chevron} ${openSection === 'exp' ? styles.open : ''}`}>▲</span>
            </button>
            {openSection === 'exp' && (
              <div className={styles.accordionBody}>
                <div className={styles.itemBlock}>
                  <h3 className={styles.itemTitle}><span className={styles.dot}>●</span> Site - Instituição Missionária</h3>
                  <p className={styles.itemDesc}>
                    {renderScrollText('Desenvolvimento de plataforma digital para transição de presença social (Instagram) para ecossistema web próprio. O objetivo central foi a profissionalização da divulgação missionária, pavimentando o caminho para a implementação de um e-commerce em 2027.')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.accordionCard}>
            <button className={styles.accordionHeader} onClick={() => toggleSection('hab')}>
              <span>HABILIDADES</span>
              <span className={`${styles.chevron} ${openSection === 'hab' ? styles.open : ''}`}>▲</span>
            </button>
            {openSection === 'hab' && (
              <div className={styles.accordionBody}>
                <div className="row g-4 pt-3">
                  <div className="col-md-5">
                    <h4 className={styles.subCategoryTitle}>Soft Skills</h4>
                    <ul className={styles.skillsList}>
                      <li><span className={styles.checkIcon}>✓</span> Capacidade em trabalhar em equipe</li>
                      <li><span className={styles.checkIcon}>✓</span> Comunicativo</li>
                      <li><span className={styles.checkIcon}>✓</span> Escuta ativa</li>
                      <li><span className={styles.checkIcon}>✓</span> Tomada de decisão</li>
                      <li><span className={styles.checkIcon}>✓</span> Adaptação</li>
                    </ul>
                  </div>
                  <div className="col-md-7">
                    <h4 className={styles.subCategoryTitle}>Hard Skills</h4>
                    <div className="mb-3">
                      <h5 className={styles.skillGroupTitle}>Linguagens & Tecnologias:</h5>
                      <p className={styles.skillText}>{renderScrollText('HTML, CSS, JavaScript, React, Bootstrap')}</p>
                    </div>
                    <div>
                      <h5 className={styles.skillGroupTitle}>Competências Adicionais:</h5>
                      <ul className={styles.bulletList}>
                        <li>{renderScrollText('Prototipagem de Interfaces (Nível Intermediário)')}</li>
                        <li>{renderScrollText('Engenharia de Prompts & Ferramentas de IA (Intermediário)')}</li>
                        <li>{renderScrollText('Arquitetura Clean Code & Organização de Diretórios Escalonáveis (Nível Intermediário)')}</li>
                        <li>{renderScrollText('Bancos de Dados: MySQL Workbench (Fundamentos)')}</li>
                        <li>{renderScrollText('Regras de Negócio & Lógica de Sistemas (Nível Intermediário)')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.accordionCard}>
            <button className={styles.accordionHeader} onClick={() => toggleSection('form')}>
              <span>FORMAÇÃO ACADÊMICA & TÉCNICA</span>
              <span className={`${styles.chevron} ${openSection === 'form' ? styles.open : ''}`}>▲</span>
            </button>
            {openSection === 'form' && (
              <div className={styles.accordionBody}>
                <div className="d-flex flex-column gap-3 pt-3">
                  <div className={styles.educationCard}>
                    <div><h4 className={styles.eduTitle}>Engenharia de Software (Bacharelado)</h4><p className={styles.eduSub}>Unifatecie - EAD</p></div>
                    <span className={styles.badgeTag}>2026 - 2030 (Em formação)</span>
                  </div>
                  <div className={styles.educationCard}>
                    <div><h4 className={styles.eduTitle}>Análise e Desenvolvimento de Sistemas (SENAI)</h4><p className={styles.eduSub}>Formação - Curso Técnico</p></div>
                    <span className={styles.badgeTag}>2025 - 2026 (Em formação)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;