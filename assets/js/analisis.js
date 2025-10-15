// ===== ANALIZADOR MATEMÁTICO COMPLETO =====
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
            this.generarProcesoResolucionCompleto(expresion);
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
            <div class="expresion-principal">
                ${this.destacarElementos(expresion)}
            </div>
            <div class="explicacion-paso">
                <h6>📊 Componentes Identificados:</h6>
                <ul>
                    ${componentes.lista.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>
            <div class="explicacion-paso">
                <h6>🎯 Orden de Operaciones (PAPOMUDAS):</h6>
                <ol>
                    <li><strong>P</strong>aréntesis - Operaciones dentro de () primero</li>
                    <li><strong>A</strong>potencias - Exponentes y raíces</li>
                    <li><strong>PO</strong>tencias - Potencias (continuación)</li>
                    <li><strong>M</strong>ultiplicación - De izquierda a derecha</li>
                    <li><strong>D</strong>ivisión - De izquierda a derecha</li>
                    <li><strong>A</strong>sumas - Sumas</li>
                    <li><strong>S</strong>ustracciones - Restas</li>
                </ol>
                <p class="mt-2"><em>Recordatorio: Multiplicación y división tienen igual prioridad, se resuelven de izquierda a derecha. Lo mismo para suma y resta.</em></p>
            </div>
        `;
        return html;
    }

    identificarComponentes(expresion) {
        const componentes = {
            parentesis: this.contarParentesis(expresion),
            operadores: this.identificarOperadores(expresion),
            funciones: this.identificarFunciones(expresion),
            constantes: this.identificarConstantes(expresion),
            numeros: this.identificarNumeros(expresion)
        };

        const lista = [];
        if (componentes.parentesis.total > 0) {
            lista.push(`<strong>${componentes.parentesis.total} paréntesis</strong> - Agrupan operaciones prioritarias`);
        }
        if (componentes.operadores.length > 0) {
            const operadoresUnicos = [...new Set(componentes.operadores)];
            lista.push(`<strong>${componentes.operadores.length} operadores</strong> - ${operadoresUnicos.join(', ')}`);
        }
        if (componentes.funciones.length > 0) {
            lista.push(`<strong>Funciones matemáticas</strong> - ${componentes.funciones.join(', ')}`);
        }
        if (componentes.constantes.length > 0) {
            lista.push(`<strong>Constantes</strong> - ${componentes.constantes.join(', ')}`);
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
        // Regex mejorado para capturar todos los componentes
        const regex = /(\(|\)|\+|\-|\×|\÷|\^|²|³|√|sin|cos|tan|log|π|e|\d+\.?\d*)/g;
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
        if (['π', 'e'].includes(valor)) return 'constante';
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
            'constante': 'π',
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
            'funcion': 'FUNCIÓN',
            'constante': 'CONSTANTE'
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
            case 'constante':
                return this.analizarConstante(componente);
            default:
                return this.analisisGenerico(componente);
        }
    }

    // ===== ANÁLISIS DETALLADO POR TIPO DE COMPONENTE =====
    analizarParentesis(componente, expresion) {
        const esApertura = componente.valor === '(';
        const explicacion = esApertura ? 
            "Los paréntesis <strong>agrupan operaciones</strong> que deben resolverse primero según PAPOMUDAS" :
            "Este paréntesis <strong>cierra un grupo</strong> de operaciones prioritarias";
        
        return `
            <div class="explicacion-paso">
                <h6>🎯 Función de los Paréntesis:</h6>
                <p>${explicacion}</p>
                <p><strong>Regla PAPOMUDAS:</strong> Los paréntesis tienen la máxima prioridad en el orden de operaciones</p>
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
                prioridad: 'Última - Después de multiplicación y división'
            },
            '-': { 
                nombre: 'Resta', 
                concepto: 'encontrar la diferencia o quitar', 
                ejemplo: 'Si tienes 5 galletas y comes 2, te quedan 5 - 2 = 3 galletas',
                prioridad: 'Última - Después de multiplicación y división'
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
                <p><strong>Prioridad PAPOMUDAS:</strong> ${info.prioridad}</p>
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
                <p><strong>Prioridad PAPOMUDAS:</strong> Las potencias se resuelven después de los paréntesis pero antes de multiplicaciones y divisiones</p>
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
                <p><strong>Prioridad PAPOMUDAS:</strong> Misma prioridad que las potencias</p>
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
                aplicacion: 'Cálculo de alturas, ondas sonoras, movimiento oscilatorio',
                ejemplo: 'sin(30°) = 0.5'
            },
            'cos': {
                nombre: 'Coseno', 
                concepto: 'Relación entre el lado adyacente y la hipotenusa',
                aplicacion: 'Cálculo de distancias, ingeniería, gráficos por computadora',
                ejemplo: 'cos(60°) = 0.5'
            },
            'tan': {
                nombre: 'Tangente',
                concepto: 'Relación entre el lado opuesto y el adyacente',
                aplicacion: 'Cálculo de pendientes, ángulos de elevación, navegación',
                ejemplo: 'tan(45°) = 1'
            },
            'log': {
                nombre: 'Logaritmo',
                concepto: 'Exponente al que hay que elevar 10 para obtener el número',
                aplicacion: 'Escalas logarítmicas, crecimiento exponencial, decibelios',
                ejemplo: 'log(100) = 2 porque 10² = 100'
            }
        };

        const info = funciones[funcion.valor] || { 
            nombre: 'Función', 
            concepto: 'función matemática', 
            aplicacion: 'aplicaciones matemáticas',
            ejemplo: 'ejemplo de función'
        };

        return `
            <div class="explicacion-paso">
                <h6>𝑓 Función ${info.nombre}</h6>
                <p><strong>Concepto:</strong> ${info.concepto}</p>
                <p><strong>Aplicación práctica:</strong> ${info.aplicacion}</p>
                <p><strong>Ejemplo:</strong> ${info.ejemplo}</p>
                <p><strong>Enfoque psicopedagógico:</strong> Las funciones nos ayudan a modelar situaciones reales con matemáticas</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿En qué situaciones de tu vida diaria podrías aplicar la función ${info.nombre.toLowerCase()}?
            </div>
        `;
    }

    analizarConstante(constante) {
        const constantes = {
            'π': {
                nombre: 'Pi (π)',
                valor: '3.1416...',
                concepto: 'Relación entre la circunferencia y el diámetro de un círculo',
                aplicacion: 'Cálculos de círculos, esferas, ondas, física e ingeniería',
                ejemplo: 'Área del círculo = π × r²'
            },
            'e': {
                nombre: 'Número de Euler (e)',
                valor: '2.7182...',
                concepto: 'Base de los logaritmos naturales, aparece en crecimiento exponencial',
                aplicacion: 'Cálculo de intereses, crecimiento poblacional, ecuaciones diferenciales',
                ejemplo: 'Interés compuesto: A = P × e^(rt)'
            }
        };

        const info = constantes[constante.valor] || { 
            nombre: 'Constante', 
            valor: '?', 
            concepto: 'constante matemática', 
            aplicacion: 'aplicaciones matemáticas',
            ejemplo: 'ejemplo de constante'
        };

        return `
            <div class="explicacion-paso">
                <h6>${constante.valor} Constante ${info.nombre}</h6>
                <p><strong>Valor aproximado:</strong> ${info.valor}</p>
                <p><strong>Concepto:</strong> ${info.concepto}</p>
                <p><strong>Aplicación práctica:</strong> ${info.aplicacion}</p>
                <p><strong>Ejemplo:</strong> ${info.ejemplo}</p>
            </div>
            <div class="pregunta-reflexiva">
                <strong>💭 Pregunta para reflexionar:</strong><br>
                ¿Por qué crees que la constante ${info.nombre} es importante en matemáticas y ciencias?
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

    // ===== PROCESO DE RESOLUCIÓN COMPLETO =====
    generarProcesoResolucionCompleto(expresion) {
        this.pasos.push({
            tipo: 'resolucion',
            titulo: '🔄 Proceso de Resolución Paso a Paso',
            contenido: this.generarResolucionCompleta(expresion),
            expresion: this.expresionOriginal
        });
    }

    generarResolucionCompleta(expresionOriginal) {
        try {
            const pasosResolucion = this.calcularPasosRealmente(expresionOriginal);
            
            let html = '<div class="proceso-resolucion">';
            
            pasosResolucion.forEach((paso, index) => {
                html += `
                    <div class="paso-resolucion ${paso.esResultadoFinal ? 'final' : ''}">
                        <div class="numero-paso">${index + 1}</div>
                        <div class="contenido-paso">
                            <div class="expresion-paso">${paso.expresion}</div>
                            <div class="explicacion-paso">${paso.explicacion}</div>
                            ${paso.operacion ? `<div class="operacion-realizada">${paso.operacion}</div>` : ''}
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

    calcularPasosRealmente(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Paso 1: Análisis inicial
        pasos.push({
            expresion: this.destacarElementos(expresionActual),
            explicacion: "Comenzamos analizando la expresión completa",
            subpasos: [
                "Identificamos todos los componentes matemáticos",
                "Aplicamos el orden PAPOMUDAS para planificar la resolución",
                "Preparamos la expresión para el cálculo paso a paso"
            ]
        });

        // Resolver constantes primero
        if (expresionActual.includes('π') || expresionActual.includes('e')) {
            const constanteInfo = this.resolverConstantes(expresionActual);
            if (constanteInfo) {
                pasos.push({
                    expresion: constanteInfo.nuevaExpresion,
                    explicacion: "Reemplazamos constantes matemáticas por sus valores aproximados",
                    operacion: constanteInfo.operacion,
                    subpasos: [
                        "Identificamos las constantes en la expresión",
                        "Reemplazamos cada constante por su valor numérico",
                        "Continuamos con la expresión simplificada"
                    ]
                });
                expresionActual = constanteInfo.nuevaExpresion;
            }
        }

        // Resolver funciones
        const pasosFunciones = this.resolverFunciones(expresionActual);
        if (pasosFunciones.length > 0) {
            pasos.push(...pasosFunciones);
            expresionActual = pasosFunciones[pasosFunciones.length - 1].expresion;
        }

        // Resolver paréntesis recursivamente
        while (expresionActual.includes('(')) {
            const parentesisInfo = this.resolverParentesis(expresionActual);
            if (parentesisInfo) {
                pasos.push({
                    expresion: parentesisInfo.nuevaExpresion,
                    explicacion: "Resolvemos las operaciones dentro de paréntesis (primera prioridad en PAPOMUDAS)",
                    operacion: parentesisInfo.operacion,
                    subpasos: [
                        "Localizamos el paréntesis más interno",
                        "Resolvemos las operaciones dentro del paréntesis",
                        "Reemplazamos el paréntesis por su resultado"
                    ]
                });
                expresionActual = parentesisInfo.nuevaExpresion;
            } else {
                break;
            }
        }

        // Resolver potencias y raíces
        const pasosPotencia = this.resolverPotenciasYRaices(expresionActual);
        if (pasosPotencia.length > 0) {
            pasos.push(...pasosPotencia);
            expresionActual = pasosPotencia[pasosPotencia.length - 1].expresion;
        }

        // Resolver multiplicaciones y divisiones
        const pasosMultDiv = this.resolverMultiplicacionesDivisiones(expresionActual);
        if (pasosMultDiv.length > 0) {
            pasos.push(...pasosMultDiv);
            expresionActual = pasosMultDiv[pasosMultDiv.length - 1].expresion;
        }

        // Resolver sumas y restas
        const pasosSumaResta = this.resolverSumasRestas(expresionActual);
        if (pasosSumaResta.length > 0) {
            pasos.push(...pasosSumaResta);
            expresionActual = pasosSumaResta[pasosSumaResta.length - 1].expresion;
        }

        // Paso final: Mostrar resultado
        try {
            const expresionComputable = this.prepararExpresionParaEvaluacion(expresionActual);
            const resultado = this.evaluarExpresionSegura(expresionComputable);
            pasos.push({
                expresion: `<strong class="resultado-final">= ${resultado}</strong>`,
                explicacion: "¡Hemos completado todas las operaciones aplicando correctamente el orden PAPOMUDAS!",
                operacion: `Resultado final: ${expresionActual} = ${resultado}`,
                subpasos: [
                    "Verificamos que todas las operaciones estén completas",
                    "Confirmamos que seguimos el orden PAPOMUDAS correctamente",
                    "Validamos que el resultado es matemáticamente correcto"
                ],
                esResultadoFinal: true
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

    resolverConstantes(expresion) {
        let nuevaExpresion = expresion;
        let operaciones = [];
        
        if (expresion.includes('π')) {
            nuevaExpresion = nuevaExpresion.replace(/π/g, Math.PI.toString());
            operaciones.push('π = ' + Math.PI.toFixed(6));
        }
        
        if (expresion.includes('e')) {
            nuevaExpresion = nuevaExpresion.replace(/e/g, Math.E.toString());
            operaciones.push('e = ' + Math.E.toFixed(6));
        }
        
        if (operaciones.length > 0) {
            return {
                nuevaExpresion: nuevaExpresion,
                operacion: operaciones.join(', ')
            };
        }
        
        return null;
    }

    resolverFunciones(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Buscar funciones trigonométricas y logaritmos
        const regexFuncion = /(sin|cos|tan|log)\(([^()]+)\)/g;
        let match;
        
        while ((match = regexFuncion.exec(expresionActual)) !== null) {
            const funcion = match[1];
            const argumento = match[2];
            
            // Evaluar el argumento primero
            let valorArgumento;
            try {
                const argumentoComputable = this.prepararExpresionParaEvaluacion(argumento);
                valorArgumento = this.evaluarExpresionSegura(argumentoComputable);
            } catch (error) {
                continue;
            }
            
            // Calcular la función
            let resultado;
            switch (funcion) {
                case 'sin':
                    resultado = Math.sin(valorArgumento * Math.PI / 180); // Convertir a radianes si está en grados
                    break;
                case 'cos':
                    resultado = Math.cos(valorArgumento * Math.PI / 180);
                    break;
                case 'tan':
                    resultado = Math.tan(valorArgumento * Math.PI / 180);
                    break;
                case 'log':
                    resultado = Math.log10(valorArgumento);
                    break;
                default:
                    resultado = 0;
            }
            
            resultado = this.formatearNumero(resultado);
            
            const nuevaExpresion = expresionActual.replace(match[0], resultado.toString());
            pasos.push({
                expresion: nuevaExpresion,
                explicacion: `Resolvemos la función ${funcion} (prioridad alta en PAPOMUDAS)`,
                operacion: `${funcion}(${argumento}) = ${resultado}`,
                subpasos: [
                    `Calculamos el argumento: ${argumento} = ${valorArgumento}`,
                    `Aplicamos la función: ${funcion}(${valorArgumento}) = ${resultado}`,
                    "Reemplazamos en la expresión"
                ]
            });
            
            expresionActual = nuevaExpresion;
            regexFuncion.lastIndex = 0;
        }
        
        return pasos;
    }

    resolverParentesis(expresion) {
        const ultimoApertura = expresion.lastIndexOf('(');
        if (ultimoApertura === -1) return null;
        
        const cierreCorrespondiente = expresion.indexOf(')', ultimoApertura);
        if (cierreCorrespondiente === -1) return null;
        
        const dentroParentesis = expresion.substring(ultimoApertura + 1, cierreCorrespondiente);
        
        // Resolver la expresión dentro del paréntesis recursivamente
        let expresionInterna = dentroParentesis;
        
        // Resolver funciones dentro del paréntesis
        const pasosFunciones = this.resolverFunciones(expresionInterna);
        if (pasosFunciones.length > 0) {
            expresionInterna = pasosFunciones[pasosFunciones.length - 1].expresion;
        }
        
        // Resolver potencias dentro del paréntesis
        const pasosPotencia = this.resolverPotenciasYRaices(expresionInterna);
        if (pasosPotencia.length > 0) {
            expresionInterna = pasosPotencia[pasosPotencia.length - 1].expresion;
        }
        
        // Resolver multiplicaciones y divisiones dentro del paréntesis
        const pasosMultDiv = this.resolverMultiplicacionesDivisiones(expresionInterna);
        if (pasosMultDiv.length > 0) {
            expresionInterna = pasosMultDiv[pasosMultDiv.length - 1].expresion;
        }
        
        // Resolver sumas y restas dentro del paréntesis
        const pasosSumaResta = this.resolverSumasRestas(expresionInterna);
        if (pasosSumaResta.length > 0) {
            expresionInterna = pasosSumaResta[pasosSumaResta.length - 1].expresion;
        }
        
        const resultado = this.evaluarExpresionSegura(this.prepararExpresionParaEvaluacion(expresionInterna));
        
        const nuevaExpresion = expresion.substring(0, ultimoApertura) + 
                              resultado + 
                              expresion.substring(cierreCorrespondiente + 1);
        
        return {
            nuevaExpresion: nuevaExpresion,
            operacion: `(${dentroParentesis}) = ${resultado}`
        };
    }

    resolverPotenciasYRaices(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Buscar raíces cuadradas
        const regexRaiz = /√\(([^()]+)\)/g;
        let matchRaiz;
        
        while ((matchRaiz = regexRaiz.exec(expresionActual)) !== null) {
            const argumento = matchRaiz[1];
            let valorArgumento;
            
            try {
                const argumentoComputable = this.prepararExpresionParaEvaluacion(argumento);
                valorArgumento = this.evaluarExpresionSegura(argumentoComputable);
            } catch (error) {
                continue;
            }
            
            const resultado = Math.sqrt(valorArgumento);
            const nuevaExpresion = expresionActual.replace(matchRaiz[0], resultado.toString());
            
            pasos.push({
                expresion: nuevaExpresion,
                explicacion: "Resolvemos raíces cuadradas (segunda prioridad en PAPOMUDAS)",
                operacion: `√(${argumento}) = ${resultado}`,
                subpasos: [
                    `Calculamos: √(${valorArgumento}) = ${resultado}`,
                    "Reemplazamos en la expresión"
                ]
            });
            
            expresionActual = nuevaExpresion;
            regexRaiz.lastIndex = 0;
        }
        
        // Buscar potencias
        const regexPotencia = /(\d+(?:\.\d+)?)\s*(\^|\²|\³)\s*(\d+(?:\.\d+)?)?/g;
        let matchPotencia;
        
        while ((matchPotencia = regexPotencia.exec(expresionActual)) !== null) {
            const base = parseFloat(matchPotencia[1]);
            const operador = matchPotencia[2];
            let exponente, resultado;
            
            if (operador === '²') {
                exponente = 2;
                resultado = base * base;
            } else if (operador === '³') {
                exponente = 3;
                resultado = base * base * base;
            } else {
                exponente = parseFloat(matchPotencia[3]);
                resultado = Math.pow(base, exponente);
            }
            
            resultado = this.formatearNumero(resultado);
            
            const nuevaExpresion = expresionActual.replace(matchPotencia[0], resultado.toString());
            pasos.push({
                expresion: nuevaExpresion,
                explicacion: "Resolvemos potencias (segunda prioridad en PAPOMUDAS)",
                operacion: `${matchPotencia[0]} = ${resultado}`,
                subpasos: [
                    `Calculamos: ${base} elevado a ${exponente} = ${resultado}`,
                    "Reemplazamos en la expresión"
                ]
            });
            
            expresionActual = nuevaExpresion;
            regexPotencia.lastIndex = 0;
        }
        
        return pasos;
    }

    resolverMultiplicacionesDivisiones(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Buscar multiplicaciones y divisiones
        const regexMultDiv = /(\d+(?:\.\d+)?)\s*([×÷])\s*(\d+(?:\.\d+)?)/g;
        let match;
        
        while ((match = regexMultDiv.exec(expresionActual)) !== null) {
            const izquierda = parseFloat(match[1]);
            const operador = match[2];
            const derecha = parseFloat(match[3]);
            let resultado;
            
            if (operador === '×') {
                resultado = izquierda * derecha;
            } else {
                if (derecha === 0) {
                    throw new Error('División por cero');
                }
                resultado = izquierda / derecha;
            }
            
            resultado = this.formatearNumero(resultado);
            
            const nuevaExpresion = expresionActual.replace(match[0], resultado.toString());
            pasos.push({
                expresion: nuevaExpresion,
                explicacion: "Resolvemos multiplicaciones y divisiones (tercera prioridad en PAPOMUDAS)",
                operacion: `${match[0]} = ${resultado}`,
                subpasos: [
                    `Realizamos la operación: ${izquierda} ${operador} ${derecha} = ${resultado}`,
                    "Continuamos de izquierda a derecha"
                ]
            });
            
            expresionActual = nuevaExpresion;
            regexMultDiv.lastIndex = 0;
        }
        
        return pasos;
    }

    resolverSumasRestas(expresion) {
        const pasos = [];
        let expresionActual = expresion;
        
        // Buscar sumas y restas
        const regexSumaResta = /(-?\d+(?:\.\d+)?)\s*([+\-])\s*(\d+(?:\.\d+)?)/g;
        let match;
        
        while ((match = regexSumaResta.exec(expresionActual)) !== null) {
            const izquierda = parseFloat(match[1]);
            const operador = match[2];
            const derecha = parseFloat(match[3]);
            let resultado;
            
            if (operador === '+') {
                resultado = izquierda + derecha;
            } else {
                resultado = izquierda - derecha;
            }
            
            resultado = this.formatearNumero(resultado);
            
            const nuevaExpresion = expresionActual.replace(match[0], resultado.toString());
            pasos.push({
                expresion: nuevaExpresion,
                explicacion: "Resolvemos sumas y restas (última prioridad en PAPOMUDAS)",
                operacion: `${match[0]} = ${resultado}`,
                subpasos: [
                    `Realizamos la operación: ${izquierda} ${operador} ${derecha} = ${resultado}`,
                    "Continuamos de izquierda a derecha"
                ]
            });
            
            expresionActual = nuevaExpresion;
            regexSumaResta.lastIndex = 0;
        }
        
        return pasos;
    }

    // ===== FUNCIONES AUXILIARES =====
    destacarElementos(expresion) {
        const elementos = ['(', ')', '+', '-', '×', '÷', '^', '²', '³', '√', 'sin', 'cos', 'tan', 'log', 'π', 'e'];
        elementos.sort((a, b) => b.length - a.length);
        
        let resultado = expresion;
        for (const elemento of elementos) {
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
        
        // Redondear para evitar números como 0.30000000000000004
        return Math.round(numero * 100000000) / 100000000;
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