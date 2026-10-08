import React, { useState, useEffect, useRef } from "react";
import "./contenido.css";

/* ============================================================================
   ZONA EDITABLE  ·  AQUÍ SE AGREGAN / CAMBIAN LOS CONTENIDOS DEL PORTAFOLIO
   ----------------------------------------------------------------------------
   Para agregar un PROYECTO NUEVO:
     1. Copia un bloque completo  { ... },  de la lista PROYECTOS de abajo.
     2. Pégalo justo antes del corchete de cierre  ];
     3. Cambia los textos. No olvides la coma al final de cada bloque.

   Campos de cada proyecto:
     id          -> número ÚNICO (no repetir). El siguiente a 2 es 3, etc.
     tag         -> etiqueta pequeña de la tarjeta. Ej: "Proyecto 03"
     titulo      -> nombre del proyecto
     descripcion -> 1 o 2 frases explicando qué hace
     tech        -> lista de tecnologías usadas, entre comillas y separadas
                    por coma. Ej: ["Arduino", "C++", "KiCad"]
     color       -> color de acento de la tarjeta (código hexadecimal)
     enlace      -> (OPCIONAL) link a GitHub, video, informe, etc.
                    Si no quieres botón, borra esa línea completa.

   Para BORRAR un proyecto: elimina su bloque completo { ... },
   ========================================================================== */

const PROYECTOS = [
  {
    id: 1,
    tag: "Proyecto 01",
    titulo: "Robot evasor de obstáculos",
    descripcion: "Autónomo con sensor ultrasónico y microcontrolador.",
    tech: ["Arduino", "C++", "Ultrasonido"],
    color: "#dd8448",
    // enlace: "https://github.com/usuario/robot-evasor",
  },
  {
    id: 2,
    tag: "Proyecto 02",
    titulo: "Sistema de riego solar",
    descripcion: "Integración de panel solar y control remoto vía RF.",
    tech: ["ESP32", "Python", "Solar"],
    color: "#1e90ff",
    // enlace: "https://github.com/usuario/riego-solar",
  },

  /* ----- PLANTILLA PARA COPIAR (quita los // de cada línea para usarla) -----
  {
    id: 3,
    tag: "Proyecto 03",
    titulo: "Nombre del proyecto",
    descripcion: "Qué hace el proyecto en una o dos frases.",
    tech: ["Tecnología 1", "Tecnología 2"],
    color: "#00d4aa",
    enlace: "https://...",
  },
  ------------------------------------------------------------------------- */
];

/* Colores sugeridos para el campo "color":
   naranja #dd8448 · azul #1e90ff · verde agua #00d4aa
   morado #a855f7 · celeste #0ea5e9 · amarillo #f5c542            */

/* ----------------------------------------------------------------------------
   TECNOLOGÍAS / HERRAMIENTAS
   Para agregar una herramienta a una categoría existente: añade su nombre
   (entre comillas) dentro de la lista "items" de esa categoría.
   Para crear una categoría nueva: copia un bloque completo { ... }, pégalo
   al final de la lista y cambia categoria, icono, color e items.
   ---------------------------------------------------------------------------- */
const SKILLS = [
  {
    categoria: "Lenguajes",
    icono: "💻",
    color: "#1e8fff",
    items: ["VHDL", "Python", "C#", "MATLAB", "C++"],
  },
  {
    categoria: "Modelado 3D",
    icono: "📐",
    color: "#00d4aa",
    items: ["FreeCAD", "Tinkercad", "Fusion 360"],
  },
  {
    categoria: "Diseño de PCB",
    icono: "🔌",
    color: "#dd8448",
    items: ["Altium Designer", "KiCad"],
  },
  {
    categoria: "Simulación",
    icono: "⚡",
    color: "#a855f7",
    items: ["Proteus", "Multisim"],
  },
  {
    categoria: "Ofimática",
    icono: "📊",
    color: "#0ea5e9",
    items: ["Word", "Excel", "PowerPoint", "Access", "Teams"],
  },
];

/* ----------------------------------------------------------------------------
   SERVICIOS
   Para agregar uno nuevo: copia un bloque { ... } y cambia emoji, titulo y desc.
   ---------------------------------------------------------------------------- */
const SERVICIOS = [
  {
    emoji: "🔬",
    titulo: "Simulación de circuitos",
    desc: "Análisis de señales, verificación funcional y validación previa a fabricación.",
  },
  {
    emoji: "🖥️",
    titulo: "Diseño de PCB",
    desc: "Diseños profesionales listos para producción con documentación Gerber.",
  },
  {
    emoji: "🤖",
    titulo: "Sistemas embebidos",
    desc: "Programación de microcontroladores, integración de sensores y actuadores.",
  },
  {
    emoji: "📋",
    titulo: "Documentación técnica",
    desc: "Manuales, informes y diagramas técnicos listos para entrega.",
  },
  {
    emoji: "🎓",
    titulo: "Talleres y formación",
    desc: "Asesorías académicas y desarrollo de talleres prácticos.",
  },
  {
    emoji: "⚙️",
    titulo: "Automatización y control",
    desc: "Desarrollo de proyectos de automatización industrial y domótica.",
  },
];

/* ----------------------------------------------------------------------------
   ESTADÍSTICAS de la sección "Sobre mí" (los 3 recuadros con números)
   ---------------------------------------------------------------------------- */
const STATS = [
  { num: "12+", label: "Proyectos" },
  { num: "5+", label: "Años estudiando" },
  { num: "10+", label: "Tecnologías" },
];

/* ============================================================================
   FIN DE LA ZONA EDITABLE  ·  Más abajo es código del diseño, no hace falta
   tocarlo para agregar contenido.
   ========================================================================== */

/* Tarjeta de proyecto estilo placa PCB. */
function ProjectCard({ proyecto }) {
  return (
    <article
      className="pcb-card"
      style={{ "--card-color": proyecto.color }}
    >
      {/* Agujeros de montaje en las esquinas */}
      <span className="pcb-hole pcb-hole--tl" />
      <span className="pcb-hole pcb-hole--tr" />
      <span className="pcb-hole pcb-hole--bl" />
      <span className="pcb-hole pcb-hole--br" />

      {/* LED indicador */}
      <span className="pcb-led" />

      {/* Pistas de cobre decorativas */}
      <svg
        className="pcb-traces"
        viewBox="0 0 352 130"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M0 34 H84 L104 54 H196 L212 38 H352" />
        <path d="M0 78 H52 L72 98 H170" />
        <path d="M352 82 H292 L270 104 H230" />
        <circle cx="84" cy="34" r="3.5" />
        <circle cx="196" cy="54" r="3.5" />
        <circle cx="170" cy="98" r="3.5" />
        <circle cx="230" cy="104" r="3.5" />
      </svg>

      <div className="pcb-body">
        {/* Etiqueta con forma de chip (circuito integrado) */}
        <span className="pcb-chip">{proyecto.tag}</span>

        <h3 className="pcb-title">{proyecto.titulo}</h3>

        <hr className="pcb-divider" />

        <p className="pcb-desc">{proyecto.descripcion}</p>

        <div className="pcb-tech">
          {proyecto.tech.map((t) => (
            <span key={t} className="pcb-pill">
              {t}
            </span>
          ))}
        </div>

        {proyecto.enlace && (
          <a
            className="pcb-link"
            href={proyecto.enlace}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver proyecto
          </a>
        )}
      </div>
    </article>
  );
}

function ServiceCard({ servicio }) {
  return (
    <div className="service-card">
      <span className="service-emoji">{servicio.emoji}</span>
      <h3 className="service-titulo">{servicio.titulo}</h3>
      <p className="service-desc">{servicio.desc}</p>
      <span className="service-underline" />
    </div>
  );
}

function SkillCard({ grupo }) {
  return (
    <div className="skill-card" style={{ "--skill-color": grupo.color }}>
      <div className="skill-card-topbar" />

      <div className="skill-card-header">
        <span className="skill-card-icon">{grupo.icono}</span>
        <h3 className="skill-card-cat">{grupo.categoria}</h3>
      </div>

      <div className="skill-pills">
        {grupo.items.map((item) => (
          <span key={item} className="skill-pill">
            {item}
          </span>
        ))}
      </div>

      <span className="skill-underline" />
    </div>
  );
}

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // ya apareció, no hace falta seguir observando
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${visible ? "section--visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

const Contenido = () => {
  return (
    <div className="contenido-root">
      <Section id="sobre-mi" className="section-bio">
        <div className="bio-grid">
          <div className="bio-text">
            <p className="bio-label"> SOBRE MÍ</p>
            <h2 className="bio-heading">Ingeniero </h2>
            {/* Para cambiar la descripción, edita los dos párrafos de abajo */}
            <p className="bio-body">
              Estudiante de Ingeniería Electrónica con enfoque en diseño
              electrónico, desarrollo de sistemas embebidos y soluciones
              tecnológicas basadas en hardware y software. Cuento con
              experiencia en análisis, simulación y diseño de circuitos
              electrónicos analógicos y digitales, programación de
              microcontroladores e integración de sensores y actuadores.
            </p>
            <p className="bio-body">
              Me caracterizo por ser analítico, paciente, orientado al
              aprendizaje continuo y comprometido con la creación de soluciones
              eficientes e innovadoras.
            </p>
          </div>

          <div className="bio-stats">
            {STATS.map(({ num, label }) => (
              <div key={label} className="bio-stat">
                <span className="bio-stat-num">{num}</span>
                <span className="bio-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="tecnologias" className="section-tecnologias">
        <p className="section-label"> TECNOLOGÍAS</p>
        <h2 className="section-heading">Stack & Herramientas</h2>
        <div className="skills-grid">
          {SKILLS.map((grupo) => (
            <SkillCard key={grupo.categoria} grupo={grupo} />
          ))}
        </div>
      </Section>

      <Section id="skills" className="section-services">
        <p className="section-label"> SERVICIOS DESTACADOS</p>
        <h2 className="section-heading">¿Qué puedo hacer por ti?</h2>
        <p className="section-sub">
          Soluciones adaptadas a entornos académicos o profesionales. Desde
          análisis de requerimientos hasta documentación técnica.
        </p>

        <div className="services-grid">
          {SERVICIOS.map((s) => (
            <ServiceCard key={s.titulo} servicio={s} />
          ))}
        </div>
      </Section>

      <Section id="proyectos" className="section-projects">
        <p className="section-label"> PROYECTOS REALIZADOS</p>
        <h2 className="section-heading">Trabajos destacados</h2>
        <div className="projects-grid">
          {/* Esta lista se llena sola con lo que haya en PROYECTOS (arriba) */}
          {PROYECTOS.map((p) => (
            <ProjectCard key={p.id} proyecto={p} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Contenido;