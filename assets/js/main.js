/* carga automaticamente el header y footer */
// Cargar componentes comunes
document.addEventListener("DOMContentLoaded", () => {
  // Cargar Header
  fetch("components/header.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("header").innerHTML = data));

  // Cargar Footer
  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
});

/* carga automaticamente el header y footer */

