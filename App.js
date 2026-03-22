import React, { useState, useCallback, memo, useEffect, useRef, useMemo } from 'react';
import { AlertTriangle, Terminal, Zap, Trash2, Cpu, Activity, X, Send, Shuffle, Trophy, Award, Volume2, VolumeX, BookOpen, Copy, Search, Globe, Flame, Snowflake, Target, Mountain, Dna, Atom, Bot, Wand2, Image as ImageIcon } from 'lucide-react';

// --- SISTEMA ANTI-COLAPSO ---
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, errorInfo: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { this.setState({ errorInfo }); console.error("KERNEL PANIC:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-950 text-red-500 p-4 sm:p-8 font-mono uppercase text-xs">
          <div className="max-w-2xl mx-auto border-2 border-red-500 bg-black p-6 shadow-[0_0_50px_rgba(255,0,0,0.5)]">
            <h1 className="text-3xl font-black mb-4 flex items-center gap-3"><AlertTriangle className="w-8 h-8" /> KERNEL PANIC</h1>
            <p className="mb-4 text-red-400">EL SISTEMA HA SUFRIDO UN FALLO CRÍTICO DE RENDERIZADO.</p>
            <div className="bg-red-900/20 p-4 border border-red-800 overflow-x-auto"><p className="font-bold">{this.state.error && this.state.error.toString()}</p></div>
            <button onClick={() => window.location.reload()} className="mt-6 border border-red-500 hover:bg-red-500 hover:text-black px-6 py-2 font-bold">[ REINICIAR SISTEMA ]</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- BASE DE DATOS (472 TOTAL) ---
const parseList = (str) => {
  try { return str.split(',').map(item => { const [sym, name] = item.split('|'); return { sym: sym ? sym.trim() : '?', name: name ? name.trim() : 'OBJ' }; }); } 
  catch (e) { return []; }
};

const RAW_ELEMENTS = "H|Hidrógeno, He|Helio, Li|Litio, Be|Berilio, B|Boro, C|Carbono, N|Nitrógeno, O|Oxígeno, F|Flúor, Ne|Neón, Na|Sodio, Mg|Magnesio, Al|Aluminio, Si|Silicio, P|Fósforo, S|Azufre, Cl|Cloro, Ar|Argón, K|Potasio, Ca|Calcio, Sc|Escandio, Ti|Titanio, V|Vanadio, Cr|Cromo, Mn|Manganeso, Fe|Hierro, Co|Cobalto, Ni|Níquel, Cu|Cobre, Zn|Zinc, Ga|Galio, Ge|Germanio, As|Arsénico, Se|Selenio, Br|Bromo, Kr|Kriptón, Rb|Rubidio, Sr|Estroncio, Y|Itrio, Zr|Circonio, Nb|Niobio, Mo|Molibdeno, Tc|Tecnecio, Ru|Rutenio, Rh|Rodio, Pd|Paladio, Ag|Plata, Cd|Cadmio, In|Indio, Sn|Estaño, Sb|Antimonio, Te|Telurio, I|Yodo, Xe|Xenón, Cs|Cesio, Ba|Bario, La|Lantano, Ce|Cerio, Pr|Praseodimio, Nd|Neodimio, Pm|Prometio, Sm|Samario, Eu|Europio, Gd|Gadolinio, Tb|Terbio, Dy|Disprosio, Ho|Holmio, Er|Erbio, Tm|Tulio, Yb|Iterbio, Lu|Lutecio, Hf|Hafnio, Ta|Tántalo, W|Wolframio, Re|Renio, Os|Osmio, Ir|Iridio, Pt|Platino, Au|Oro, Hg|Mercurio, Tl|Talio, Pb|Plomo, Bi|Bismuto, Po|Polonio, At|Astato, Rn|Radón, Fr|Francio, Ra|Radio, Ac|Actinio, Th|Torio, Pa|Protactinio, U|Uranio, Np|Neptunio, Pu|Plutonio, Am|Americio, Cm|Curio, Bk|Berkelio, Cf|Californio, Es|Einstenio, Fm|Fermio, Md|Mendelevio, No|Nobelio, Lr|Lawrencio, Rf|Rutherfordio, Db|Dubnio, Sg|Seaborgio, Bh|Bohrio, Hs|Hassio, Mt|Meitnerio, Ds|Darmstadtio, Rg|Roentgenio, Cn|Copernicio, Nh|Nihonio, Fl|Flerovio, Mc|Moscovio, Lv|Livermorio, Ts|Teneso, Og|Oganesón";
const RAW_MATERIALS = "💧|Agua, 🛢️|Petróleo, 🌋|Lava, 🍯|Miel, 🥛|Leche, 🩸|Sangre, 🧪|Veneno, ⚗️|Ácido, 🍷|Alcohol, 🌡️|Mercurio Líq., 💩|Lodo, ❄️|Nieve, 🧊|Hielo, 💨|Vapor, ☁️|Nube, 🌫️|Niebla, 🚬|Humo, ⛽|Gas Natural, 🛡️|Ozono, 🌬️|Aire, 🌍|Tierra, 🏖️|Arena, 🪨|Grava, 🏺|Arcilla, 🧱|Ladrillo, 🌪️|Polvo, 🌋|Ceniza, 🏔️|Roca, 🪨|Piedra, 🌑|Guijarro, ⬛|Carbón, 🏛️|Granito, 🏛️|Mármol, ⬛|Pizarra, ⬜|Caliza, 🪨|Obsidiana, 🧽|Piedra Pómez, 🪨|Basalto, 🧂|Sal, 🍬|Azúcar, 🪵|Madera, 🟫|Corteza, 🍃|Hoja, 🪢|Raíz, 🎋|Bambú, 🍾|Corcho, 🍯|Resina, 🛞|Caucho, 🍁|Savia, 🟠|Ámbar, 🔥|Carbón Veg., 📄|Papel, 📦|Cartón, 📜|Papiro, 🪚|Serrín, 🌾|Paja, 🌾|Heno, 🧶|Cuerda, 🧺|Mimbre, ☁️|Algodón, 👘|Seda, 🐑|Lana, 🥼|Lino, 👞|Cuero, 🧥|Piel, 🪶|Pluma, 🐟|Escama, 🦴|Hueso, 🐘|Marfil, 🦏|Cuerno, 🕸️|Seda Araña, 🐝|Cera Abeja, 🐚|Nácar, ⚪|Perla, 🐢|Caparazón, 🍮|Gelatina, 🥓|Grasa, 🥩|Carne, 🦵|Tendón, 🧵|Hilo, 🛍️|Plástico, 🛞|Goma, 🧦|Nylon, 👕|Poliéster, 🍳|Teflón, 🚰|PVC, 🧁|Silicona, 🏄|Fibra Vidrio, 🏎️|Fibra Carbono, 🪖|Kevlar, ⚔️|Acero, 🥉|Bronce, 🎺|Latón, ⚙️|Invar, 🍽️|Peltre, 🪙|Electrum, ✈️|Duraluminio, 🦷|Amalgama, 🪟|Vidrio, 🔮|Cristal, 💎|Diamante, 🔴|Rubí, 🔵|Zafiro, 🟢|Esmeralda, 🟣|Amatista, 🟡|Topacio, 🌈|Ópalo, 🟩|Jade, 🟦|Turquesa, 🧿|Lapislázuli, ☁️|Aerogel, ⬛|Grafeno, 🧪|Nanotubos, 🌌|Antimateria, 🕳️|Mat. Oscura, ⚡|Plasma, 🧲|Superconductor, 🧩|Metamaterial";
const RAW_BIOLOGY = "🧑|Humano, 🧠|Cerebro, 🫀|Corazón, 🫁|Pulmón, 👁️|Ojo, ✋|Mano, 🦶|Pie, 🦴|Esqueleto, 💀|Cráneo, 🩸|Sangre, 💇|Pelo, 🦷|Diente, 💪|Músculo, ⚡|Nervio, 🖐️|Piel, 🦠|Célula, 🧬|ADN, 🦠|Virus, 🧫|Bacteria, 💧|Esperma, 🐱|Gato, 🐶|Perro, 🐭|Ratón, 🐀|Rata, 🐰|Conejo, 🐮|Vaca, 🐷|Cerdo, 🐴|Caballo, 🐑|Oveja, 🐐|Cabra, 🦁|León, 🐯|Tigre, 🐻|Oso, 🐺|Lobo, 🦊|Zorro, 🐘|Elefante, 🦒|Jirafa, 🐒|Mono, 🦍|Gorila, 🦇|Murciélago, 🦅|Águila, 🦉|Búho, 🐦|Cuervo, 🦜|Loro, 🦚|Pavo Real, 🐧|Pingüino, 🐔|Gallina, 🦆|Pato, 🕊️|Paloma, 🦢|Cisne, 🐊|Cocodrilo, 🐍|Serpiente, 🦎|Lagartija, 🐢|Tortuga, 🦎|Camaleón, 🦎|Iguana, 🦎|Dragón Komodo, 🐸|Rana, 🐸|Sapo, 🦎|Salamandra, 🦈|Tiburón, 🐬|Delfín, 🐳|Ballena, 🐋|Orca, 🐙|Pulpo, 🦑|Calamar, 🦀|Cangrejo, 🦞|Langosta, 🌟|Estrella Mar, 🪼|Medusa, 🐟|Pez, 🐉|Caballito Mar, 🕷️|Araña, 🦂|Escorpión, 🐜|Hormiga, 🐝|Abeja, 🦋|Mariposa, 🪰|Mosca, 🦟|Mosquito, 🪲|Escarabajo, 🦖|T-Rex, 🦕|Saurópodo, 🦖|Triceratops, 🦅|Pterodáctilo, 🐘|Mamut, 🦤|Dodo, 🐉|Dragón, 🦄|Unicornio, 🐎|Pegaso, 🦅|Fénix, 🦁|Grifo, 🧜‍♀️|Sirena, 🐎|Centauro, 🐂|Minotauro, 👁️|Ciclope, 🦍|Yeti, 🦕|Nessie, 👽|Alien, 🧟|Zombie, 🧛|Vampiro, 🌳|Árbol, 🌸|Flor, 🍄|Hongo, 🌿|Alga, 🌰|Semilla, 🍎|Manzana, 🍌|Plátano, 🍓|Fresa, 🍊|Naranja, 🍉|Sandía, 🥕|Zanahoria, 🥔|Patata, 🍅|Tomate, 🌽|Maíz, 🌾|Trigo, 🍔|Hamburguesa, 🌮|Taco, 🍕|Pizza";
const RAW_TECH = "🛞|Rueda, ⚙️|Engranaje, 🕹️|Palanca, 🪢|Polea, 🌀|Resorte, 🔩|Tornillo, 📍|Clavo, 🔨|Martillo, 🪓|Hacha, 🔪|Cuchillo, 🗡️|Espada, 🛡️|Escudo, 🏹|Arco, 💘|Flecha, ⛓️|Cadena, 🧭|Brújula, ⏱️|Reloj, 🔍|Lupa, 🧲|Imán, 🪞|Espejo, 🔥|Fuego, 🎇|Antorcha, 🕯️|Vela, 💡|Bombilla, 🔦|Linterna, 🔴|Láser, ⚡|Rayo, 🔌|Electricidad, 🔋|Batería, 🏭|Generador, ☀️|Panel Solar, ☢️|Reactor Nuc., 🏎️|Motor, 🪭|Turbina, 🔌|Enchufe, 🧵|Cable, 📡|Antena, 📻|Radio, 📺|Televisor, ☎️|Teléfono, 💻|Computadora, 💻|Laptop, 🖲️|Microchip, 🟩|Placa Base, 💽|Disco Duro, 🖥️|Pantalla, ⌨️|Teclado, 🖱️|Ratón, 🛜|Router, 🗄️|Servidor, 0️⃣|Código, ♾️|Algoritmo, 🤖|IA, 🐛|Virus Inf., ₿|Bitcoin, 💳|Tarj. Crédito, 💵|Dinero, 🪙|Moneda, 🔑|Llave, 🔒|Candado, 🚲|Bicicleta, 🏍️|Motocicleta, 🚗|Coche, 🚚|Camión, 🚂|Tren, ⛵|Barco, 🛥️|Submarino, ✈️|Avión, 🚁|Helicóptero, 🎈|Globo Aer., 🚀|Cohete, 🛰️|Transbordador, 📡|Satélite, 🛸|Estación Esp., 🛺|Rover, 🛸|Ovni, 🛹|Patineta, 🛼|Patines, 🚜|Tractor, 🏗️|Grúa, 🔫|Pistola, 🔫|Rifle, 🔫|Ametralladora, 💣|Cañón, 🪖|Tanque, 🚀|Misil, 💣|Bomba, 🍍|Granada, 🧨|Dinamita, 🧱|C4, 🕳️|Mina, 🔦|Rayo Láser, 🗡️|Sable Luz, 💥|Cañón Plasma, ❄️|Rayo Cong., 🧪|Veneno, ☣️|Tóxico, ☢️|Radiactividad, 🌌|Agujero Negro, 💥|Supernova, 🪄|Varita, 🔮|Bola Cristal, 🧪|Poción, 📖|Libro Magia, 💍|Anillo, 🧥|Capa Invis., ⏳|Máq. Tiempo, 🌀|Teletransport., 🐑|Clonador, 🔬|Rayo Encog., 🛡️|Escudo Def., 🌠|Motor Warp, 🟩|Matriz, 🔴|Píl. Roja, 🔵|Píl. Azul, 🥽|Gafas VR, 🩻|Holograma, 🦠|Nanobots";

const INVENTORY = { elements: parseList(RAW_ELEMENTS), materials: parseList(RAW_MATERIALS), biology: parseList(RAW_BIOLOGY), tech: parseList(RAW_TECH) };
const TIME_SCALES = ['1 SEG', '1 HOR', '1 SEM', '1 AÑO', '1K AÑOS', '1M AÑOS', '1B AÑOS'];
const MAX_DISCOVERIES = 472;

const DAILY_MISSIONS_POOL = [
  { target: 'Humano + Electricidad', req: ['Humano', 'Electricidad'], mode: 'ANY' },
  { target: 'Agua a -273°C', req: ['Agua'], temp: -273, mode: 'ANY' },
  { target: 'Dinosaurio (Modo Ficción)', req: ['Dinosaurio'], mode: 'FICTION' },
  { target: 'Crear Agujero Negro (Gravedad Max)', req: ['Agujero Negro'], grav: 1000, mode: 'ANY' }
];

const PLANET_PRESETS = [
  { name: 'TIERRA', temp: 25, pres: 1, grav: 1, icon: Globe },
  { name: 'MARTE', temp: -60, pres: 0, grav: 0, icon: Mountain },
  { name: 'VENUS', temp: 460, pres: 90, grav: 1, icon: Flame },
  { name: 'VACÍO', temp: -273, pres: 0, grav: 0, icon: Snowflake },
];

const SafeStorage = {
  get: (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } },
  set: (key, val) => { try { localStorage.setItem(key, val); } catch (e) {} }
};

// --- AUDIO SEGURO ---
let audioCtx = null; let isMuted = true; let ambientGainNode = null;
const initAudioSafe = () => {
  try {
    if (!audioCtx && typeof window !== 'undefined') { const AC = window.AudioContext || window.webkitAudioContext; if (AC) audioCtx = new AC(); }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) {}
};
const playTone = (freq, type, duration, vol, delay = 0) => {
  if (isMuted || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime + delay); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + duration);
    osc.connect(gain); gain.connect(audioCtx.destination); osc.start(audioCtx.currentTime + delay); osc.stop(audioCtx.currentTime + delay + duration);
  } catch (e) {}
};
const startAmbientNoise = () => {
  if (!audioCtx || ambientGainNode) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const bufferSize = 2 * audioCtx.sampleRate; const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate); const output = noiseBuffer.getChannelData(0);
    let lastOut = 0; for (let i = 0; i < bufferSize; i++) { const white = Math.random() * 2 - 1; output[i] = (lastOut + (0.02 * white)) / 1.02; lastOut = output[i]; output[i] *= 3.5; }
    const noise = audioCtx.createBufferSource(); noise.buffer = noiseBuffer; noise.loop = true;
    const filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 300;
    ambientGainNode = audioCtx.createGain(); ambientGainNode.gain.value = isMuted ? 0 : 0.05;
    noise.connect(filter); filter.connect(ambientGainNode); ambientGainNode.connect(audioCtx.destination); noise.start(0);
  } catch (e) {}
};
const sfx = {
  click: () => playTone(800, 'square', 0.05, 0.02), add: () => playTone(1200, 'sine', 0.1, 0.03), remove: () => playTone(300, 'sawtooth', 0.1, 0.03),
  startMix: () => { playTone(50, 'square', 2.0, 0.05); playTone(100, 'sawtooth', 2.0, 0.05); }, success: () => { playTone(440, 'sine', 0.2, 0.05); playTone(660, 'sine', 0.4, 0.05, 0.1); },
  danger: () => { playTone(800, 'square', 0.4, 0.05); playTone(600, 'square', 0.4, 0.05, 0.2); },
  achievement: () => { playTone(523.25, 'sine', 0.2, 0.05); playTone(659.25, 'sine', 0.2, 0.05, 0.2); playTone(783.99, 'sine', 0.4, 0.05, 0.4); playTone(1046.50, 'square', 0.6, 0.05, 0.6); },
  setAmbientVol: (muted) => { if (ambientGainNode) { try { ambientGainNode.gain.value = muted ? 0 : 0.05; } catch(e){} } }
};

const ACHIEVEMENTS_DEF = {
  FIRST_MIX: { id: 'FIRST_MIX', title: 'PRIMER CONTACTO', desc: 'Realiza tu primera síntesis.' }, CHAOS: { id: 'CHAOS', title: 'QUÍMICO LOCO', desc: 'Protocolo CAOS_RANDOM.' },
  ABSOLUTE_ZERO: { id: 'ABSOLUTE_ZERO', title: 'CERO ABSOLUTO', desc: 'Materia a -273°C.' }, SUN_TEMP: { id: 'SUN_TEMP', title: 'NÚCLEO SOLAR', desc: 'Materia a 5000°C.' },
  TIME_LORD: { id: 'TIME_LORD', title: 'SEÑOR DEL TIEMPO', desc: 'Acelera 1 Billón de Años.' }, FICTION: { id: 'FICTION', title: 'ALTERADOR DE REALIDAD', desc: 'Motor FICCION.' },
  DANGER: { id: 'DANGER', title: 'AMENAZA CRÍTICA', desc: 'Crea algo peligroso.' }, HOARDER: { id: 'HOARDER', title: 'MASA CRÍTICA', desc: 'Cámara llena.' },
  ALCHEMIST_10: { id: 'ALCHEMIST_10', title: 'ALQUIMISTA NOVATO', desc: 'Descubre 10 remanentes.' }, ALCHEMIST_50: { id: 'ALCHEMIST_50', title: 'ARQUITECTO UNIVERSAL', desc: 'Descubre 50.' },
  BLACK_HOLE: { id: 'BLACK_HOLE', title: 'SINGULARIDAD', desc: 'Gravedad 1000 Gs.' }, ZERO_G: { id: 'ZERO_G', title: 'FLOTABILIDAD', desc: 'Gravedad 0 Gs.' },
  CRUSHER: { id: 'CRUSHER', title: 'TRITURADORA', desc: 'Presión 1000 ATM.' }, VOID_VACUUM: { id: 'VOID_VACUUM', title: 'VACÍO ESPACIAL', desc: 'Presión 0 ATM.' },
  BLINK: { id: 'BLINK', title: 'PARPADEO', desc: 'Tiempo: 1 Segundo.' }, MAX_ENTROPY: { id: 'MAX_ENTROPY', title: 'ENTROPÍA MÁXIMA', desc: 'Todo al máximo.' },
  BIOLOGIST: { id: 'BIOLOGIST', title: 'LABORATORIO GENÉTICO', desc: '5 orgánicos.' }, TECHNICIAN: { id: 'TECHNICIAN', title: 'INGENIERO INVERSO', desc: '5 sintéticos.' },
  PURE_CHEMISTRY: { id: 'PURE_CHEMISTRY', title: 'TABLA PERIÓDICA', desc: '5 químicos.' }, GEOLOGIST: { id: 'GEOLOGIST', title: 'MINERO GALÁCTICO', desc: '5 materiales.' },
  CHAT_INITIATE: { id: 'CHAT_INITIATE', title: 'HABLANDO CON LA MÁQUINA', desc: 'Consulta a REAKTOR_IA.' }, FRANKENSTEIN: { id: 'FRANKENSTEIN', title: '¡ESTÁ VIVO!', desc: 'Humano + Electricidad.' },
  DEEP_FREEZE: { id: 'DEEP_FREEZE', title: 'CRIOGENIZACIÓN', desc: 'Agua a -273°C.' }, LAVA_MAKER: { id: 'LAVA_MAKER', title: 'VOLCÁN ARTIFICIAL', desc: 'Roca a 5000°C.' },
  CYBORG_CREATOR: { id: 'CYBORG_CREATOR', title: 'CYBERPUNK', desc: 'Humano + Robot (Ficción).' }, JURASSIC_PARK: { id: 'JURASSIC_PARK', title: 'PARQUE JURÁSICO', desc: 'Dinosaurio + 1M Años.' },
  NUCLEAR_FALLOUT: { id: 'NUCLEAR_FALLOUT', title: 'APOCALIPSIS NUCLEAR', desc: 'Uranio + Fuego/Dinamita.' }, GOD_PARTICLE: { id: 'GOD_PARTICLE', title: 'PARTÍCULA DE DIOS', desc: 'Agujero Negro + Antimateria.' },
  DAILY_COMPLETED: { id: 'DAILY_COMPLETED', title: 'OPERARIO DEL MES', desc: 'Completa una DAILY_OP.' }
};

const apiKey = ""; 

// --- APIS ---
async function fetchReactionFromAI(ingredientsString, temp, pressure, gravity, timeStr, isFictionMode) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const promptText = isFictionMode ? `LOG MULTIVERSO. INSUMOS: ${ingredientsString}. VARS: T=${temp}C, P=${pressure}ATM, G=${gravity}G, TIEMPO=${timeStr}. REGLA: MODO FICCION.` : `LOG FÍSICO. INSUMOS: ${ingredientsString}. VARS: T=${temp}C, P=${pressure}ATM, G=${gravity}G, TIEMPO=${timeStr}. REGLA: Realista. Tono clínico.`;
  const payload = { contents: [{ parts: [{ text: promptText }] }], systemInstruction: { parts: [{ text: isFictionMode ? "Eres terminal sandbox sci-fi." : "Eres terminal física. Sin ficción." }] }, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { name: { type: "STRING" }, formula: { type: "STRING" }, emoji: { type: "STRING" }, desc: { type: "STRING" }, success: { type: "BOOLEAN" }, isDangerous: { type: "BOOLEAN" } }, required: ["name", "formula", "emoji", "desc", "success", "isDangerous"] } } };
  for (let i = 0; i <= 3; i++) { try { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error(); return JSON.parse((await r.json()).candidates[0].content.parts[0].text); } catch (e) { if (i === 3) throw e; await new Promise(res => setTimeout(res, 1000)); } }
}

async function fetchImageFromAI(name, desc, isFictionMode) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  const promptStyle = isFictionMode ? "masterpiece, digital art, epic sci-fi style, cyberpunk" : "masterpiece, photorealistic, macro photography, scientific laboratory setting";
  const payload = { instances: [{ prompt: `${promptStyle}. Visual representation of a substance named: "${name}". Description: ${desc}` }], parameters: { sampleCount: 1 } };
  for (let i = 0; i <= 2; i++) { try { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const d = await r.json(); if (d.predictions?.[0]?.bytesBase64Encoded) return `data:image/png;base64,${d.predictions[0].bytesBase64Encoded}`; throw new Error(); } catch (e) { if (i === 2) throw e; await new Promise(res => setTimeout(res, 1000)); } }
}

async function fetchChatAI(userMessage, history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const formattedHistory = history.map(h => `${h.role === 'user' ? 'USUARIO' : 'IA'}: ${h.text}`).join('\n');
  const payload = { contents: [{ parts: [{ text: `HISTORIAL:\n${formattedHistory}\nUSUARIO: ${userMessage}\nIA:` }] }], systemInstruction: { parts: [{ text: "Eres REAKTOR_IA. Ayuda a sintetizar dando receta exacta (ingredientes, vars, modo). Responde CONCISO, MAYÚSCULAS, tono militar." }] } };
  try { const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); return (await r.json()).candidates[0].content.parts[0].text; } catch (e) { return "ERROR DE RED."; }
}

// --- COMPONENTES UI (HOLOGRÁFICOS) ---
const InventoryItem = memo(({ item, onAdd, disabled }) => (
  <button onClick={() => onAdd(item)} disabled={disabled} className="group relative aspect-square flex flex-col items-center justify-center bg-black border border-zinc-800 hover:border-orange-500 hover:bg-[#0a0500] active:scale-95 transition-all duration-100 disabled:opacity-20 cursor-pointer overflow-hidden p-1">
    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>
    <div className="relative z-10 w-full flex-1 flex items-center justify-center bg-zinc-950/80 border border-zinc-800 group-hover:border-orange-500/50 rounded-[2px] mb-1 shadow-[inset_0_0_8px_rgba(0,0,0,1)]">
       <span className="text-xl sm:text-2xl drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all pointer-events-none group-hover:scale-110 duration-200">{item.sym}</span>
    </div>
    <span className="relative z-10 text-[7px] sm:text-[8px] uppercase tracking-tighter leading-none w-full text-center px-0.5 pointer-events-none truncate text-zinc-500 group-hover:text-orange-400 font-bold">{item.name}</span>
    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-700 group-hover:border-orange-500 transition-colors"></div>
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-700 group-hover:border-orange-500 transition-colors"></div>
  </button>
));

const InventoryGrid = memo(({ items, onAdd, disabled, searchQuery }) => {
  const filtered = useMemo(() => { if (!searchQuery) return items; return items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sym.toLowerCase().includes(searchQuery.toLowerCase())); }, [items, searchQuery]);
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 flex-1 overflow-y-auto custom-scrollbar bg-[#050505] p-2">
      {filtered.map((item, idx) => <InventoryItem key={`${item.name}-${idx}`} item={item} onAdd={onAdd} disabled={disabled} />)}
    </div>
  );
});

const ReactorCoreGrid = memo(({ flask }) => {
  if (flask.length === 0) return (<div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 animate-pulse"><Activity className="w-16 h-16 mb-2 opacity-50" /><span className="text-[10px] uppercase tracking-[0.2em]">[ CÁMARA VACÍA ]</span></div>);
  return (
    <div clas
