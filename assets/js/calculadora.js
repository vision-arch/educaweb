// ===== CALCULADORA CIENTÍFICA - MÓDULO PRINCIPAL =====
class CalculadoraCientifica {
    constructor() {
        this.display = document.getElementById('display-matematico');
        this.expresionActual = '';
        this.ultimoResultado = null;
        this.modoGrados = true; // true = grados, false = radianes
        this.inicializarCalculadora();
    }

    inicializarCalculadora() {
        this.inicializarEventosTeclado();
        this.inicializarEventosBotones();
        this.inicializarEjemplosRapidos();
        this.mostrarMensajeBienvenida();
    }

    // ===== INICIALIZACIÓN DE EVENTOS =====
    inicializarEventosTeclado() {
        // Eventos de teclado físico
        document.addEventListener('keydown', (e) => {
            this.manejarTecladoFisico(e);
        });

        this.display.addEventListener('input', (e) => {
            this.validarEntradaDirecta(e.target.value);
        });
    }

    inicializarEventosBotones() {
        // Botones numéricos y operadores básicos
        document.querySelectorAll('.btn-tecla').forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const valor = boton.getAttribute('data-val');
                this.agregarCaracter(valor);
            });
        });

        // Botones de control
        document.getElementById('btn-limpiar').addEventListener('click', () => this.limpiarDisplay());
        document.getElementById('btn-borrar').addEventListener('click', () => this.borrarUltimoCaracter());
        document.getElementById('btn-analizar').addEventListener('click', () => this.analizarExpresion());

        // Botón igual (evaluación)
        const btnIgual = document.querySelector('.btn-igual');
        if (btnIgual) {
            btnIgual.addEventListener('click', () => this.calcularResultado());
        }
    }

    inicializarEjemplosRapidos() {
        document.querySelectorAll('.ejemplo-rapido').forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const ejemplo = boton.getAttribute('data-ejemplo');
                this.cargarEjemplo(ejemplo);
            });
        });
    }

    // ===== MANEJO DEL TECLADO FÍSICO =====
    manejarTecladoFisico(event) {
        const tecla = event.key;
        
        // Prevenir comportamiento por defecto para teclas específicas
        if (this.esTeclaCalculadora(tecla)) {
            event.preventDefault();
        }

        // Mapeo de teclas físicas a funciones de la calculadora
        const mapeoTeclas = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '+': '+', '-': '-', '*': '×', '/': '÷',
            '.': '.', ',': '.',
            'Enter': '=',
            '=': '=',
            'Backspace': 'borrar',
            'Delete': 'limpiar',
            'Escape': 'limpiar',
            '^': '^',
            '(': '(', ')': ')',
            'p': 'π', 'P': 'π',
            'e': 'e', 'E': 'e'
        };

        const accion = mapeoTeclas[tecla];
        
        if (accion) {
            switch(accion) {
                case '=':
                    this.calcularResultado();
                    break;
                case 'borrar':
                    this.borrarUltimoCaracter();
                    break;
                case 'limpiar':
                    this.limpiarDisplay();
                    break;
                default:
                    this.agregarCaracter(accion);
            }
        }
    }

    esTeclaCalculadora(tecla) {
        const teclasCalculadora = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '+', '-', '*', '/', '.', ',', '=', 'Enter',
            'Backspace', 'Delete', 'Escape', '^', '(', ')',
            'p', 'P', 'e', 'E'
        ];
        return teclasCalculadora.includes(tecla);
    }

    // ===== FUNCIONES PRINCIPALES DE LA CALCULADORA =====
    agregarCaracter(caracter) {
        const seleccionInicio = this.display.selectionStart;
        const seleccionFin = this.display.selectionEnd;
        const textoActual = this.display.value;

        // Conversión de símbolos matemáticos a formato computable
        const caracterConvertido = this.convertirSimboloMatematico(caracter);
        
        // Insertar el carácter en la posición del cursor
        const nuevoTexto = textoActual.substring(0, seleccionInicio) + 
                          caracterConvertido + 
                          textoActual.substring(seleccionFin);
        
        this.display.value = nuevoTexto;
        this.expresionActual = nuevoTexto;

        // Reposicionar cursor después del carácter insertado
        const nuevaPosicion = seleccionInicio + caracterConvertido.length;
        this.display.setSelectionRange(nuevaPosicion, nuevaPosicion);
        this.display.focus();

        this.actualizarEstadoDisplay();
    }

    convertirSimboloMatematico(simbolo) {
        const conversiones = {
            '÷': '/',
            '×': '*',
            '−': '-',
            '²': '^2',
            '³': '^3',
            '^': '^',
            '√': 'sqrt(',
            'π': 'π',
            'e': 'e',
            'sin': 'sin(',
            'cos': 'cos(',
            'tan': 'tan(',
            'log': 'log('
        };
        return conversiones[simbolo] || simbolo;
    }

    borrarUltimoCaracter() {
        const inicio = this.display.selectionStart;
        const fin = this.display.selectionEnd;
        const textoActual = this.display.value;
        
        if (inicio === fin && inicio > 0) {
            // Borrar un solo carácter
            this.display.value = textoActual.substring(0, inicio - 1) + textoActual.substring(inicio);
            this.display.setSelectionRange(inicio - 1, inicio - 1);
        } else if (inicio !== fin) {
            // Borrar selección
            this.display.value = textoActual.substring(0, inicio) + textoActual.substring(fin);
            this.display.setSelectionRange(inicio, inicio);
        } else {
            // Borrar último carácter (cursor al final)
            this.display.value = textoActual.slice(0, -1);
            this.display.setSelectionRange(this.display.value.length, this.display.value.length);
        }
        
        this.expresionActual = this.display.value;
        this.display.focus();
        this.actualizarEstadoDisplay();
    }

    limpiarDisplay() {
        this.display.value = '';
        this.expresionActual = '';
        this.ultimoResultado = null;
        this.actualizarEstadoDisplay();
        this.display.focus();
    }

    // ===== VALIDACIÓN Y FORMATO =====
    validarEntradaDirecta(valor) {
        // Permitir solo caracteres matemáticos válidos
        const caracteresValidos = /^[0-9+\-*/().√πe^²³sincostanlog]*$/;
        
        if (!caracteresValidos.test(valor)) {
            // Remover caracteres inválidos
            this.display.value = valor.replace(/[^0-9+\-*/().√πe^²³sincostanlog]/g, '');
        }
        
        this.expresionActual = this.display.value;
        this.actualizarEstadoDisplay();
    }

    formatearNumero(numero) {
        // Formatear números para mostrar en pantalla
        if (typeof numero !== 'number') return numero;
        
        // Redondear números muy largos
        if (Math.abs(numero) > 1e10 || (Math.abs(numero) < 1e-10 && numero !== 0)) {
            return numero.toExponential(6);
        }
        
        // Redondear decimales
        return Math.round(numero * 1e10) / 1e10;
    }

    // ===== CÁLCULO Y EVALUACIÓN =====
    calcularResultado() {
        if (!this.expresionActual.trim()) {
            this.mostrarError('Ingresa una expresión para calcular');
            return;
        }

        try {
            // Convertir expresión a formato evaluable
            const expresionEvaluable = this.prepararExpresionParaEvaluacion(this.expresionActual);
            
            // Evaluar la expresión
            const resultado = this.evaluarExpresion(expresionEvaluable);
            
            if (resultado !== null && resultado !== undefined) {
                this.ultimoResultado = resultado;
                this.display.value = this.formatearNumero(resultado);
                this.expresionActual = this.display.value;
                this.mostrarMensajeExito('Cálculo completado');
            }
        } catch (error) {
            this.mostrarError(`Error en el cálculo: ${error.message}`);
            console.error('Error de cálculo:', error);
        }
    }

    prepararExpresionParaEvaluacion(expresion) {
        return expresion
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, this.modoGrados ? 'Math.sin(Math.PI/180*' : 'Math.sin(')
            .replace(/cos\(/g, this.modoGrados ? 'Math.cos(Math.PI/180*' : 'Math.cos(')
            .replace(/tan\(/g, this.modoGrados ? 'Math.tan(Math.PI/180*' : 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/\^/g, '**');
    }

    evaluarExpresion(expresion) {
        // Validar expresión antes de evaluar
        if (!this.validarExpresion(expresion)) {
            throw new Error('Expresión matemática inválida');
        }

        try {
            // Usar Function constructor para evaluación segura
            const funcionEvaluadora = new Function('return ' + expresion);
            return funcionEvaluadora();
        } catch (error) {
            throw new Error('No se puede evaluar la expresión');
        }
    }

    validarExpresion(expresion) {
        // Validar paréntesis balanceados
        const pila = [];
        for (let char of expresion) {
            if (char === '(') pila.push('(');
            if (char === ')') {
                if (pila.length === 0) return false;
                pila.pop();
            }
        }
        if (pila.length !== 0) return false;

        // Validar estructura básica
        const estructuraValida = /^[0-9+\-*/().Math\s]+$/.test(expresion.replace(/Math\.\w+\(/g, ''));
        if (!estructuraValida) return false;

        return true;
    }

    // ===== ANÁLISIS DE EXPRESIÓN =====
    analizarExpresion() {
        const expresion = this.display.value.trim();
        
        if (!expresion) {
            this.mostrarError('Por favor, ingresa una expresión matemática');
            return;
        }

        try {
            // Disparar evento personalizado para el análisis
            const eventoAnalisis = new CustomEvent('expresionParaAnalizar', {
                detail: {
                    expresion: expresion,
                    expresionComputable: this.prepararExpresionParaEvaluacion(expresion),
                    timestamp: new Date().toISOString()
                }
            });
            
            document.dispatchEvent(eventoAnalisis);
            this.mostrarMensajeExito('Expresión enviada para análisis');
            
        } catch (error) {
            this.mostrarError(`Error al preparar el análisis: ${error.message}`);
        }
    }

    // ===== EJEMPLOS Y PLANTILLAS =====
    cargarEjemplo(ejemplo) {
        this.display.value = ejemplo;
        this.expresionActual = ejemplo;
        this.actualizarEstadoDisplay();
        this.mostrarMensajeInfo(`Ejemplo cargado: ${ejemplo}`);
    }

    // ===== INTERACCIÓN CON LA INTERFAZ =====
    actualizarEstadoDisplay() {
        const expresion = this.display.value;
        const tieneContenido = expresion.trim().length > 0;
        
        // Actualizar estado visual del display
        if (tieneContenido) {
            this.display.classList.add('display-activo');
        } else {
            this.display.classList.remove('display-activo');
        }

        // Actualizar estado del botón de análisis
        const btnAnalizar = document.getElementById('btn-analizar');
        if (btnAnalizar) {
            btnAnalizar.disabled = !tieneContenido;
        }
    }

    mostrarMensajeBienvenida() {
        console.log('🧮 Calculadora Científica inicializada');
        this.actualizarEstadoDisplay();
    }

    mostrarMensajeExito(mensaje) {
        this.mostrarNotificacion(mensaje, 'success');
    }

    mostrarMensajeInfo(mensaje) {
        this.mostrarNotificacion(mensaje, 'info');
    }

    mostrarError(mensaje) {
        this.mostrarNotificacion(mensaje, 'danger');
        console.error('Error calculadora:', mensaje);
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear notificación toast básica
        const toast = document.createElement('div');
        toast.className = `alert alert-${tipo} alert-dismissible fade show`;
        toast.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.minWidth = '300px';

        document.body.appendChild(toast);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }

    // ===== FUNCIONES AVANZADAS =====
    toggleModoAngulos() {
        this.modoGrados = !this.modoGrados;
        const modoTexto = this.modoGrados ? 'Grados' : 'Radianes';
        this.mostrarMensajeInfo(`Modo de ángulos cambiado a: ${modoTexto}`);
        return this.modoGrados;
    }

    usarUltimoResultado() {
        if (this.ultimoResultado !== null) {
            this.agregarCaracter(this.ultimoResultado.toString());
        } else {
            this.mostrarError('No hay resultado previo para usar');
        }
    }

    // ===== MÉTODOS PÚBLICOS =====
    getExpresionActual() {
        return this.expresionActual;
    }

    setExpresion(expresion) {
        this.display.value = expresion;
        this.expresionActual = expresion;
        this.actualizarEstadoDisplay();
    }

    getUltimoResultado() {
        return this.ultimoResultado;
    }
}

// ===== INICIALIZACIÓN Y MÉTODOS GLOBALES =====
let calculadora;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar calculadora
    calculadora = new CalculadoraCientifica();
    
    // Hacer disponible globalmente para debugging
    window.calculadora = calculadora;
    
    console.log('✅ Calculadora científica cargada correctamente');
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculadoraCientifica;
}