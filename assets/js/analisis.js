// ===== ANALIZADOR MATEMÁTICO PSICOPEDAGÓGICO =====
class AnalizadorMatematico {
    constructor() {
        this.pasos = [];
        this.pasoActual = 0;
        this.expresionOriginal = '';
        this.inicializarAnalizador();
    }

    inicializarAnalizador() {
        this.inicializarEventos();
        this.inicializarNavegacion();
    }

    inicializarEventos() {
        document.addEventListener('expresionParaAnalizar', (event) => {
            const { expresion, expresionComputable } = event.detail;
            this.analizarExpresionCompleta(expresion, expresionComputable);
        });

        const display = document.getElementById('display-matematico');
        if (display) {
            display.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const expresion = e.target.value.trim();
                    if (expresion) {
                        this.analizarExpresionCompleta(expresion, expresion);
                    }
                }
            });
        }
    }

    inicializarNavegacion() {
        const btnPrev = document.getElementById('btn-prev-paso');
        const btnNext = document.getElementById('btn-next-paso');
        
        if (btnPrev) btnPrev.addEventListener('click', () => this.pasoAnterior());
        if (btnNext) btnNext.addEventListener('click', () => this.pasoSiguiente());
    }

    // ===== ANÁLISIS PRINCIPAL =====
    analizarExpresionCompleta(expresion, expresionComputable) {
        try {
            this.prepararInterfaz();
            this.expresionOriginal = expresion;
            this.pasos = [];
            this.pasoActual = 0;

            this.analizarEstructuraGeneral(expresion);
            this.generarProcesoResolucionCompleto(expresion);
            this.generarReflexionFinal(expresion);

            this.mostrarAnalisis();
            
        } catch (error) {
            this.mostrarError(`Error en el análisis: ${error.message}`);
        }
    }

    prepararInterfaz() {
        const vistaInicial = document.getElementById('vista-inicial');
        const analisisDinamico = document.getElementById('analisis-dinamico');
        const estadoAnalisis = document.getElementById('estado-analisis');
        
        if (vistaInicial) vistaInicial.style.display = 'none';
        if (analisisDinamico) analisisDinamico.style.display = 'block';
        if (estadoAnalisis) estadoAnalisis.textContent = 'Analizando expresión...';
    }

    // ===== ANÁLISIS ESTRUCTURAL MEJORADO =====
    analizarEstructuraGeneral(expresion) {
        this.pasos.push({
            tipo: 'estructura',
            titulo: '🔍 Análisis Inicial de la Expresión',
            contenido: this.generarAnalisisEstructural(expresion),
            expresion: expresion
        });
    }

    generarAnalisisEstructural(expresion) {
        const componentes = this.identificarComponentes(expresion);
        return `
            <div class="expresion-principal">
                ${this.destacarElementosCorrectamente(expresion)}
            </div>
            <div class="explicacion-paso">
                <h6>📊 Componentes Identificados:</h6>
                <ul>
                    ${componentes.lista.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>
            <div class="explicacion-paso">
                <h6>🎯 Orden de Operaciones (PAPOMUDAS):</h6>
                <div class="row text-center">
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-danger text-white p-2 rounded">
                            <strong>PA</strong><br>Paréntesis
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-warning text-dark p-2 rounded">
                            <strong>PO</strong><br>Potencias
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-info text-white p-2 rounded">
                            <strong>M</strong><br>Multiplicación
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-info text-white p-2 rounded">
                            <strong>D</strong><br>División
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-success text-white p-2 rounded">
                            <strong>A</strong><br>Adición
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="prioridad-item bg-success text-white p-2 rounded">
                            <strong>S</strong><br>Sustracción
                        </div>
                    </div>
                </div>
                <p class="mt-3"><em>Piensa en PAPOMUDAS como una jerarquía: primero lo que está más arriba, luego lo que sigue.</em></p>
            </div>
            ${this.generarExplicacionCOPISI()}
        `;
    }

    generarExplicacionCOPISI() {
        return `
            <div class="copisi-container mt-4 p-3 bg-light rounded">
                <h6>🧠 Enfoque COPISI para entender matemáticas:</h6>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="copisi-item p-3 bg-white rounded shadow-sm">
                            <strong>🎯 CONCRETO</strong>
                            <p class="mb-1"><small>Pensemos en objetos reales: manzanas, bloques, personas...</small></p>
                            <p class="mb-0"><small>Ejemplo: 4² son 4 filas de 4 manzanas cada una.</small></p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="copisi-item p-3 bg-white rounded shadow-sm">
                            <strong>🖼️ PICTÓRICO</strong>
                            <p class="mb-1"><small>Visualicemos con dibujos y diagramas.</small></p>
                            <p class="mb-0"><small>Dibuja cuadrados para potencias, grupos para multiplicaciones.</small></p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="copisi-item p-3 bg-white rounded shadow-sm">
                            <strong>🔢 SIMBÓLICO</strong>
                            <p class="mb-1"><small>Finalmente usamos números y símbolos.</small></p>
                            <p class="mb-0"><small>Este es el lenguaje matemático formal.</small></p>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <strong>💡 Estrategia de aprendizaje:</strong> 
                    <small>Siempre que veas una expresión matemática, trata de imaginarla en situaciones de la vida real.</small>
                </div>
            </div>
        `;
    }

    identificarComponentes(expresion) {
        const parentesis = this.contarParentesis(expresion);
        const operadores = this.identificarOperadores(expresion);
        const funciones = this.identificarFunciones(expresion);
        const constantes = this.identificarConstantes(expresion);
        const numeros = this.identificarNumeros(expresion);

        const lista = [];
        if (parentesis.total > 0) {
            lista.push(`<strong>${parentesis.total} paréntesis</strong> - Agrupan operaciones prioritarias`);
        }
        if (operadores.length > 0) {
            const operadoresUnicos = [...new Set(operadores)];
            lista.push(`<strong>${operadores.length} operadores</strong> - ${operadoresUnicos.join(', ')}`);
        }
        if (funciones.length > 0) {
            lista.push(`<strong>Funciones matemáticas</strong> - ${funciones.join(', ')}`);
        }
        if (constantes.length > 0) {
            lista.push(`<strong>Constantes</strong> - ${constantes.join(', ')}`);
        }
        if (numeros.length > 0) {
            lista.push(`<strong>${numeros.length} números</strong> - Valores a operar`);
        }

        return { lista };
    }

    // ===== PROCESO DE RESOLUCIÓN PSICOPEDAGÓGICO =====
    generarProcesoResolucionCompleto(expresion) {
        this.pasos.push({
            tipo: 'resolucion',
            titulo: '🔄 Proceso de Resolución Paso a Paso',
            contenido: this.generarResolucionConExplicaciones(expresion),
            expresion: this.expresionOriginal
        });
    }

    generarResolucionConExplicaciones(expresionOriginal) {
        try {
            const pasosDetallados = this.generarResolucionDetalladaConExplicaciones(expresionOriginal);
            
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
            
            pasosDetallados.forEach((paso, index) => {
                html += `
                    <div class="paso-resolucion mb-4 p-3 border rounded ${paso.esResultadoFinal ? 'bg-light' : ''}">
                        <div class="d-flex align-items-start">
                            <div class="numero-paso bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style="width: 40px; height: 40px; min-width: 40px;">
                                ${index + 1}
                            </div>
                            <div class="flex-grow-1">
                                <div class="expresion-paso fs-5 mb-2 fw-bold">${paso.expresion}</div>
                                <div class="explicacion-detallada">
                                    ${paso.explicacion}
                                </div>
                                ${paso.ejemploConcreto ? `
                                    <div class="ejemplo-conceptual mt-2 p-2 bg-warning bg-opacity-10 rounded">
                                        <strong>💡 Ejemplo concreto:</strong> ${paso.ejemploConcreto}
                                    </div>
                                ` : ''}
                                ${paso.imagenMental ? `
                                    <div class="imagen-mental mt-2 p-2 bg-info bg-opacity-10 rounded">
                                        <strong>🖼️ Imagen mental:</strong> ${paso.imagenMental}
                                    </div>
                                ` : ''}
                                ${paso.operacionRealizada ? `
                                    <div class="operacion-realizada mt-2">
                                        <strong>📝 Operación realizada:</strong> ${paso.operacionRealizada}
                                    </div>
                                ` : ''}
                                ${paso.verificacion ? `
                                    <div class="verificacion-paso mt-2 p-2 bg-success bg-opacity-10 rounded">
                                        <strong>✅ Verificación:</strong> ${paso.verificacion}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            return html;
        } catch (error) {
            return `<div class="alert alert-warning">No se pudo generar la resolución: ${error.message}</div>`;
        }
    }

    generarResolucionDetalladaConExplicaciones(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Paso 1: Análisis inicial
        pasos.push({
            expresion: this.destacarElementosCorrectamente(expresionActual),
            explicacion: `
                <div class="analisis-inicial">
                    <p><strong>Análisis inicial de la expresión:</strong></p>
                    <p>Vamos a descomponer esta expresión matemática siguiendo el orden PAPOMUDAS:</p>
                    <div class="ms-3">
                        <strong>PA</strong>réntesis → <strong>PO</strong>tencias → <strong>MU</strong>ltiplicación → 
                        <strong>D</strong>ivisión → <strong>A</strong>dición → <strong>S</strong>ustracción
                    </div>
                    <p class="mt-2"><em>Este orden garantiza que obtendremos el resultado correcto.</em></p>
                </div>
            `,
            ejemploConcreto: "Imagina que estás siguiendo una receta: cada paso debe hacerse en orden para obtener el plato final correcto.",
            imagenMental: "Visualiza cada operación como un paso en un camino que te lleva al resultado final."
        });

        // Resolver paso a paso
        const proceso = this.obtenerProcesoResolucion(expresionActual);
        
        proceso.forEach((etapa, index) => {
            if (etapa) {
                pasos.push({
                    expresion: this.destacarElementosCorrectamente(etapa.expresion),
                    explicacion: etapa.explicacion,
                    ejemploConcreto: etapa.ejemploConcreto,
                    imagenMental: etapa.imagenMental,
                    operacionRealizada: etapa.operacion,
                    verificacion: etapa.verificacion,
                    esResultadoFinal: etapa.esFinal || false
                });
                
                expresionActual = etapa.expresion;
            }
        });

        return pasos;
    }

    obtenerProcesoResolucion(expresion) {
        const pasos = [];
        let currentExpresion = expresion;

        // Paso 1: Identificar y resolver potencias
        if (currentExpresion.includes('²')) {
            const paso = this.resolverPotenciaConEnfoquePedagogico(currentExpresion);
            if (paso) {
                pasos.push(paso);
                currentExpresion = this.extraerExpresionActual(paso.expresion);
            }
        }

        // Paso 2: Identificar y resolver multiplicaciones
        const pasoMultiplicacion = this.resolverMultiplicacionConEnfoquePedagogico(currentExpresion);
        if (pasoMultiplicacion) {
            pasos.push(pasoMultiplicacion);
            currentExpresion = this.extraerExpresionActual(pasoMultiplicacion.expresion);
        }

        // Paso 3: Resolver suma final
        const pasoSuma = this.resolverSumaConEnfoquePedagogico(currentExpresion);
        if (pasoSuma) {
            pasos.push(pasoSuma);
            currentExpresion = this.extraerExpresionActual(pasoSuma.expresion);
        }

        // Paso final
        try {
            const resultado = this.evaluarExpresionSegura(this.prepararExpresionParaEvaluacion(currentExpresion));
            pasos.push({
                expresion: `<span class="resultado-final fs-4 text-success">= ${resultado}</span>`,
                explicacion: this.generarReflexionFinalPedagogica(this.expresionOriginal, resultado),
                ejemploConcreto: "¡Has completado el proceso matemático! Como seguir una receta paso a paso hasta obtener el plato final.",
                imagenMental: "Imagina que cada operación matemática es un escalón que te lleva a la respuesta correcta.",
                operacion: "Resolución completa",
                verificacion: `Comprobación final: ${this.expresionOriginal} = ${resultado}`,
                esFinal: true
            });
        } catch (error) {
            pasos.push({
                expresion: "Error en cálculo final",
                explicacion: "No se pudo obtener el resultado final de la expresión.",
                ejemploConcreto: "A veces necesitamos revisar nuestros pasos, como cuando una receta no sale bien.",
                esFinal: true
            });
        }

        return pasos;
    }

    extraerExpresionActual(expresionConHTML) {
        // Extraer solo la expresión matemática sin HTML de destacado
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = expresionConHTML;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    resolverPotenciaConEnfoquePedagogico(expresion) {
        const match = expresion.match(/(\d+)²/);
        if (!match) return null;

        const base = parseInt(match[1]);
        const resultado = base * base;
        const nuevaExpresion = expresion.replace('²', `² = ${resultado}`);

        return {
            expresion: this.destacarElementosCorrectamente(nuevaExpresion),
            explicacion: `
                <div class="paso-detallado">
                    <h6>⚡ PASO 1: Resolver la Potencia ${base}²</h6>
                    <p><strong>¿Qué es una potencia?</strong></p>
                    <p>Una potencia es una multiplicación repetida. ${base}² significa <strong>"${base} multiplicado por sí mismo"</strong>.</p>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <strong>🎯 CONCRETO:</strong>
                            <p>Imagina un cuadrado con ${base} filas y ${base} columnas:</p>
                            <div class="cuadrado-visual mb-2">
                                ${this.generarCuadradoVisual(base)}
                            </div>
                            <p><small>Total: ${base} × ${base} = ${resultado} unidades</small></p>
                        </div>
                        <div class="col-md-6">
                            <strong>🔢 SIMBÓLICO:</strong>
                            <p>${base}² = ${base} × ${base} = ${resultado}</p>
                            <p><strong>Regla PAPOMUDAS:</strong> Las potencias se resuelven antes que multiplicaciones y sumas.</p>
                        </div>
                    </div>
                </div>
            `,
            ejemploConcreto: `Si tienes un jardín cuadrado de ${base}m × ${base}m, su área es ${resultado}m².`,
            imagenMental: `Visualiza un cuadrado dividido en ${base} filas y ${base} columnas, formando ${resultado} cuadritos pequeños.`,
            operacion: `Potencia: ${base}² = ${resultado}`,
            verificacion: `Comprobación: ${resultado} ÷ ${base} = ${base}`,
            esFinal: false
        };
    }

    generarCuadradoVisual(lado) {
        let html = '<div style="display: inline-block; border: 2px solid #333; padding: 5px; font-family: monospace;">';
        for (let i = 0; i < lado; i++) {
            html += '<div style="display: flex;">';
            for (let j = 0; j < lado; j++) {
                html += '<div style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">■</div>';
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    resolverMultiplicacionConEnfoquePedagogico(expresion) {
        const match = expresion.match(/(\d+)\s*×\s*(\d+)/);
        if (!match) return null;

        const izquierda = parseInt(match[1]);
        const derecha = parseInt(match[2]);
        const resultado = izquierda * derecha;
        const nuevaExpresion = expresion.replace(`${izquierda}×${derecha}`, `${izquierda}×${derecha} = ${resultado}`);

        return {
            expresion: this.destacarElementosCorrectamente(nuevaExpresion),
            explicacion: `
                <div class="paso-detallado">
                    <h6>✖️ PASO 2: Resolver la Multiplicación ${izquierda}×${derecha}</h6>
                    <p><strong>¿Qué es multiplicar?</strong></p>
                    <p>Multiplicar es <strong>sumar repetidamente</strong>. ${izquierda}×${derecha} significa <strong>"sumar ${derecha}, ${izquierda} veces"</strong>.</p>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <strong>🎯 CONCRETO:</strong>
                            <p>Imagina ${izquierda} filas con ${derecha} objetos en cada una:</p>
                            <div class="grupos-visuales mb-2">
                                ${this.generarGruposVisuales(izquierda, derecha)}
                            </div>
                            <p><small>Total: ${izquierda} grupos de ${derecha} = ${resultado} objetos</small></p>
                        </div>
                        <div class="col-md-6">
                            <strong>🔢 SIMBÓLICO:</strong>
                            <p>${izquierda} × ${derecha} = ${Array(izquierda).fill(derecha).join(' + ')} = ${resultado}</p>
                            <p><strong>Regla PAPOMUDAS:</strong> La multiplicación se resuelve antes que la suma.</p>
                        </div>
                    </div>
                </div>
            `,
            ejemploConcreto: `Si tienes ${izquierda} cajas con ${derecha} galletas cada una, tienes ${resultado} galletas en total.`,
            imagenMental: `Visualiza ${izquierda} filas de puntos, con ${derecha} puntos en cada fila.`,
            operacion: `Multiplicación: ${izquierda} × ${derecha} = ${resultado}`,
            verificacion: `Comprobación: ${resultado} ÷ ${izquierda} = ${derecha}`,
            esFinal: false
        };
    }

    generarGruposVisuales(filas, columnas) {
        let html = '<div style="font-family: monospace;">';
        for (let i = 0; i < filas; i++) {
            html += `<div class="mb-1"><small>Grupo ${i + 1}: ${'•'.repeat(columnas)}</small></div>`;
        }
        html += '</div>';
        return html;
    }

    resolverSumaConEnfoquePedagogico(expresion) {
        const match = expresion.match(/(\d+)\s*\+\s*(\d+)/);
        if (!match) return null;

        const izquierda = parseInt(match[1]);
        const derecha = parseInt(match[2]);
        const resultado = izquierda + derecha;
        const nuevaExpresion = expresion.replace(`${izquierda}+${derecha}`, `${izquierda}+${derecha} = ${resultado}`);

        return {
            expresion: this.destacarElementosCorrectamente(nuevaExpresion),
            explicacion: `
                <div class="paso-detallado">
                    <h6>➕ PASO 3: Resolver la Suma ${izquierda} + ${derecha}</h6>
                    <p><strong>¿Qué es sumar?</strong></p>
                    <p>Sumar es <strong>combinar o juntar</strong> cantidades.</p>
                    
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <strong>🎯 CONCRETO:</strong>
                            <p>Tenemos ${izquierda} objetos y agregamos ${derecha} más:</p>
                            <div class="suma-visual mb-2">
                                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                                    <div style="background: #e9ecef; padding: 5px 10px; border-radius: 5px;">
                                        ${izquierda} objetos: ${'•'.repeat(Math.min(izquierda, 10))}
                                    </div>
                                    <div style="font-weight: bold;">+</div>
                                    <div style="background: #e9ecef; padding: 5px 10px; border-radius: 5px;">
                                        ${derecha} objetos: ${'•'.repeat(Math.min(derecha, 10))}
                                    </div>
                                    <div style="font-weight: bold;">=</div>
                                    <div style="background: #e9ecef; padding: 5px 10px; border-radius: 5px;">
                                        ${resultado} objetos: ${'•'.repeat(Math.min(resultado, 15))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <strong>🔢 SIMBÓLICO:</strong>
                            <p>${izquierda} + ${derecha} = ${resultado}</p>
                            <p><strong>Regla PAPOMUDAS:</strong> La suma se resuelve al final, después de potencias y multiplicaciones.</p>
                        </div>
                    </div>
                </div>
            `,
            ejemploConcreto: `Si tienes ${izquierda} manzanas y compras ${derecha} más, ahora tienes ${resultado} manzanas.`,
            imagenMental: `Visualiza una línea numérica: empiezas en ${izquierda} y avanzas ${derecha} lugares hasta llegar a ${resultado}.`,
            operacion: `Suma: ${izquierda} + ${derecha} = ${resultado}`,
            verificacion: `Comprobación: ${resultado} - ${derecha} = ${izquierda}`,
            esFinal: false
        };
    }

    generarReflexionFinalPedagogica(expresionOriginal, resultado) {
        return `
            <div class="reflexion-final">
                <h6>🎉 ¡RESOLUCIÓN COMPLETADA!</h6>
                
                <div class="logro-container mb-3">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <div class="logro-item p-2 bg-white rounded">
                                <strong>✅ Lo que lograste:</strong>
                                <ul class="mb-0">
                                    <li><small>Identificaste el orden correcto de operaciones</small></li>
                                    <li><small>Aplicaste PAPOMUDAS paso a paso</small></li>
                                    <li><small>Comprendiste el significado de cada operación</small></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="logro-item p-2 bg-white rounded">
                                <strong>🧠 Habilidades desarrolladas:</strong>
                                <ul class="mb-0">
                                    <li><small>Pensamiento lógico-matemático</small></li>
                                    <li><small>Resolución de problemas</small></li>
                                    <li><small>Visualización espacial</small></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-3 p-3 bg-success text-white rounded">
                    <h6>📚 Resumen del Proceso:</h6>
                    <p class="mb-1"><strong>Expresión original:</strong> ${expresionOriginal}</p>
                    <p class="mb-1"><strong>Proceso seguido:</strong> Potencias → Multiplicación → Suma</p>
                    <p class="mb-0"><strong>Resultado final:</strong> ${resultado}</p>
                </div>

                <div class="p-3 bg-light rounded">
                    <h6>💭 Para reflexionar:</h6>
                    <p class="mb-2"><small><em>"Las matemáticas no son solo números, son una forma de pensar y resolver problemas. Cada expresión matemática cuenta una historia sobre cantidades, relaciones y patrones."</em></small></p>
                    <p class="mb-0"><strong>Pregunta:</strong> <small>¿En qué situaciones de tu vida diaria usas el mismo tipo de pensamiento que aplicaste aquí?</small></p>
                </div>
            </div>
        `;
    }

    // ===== FUNCIÓN DE DESTACADO CORREGIDA =====
    destacarElementosCorrectamente(expresion) {
        if (expresion.includes('<span') || !expresion) {
            return expresion;
        }
        
        let resultado = expresion;
        
        // Reemplazar elementos en orden de especificidad
        const reemplazos = [
            { patron: /(sin|cos|tan|log)\(/g, clase: 'funcion' },
            { patron: /(π|e)/g, clase: 'constante' },
            { patron: /(\(|\))/g, clase: 'parentesis' },
            { patron: /(\+|\-)/g, clase: 'operador' },
            { patron: /(×|\÷)/g, clase: 'operador' },
            { patron: /(\^|²|³)/g, clase: 'potencia' },
            { patron: /(√)/g, clase: 'raiz' },
            { patron: /(\d+)/g, clase: 'numero' }
        ];
        
        reemplazos.forEach(item => {
            resultado = resultado.replace(item.patron, `<span class="dest ${item.clase}">$1</span>`);
        });
        
        return resultado;
    }

    // ===== MÉTODOS AUXILIARES =====
    prepararExpresionParaEvaluacion(expresion) {
        return expresion
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/²/g, '**2')
            .replace(/³/g, '**3')
            .replace(/\^/g, '**')
            .replace(/√/g, 'Math.sqrt')
            .replace(/π/g, Math.PI.toString())
            .replace(/e/g, Math.E.toString())
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10');
    }

    evaluarExpresionSegura(expresion) {
        try {
            // Validar expresión básica
            if (!/^[0-9+\-*/(). Math]+$/.test(expresion.replace(/Math\.(sqrt|sin|cos|tan|log10)/g, ''))) {
                throw new Error('Expresión contiene caracteres no permitidos');
            }
            
            const resultado = new Function('return ' + expresion)();
            return this.formatearNumero(resultado);
        } catch (error) {
            throw new Error('No se pudo evaluar la expresión: ' + error.message);
        }
    }

    formatearNumero(numero) {
        if (typeof numero !== 'number') return numero;
        return Math.round(numero * 100000000) / 100000000;
    }

    contarParentesis(expresion) {
        const aperturas = (expresion.match(/\(/g) || []).length;
        const cierres = (expresion.match(/\)/g) || []).length;
        return { total: aperturas + cierres, balanceado: aperturas === cierres };
    }

    identificarOperadores(expresion) {
        return (expresion.match(/\+|\-|\×|\÷/g) || []);
    }

    identificarFunciones(expresion) {
        return (expresion.match(/sin|cos|tan|log/g) || []);
    }

    identificarConstantes(expresion) {
        return (expresion.match(/π|e/g) || []);
    }

    identificarNumeros(expresion) {
        return (expresion.match(/-?\d+\.?\d*/g) || []);
    }

    // ===== REFLEXIÓN FINAL =====
    generarReflexionFinal(expresion) {
        this.pasos.push({
            tipo: 'reflexion',
            titulo: '💭 Reflexión Final',
            contenido: this.generarContenidoReflexion(expresion),
            expresion: expresion
        });
    }

    generarContenidoReflexion(expresion) {
        return `
            <div class="reflexion-container">
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
                
                <div class="mt-3 p-3 bg-primary text-white rounded">
                    <h6>🎯 Mensaje Psicopedagógico</h6>
                    <p class="mb-2"><small><strong>"Comprender el proceso es más importante que memorizar el resultado"</strong></small></p>
                    <p class="mb-0"><small>Cada expresión matemática cuenta una historia. Tu trabajo no es solo obtener 
                    la respuesta correcta, sino entender el camino que te lleva a ella.</small></p>
                </div>
                
                <div class="mt-3 text-center">
                    <button class="btn btn-outline-primary" onclick="analizador.reiniciarAnalisis()">
                        🔄 Analizar Otra Expresión
                    </button>
                </div>
            </div>
        `;
    }

    // ===== VISUALIZACIÓN DEL ANÁLISIS =====
    mostrarAnalisis() {
        const contenedor = document.getElementById('analisis-dinamico');
        if (!contenedor) return;
        
        contenedor.innerHTML = this.generarInterfazAnalisis();
        
        const estadoAnalisis = document.getElementById('estado-analisis');
        const btnPrev = document.getElementById('btn-prev-paso');
        const btnNext = document.getElementById('btn-next-paso');
        
        if (estadoAnalisis) estadoAnalisis.textContent = 'Análisis completado';
        if (btnPrev) btnPrev.disabled = true;
        if (btnNext) btnNext.disabled = this.pasos.length <= 1;
        
        if (window.MathJax) {
            MathJax.typesetPromise();
        }
    }

    generarInterfazAnalisis() {
        return `
            <div class="row">
                <div class="col-12">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Expresión Analizada</h5>
                            <div class="expresion-principal fs-4">
                                ${this.destacarElementosCorrectamente(this.expresionOriginal)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="contenedor-pasos-detallados">
                ${this.pasos.map((paso, index) => `
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
                `).join('')}
            </div>
        `;
    }

    // ===== NAVEGACIÓN =====
    pasoAnterior() {
        if (this.pasoActual > 0) {
            this.pasoActual--;
            this.actualizarVistaPasos();
        }
    }

    pasoSiguiente() {
        if (this.pasoActual < this.pasos.length - 1) {
            this.pasoActual++;
            this.actualizarVistaPasos();
        }
    }

    actualizarVistaPasos() {
        const pasos = document.querySelectorAll('.paso-detallado');
        pasos.forEach((paso, index) => {
            paso.classList.toggle('activo', index === this.pasoActual);
        });

        const btnPrev = document.getElementById('btn-prev-paso');
        const btnNext = document.getElementById('btn-next-paso');
        
        if (btnPrev) btnPrev.disabled = this.pasoActual === 0;
        if (btnNext) btnNext.disabled = this.pasoActual === this.pasos.length - 1;
    }

    reiniciarAnalisis() {
        const vistaInicial = document.getElementById('vista-inicial');
        const analisisDinamico = document.getElementById('analisis-dinamico');
        const estadoAnalisis = document.getElementById('estado-analisis');
        const display = document.getElementById('display-matematico');
        
        if (vistaInicial) vistaInicial.style.display = 'block';
        if (analisisDinamico) analisisDinamico.style.display = 'none';
        if (estadoAnalisis) estadoAnalisis.textContent = 'Esperando expresión matemática';
        if (display) {
            display.value = '';
            display.focus();
        }
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

// ===== INICIALIZACIÓN GLOBAL =====
let analizador;

document.addEventListener('DOMContentLoaded', function() {
    analizador = new AnalizadorMatematico();
    window.analizador = analizador;
    
    console.log('✅ Analizador matemático psicopedagógico cargado correctamente');
});