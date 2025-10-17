// modulo-explicaciones.js
class ModuloExplicaciones {
    constructor() {
        this.copisi = new ModuloCOPISI();
        this.utilidades = new ModuloUtilidades();
    }

    generarAnalisisEstructural(expresion, componentes) {
        return `
            <div class="expresion-principal">
                ${this.utilidades.destacarElementos(expresion)}
            </div>
            ${this.generarComponentesIdentificados(componentes)}
            ${this.generarExplicacionPAPOMUDAS()}
            ${this.copisi.generarExplicacionCOPISI()}
        `;
    }

    generarComponentesIdentificados(componentes) {
        return `
            <div class="explicacion-paso">
                <h6>📊 Componentes Identificados:</h6>
                <ul>${componentes.lista.map(comp => `<li>${comp}</li>`).join('')}</ul>
            </div>
        `;
    }

    generarExplicacionPAPOMUDAS() {
        return `
            <div class="explicacion-paso">
                <h6>🎯 Orden de Operaciones (PAPOMUDAS):</h6>
                <div class="row text-center">
                    ${this.generarTarjetasPrioridad()}
                </div>
                <p class="mt-3"><em>Piensa en PAPOMUDAS como una jerarquía: primero lo que está más arriba, luego lo que sigue.</em></p>
            </div>
        `;
    }

    generarTarjetasPrioridad() {
        const prioridades = [
            { letra: 'PA', nombre: 'Paréntesis', clase: 'bg-danger text-white' },
            { letra: 'PO', nombre: 'Potencias', clase: 'bg-warning text-dark' },
            { letra: 'MU', nombre: 'Multiplicación', clase: 'bg-info text-white' },
            { letra: 'D', nombre: 'División', clase: 'bg-info text-white' },
            { letra: 'A', nombre: 'Adición', clase: 'bg-success text-white' },
            { letra: 'S', nombre: 'Sustracción', clase: 'bg-success text-white' }
        ];

        return prioridades.map(p => `
            <div class="col-md-2 mb-2">
                <div class="prioridad-item ${p.clase} p-2 rounded">
                    <strong>${p.letra}</strong><br>${p.nombre}
                </div>
            </div>
        `).join('');
    }

    generarPasoInicial(expresion) {
        return {
            expresion: this.utilidades.destacarElementos(expresion),
            explicacion: this.generarExplicacionInicial(),
            ejemploConcreto: "Imagina que estás siguiendo una receta: cada paso debe hacerse en orden para obtener el plato final correcto.",
            imagenMental: "Visualiza cada operación como un paso en un camino que te lleva al resultado final.",
            esFinal: false
        };
    }

    generarExplicacionInicial() {
        return `
            <div class="analisis-inicial">
                <p><strong>Análisis inicial de la expresión:</strong></p>
                <p>Vamos a descomponer esta expresión matemática siguiendo el orden PAPOMUDAS:</p>
                <div class="ms-3">
                    <strong>PA</strong>réntesis → <strong>PO</strong>tencias → <strong>MU</strong>ltiplicación → 
                    <strong>D</strong>ivisión → <strong>A</strong>dición → <strong>S</strong>ustracción
                </div>
                <p class="mt-2"><em>Este orden garantiza que obtendremos el resultado correcto.</em></p>
            </div>
        `;
    }

    generarExplicacionPotencia(expresion) {
        const match = expresion.match(/(\d+)²/);
        if (!match) return null;

        const base = parseInt(match[1]);
        const resultado = base * base;
        const nuevaExpresion = expresion.replace('²', `² = ${resultado}`);

        return {
            expresion: this.utilidades.destacarElementos(nuevaExpresion),
            explicacion: this.copisi.generarExplicacionPotenciaCOPISI(base, resultado),
            ejemploConcreto: `Si tienes un jardín cuadrado de ${base}m × ${base}m, su área es ${resultado}m².`,
            imagenMental: `Visualiza un cuadrado dividido en ${base} filas y ${base} columnas, formando ${resultado} cuadritos pequeños.`,
            operacion: `Potencia: ${base}² = ${resultado}`,
            verificacion: `Comprobación: ${resultado} ÷ ${base} = ${base}`,
            esFinal: false
        };
    }

    generarExplicacionMultiplicacion(expresion) {
        const match = expresion.match(/(\d+)\s*×\s*(\d+)/);
        if (!match) return null;

        const izquierda = parseInt(match[1]);
        const derecha = parseInt(match[2]);
        const resultado = izquierda * derecha;
        const nuevaExpresion = expresion.replace(`${izquierda}×${derecha}`, `${izquierda}×${derecha} = ${resultado}`);

        return {
            expresion: this.utilidades.destacarElementos(nuevaExpresion),
            explicacion: this.copisi.generarExplicacionMultiplicacionCOPISI(izquierda, derecha, resultado),
            ejemploConcreto: `Si tienes ${izquierda} cajas con ${derecha} galletas cada una, tienes ${resultado} galletas en total.`,
            imagenMental: `Visualiza ${izquierda} filas de puntos, con ${derecha} puntos en cada fila.`,
            operacion: `Multiplicación: ${izquierda} × ${derecha} = ${resultado}`,
            verificacion: `Comprobación: ${resultado} ÷ ${izquierda} = ${derecha}`,
            esFinal: false
        };
    }

    generarExplicacionSuma(expresion) {
        const match = expresion.match(/(\d+)\s*\+\s*(\d+)/);
        if (!match) return null;

        const izquierda = parseInt(match[1]);
        const derecha = parseInt(match[2]);
        const resultado = izquierda + derecha;
        const nuevaExpresion = expresion.replace(`${izquierda}+${derecha}`, `${izquierda}+${derecha} = ${resultado}`);

        return {
            expresion: this.utilidades.destacarElementos(nuevaExpresion),
            explicacion: this.copisi.generarExplicacionSumaCOPISI(izquierda, derecha, resultado),
            ejemploConcreto: `Si tienes ${izquierda} manzanas y compras ${derecha} más, ahora tienes ${resultado} manzanas.`,
            imagenMental: `Visualiza una línea numérica: empiezas en ${izquierda} y avanzas ${derecha} lugares hasta llegar a ${resultado}.`,
            operacion: `Suma: ${izquierda} + ${derecha} = ${resultado}`,
            verificacion: `Comprobación: ${resultado} - ${derecha} = ${izquierda}`,
            esFinal: false
        };
    }

    generarReflexionFinal(expresion) {
        return `
            <div class="reflexion-container">
                ${this.generarPreguntasProfundizar()}
                ${this.generarEstrategiasAprendizaje()}
                ${this.generarMensajePsicopedagogico()}
                ${this.generarBotonReinicio()}
            </div>
        `;
    }

    generarReflexionFinalPedagogica(expresionOriginal, resultado) {
        return `
            <div class="reflexion-final">
                <h6>🎉 ¡RESOLUCIÓN COMPLETADA!</h6>
                ${this.copisi.generarResumenLogros()}
                ${this.generarResumenProceso(expresionOriginal, resultado)}
                ${this.copisi.generarPreguntasReflexion()}
            </div>
        `;
    }

    generarPreguntasProfundizar() {
        return `
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="reflexion-item p-3 bg-light rounded">
                        <h6>🤔 Preguntas para Profundizar</h6>
                        <ul class="mb-0">
                            <li><small>¿Qué patrón matemático identificas en esta expresión?</small></li>
                            <li><small>¿Cómo verificarías que tu resultado es correcto?</small></li>
                            <li><small>¿En qué situación de la vida real usarías esta operación?</small></li>
                        </ul>
                    </div>
                </div>
        `;
    }

    generarEstrategiasAprendizaje() {
        return `
                <div class="col-md-6 mb-3">
                    <div class="reflexion-item p-3 bg-light rounded">
                        <h6>💡 Estrategias de Aprendizaje</h6>
                        <ul class="mb-0">
                            <li><small>Practica con expresiones similares para ganar confianza</small></li>
                            <li><small>Descompón problemas complejos en pasos más simples</small></li>
                            <li><small>Relaciona las matemáticas con situaciones de la vida real</small></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    generarMensajePsicopedagogico() {
        return `
            <div class="mt-3 p-3 bg-primary text-white rounded">
                <h6>🎯 Mensaje Psicopedagógico</h6>
                <p class="mb-2"><small><strong>"Comprender el proceso es más importante que memorizar el resultado"</strong></small></p>
                <p class="mb-0"><small>Cada expresión matemática cuenta una historia. Tu trabajo no es solo obtener 
                la respuesta correcta, sino entender el camino que te lleva a ella.</small></p>
            </div>
        `;
    }

    generarBotonReinicio() {
        return `
            <div class="mt-3 text-center">
                <button class="btn btn-outline-primary" onclick="analizador.reiniciarAnalisis()">
                    🔄 Analizar Otra Expresión
                </button>
            </div>
        `;
    }

    generarResumenProceso(expresionOriginal, resultado) {
        return `
            <div class="mb-3 p-3 bg-success text-white rounded">
                <h6>📚 Resumen del Proceso:</h6>
                <p class="mb-1"><strong>Expresión original:</strong> ${expresionOriginal}</p>
                <p class="mb-1"><strong>Proceso seguido:</strong> Potencias → Multiplicación → Suma</p>
                <p class="mb-0"><strong>Resultado final:</strong> ${resultado}</p>
            </div>
        `;
    }
}