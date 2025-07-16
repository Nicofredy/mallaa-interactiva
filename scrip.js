// script.js

const ramos = [
  // Año 1
  { id: "comunicacion", nombre: "Taller de Comunicación Oral y Escrita", requisitos: [] },
  { id: "matematica", nombre: "Matemática General", requisitos: [] },
  { id: "introMed", nombre: "Introducción a la Medicina Veterinaria", requisitos: [] },
  { id: "biocel", nombre: "Biología Celular", requisitos: [] },
  { id: "quimica", nombre: "Química", requisitos: [] },
  { id: "ingles1", nombre: "Inglés I", requisitos: [] },
  { id: "bioestadistica", nombre: "Bioestadística", requisitos: [] },
  { id: "anatomiaCan", nombre: "Anatomía del Canino", requisitos: ["biocel"] },
  { id: "histoemb", nombre: "Histoembriología", requisitos: ["biocel"] },
  { id: "bioquimica", nombre: "Bioquímica", requisitos: ["quimica"] },

  // Año 2
  { id: "ingles2", nombre: "Inglés II", requisitos: ["ingles1"] },
  { id: "medioambiente", nombre: "Medio Ambiente y Gestión Ambiental", requisitos: [] },
  { id: "anatomiaComp", nombre: "Anatomía Comparada", requisitos: ["anatomiaCan"] },
  { id: "zoologia", nombre: "Zoología", requisitos: [] },
  { id: "admin", nombre: "Administración y Emprendimiento Veterinario", requisitos: [] },
  { id: "microbiologia", nombre: "Microbiología General y Veterinaria", requisitos: ["bioquimica"] },
  { id: "fisioanimal", nombre: "Fisiología Animal", requisitos: ["bioquimica"] },
  { id: "enferParasitarias", nombre: "Enfermedades Parasitarias", requisitos: ["microbiologia"] },
  { id: "genetica", nombre: "Genética", requisitos: ["bioquimica"] },

  // Año 3
  { id: "repro", nombre: "Reproducción e Inseminación Artificial", requisitos: ["fisioanimal"] },
  { id: "inmunologia", nombre: "Inmunología", requisitos: ["microbiologia"] },
  { id: "fisiopato", nombre: "Fisiopatología", requisitos: ["fisioanimal"] },
  { id: "etologia", nombre: "Etología y Bienestar Animal", requisitos: [] },
  { id: "tecAlimentos", nombre: "Tecnología de los Alimentos", requisitos: ["bioquimica"] },
  { id: "nutricion", nombre: "Nutrición y Alimentación Animal", requisitos: ["fisioanimal"] },
  { id: "patologiaSist", nombre: "Patología de Sistemas", requisitos: ["fisiopato"] },

  // Año 4
  { id: "obstetricia", nombre: "Obstetricia y Ginecología", requisitos: ["repro"] },
  { id: "controlCalidad", nombre: "Control de Calidad de los Alimentos", requisitos: ["tecAlimentos"] },
  { id: "prodAvicola", nombre: "Producción Avícola", requisitos: ["nutricion"] },
  { id: "farmaco", nombre: "Farmacología y Toxicología", requisitos: ["fisioanimal"] },
  { id: "enferInfecciosas", nombre: "Enfermedades Infecciosas", requisitos: ["microbiologia"] },
  { id: "labClinico", nombre: "Laboratorio Clínico", requisitos: ["enferInfecciosas"] },
  { id: "prodOvinos", nombre: "Producción Ovinos y Caprinos", requisitos: ["nutricion"] },
  { id: "prodPorcina", nombre: "Producción Porcina", requisitos: ["nutricion"] },
  { id: "epidemio", nombre: "Epidemiología Veterinaria", requisitos: ["bioestadistica"] },
  { id: "semiologia", nombre: "Semiología", requisitos: ["patologiaSist"] },

  // Año 5
  { id: "cirugia", nombre: "Cirugía General", requisitos: ["semiologia"] },
  { id: "medMayores", nombre: "Medicina de Animales Mayores", requisitos: ["semiologia"] },
  { id: "medCaninos", nombre: "Medicina de Caninos", requisitos: ["semiologia"] },
  { id: "medFelinos", nombre: "Medicina de Felinos", requisitos: ["semiologia"] },
  { id: "medExoticos", nombre: "Medicina de Animales Exóticos", requisitos: ["semiologia"] },
  { id: "formulacion", nombre: "Formulación y Evaluación de Proyectos Agropecuarios", requisitos: [] },
  { id: "acuicola", nombre: "Producción Acuícola", requisitos: ["nutricion"] },
  { id: "bovinos", nombre: "Producción de Bovinos de Carne y Leche", requisitos: ["nutricion"] },
  { id: "patologiaQ", nombre: "Patología Quirúrgica", requisitos: ["cirugia"] },
  { id: "diagnostico", nombre: "Diagnóstico por Imágenes", requisitos: ["semiologia"] },

  // Año 5 Final
  { id: "farmacoAplicada", nombre: "Farmacología Aplicada", requisitos: ["farmaco"] },
  { id: "saludPublica", nombre: "Salud Pública", requisitos: ["epidemio"] },
  { id: "investigacion", nombre: "Metodología de la Investigación", requisitos: [] },
  { id: "clinicaMenores", nombre: "Clínica de Animales Menores", requisitos: ["medCaninos", "medFelinos"] },
  { id: "clinicaMayores", nombre: "Clínica de Animales Mayores", requisitos: ["medMayores"] },
  { id: "practicaFinal", nombre: "Práctica Final", requisitos: ["clinicaMenores", "clinicaMayores"] },
  { id: "titulo", nombre: "Trabajo de Titulación", requisitos: ["investigacion"] },
  { id: "practicaBasica", nombre: "Práctica Básica", requisitos: [] },
  { id: "practicaIntermedia", nombre: "Práctica Intermedia", requisitos: [] }
];

const mallaDiv = document.getElementById("malla");

function crearMalla() {
  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo bloqueado";
    div.textContent = ramo.nombre;
    div.id = ramo.id;
    div.onclick = () => aprobarRamo(ramo.id);
    mallaDiv.appendChild(div);
  });
  actualizarEstado();
}

function aprobarRamo(id) {
  const div = document.getElementById(id);
  if (!div.classList.contains("bloqueado")) {
    div.classList.toggle("aprobado");
    actualizarEstado();
  }
}

function actualizarEstado() {
  const aprobados = ramos.filter(r => document.getElementById(r.id).classList.contains("aprobado")).map(r => r.id);

  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    const desbloqueado = ramo.requisitos.every(req => aprobados.includes(req));

    if (desbloqueado) {
      div.classList.remove("bloqueado");
    } else if (!div.classList.contains("aprobado")) {
      div.classList.add("bloqueado");
    }
  });
}

crearMalla();

