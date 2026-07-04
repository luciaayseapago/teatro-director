import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // =============================================
  // GAME DATA - ACTORES REALES
  // =============================================
  const ACTORES = [
    // Actores españoles
    { id: 1, nombre: "Pablo Alborán", popularidad: 72, precio: 3500, descripcion: "Cantante y actor español" },
    { id: 2, nombre: "Nicole Wallace", popularidad: 85, precio: 8000, descripcion: "Actriz argentina-española, conocida por sus papeles en TV" },
    { id: 3, nombre: "Gabriel Guevara", popularidad: 78, precio: 6500, descripcion: "Actor español, protagonista de series populares" },
    { id: 4, nombre: "Belén Rueda", popularidad: 88, precio: 12000, descripcion: "Actriz española ganadora de múltiples premios" },
    { id: 5, nombre: "Juan Echanove", popularidad: 82, precio: 9500, descripcion: "Actor veterano español de cine y televisión" },
    { id: 6, nombre: "Marta Hazas", popularidad: 80, precio: 7500, descripcion: "Actriz española protagonista de series internacionales" },
    { id: 7, nombre: "Luis Tosar", popularidad: 85, precio: 10000, descripcion: "Actor gallego de cine de prestigio" },
    { id: 8, nombre: "Tristán Ulloa", popularidad: 76, precio: 5500, descripcion: "Actor español de cine y teatro" },
    { id: 9, nombre: "Blanca Portillo", popularidad: 84, precio: 11000, descripcion: "Actriz española premiada en festivales" },
    { id: 10, nombre: "Eduard Fernández", popularidad: 86, precio: 13000, descripcion: "Actor catalán de renombre internacional" },
    
    // Actores internacionales
    { id: 11, nombre: "Javier Bardem", popularidad: 95, precio: 35000, descripcion: "Actor oscuro español de alcance mundial" },
    { id: 12, nombre: "Penélope Cruz", popularidad: 94, precio: 40000, descripcion: "Actriz española ganadora de Óscar" },
    { id: 13, nombre: "Antonio Banderas", popularidad: 92, precio: 32000, descripcion: "Leyenda del cine español e internacional" },
    { id: 14, nombre: "Pedro Pascal", popularidad: 91, precio: 28000, descripcion: "Actor chileno-español de éxito en Hollywood" },
    
    // Actores emergentes
    { id: 15, nombre: "Aitana Ocaña", popularidad: 68, precio: 2800, descripcion: "Cantante y actriz de OT, en auge" },
    { id: 16, nombre: "Dani Rovira", popularidad: 75, precio: 4500, descripcion: "Humorista y actor español" },
    { id: 17, nombre: "Jordi Évole", popularidad: 70, precio: 3200, descripcion: "Periodista y presentador con experiencia en TV" },
    { id: 18, nombre: "Carme Chaparro", popularidad: 73, precio: 3800, descripcion: "Presentadora y reportera de renombre" },
    { id: 19, nombre: "Elsa Pataky", popularidad: 80, precio: 7000, descripcion: "Actriz española de cine de acción" },
    { id: 20, nombre: "Marina Salas", popularidad: 76, precio: 5200, descripcion: "Actriz española de series de Netflix" },
     // Actores de segunda
    { id: 26, nombre: "Manu Rivas", popularidad: 57, precio: 1100, descripcion: "Famoso tiktoker e influencer" },
    { id: 27, nombre: "Maria Abad", popularidad: 10, precio: 500, descripcion: "Profesora de lengua y de teatro" },
    { id: 28, nombre: "Natalia Hernández", popularidad: 20, precio: 750, descripcion: "Actor teatral emergente" },
    { id: 29, nombre: "Sara Nieto", popularidad: 55, precio: 1000, descripcion: "Actriz y pintora" },
    { id: 30, nombre: "Lydia Garcia", popularidad: 65, precio: 1200, descripcion: "Actriz joven con potencial en teatro" },
  ];
    // Actores teatrales
    { id: 21, nombre: "José Luis Gómez", popularidad: 79, precio: 6800, descripcion: "Actor de teatro clásico español" },
    { id: 22, nombre: "Charo López", popularidad: 74, precio: 4800, descripcion: "Actriz veterana de teatro español" },
    { id: 23, nombre: "Paco Tójar", popularidad: 68, precio: 2500, descripcion: "Actor teatral emergente" },
    { id: 24, nombre: "Sara Ballesteros", popularidad: 71, precio: 3100, descripcion: "Actriz de teatro contemporáneo" },
    { id: 25, nombre: "Mauro Entrenas", popularidad: 65, precio: 1800, descripcion: "Actor joven con potencial en teatro" },
  ];

  const AUDITORIOS = [
    { id: 1, nombre: "Teatro Eslava", ciudad: "Madrid", capacidad: 280, precio: 1200, prestigio: 45, descripcion: "Íntimo teatro madrileño para obras experimentales" },
    { id: 2, nombre: "Teatro Bellas Artes", ciudad: "Madrid", capacidad: 500, precio: 3500, prestigio: 70, descripcion: "Histórico teatro madrileño de prestigio" },
    { id: 3, nombre: "Teatro Español", ciudad: "Madrid", capacidad: 750, precio: 8000, prestigio: 85, descripcion: "Teatro nacional español de renombre" },
    { id: 4, nombre: "Teatro de la Zarzuela", ciudad: "Madrid", capacidad: 650, precio: 6500, prestigio: 80, descripcion: "Templo de la zarzuela madrileña" },
    { id: 5, nombre: "Gran Teatre del Liceu", ciudad: "Barcelona", capacidad: 2000, precio: 12000, prestigio: 90, descripcion: "Opera house de categoría mundial" },
    { id: 6, nombre: "Teatro Nacional de Cataluña", ciudad: "Barcelona", capacidad: 1100, precio: 9000, prestigio: 88, descripcion: "Escenario principal de artes escénicas catalanas" },
    { id: 7, nombre: "Teatro Romea", ciudad: "Madrid", capacidad: 420, precio: 2800, prestigio: 65, descripcion: "Histórico teatro madrileño" },
    { id: 8, nombre: "Teatre Tívoli", ciudad: "Barcelona", capacidad: 1900, precio: 11000, prestigio: 87, descripcion: "Gran escenario para musicales" },
    { id: 9, nombre: "Teatro Principal", ciudad: "Valencia", capacidad: 1400, precio: 7500, prestigio: 82, descripcion: "Escenario principal de Valencia" },
    { id: 10, nombre: "Teatro Calderón", ciudad: "Madrid", capacidad: 1700, precio: 10000, prestigio: 86, descripcion: "Imponente teatro para grandes producciones" },
  ];

  const TIPOS_PUBLICO = [
    { tipo: "Familiar", multiplicador: 1.0, descripcion: "Familias con niños. Prefieren comedias y musicales" },
    { tipo: "Juvenil", multiplicador: 0.85, descripcion: "Jóvenes de 15-25 años. Buscan drama y acción" },
    { tipo: "Adulto", multiplicador: 1.3, descripcion: "Adultos con poder adquisitivo. Aprecian el arte serio" },
    { tipo: "Críticos", multiplicador: 1.8, descripcion: "Críticos y especialistas. Exigentes pero valoran calidad" },
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
  // TITULARES DE CRÍTICOS
  // =============================================
  const TITULARES_EXCELENTE = [
    "\"Una obra de arte que no te puedes perder\", dice El País",
    "\"Magistral. Uno de los estrenos del año\", El Mundo",
    "\"Emocionante de principio a fin\", ABC",
    "\"Una producción memorable\", La Vanguardia",
    "\"El éxito de la temporada teatral\", Fotogramas",
  ];

  const TITULARES_BUENO = [
    "\"Una propuesta interesante\", El Periódico",
    "\"Buen trabajo del elenco\", Diario de Sevilla",
    "\"Una noche de buen teatro\", El Correo",
    "\"Entretenido y bien ejecutado\", Público",
    "\"Recomendable para amantes del teatro\", Razón",
  ];

  const TITULARES_REGULAR = [
    "\"Irregular pero con momentos destacables\", El País",
    "\"Una obra que no termina de despegar\", El Mundo",
    "\"Potencial sin aprovechar\", ABC",
    "\"Entretenida aunque predecible\", La Vanguardia",
    "\"Obra que deja indiferente\", Fotogramas",
  ];

  const TITULARES_MALO = [
    "\"Decepcionante en todos los aspectos\", El País",
    "\"Una gran pérdida de tiempo\", El Mundo",
    "\"Insuficiente. Hay que mejorar\", ABC",
    "\"No recomendable\", La Vanguardia",
    "\"El fracaso de la temporada\", Fotogramas",
  ];

  // =============================================
  // ESTADOS
  // =============================================
  const [fase, setFase] = useState('menu');
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
    numFunciones: 1,
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

  const obtenerTitularAleatorio = (critica) => {
    let titulares;
    if (critica >= 85) titulares = TITULARES_EXCELENTE;
    else if (critica >= 65) titulares = TITULARES_BUENO;
    else if (critica >= 45) titulares = TITULARES_REGULAR;
    else titulares = TITULARES_MALO;
    
    return titulares[Math.floor(Math.random() * titulares.length)];
  };

  const calcularResultadoObra = () => {
    const calidadEnsayo = calcularCalidadEnsayos(obraActual.diasEnsayo, obraActual.horasPorDia);
    const popElenco = calcularPopularidadElenco(obraActual.actores);
    const prestigioAud = obraActual.auditorio.prestigio;

    let critica = Math.floor(
      calidadEnsayo * 0.35 + popElenco * 0.40 + prestigioAud * 0.25
    );
    critica = Math.max(0, Math.min(100, critica + Math.random() * 20 - 10));

    let pctAsistencia;
    if (critica >= 85) pctAsistencia = 90 + Math.random() * 10;
    else if (critica >= 70) pctAsistencia = 75 + Math.random() * 15;
    else if (critica >= 55) pctAsistencia = 55 + Math.random() * 20;
    else if (critica >= 40) pctAsistencia = 35 + Math.random() * 20;
    else pctAsistencia = 15 + Math.random() * 25;

    const capacidadPorFuncion = obraActual.auditorio.capacidad;
    const asistentesPorFuncion = Math.floor(capacidadPorFuncion * pctAsistencia / 100);
    const totalAsistentes = asistentesPorFuncion * obraActual.numFunciones;

    const precioBase = 20;
    const precioEntrada = Math.floor(precioBase * obraActual.tipoPublico.multiplicador * (1 + prestigioAud / 100));
    const ingresosBrutos = totalAsistentes * precioEntrada;
    const costes = obraActual.presupuestoGastado;
    const ganancias = ingresosBrutos - costes;
    const xpGanada = Math.floor((critica * 5 + totalAsistentes * 0.05 + obraActual.actores.length * 10) * obraActual.numFunciones);

    let textoCritica = "Obra decente.";
    if (critica >= 90) textoCritica = "¡OBRA MAESTRA! Crítica unánime de aprobación.";
    else if (critica >= 75) textoCritica = "Excelente actuación. El público lo adoró.";
    else if (critica >= 60) textoCritica = "Buena obra. Algunos momentos brillantes.";
    else if (critica >= 45) textoCritica = "Obra decente. Le faltó algo de chispa.";
    else if (critica >= 30) textoCritica = "Actuación floja. El público esperaba más.";
    else textoCritica = "Un desastre escénico. Las críticas destrozan la obra.";

    const estrellas = Math.max(1, Math.min(5, Math.ceil(critica / 20)));
    const titular = obtenerTitularAleatorio(critica);

    return {
      critica: Math.floor(critica),
      estrellas,
      textoCritica,
      titular,
      asistentesPorFuncion,
      totalAsistentes,
      numFunciones: obraActual.numFunciones,
      capacidad: capacidadPorFuncion,
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

  const handleReiniciarJuegoCompleto = () => {
    if (window.confirm("⚠️ ¿Estás seguro? Perderás todo tu progreso.\n\nNo se puede deshacer.")) {
      setDinero(5000);
      setNivel(1);
      setXp(0);
      setObrasCompletadas(0);
      setTitulo("Director Novato");
      setFase('menu');
      localStorage.removeItem('teatroDirector');
      alert("✅ Juego reiniciado. ¡Vuelve a empezar!");
    }
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

  const handleAlquilarAuditorio = (auditorio, diasEnsayo, horasPorDia, numFunciones) => {
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
      numFunciones,
      presupuestoGastado: prev.presupuestoGastado + auditorio.precio,
    }));

    // Calcular y mostrar resultado
    const nuevoObra = {
      ...obraActual,
      auditorio,
      diasEnsayo,
      horasPorDia,
      numFunciones,
      presupuestoGastado: obraActual.presupuestoGastado + auditorio.precio,
    };
    setObraActual(nuevoObra);

    // Usar setTimeout para que se actualice el estado primero
    setTimeout(() => {
      const res = calcularResultadoObra();
      procesarResultado(res);
      setResultado(res);
      setFase('resultado');
    }, 0);
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
      numFunciones: 1,
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
              {pub.tipo} <br /> ×{pub.multiplicador.toFixed(2)} precio entrada
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
      <p className="info-actores">💰 ${dinero.toLocaleString()} disponible | Actores contratados: {actoresSeleccionados.length}</p>
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
                  ${actor.precio.toLocaleString()}
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
    const [numFunciones, setNumFunciones] = useState(1);

    return (
      <div className="pantalla">
        <h2>🏛️ PASO 6/6 — Auditorio, ensayos y funciones</h2>
        <p className="info-actores">💰 ${dinero.toLocaleString()} disponible</p>

        <h3>Selecciona el auditorio:</h3>
        <div className="grid-auditorios">
          {AUDITORIOS.map(aud => (
            <button
              key={aud.id}
              className={`boton boton-auditorio ${auditorioElegido?.id === aud.id ? 'seleccionado' : ''}`}
              onClick={() => setAuditorioElegido(aud)}
            >
              {aud.nombre}<br/>
              📍 {aud.ciudad} | 👥 {aud.capacidad} | ⭐ {aud.prestigio} | 💰 ${aud.precio.toLocaleString()}
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
          <div className="config-grupo">
            <label>Número de funciones: {numFunciones}</label>
            <input
              type="range"
              min="1"
              max="30"
              value={numFunciones}
              onChange={(e) => setNumFunciones(Number(e.target.value))}
            />
            <span className="hint-pequeño">Más funciones = más asistentes y ganancias</span>
          </div>
        </div>

        <p className="hint-texto">💡 Más días y horas = mayor calidad | Más funciones = más ingresos</p>

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
            handleAlquilarAuditorio(auditorioElegido, diasEnsayo, horasPorDia, numFunciones);
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

        {/* TITULAR DE CRÍTICOS */}
        <div className="titular-criticos">
          <p className="titular-texto">"{resultado.titular}"</p>
        </div>

        <div className="grid-stats">
          <div className="stat">
            <span className="stat-label">🎭 Género</span>
            <span className="stat-valor">{obraActual.genero}</span>
          </div>
          <div className="stat">
            <span className="stat-label">🏛️ Teatro</span>
            <span className="stat-valor">{obraActual.auditorio.nombre}</span>
            <span className="stat-pct">{obraActual.auditorio.ciudad}</span>
          </div>
          <div className="stat">
            <span className="stat-label">🎬 Funciones</span>
            <span className="stat-valor">{resultado.numFunciones}</span>
          </div>
          <div className="stat">
            <span className="stat-label">👥 Asistentes/función</span>
            <span className="stat-valor">{resultado.asistentesPorFuncion.toLocaleString()}</span>
            <span className="stat-pct">{resultado.pctAsistencia}% de capacidad</span>
          </div>
          <div className="stat">
            <span className="stat-label">👥 Asistentes totales</span>
            <span className="stat-valor">{resultado.totalAsistentes.toLocaleString()}</span>
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
            <span className="stat-valor">${resultado.ingresosBrutos.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">💸 Costes</span>
            <span className="stat-valor">${resultado.costes.toLocaleString()}</span>
          </div>
          <div className={`stat ${resultado.ganancias >= 0 ? 'ganancia' : 'perdida'}`}>
            <span className="stat-label">💰 Ganancia neta</span>
            <span className="stat-valor">{resultado.ganancias >= 0 ? '+' : ''}${resultado.ganancias.toLocaleString()}</span>
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
        <button className="boton-reiniciar" onClick={handleReiniciarJuegoCompleto}>
          🔄 Reiniciar
        </button>
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
