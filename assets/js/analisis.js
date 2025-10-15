// ===== ANALIZADOR MATEMÁTICO PASO A PASO =====
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

        document.getElementById('display-matematico').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const expresion = e.target.value.trim();
                if (expresion) {
                    this.analizarExpresionCompleta(expresion, expresion);
                }
            }
        });
    }

    inicializarNavegacion() {
        document.getElementById('btn-prev-paso').addEventListener('click', () => this.pasoAnterior());
        document.getElementById('btn-next-paso').addEventListener('click', () => this.pasoSiguiente());
    }

    // ===== ANÁLISIS PRINCIPAL =====
    analizarExpresionCompleta(expresion, expresionComputable) {
        try {
            this.prepararInterfaz();
            this.expresionOriginal = expresion;
            this.pasos = [];
            this.pasoActual = 0;

            this.analizarEstructuraGeneral(expresion);
            this.analizarComponentesEspecificos(expresion);
            this.generarProcesoResolucion(expresionComputable);
            this.generarReflexionFinal(expresion);

            this.mostrarAnalisis();
            
        } catch (error) {
            this.mostrarError(`Error en el análisis: ${error.message}`);
        }
    }

    prepararInterfaz() {
        document.getElementById('vista-inicial').style.display = 'none';
        document.getElementById('analisis-dinamico').style.display = 'block';
        document.getElementById('estado-analisis').textContent = 'Analizando expresión...';
    }

    // ===== ANÁLISIS ESTRUCTURAL =====
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
        let html = `
            <div class="expresion-destacada">
                ${this.destacarElementos(expresion)}
            </div>
            <div class="explicacion-paso">
                <h6>📊 Componentes Identificados:</h6>
                <ul>
                    ${componentes.lista.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>
            <div class="explicacion-paso">
                <h6>🎯 Orden de Operaciones (PEMDAS):</h6>
                <ol>
                    <li><strong>Paréntesis</strong> - Operaciones dentro de () primero</li>
                    <li><strong>Exponentes</strong> - Potencias y raíces</li>
                    <li><strong>Multiplicación y División</strong> - De izquierda a derecha</li>
                    <li><strong>Suma y Resta</strong> - De izquierda a derecha</li>
                </ol>
            </div>
        `;
        return html;
    }

    identificarComponentes(expresion) {
        const componentes = {
            parentesis: this.contarParentesis(expresion),
            operadores: this.identificarOperadores(expresion),
            funciones: this.identificarFunciones(expresion),
            numeros: this.identificarNumeros(expresion)
        };

        const lista = [];
        if (componentes.parentesis.total > 0) {
            lista.push(`<strong>${componentes.parentesis.total} paréntesis</strong> - Agrupan operaciones prioritarias`);
        }
        if (componentes.operadores.length > 0) {
            lista.push(`<strong>${componentes.operadores.length} operadores</strong> - ${componentes.operadores.join(', ')}`);
        }
        if (componentes.funciones.length > 0) {
            lista.push(`<strong>Funciones matemáticas</strong> - ${componentes.funciones.join(', ')}`);
        }
        if (componentes.numeros.length > 0) {
            lista.push(`<strong>${componentes.numeros.length} números</strong> - Valores a operar`);
        }

        return { lista };
    }

    // ===== ANÁLISIS DE COMPONENTES ESPECÍFICOS =====
    analizarComponentesEspecificos(expresion) {
        const componentes = this.descomponerExpresion(expresion);
        
        componentes.forEach((componente, index) => {
            if (componente.tipo !== 'numero') {
                this.pasos.push({
                    tipo: 'componente',
                    titulo: `${this.obtenerIconoComponente(componente.tipo)} Análisis: ${this.obtenerNombreComponente(componente.tipo)}`,
                    contenido: this.generarAnalisisComponente(componente, expresion),
                    expresion: this.destacarComponente(expresion, componente)
                });
            }
        });
    }

    descomponerExpresion(expresion) {
        const componentes = [];
        const regex = /(\(|\)|\+|\-|\×|\÷|\^|²|³|√|sin|cos|tan|log|\d+\.?\d*)/g;
        let match;
        
        while ((match = regex.exec(expresion)) !== null) {
            const valor = match[0];
            componentes.push({
                valor: valor,
                tipo: this.clasificarComponente(valor),
                posicion: match.index
            });
        }
        
        return componentes;
    }

    clasificarComponente(valor) {
        if (valor === '(' || valor === ')') return 'parentesis';
        if (['+', '-', '×', '÷'].includes(valor)) return 'operador';
        if (['^', '²', '³'].includes(valor)) return 'potencia';
        if (valor === '√') return 'raiz';
        if (['sin', 'cos', 'tan', 'log'].includes(valor)) return 'funcion';
        if (!isNaN(valor) || !isNaN(parseFloat(valor))) return 'numero';
        return 'desconocido';
    }

    obtenerIconoComponente(tipo) {
        const iconos = {
            'parentesis': '📌',
            'operador': '➕',
            'potencia': '⚡',
            'raiz': '√',
            'funcion': '𝑓',
            'numero': '🔢'
        };
        return iconos[tipo] || '❓';
    }

    obtenerNombreComponente(tipo) {
        const nombres = {
            'parentesis': 'PARÉNTESIS',
            'operador': 'OPERADOR',
            'potencia': 'POTENCIA',
            'raiz': 'RAÍZ',
            'funcion': 'FUNCIÓN'
        };
        return nombres[tipo] || 'COMPONENTE';
    }

    generarAnalisisComponente(componente, expresionCompleta) {
        switch (componente.tipo) {
            case 'parentesis':
                return this.analizarParentesis(componente, expresionCompleta);
            case 'operador':
                return this.analizarOperador(componente);
            case 'potencia':
                return this.analizarPotencia(componente);
            case 'raiz':
                return this.analizarRaiz(componente);
            case 'funcion':
                return this.analizarFuncion(componente);
            default:
                return this.analisisGenerico(componente);
        }
    }

    // ===== ANÁLISIS DETALLADO POR TIPO DE COMPONENTE =====
    analizarParentesis(componente, expresion) {
        const esApertura = componente.valor === '(';
        const explicacion = esApertura ? 
            "Los paréntesis <strong>agrupan operaciones</strong> que deben resolverse primero según PEMDAS" :
            "Este paréntesis <strong>cierra un grupo</strong> de operaciones prioritarias";
        
        return `
            <div class="explicacion-paso">
                <h6>🎯 Función de los Paréntesis:</h6>
                <p>${explicacion}</p>
                <p><strong>Regla PEMDAS:</strong> Los paréntesis tienen la máxima prioridad en el orden de operaciones</p>
                <p><strong>¿Por qué es importante?</strong> Sin paréntesis, las operaciones se realizarían en un orden diferente, cambiando completamente el resultado.</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿Qué pasaría si quitáramos estos paréntesis? ¿Cambiaría el resultado? ¿Por qué?
            </div>
        `;
    }

    analizarOperador(operador) {
        const operadores = {
            '+': { 
                nombre: 'Suma', 
                concepto: 'combinar cantidades', 
                ejemplo: 'Si tienes 3 manzanas y compras 2 más, tienes 3 + 2 = 5 manzanas',
                prioridad: 'Media - Después de multiplicación y división'
            },
            '-': { 
                nombre: 'Resta', 
                concepto: 'encontrar la diferencia o quitar', 
                ejemplo: 'Si tienes 5 galletas y comes 2, te quedan 5 - 2 = 3 galletas',
                prioridad: 'Media - Después de multiplicación y división'
            },
            '×': { 
                nombre: 'Multiplicación', 
                concepto: 'suma repetida', 
                ejemplo: 'Si tienes 4 filas con 3 sillas cada una, tienes 4 × 3 = 12 sillas en total',
                prioridad: 'Alta - Después de paréntesis y potencias'
            },
            '÷': { 
                nombre: 'División', 
                concepto: 'repartir en partes iguales', 
                ejemplo: 'Si tienes 12 caramelos y 3 amigos, a cada uno le tocan 12 ÷ 3 = 4 caramelos',
                prioridad: 'Alta - Después de paréntesis y potencias'
            }
        };

        const info = operadores[operador.valor] || { 
            nombre: 'Operador', 
            concepto: 'operación matemática', 
            ejemplo: 'operación básica',
            prioridad: 'Media'
        };

        return `
            <div class="explicacion-paso">
                <h6>🎯 Operador: ${info.nombre}</h6>
                <p><strong>Concepto:</strong> ${info.concepto}</p>
                <p><strong>Ejemplo práctico:</strong> ${info.ejemplo}</p>
                <p><strong>Prioridad PEMDAS:</strong> ${info.prioridad}</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿Cómo explicarías el concepto de "${info.nombre.toLowerCase()}" a alguien que nunca ha estudiado matemáticas?
            </div>
        `;
    }

    analizarPotencia(potencia) {
        let explicacion = '';
        let ejemplo = '';
        
        if (potencia.valor === '²') {
            explicacion = "La potencia al cuadrado significa <strong>multiplicar un número por sí mismo</strong>";
            ejemplo = "4² = 4 × 4 = 16 (como un cuadrado de 4 unidades por lado que tiene área 16)";
        } else if (potencia.valor === '³') {
            explicacion = "La potencia al cubo significa <strong>multiplicar un número por sí mismo tres veces</strong>";
            ejemplo = "2³ = 2 × 2 × 2 = 8 (como un cubo de 2 unidades por lado que tiene volumen 8)";
        } else {
            explicacion = "La potencia indica <strong>cuántas veces multiplicar un número por sí mismo</strong>";
            ejemplo = "La base se multiplica por sí misma tantas veces como indique el exponente";
        }

        return `
            <div class="explicacion-paso">
                <h6>⚡ Análisis de Potencia</h6>
                <p>${explicacion}</p>
                <p><strong>Ejemplo:</strong> ${ejemplo}</p>
                <p><strong>Prioridad PEMDAS:</strong> Las potencias se resuelven después de los paréntesis pero antes de multiplicaciones y divisiones</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿Por qué crees que 5² da 25 pero 2⁵ da 32? ¿Qué diferencia hay en el concepto?
            </div>
        `;
    }

    analizarRaiz(raiz) {
        return `
            <div class="explicacion-paso">
                <h6>√ Análisis de Raíz Cuadrada</h6>
                <p>La raíz cuadrada encuentra <strong>qué número multiplicado por sí mismo</strong> da el valor dentro de la raíz</p>
                <p><strong>Ejemplo:</strong> √16 = 4 porque 4 × 4 = 16</p>
                <p><strong>Concepto práctico:</strong> Si un cuadrado tiene área 25 cm², cada lado mide √25 = 5 cm</p>
                <p><strong>Prioridad PEMDAS:</strong> Misma prioridad que las potencias</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿Por qué la raíz cuadrada de 9 es 3 y también -3? ¿Cuál usaríamos normalmente y por qué?
            </div>
        `;
    }

    analizarFuncion(funcion) {
        const funciones = {
            'sin': {
                nombre: 'Seno',
                concepto: 'Relación entre el lado opuesto y la hipotenusa en un triángulo rectángulo',
                aplicacion: 'Cálculo de alturas, ondas sonoras, movimiento oscilatorio'
            },
            'cos': {
                nombre: 'Coseno', 
                concepto: 'Relación entre el lado adyacente y la hipotenusa',
                aplicacion: 'Cálculo de distancias, ingeniería, gráficos por computadora'
            },
            'tan': {
                nombre: 'Tangente',
                concepto: 'Relación entre el lado opuesto y el adyacente',
                aplicacion: 'Cálculo de pendientes, ángulos de elevación, navegación'
            },
            'log': {
                nombre: 'Logaritmo',
                concepto: 'Exponente al que hay que elevar la base para obtener el número',
                aplicacion: 'Escalas logarítmicas, crecimiento exponencial, decibelios'
            }
        };

        const info = funciones[funcion.valor] || { 
            nombre: 'Función', 
            concepto: 'función matemática', 
            aplicacion: 'aplicaciones matemáticas' 
        };

        return `
            <div class="explicacion-paso">
                <h6>𝑓 Función ${info.nombre}</h6>
                <p><strong>Concepto:</strong> ${info.concepto}</p>
                <p><strong>Aplicación práctica:</strong> ${info.aplicacion}</p>
                <p><strong>Enfoque psicopedagógico:</strong> Las funciones nos ayudan a modelar situaciones reales con matemáticas</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿En qué situaciones de tu vida diaria podrías aplicar la función ${info.nombre.toLowerCase()}?
            </div>
        `;
    }

    analisisGenerico(componente) {
        return `
            <div class="explicacion-paso">
                <h6>📝 Análisis del Componente</h6>
                <p>Este es un componente de tipo <strong>${componente.tipo}</strong> con valor <strong>${componente.valor}</strong></p>
                <p>En el contexto de la expresión completa, este elemento juega un papel específico en la operación matemática.</p>
            </div>
        `;
    }

    // ===== PROCESO DE RESOLUCIÓN =====
    generarProcesoResolucion(expresionComputable) {
        this.pasos.push({
            tipo: 'resolucion',
            titulo: '🔄 Proceso de Resolución Paso a Paso',
            contenido: this.generarPasosResolucion(expresionComputable),
            expresion: this.expresionOriginal
        });
    }

    generarPasosResolucion(expresion) {
        try {
            const pasosResolucion = this.simularResolucionPasoAPaso(expresion);
            let html = '<div class="proceso-resolucion">';
            
            pasosResolucion.forEach((paso, index) => {
                html += `
                    <div class="paso-resolucion ${index === pasosResolucion.length - 1 ? 'final' : ''}">
                        <div class="numero-paso">${index + 1}</div>
                        <div class="contenido-paso">
                            <div class="expresion-paso">${paso.expresion}</div>
                            <div class="explicacion-paso">${paso.explicacion}</div>
                            ${paso.subpasos ? `
                                <div class="subpasos">
                                    ${paso.subpasos.map(sub => `<div class="subpaso">• ${sub}</div>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            return html;
        } catch (error) {
            return `<div class="alert alert-warning">No se pudo generar la resolución paso a paso: ${error.message}</div>`;
        }
    }

    simularResolucionPasoAPaso(expresion) {
        const pasos = [];
        
        // Paso 1: Análisis inicial
        pasos.push({
            expresion: this.destacarElementos(this.expresionOriginal),
            explicacion: "Comenzamos analizando la expresión completa e identificando todos los componentes",
            subpasos: [
                "Identificamos números, operadores y símbolos especiales",
                "Reconocemos la estructura general de la expresión",
                "Planificamos el orden de resolución según PEMDAS"
            ]
        });
        
        // Paso 2: Paréntesis
        if (this.expresionOriginal.includes('(')) {
            pasos.push({
                expresion: this.destacarElementos(this.expresionOriginal, ['(', ')']),
                explicacion: "Resolvemos primero las operaciones dentro de paréntesis (máxima prioridad en PEMDAS)",
                subpasos: [
                    "Localizamos todos los grupos entre paréntesis",
                    "Resolvemos las operaciones dentro de cada paréntesis",
                    "Reemplazamos los paréntesis por sus resultados"
                ]
            });
        }
        
        // Paso 3: Exponentes y raíces
        if (this.expresionOriginal.match(/\^|\²|\³|√/)) {
            pasos.push({
                expresion: this.destacarElementos(this.expresionOriginal, ['^', '²', '³', '√']),
                explicacion: "Aplicamos potencias y raíces (segunda prioridad en PEMDAS)",
                subpasos: [
                    "Identificamos todas las potencias y raíces",
                    "Las resolvemos de izquierda a derecha",
                    "Sustituimos los resultados en la expresión"
                ]
            });
        }
        
        // Paso 4: Multiplicación y división
        if (this.expresionOriginal.match(/×|÷/)) {
            pasos.push({
                expresion: this.destacarElementos(this.expresionOriginal, ['×', '÷']),
                explicacion: "Realizamos multiplicaciones y divisiones (tercera prioridad en PEMDAS)",
                subpasos: [
                    "Identificamos multiplicaciones y divisiones",
                    "Las resolvemos de izquierda a derecha",
                    "Aplicamos las operaciones en el orden correcto"
                ]
            });
        }
        
        // Paso 5: Suma y resta
        if (this.expresionOriginal.match(/\+|\-/)) {
            pasos.push({
                expresion: this.destacarElementos(this.expresionOriginal, ['+', '-']),
                explicacion: "Finalmente, realizamos sumas y restas (última prioridad en PEMDAS)",
                subpasos: [
                    "Identificamos sumas y restas",
                    "Las resolvemos de izquierda a derecha",
                    "Completamos todas las operaciones"
                ]
            });
        }
        
        // Paso final
        try {
            const resultado = this.evaluarExpresionSegura(expresion);
            pasos.push({
                expresion: `<strong class="resultado-final">Resultado: ${resultado}</strong>`,
                explicacion: "¡Hemos completado todas las operaciones! El proceso nos llevó a la solución final aplicando correctamente el orden de operaciones.",
                subpasos: [
                    "Verificamos que todas las operaciones estén completas",
                    "Confirmamos que seguimos el orden PEMDAS correctamente",
                    "Validamos que el resultado tiene sentido matemáticamente"
                ]
            });
        } catch (error) {
            pasos.push({
                expresion: "No se pudo calcular el resultado final",
                explicacion: "Error en la evaluación de la expresión",
                subpasos: ["Verifica que la expresión esté bien formada"]
            });
        }
        
        return pasos;
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
                    <div class="col-md-6">
                        <div class="reflexion-item">
                            <h6>🤔 Preguntas para Profundizar</h6>
                            <ul>
                                <li>¿Qué patrón matemático identificas en esta expresión?</li>
                                <li>¿Cómo verificarías que tu resultado es correcto?</li>
                                <li>¿En qué situación de la vida real usarías esta operación?</li>
                                <li>¿Qué pasaría si cambias el orden de las operaciones?</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="reflexion-item">
                            <h6>💡 Estrategias de Aprendizaje</h6>
                            <ul>
                                <li>Practica con expresiones similares para ganar confianza</li>
                                <li>Descompón problemas complejos en pasos más simples</li>
                                <li>Questiona cada paso - ¿por qué se hace así?</li>
                                <li>Relaciona las matemáticas con situaciones de la vida real</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 p-4 bg-light rounded">
                    <h6>🎯 Mensaje Psicopedagógico</h6>
                    <p class="mb-0">
                        <strong>"Comprender el proceso es más importante que memorizar el resultado"</strong><br>
                        Cada expresión matemática cuenta una historia. Tu trabajo no es solo obtener 
                        la respuesta correcta, sino entender el camino que te lleva a ella. Los errores 
                        son oportunidades para aprender cómo piensas matemáticamente.
                    </p>
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
        contenedor.innerHTML = this.generarInterfazAnalisis();
        
        document.getElementById('estado-analisis').textContent = 'Análisis completado';
        document.getElementById('btn-prev-paso').disabled = true;
        document.getElementById('btn-next-paso').disabled = this.pasos.length <= 1;
        
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
                            <div class="expresion-principal">
                                ${this.destacarElementos(this.expresionOriginal)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row" id="contenedor-pasos-detallados">
                ${this.pasos.map((paso, index) => `
                    <div class="col-12 paso-detallado ${index === 0 ? 'activo' : ''}" data-paso="${index}">
                        <div class="card paso-analisis">
                            <div class="card-body">
                                <div class="paso-header">
                                    <div class="paso-numero">${index + 1}</div>
                                    <h5 class="paso-titulo">${paso.titulo}</h5>
                                </div>
                                ${paso.contenido}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ===== FUNCIONES AUXILIARES =====
    destacarElementos(expresion, elementos = null) {
        if (!elementos) {
            elementos = ['(', ')', '+', '-', '×', '÷', '^', '²', '³', '√', 'sin', 'cos', 'tan', 'log'];
        }
        
        // Ordenar por longitud para evitar problemas de superposición
        elementos.sort((a, b) => b.length - a.length);
        
        let resultado = expresion;
        for (let elemento of elementos) {
            const regex = new RegExp(this.escapeRegExp(elemento), 'g');
            resultado = resultado.replace(regex, `<span class="elemento-destacado">${elemento}</span>`);
        }
        
        return resultado;
    }

    destacarComponente(expresion, componente) {
        const antes = expresion.substring(0, componente.posicion);
        const destacado = `<span class="elemento-destacado">${componente.valor}</span>`;
        const despues = expresion.substring(componente.posicion + componente.valor.length);
        return antes + destacado + despues;
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

    identificarNumeros(expresion) {
        return (expresion.match(/\d+\.?\d*/g) || []);
    }

    evaluarExpresionSegura(expresion) {
        try {
            const expresionSegura = expresion
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/²/g, '**2')
                .replace(/³/g, '**3')
                .replace(/\^/g, '**');
            
            return new Function('return ' + expresionSegura)();
        } catch (error) {
            throw new Error('No se pudo evaluar la expresión');
        }
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

        document.getElementById('btn-prev-paso').disabled = this.pasoActual === 0;
        document.getElementById('btn-next-paso').disabled = this.pasoActual === this.pasos.length - 1;
    }

    reiniciarAnalisis() {
        document.getElementById('vista-inicial').style.display = 'block';
        document.getElementById('analisis-dinamico').style.display = 'none';
        document.getElementById('estado-analisis').textContent = 'Esperando expresión matemática';
        document.getElementById('display-matematico').value = '';
        document.getElementById('display-matematico').focus();
    }

    mostrarError(mensaje) {
        const contenedor = document.getElementById('analisis-dinamico');
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
    
    console.log('✅ Analizador matemático cargado correctamente');
});