import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // =============================================
  // GAME DATA
  // =============================================
  const ACTORES = [
    { id: 1, nombre: "Marcos Ruiz", popularidad: 10, precio: 500, descripcion: "Actor amateur, recién llegado" },
    { id: 2, nombre: "Laura Díaz", popularidad: 25, precio: 1200, descripcion: "Actriz local con algo de experiencia" },
    { id: 3, nombre: "Carlos Vega", popularidad: 40, precio: 2500, descripcion: "Actor de teatro regional conocido" },
    { id: 4, nombre: "Sofía Montero", popularidad: 55, precio: 4000, descripcion: "Actriz de televisión regional" },
    { id: 5, nombre: "Diego Herrera", popularidad: 70, precio: 7000, descripcion: "Actor de cine independiente" },
    { id: 6, nombre: "Elena Castillo", popularidad: 85, precio: 12000, descripcion: "Estrella del teatro nacional" },
    { id: 7, nombre: "Rodrigo Alvarado", popularidad: 95, precio: 20000, descripcion: "Leyenda del teatro, muy solicitado" },
  ];

  const AUDITORIOS = [
    { id: 1, nombre: "Sala del Barrio", capacidad: 50, precio: 300, prestigio: 5, descripcion: "Íntima pero sin glamour" },
    { id: 2, nombre: "Teatro Municipal", capacidad: 200, precio: 1500, prestigio: 30, descripcion: "Bien equipado y conocido" },
    { id: 3, nombre: "Gran Teatro Central", capacidad: 600, precio: 5000, prestigio: 60, descripcion: "Elegante con historia" },
    { id: 4, nombre: "Palacio de las Artes", capacidad: 1500, precio: 15000, prestigio: 90, descripcion: "El más prestigioso" },
  ];

  const TIPOS_PUBLICO = [
    { tipo: "Familiar", multiplicador: 1.0, descripcion: "Prefieren comedias y musicales" },
    { tipo: "Juvenil", multiplicador: 0.8, descripcion: "Buscan drama y acción" },
    { tipo: "Adulto", multiplicador: 1.3, descripcion: "Aprecian el arte serio" },
    { tipo: "Élite", multiplicador: 2.0, descripcion: "Muy exigentes pero pagan bien" },
  ];

  const GENEROS = ["Comedia", "Drama", "Musical", "Tragedia", "Thriller", "Romance", "Ciencia Ficción", "Terror"];

  const PREGUNTAS = [
    "¿Dónde transcurre la historia? (lugar y época)",
    "¿Cuántos personajes principales tiene la obra?",
    "¿Cuál es el conflicto central de la historia?",
    "¿La historia tiene un final feliz o trágico?",
    "¿Hay algún elemento especial? (magia, humor, suspenso...)",
  ];

  // =============================================
  // ESTADOS
  // =============================================
  const [fase, setFase] = useState('menu'); // menu, genero, preguntas, descripcion, publico, actores, auditorio, resultado
  const [dinero, setDinero] = useState(5000);
  const [nivel, setNivel] = useState(1);
  const [xp, setXp] = useState(0);
  const [obrasCompletadas, setObrasCompletadas] = useState(0);
  const [titulo, setTitulo] = useState("Director Novato");

  const [obraActual, setObraActual] = useState({
    nombre: "",
    descripcion: "",
    genero: "",
    tipoPublico: null,
    actores: [],
    auditorio: null,
    diasEnsayo: 7,
    horasPorDia: 4,
    presupuestoGastado: 0,
    respuestasPreguntas: [],
  });

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestasTemp, setRespuestasTemp] = useState([]);
  const [actoresSeleccionados, setActoresSeleccionados] = useState([]);
  const [resultado, setResultado] = useState(null);

  // Cargar datos del localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('teatroDirector');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      setDinero(datos.dinero || 5000);
      setNivel(datos.nivel || 1);
      setXp(datos.xp || 0);
      setObrasCompletadas(datos.obrasCompletadas || 0);
      setTitulo(datos.titulo || "Director Novato");
    }
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    const datos = { dinero, nivel, xp, obrasCompletadas, titulo };
    localStorage.setItem('teatroDirector', JSON.stringify(datos));
  }, [dinero, nivel, xp, obrasCompletadas, titulo]);

  // =============================================
  // FUNCIONES DE LÓGICA
  // =============================================

  const calcularCalidadEnsayos = (dias, horas) => {
    const totalHoras = Math.min(dias, 30) * Math.min(horas, 8);
    return Math.min(totalHoras * 1.5, 100);
  };

  const calcularPopularidadElenco = (actores) => {
    if (actores.length === 0) return 0;
    const total = actores.reduce((sum, a) => sum + a.popularidad, 0);
    return total / actores.length;
  };

  const generarDescripcion = (respuestas, genero) => {
    const r = respuestas;
    return `Una obra de ${genero} ambientada en ${r[0] || 'lugar desconocido'}, con ${r[1] || 'varios'} personajes principales. La historia gira en torno a ${r[2] || 'un gran conflicto'}. Termina de forma ${r[3] || 'sorprendente'}, con un toque especial de ${r[4] || 'magia teatral'}.`;
  };

  const calcularResultadoObra = () => {
    const calidadEnsayo = calcularCalidadEnsayos(obraActual.diasEnsayo, obraActual.horasPorDia);
    const popElenco = calcularPopularidadElenco(obraActual.actores);
    const prestigioAud = obraActual.auditorio.prestigio;

    let critica = Math.floor(
      calidadEnsayo * 0.4 + popElenco * 0.35 + prestigioAud * 0.25
    );
    critica = Math.max(0, Math.min(100, critica + Math.random() * 20 - 10));

    let pctAsistencia;
    if (critica >= 80) pctAsistencia = 85 + Math.random() * 15;
    else if (critica >= 60) pctAsistencia = 60 + Math.random() * 24;
    else if (critica >= 40) pctAsistencia = 35 + Math.random() * 24;
    else pctAsistencia = 10 + Math.random() * 24;

    const asistentes = Math.floor(obraActual.auditorio.capacidad * pctAsistencia / 100);
    const precioEntrada = Math.floor(15 * obraActual.tipoPublico.multiplicador * (1 + prestigioAud / 100));
    const ingresosBrutos = asistentes * precioEntrada;
    const costes = obraActual.presupuestoGastado;
    const ganancias = ingresosBrutos - costes;
    const xpGanada = Math.floor(critica * 5 + asistentes * 0.1 + obraActual.actores.length * 10);

    let textoCritica = "Obra decente.";
    if (critica >= 90) textoCritica = "¡OBRA MAESTRA! La crítica queda sin palabras.";
    else if (critica >= 75) textoCritica = "Excelente actuación. El público lo adoró.";
    else if (critica >= 60) textoCritica = "Buena obra. Algunos momentos brillantes.";
    else if (critica >= 45) textoCritica = "Obra decente. Le faltó algo de chispa.";
    else if (critica >= 30) textoCritica = "Actuación floja. El público esperaba más.";
    else textoCritica = "Un desastre escénico. Las críticas destrozan la obra.";

    const estrellas = Math.max(1, Math.min(5, Math.ceil(critica / 20)));

    return {
      critica: Math.floor(critica),
      estrellas,
      textoCritica,
      asistentes,
      capacidad: obraActual.auditorio.capacidad,
      pctAsistencia: Math.floor(pctAsistencia),
      precioEntrada,
      ingresosBrutos,
      costes,
      ganancias,
      xp: xpGanada,
      calidadEnsayo: Math.floor(calidadEnsayo),
      popElenco: Math.floor(popElenco),
    };
  };

  const procesarResultado = (res) => {
    let nuevoNivel = nivel;
    let nuevoXp = xp + res.xp;
    let nuevoTitulo = titulo;

    const NIVELES = [
      { nivel: 1, xpNecesaria: 0, titulo: "Director Novato", recompensa: 1000 },
      { nivel: 2, xpNecesaria: 500, titulo: "Director Amateur", recompensa: 2000 },
      { nivel: 3, xpNecesaria: 1500, titulo: "Director Regional", recompensa: 5000 },
      { nivel: 4, xpNecesaria: 3500, titulo: "Director Nacional", recompensa: 10000 },
      { nivel: 5, xpNecesaria: 7000, titulo: "Maestro del Teatro", recompensa: 25000 },
    ];

    for (let i = NIVELES.length - 1; i >= 0; i--) {
      if (nuevoXp >= NIVELES[i].xpNecesaria && nuevoNivel < NIVELES[i].nivel) {
        nuevoNivel = NIVELES[i].nivel;
        nuevoTitulo = NIVELES[i].titulo;
        setDinero(d => d + NIVELES[i].recompensa);
      }
    }

    setNivel(nuevoNivel);
    setXp(nuevoXp);
    setTitulo(nuevoTitulo);
    setDinero(d => d + res.ganancias);
    setObrasCompletadas(o => o + 1);
  };

  // =============================================
  // MANEJADORES DE EVENTOS
  // =============================================

  const handleSeleccionarGenero = (genero) => {
    setObraActual(prev => ({ ...prev, genero }));
    setRespuestasTemp([]);
    setPreguntaActual(0);
    setFase('preguntas');
  };

  const handleRespuestaProxima = (respuesta) => {
    const nuevasRespuestas = [...respuestasTemp, respuesta];
    setRespuestasTemp(nuevasRespuestas);

    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setObraActual(prev => ({ ...prev, respuestasPreguntas: nuevasRespuestas }));
      setFase('descripcion');
    }
  };

  const handleDescripcionCompleta = (nombre, descripcion) => {
    if (!nombre.trim()) {
      alert("El nombre de la obra no puede estar vacío");
      return;
    }
    setObraActual(prev => ({
      ...prev,
      nombre,
      descripcion: descripcion || generarDescripcion(respuestasTemp, obraActual.genero),
    }));
    setFase('publico');
  };

  const handleSeleccionarPublico = (tipoPublico) => {
    setObraActual(prev => ({ ...prev, tipoPublico }));
    setActoresSeleccionados([]);
    setFase('actores');
  };

  const handleContratarActor = (actor) => {
    if (dinero < actor.precio) {
      alert(`No tienes suficiente dinero para contratar a ${actor.nombre}`);
      return;
    }
    setDinero(d => d - actor.precio);
    setActoresSeleccionados(prev => [...prev, actor]);
    setObraActual(prev => ({
      ...prev,
      presupuestoGastado: prev.presupuestoGastado + actor.precio,
    }));
  };

  const handleContinuarActores = () => {
    if (actoresSeleccionados.length === 0) {
      alert("Necesitas contratar al menos 1 actor");
      return;
    }
    setObraActual(prev => ({ ...prev, actores: actoresSeleccionados }));
    setFase('auditorio');
  };

  const handleAlquilarAuditorio = (auditorio, diasEnsayo, horasPorDia) => {
    if (dinero < auditorio.precio) {
      alert(`No tienes suficiente dinero para alquilar ${auditorio.nombre}`);
      return;
    }
    setDinero(d => d - auditorio.precio);
    setObraActual(prev => ({
      ...prev,
      auditorio,
      diasEnsayo,
      horasPorDia,
      presupuestoGastado: prev.presupuestoGastado + auditorio.precio,
    }));

    // Calcular y mostrar resultado
    const res = calcularResultadoObra();
    procesarResultado(res);
    setResultado(res);
    setFase('resultado');
  };

  const handleReiniciar = () => {
    setObraActual({
      nombre: "",
      descripcion: "",
      genero: "",
      tipoPublico: null,
      actores: [],
      auditorio: null,
      diasEnsayo: 7,
      horasPorDia: 4,
      presupuestoGastado: 0,
      respuestasPreguntas: [],
    });
    setRespuestasTemp([]);
    setActoresSeleccionados([]);
    setFase('menu');
  };

  // =============================================
  // COMPONENTES DE PANTALLA
  // =============================================

  const PantallaMenu = () => (
    <div className="pantalla menu-pantalla">
      <div className="menu-contenido">
        <h1 className="titulo-principal">🎭 DIRECTOR DE TEATRO 🎭</h1>
        <p className="subtitulo">Crea tu obra, contrata actores y conquista el escenario</p>
        <button className="boton boton-principal" onClick={() => setFase('genero')}>
          🎬 CREAR NUEVA OBRA
        </button>
      </div>
    </div>
  );

  const PantallaGenero = () => (
    <div className="pantalla">
      <h2>📖 PASO 1/6 — Elige el género de tu obra</h2>
      <div className="grid-botones">
        {GENEROS.map(g => (
          <button key={g} className="boton boton-genero" onClick={() => handleSeleccionarGenero(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );

  const PantallaPreguntas = () => (
    <div className="pantalla">
      <h2>✏️ PASO 2/6 — Definir la obra ({preguntaActual + 1}/{PREGUNTAS.length})</h2>
      <p className="pregunta-titulo">{PREGUNTAS[preguntaActual]}</p>
      <input
        type="text"
        placeholder="Tu respuesta..."
        className="input-respuesta"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleRespuestaProxima(e.target.value);
            e.target.value = '';
          }
        }}
        onBlur={(e) => {
          const valor = e.target.value;
          if (valor.trim() || preguntaActual < PREGUNTAS.length - 1) {
            handleRespuestaProxima(valor);
            e.target.value = '';
          }
        }}
      />
      <p className="hint-texto">Presiona Enter o haz clic fuera para continuar</p>
    </div>
  );

  const PantallaDescripcion = () => {
    const [nombre, setNombre] = useState("");
    const descAuto = generarDescripcion(respuestasTemp, obraActual.genero);
    const [descripcion, setDescripcion] = useState(descAuto);

    return (
      <div className="pantalla">
        <h2>📝 PASO 3/6 — Nombre y descripción</h2>
        <div className="form-grupo">
          <label>Nombre de la obra:</label>
          <input
            type="text"
            placeholder="Ej: El último acto..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-grupo">
          <label>Descripción (puedes editarla):</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
          />
        </div>
        <button
          className="boton boton-siguiente"
          onClick={() => handleDescripcionCompleta(nombre, descripcion)}
        >
          Siguiente ➡️
        </button>
      </div>
    );
  };

  const PantallaPublico = () => (
    <div className="pantalla">
      <h2>👥 PASO 4/6 — ¿A quién va dirigida la obra?</h2>
      <div className="grid-publico">
        {TIPOS_PUBLICO.map((pub, i) => (
          <div key={pub.tipo} className="card-publico">
            <button
              className="boton boton-publico"
              onClick={() => handleSeleccionarPublico(pub)}
            >
              {pub.tipo} <br /> ×{pub.multiplicador} precio entrada
            </button>
            <p className="card-descripcion">{pub.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const PantallaActores = () => (
    <div className="pantalla">
      <h2>🎭 PASO 5/6 — Contratar actores</h2>
      <p className="info-actores">💰 ${dinero} disponible | Actores contratados: {actoresSeleccionados.length}</p>
      <div className="lista-actores">
        {ACTORES.map(actor => {
          const yaContratado = actoresSeleccionados.some(a => a.id === actor.id);
          return (
            <div key={actor.id} className={`card-actor ${yaContratado ? 'contratado' : ''}`}>
              <div className="actor-info">
                <h4>{actor.nombre}</h4>
                <p className="actor-pop">⭐ Popularidad: {actor.popularidad}</p>
                <p className="actor-desc">{actor.descripcion}</p>
              </div>
              {!yaContratado ? (
                <button
                  className="boton boton-actor"
                  onClick={() => handleContratarActor(actor)}
                  disabled={dinero < actor.precio}
                >
                  ${actor.precio}
                </button>
              ) : (
                <span className="actor-check">✅ Contratado</span>
              )}
            </div>
          );
        })}
      </div>
      <button className="boton boton-siguiente" onClick={handleContinuarActores}>
        Continuar ➡️
      </button>
    </div>
  );

  const PantallaAuditorio = () => {
    const [auditorioElegido, setAuditorioElegido] = useState(null);
    const [diasEnsayo, setDiasEnsayo] = useState(7);
    const [horasPorDia, setHorasPorDia] = useState(4);

    return (
      <div className="pantalla">
        <h2>🏛️ PASO 6/6 — Auditorio y ensayos</h2>
        <p className="info-actores">💰 ${dinero} disponible</p>

        <h3>Selecciona el auditorio:</h3>
        <div className="grid-auditorios">
          {AUDITORIOS.map(aud => (
            <button
              key={aud.id}
              className={`boton boton-auditorio ${auditorioElegido?.id === aud.id ? 'seleccionado' : ''}`}
              onClick={() => setAuditorioElegido(aud)}
            >
              {aud.nombre}<br/>
              👥 {aud.capacidad} | ⭐ {aud.prestigio} | 💰 ${aud.precio}
            </button>
          ))}
        </div>

        {auditorioElegido && (
          <div className="auditorio-detalles">
            <p>{auditorioElegido.descripcion}</p>
          </div>
        )}

        <div className="ensayos-config">
          <div className="config-grupo">
            <label>Días de ensayo: {diasEnsayo}</label>
            <input
              type="range"
              min="1"
              max="30"
              value={diasEnsayo}
              onChange={(e) => setDiasEnsayo(Number(e.target.value))}
            />
          </div>
          <div className="config-grupo">
            <label>Horas por día: {horasPorDia}</label>
            <input
              type="range"
              min="1"
              max="8"
              value={horasPorDia}
              onChange={(e) => setHorasPorDia(Number(e.target.value))}
            />
          </div>
        </div>

        <p className="hint-texto">💡 Más días y horas = mayor calidad de actuación</p>

        <button
          className="boton boton-estrenar"
          onClick={() => {
            if (!auditorioElegido) {
              alert("Elige un auditorio primero");
              return;
            }
            if (dinero < auditorioElegido.precio) {
              alert("No tienes suficiente dinero");
              return;
            }
            handleAlquilarAuditorio(auditorioElegido, diasEnsayo, horasPorDia);
          }}
        >
          🎬 ¡ESTRENAR LA OBRA!
        </button>
      </div>
    );
  };

  const PantallaResultado = () => {
    if (!resultado) return null;
    const estrellas = "⭐".repeat(resultado.estrellas) + "☆".repeat(5 - resultado.estrellas);

    return (
      <div className="pantalla resultado-pantalla">
        <h2>🎭 RESULTADO DEL ESTRENO</h2>
        <h3>"{obraActual.nombre}"</h3>
        <p className="estrellas-resultado">{estrellas} ({resultado.critica}/100)</p>
        <p className="critica-texto">{resultado.textoCritica}</p>

        <div className="grid-stats">
          <div className="stat">
            <span className="stat-label">👥 Asistentes</span>
            <span className="stat-valor">{resultado.asistentes} / {resultado.capacidad}</span>
            <span className="stat-pct">{resultado.pctAsistencia}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">🎭 Calidad ensayo</span>
            <span className="stat-valor">{resultado.calidadEnsayo} / 100</span>
          </div>
          <div className="stat">
            <span className="stat-label">⭐ Pop. elenco</span>
            <span className="stat-valor">{resultado.popElenco} / 100</span>
          </div>
          <div className="stat">
            <span className="stat-label">🎟 Precio entrada</span>
            <span className="stat-valor">${resultado.precioEntrada}</span>
          </div>
          <div className="stat">
            <span className="stat-label">💵 Ingresos</span>
            <span className="stat-valor">${resultado.ingresosBrutos}</span>
          </div>
          <div className="stat">
            <span className="stat-label">💸 Costes</span>
            <span className="stat-valor">${resultado.costes}</span>
          </div>
          <div className={`stat ${resultado.ganancias >= 0 ? 'ganancia' : 'perdida'}`}>
            <span className="stat-label">💰 Ganancia neta</span>
            <span className="stat-valor">{resultado.ganancias >= 0 ? '+' : ''}${resultado.ganancias}</span>
          </div>
          <div className="stat">
            <span className="stat-label">✨ XP ganada</span>
            <span className="stat-valor">+{resultado.xp}</span>
          </div>
        </div>

        <div className="botones-resultado">
          <button className="boton boton-siguiente" onClick={handleReiniciar}>
            🎬 Crear otra obra
          </button>
          <button className="boton boton-menu" onClick={() => setFase('menu')}>
            🏠 Menú principal
          </button>
        </div>
      </div>
    );
  };

  // =============================================
  // RENDER PRINCIPAL
  // =============================================

  return (
    <div className="App">
      {/* BARRA DE ESTADO */}
      <div className="barra-estado">
        <div className="estado-item">
          <span>💰 ${dinero.toLocaleString()}</span>
        </div>
        <div className="estado-item">
          <span>⭐ Nv.{nivel} | {titulo}</span>
        </div>
        <div className="estado-item">
          <span>XP: {xp}</span>
        </div>
        <div className="estado-item">
          <span>🎭 Obras: {obrasCompletadas}</span>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="contenedor-principal">
        {fase === 'menu' && <PantallaMenu />}
        {fase === 'genero' && <PantallaGenero />}
        {fase === 'preguntas' && <PantallaPreguntas />}
        {fase === 'descripcion' && <PantallaDescripcion />}
        {fase === 'publico' && <PantallaPublico />}
        {fase === 'actores' && <PantallaActores />}
        {fase === 'auditorio' && <PantallaAuditorio />}
        {fase === 'resultado' && <PantallaResultado />}
      </div>
    </div>
  );
};

export default App;
