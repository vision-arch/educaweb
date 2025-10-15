const actividadesContainer = document.getElementById("actividadesContainer");
const nivelSelect = document.getElementById("nivelSelect");
const asignaturaSelect = document.getElementById("asignaturaSelect");
let actividadesData = [];

// Cargar archivo JSON
fetch("assets/data/actividades.json")
  .then((res) => res.json())
  .then((data) => (actividadesData = data))
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
      <div class="col-12 text-center text-muted">
        <p>No hay actividades para esta selección.</p>
      </div>`;
    return;
  }

  actividadesContainer.innerHTML = filtradas
    .map(
      (a) => `
    <div class="col-md-4">
      <div class="card shadow-sm border-0 h-100">
        <div class="card-body text-center">
          <img src="${a.icono}" alt="${a.titulo}" class="icon mb-3" />
          <h5 class="fw-bold">${a.titulo}</h5>
          <p class="text-muted">${a.descripcion}</p>
          <button class="btn btn-primary" onclick="abrirActividad('${a.url}', '${a.titulo}')">
            Ver Actividad
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function abrirActividad(url, titulo) {
  const modal = new bootstrap.Modal(document.getElementById("actividadModal"));
  document.getElementById("actividadIframe").src = url;
  document.getElementById("actividadTitulo").innerText = titulo;
  modal.show();
}
