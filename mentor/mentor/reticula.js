const derecho = {
  primero: [
    {
      name: "INTRODUCCIÓN AL DERECHO",
      clave: "LDNE101",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "INFORMÁTICA",
      clave: "LDNE102",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "TEORÍA DEL DERECHO Y SUS FUNDAMENTOS",
      clave: "LDNE103",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "DERECHO CIVIL. PERSONAS Y FAMILIAS",
      clave: "LDNE104",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "DERECHO CIVIL. SUCESIONES",
      clave: "LDNE105",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
  ],
  segundo: [
    {
      name: "ANÁLISIS SOCIOPOLÍTICOS Y ECONÓMICOS DE MÉXICO",
      clave: "LDNE201",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIÓN APLICADA EN DERECHO",
      clave: "LDNE202",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "HISTORIA DEL DERECHO MEXICANO",
      clave: "LDNE203",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "DERECHO CIVIL. OBLIGACIONES Y CONTRATOS",
      clave: "LDNE204",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
    {
      name: "RESPONSABILIDAD CIVIL",
      clave: "LDNE205",
      obligatorio: 1,
      campo1: 0,
      campo2: 96,
      campo3: 6.0,
      campo4: "H.I.",
    },
  ],
};

derecho.primero.forEach((materia) => {
  console.log(materia);
  const containerREticula = document.getElementById("print-materias");
  let reticulaHtml = "";
  const { name, clave, obligatorio, campo1, campo2, campo3, campo4 } = materia;
  reticulaHtml += `
      <div class="content-reticula">
      <div class="claves">
        <div class="clave"><p>${clave}</p></div>
        <div class="clave"><p>${campo1}</p></div>
        <div class="clave"><p>${
          obligatorio == 1 ? "Obligatorio" : "No obligatorio"
        }</p></div>
      </div>
      <div class="nombre-materia">
        <h5>${name}</h5>
      </div>
      <div class="claves">
        <div class="clave"><p>${campo2}</p></div>
        <div class="clave"><p>${campo3}</p></div>
        <div class="clave"><p>${campo4}</p></div>
      </div>
    </div>
  `;
  containerREticula.innerHTML += reticulaHtml;
});

derecho.segundo.forEach((materia) => {
  console.log(materia);
  const containerREticula = document.getElementById("print-materias2");
  let reticulaHtml = "";
  const { name, clave, obligatorio, campo1, campo2, campo3, campo4 } = materia;
  reticulaHtml += `
      <div class="content-reticula">
      <div class="claves">
        <div class="clave"><p>${clave}</p></div>
        <div class="clave"><p>${campo1}</p></div>
        <div class="clave"><p>${
          obligatorio == 1 ? "Obligatorio" : "No obligatorio"
        }</p></div>
      </div>
      <div class="nombre-materia">
        <h5>${name}</h5>
      </div>
      <div class="claves">
        <div class="clave"><p>${campo2}</p></div>
        <div class="clave"><p>${campo3}</p></div>
        <div class="clave"><p>${campo4}</p></div>
      </div>
    </div>
  `;
  containerREticula.innerHTML += reticulaHtml;
});
