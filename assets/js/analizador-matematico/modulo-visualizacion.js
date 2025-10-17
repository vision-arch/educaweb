// modulo-visualizacion.js
class ModuloVisualizacion {
    constructor() {
        this.utilidades = new ModuloUtilidades();
    }

    mostrarAnalisis(pasos, expresionOriginal) {
        const contenedor = document.getElementById('analisis-dinamico');
        if (!contenedor) return;
        
        contenedor.innerHTML = this.generarInterfazAnalisis(pasos, expresionOriginal);
        
        const estadoAnalisis = document.getElementById('estado-analisis');
        if (estadoAnalisis) estadoAnalisis.textContent = 'Análisis completado';
        
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }

    generarInterfazAnalisis(pasos, expresionOriginal) {
        return `
            <div class="row">
                <div class="col-12">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Expresión Analizada</h5>
                            <div class="expresion-principal fs-4">
                                ${this.utilidades.destacarElementos(expresionOriginal)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="contenedor-pasos-detallados">
                ${pasos.map((paso, index) => this.generarPasoHTML(paso, index)).join('')}
            </div>
        `;
    }

    generarPasoHTML(paso, index) {
        return `
            <div class="paso-detallado mb-4 ${index === 0 ? 'activo' : ''}" data-paso="${index}">
                <div class="card paso-analisis">
                    <div class="card-body">
                        <div class="paso-header d-flex align-items-center mb-3">
                            <div class="paso-numero bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style="width: 40px; height: 40px;">
                                ${index + 1}
                            </div>
                            <h5 class="paso-titulo mb-0">${paso.titulo}</h5>
                        </div>
                        ${paso.contenido}
                    </div>
                </div>
            </div>
        `;
    }

    generarVistaProcesoResolucion(proceso) {
        let html = `
            <div class="proceso-resolucion">
                <div class="explicacion-paso mb-4">
                    <h6>🎯 Metodología de Resolución</h6>
                    <p>Seguiremos el orden <strong>PAPOMUDAS</strong> con enfoque psicopedagógico:</p>
                    <ul>
                        <li><strong>Qué operación realizamos</strong> y por qué</li>
                        <li><strong>Cómo se realiza</strong> con ejemplos concretos</li>
                        <li><strong>Visualizaciones</strong> para entender el concepto</li>
                        <li><strong>Verificación</strong> del resultado obtenido</li>
                    </ul>
                </div>
        `;
        
        proceso.forEach((paso, index) => {
            html += this.generarPasoResolucionHTML(paso, index);
        });
        
        html += '</div>';
        return html;
    }

    generarPasoResolucionHTML(paso, index) {
        return `
            <div class="paso-resolucion mb-4 p-3 border rounded ${paso.esResultadoFinal ? 'bg-light' : ''}">
                <div class="d-flex align-items-start">
                    <div class="numero-paso bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style="width: 40px; height: 40px; min-width: 40px;">
                        ${index + 1}
                    </div>
                    <div class="flex-grow-1">
                        <div class="expresion-paso fs-5 mb-2 fw-bold">${paso.expresion}</div>
                        <div class="explicacion-detallada">${paso.explicacion}</div>
                        ${paso.ejemploConcreto ? this.generarEjemploHTML(paso.ejemploConcreto) : ''}
                        ${paso.imagenMental ? this.generarImagenMentalHTML(paso.imagenMental) : ''}
                        ${paso.operacionRealizada ? this.generarOperacionHTML(paso.operacionRealizada) : ''}
                        ${paso.verificacion ? this.generarVerificacionHTML(paso.verificacion) : ''}
                    </div>
                </div>
            </div>
        `;
    }

    generarEjemploHTML(ejemplo) {
        return `<div class="ejemplo-conceptual mt-2 p-2 bg-warning bg-opacity-10 rounded">
            <strong>💡 Ejemplo concreto:</strong> ${ejemplo}
        </div>`;
    }

    generarImagenMentalHTML(imagen) {
        return `<div class="imagen-mental mt-2 p-2 bg-info bg-opacity-10 rounded">
            <strong>🖼️ Imagen mental:</strong> ${imagen}
        </div>`;
    }

    generarOperacionHTML(operacion) {
        return `<div class="operacion-realizada mt-2">
            <strong>📝 Operación realizada:</strong> ${operacion}
        </div>`;
    }

    generarVerificacionHTML(verificacion) {
        return `<div class="verificacion-paso mt-2 p-2 bg-success bg-opacity-10 rounded">
            <strong>✅ Verificación:</strong> ${verificacion}
        </div>`;
    }

    actualizarVistaPasos(pasoActual) {
        const pasos = document.querySelectorAll('.paso-detallado');
        pasos.forEach((paso, index) => {
            paso.classList.toggle('activo', index === pasoActual);
        });
    }

    mostrarError(mensaje) {
        const contenedor = document.getElementById('analisis-dinamico');
        if (!contenedor) return;
        
        contenedor.innerHTML = `
            <div class="alert alert-danger">
                <h5>❌ Error en el Análisis</h5>
                <p>${mensaje}</p>
                <button class="btn btn-warning mt-2" onclick="analizador.reiniciarAnalisis()">
                    Intentar de Nuevo
                </button>
            </div>
        `;
    }
}