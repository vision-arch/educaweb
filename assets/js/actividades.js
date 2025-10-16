const actividadesContainer = document.getElementById("actividadesContainer");
const nivelSelect = document.getElementById("nivelSelect");
const asignaturaSelect = document.getElementById("asignaturaSelect");
let actividadesData = [];

// Cargar archivo JSON
fetch("assets/data/actividades.json")
  .then((res) => res.json())
  .then((data) => {
    actividadesData = data;
    mostrarActividades();
  })
  .catch((err) => console.error("Error al cargar actividades:", err));

// Filtros dinámicos
[nivelSelect, asignaturaSelect].forEach((select) =>
  select.addEventListener("change", mostrarActividades)
);

function mostrarActividades() {
  const nivel = nivelSelect.value;
  const asignatura = asignaturaSelect.value;

  const filtradas = actividadesData.filter((act) => {
    return (
      (!nivel || act.nivel === nivel) &&
      (!asignatura || act.asignatura === asignatura)
    );
  });

  if (filtradas.length === 0) {
    actividadesContainer.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        <i class="fas fa-search fa-3x mb-3"></i>
        <p class="fs-5">No hay actividades para esta selección.</p>
        <p class="text-muted">Intenta con otros filtros</p>
      </div>`;
    return;
  }

  actividadesContainer.innerHTML = filtradas
    .map((actividad) => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card actividad-card h-100 shadow-sm border-0" 
             onclick="abrirActividad('${actividad.embedUrl}', '${actividad.titulo}')"
             style="cursor: pointer;">
          <div class="card-img-container position-relative">
            <img src="${actividad.miniatura}" 
                 class="card-img-top" 
                 alt="${actividad.titulo}"
                 style="height: 200px; object-fit: cover;">
            <div class="card-img-overlay d-flex justify-content-center align-items-center">
              <div class="icono-actividad bg-white rounded-circle p-3 shadow">
                <img src="${actividad.icono}" 
                     alt="${actividad.titulo}" 
                     style="width: 40px; height: 40px;">
              </div>
            </div>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-primary">${actividad.titulo}</h5>
            <p class="card-text text-muted">${actividad.descripcion}</p>
            <div class="badge bg-light text-dark mb-2">
              ${actividad.asignatura.toUpperCase()}
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 pb-3">
            <button class="btn btn-primary w-100">
              <i class="fas fa-play me-2"></i>Iniciar Actividad
            </button>
          </div>
        </div>
      </div>
    `).join("");
}

function abrirActividad(embedUrl, titulo) {
  const modal = new bootstrap.Modal(document.getElementById("actividadModal"));
  const iframe = document.getElementById("actividadIframe");
  
  // Configurar el iframe
  iframe.src = embedUrl;
  document.getElementById("actividadTitulo").innerText = titulo;
  
  // Mostrar modal
  modal.show();
  
  // Limpiar iframe cuando se cierre el modal
  document.getElementById('actividadModal').addEventListener('hidden.bs.modal', function () {
    iframe.src = '';
  });
}

// Créditos para Wordwall
function mostrarCreditos() {
  console.log("Actividades interactivas proporcionadas por Wordwall");
  console.log("Visita: https://wordwall.net");
}