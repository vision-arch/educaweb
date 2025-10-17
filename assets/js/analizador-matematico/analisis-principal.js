// analisis-principal.js
class AnalizadorMatematico {
    constructor() {
        this.pasos = [];
        this.pasoActual = 0;
        this.expresionOriginal = '';
        
        // Inicializar módulos
        this.utilidades = new ModuloUtilidades();
        this.explicador = new ModuloExplicaciones();
        this.resolucion = new ModuloResolucion();
        this.visualizador = new ModuloVisualizacion();
        
        this.inicializarAnalizador();
    }

    inicializarAnalizador() {
        this.inicializarEventos();
        this.inicializarNavegacion();
    }

    inicializarEventos() {
        document.addEventListener('expresionParaAnalizar', (event) => {
            const { expresion } = event.detail;
            this.analizarExpresionCompleta(expresion);
        });

        const display = document.getElementById('display-matematico');
        if (display) {
            display.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const expresion = e.target.value.trim();
                    if (expresion) this.analizarExpresionCompleta(expresion);
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

    analizarExpresionCompleta(expresion) {
        try {
            this.utilidades.prepararInterfaz();
            this.expresionOriginal = expresion;
            this.pasos = [];
            this.pasoActual = 0;

            this.agregarAnalisisEstructural(expresion);
            this.agregarProcesoResolucion(expresion);
            this.agregarReflexionFinal(expresion);

            this.visualizador.mostrarAnalisis(this.pasos, this.expresionOriginal);
            this.actualizarNavegacion();
            
        } catch (error) {
            this.visualizador.mostrarError(`Error en el análisis: ${error.message}`);
        }
    }

    agregarAnalisisEstructural(expresion) {
        const componentes = this.utilidades.identificarComponentes(expresion);
        const contenido = this.explicador.generarAnalisisEstructural(expresion, componentes);
        
        this.pasos.push({
            tipo: 'estructura',
            titulo: '🔍 Análisis Inicial de la Expresión',
            contenido: contenido,
            expresion: expresion
        });
    }

    agregarProcesoResolucion(expresion) {
        const proceso = this.resolucion.obtenerProcesoResolucion(expresion, this.expresionOriginal);
        const contenido = this.visualizador.generarVistaProcesoResolucion(proceso);
        
        this.pasos.push({
            tipo: 'resolucion',
            titulo: '🔄 Proceso de Resolución Paso a Paso',
            contenido: contenido,
            expresion: this.expresionOriginal
        });
    }

    agregarReflexionFinal(expresion) {
        const contenido = this.explicador.generarReflexionFinal(expresion);
        
        this.pasos.push({
            tipo: 'reflexion',
            titulo: '💭 Reflexión Final',
            contenido: contenido,
            expresion: expresion
        });
    }

    actualizarNavegacion() {
        const btnPrev = document.getElementById('btn-prev-paso');
        const btnNext = document.getElementById('btn-next-paso');
        
        if (btnPrev) btnPrev.disabled = this.pasoActual === 0;
        if (btnNext) btnNext.disabled = this.pasoActual === this.pasos.length - 1;
    }

    pasoAnterior() {
        if (this.pasoActual > 0) {
            this.pasoActual--;
            this.visualizador.actualizarVistaPasos(this.pasoActual);
            this.actualizarNavegacion();
        }
    }

    pasoSiguiente() {
        if (this.pasoActual < this.pasos.length - 1) {
            this.pasoActual++;
            this.visualizador.actualizarVistaPasos(this.pasoActual);
            this.actualizarNavegacion();
        }
    }

    reiniciarAnalisis() {
        this.utilidades.reiniciarInterfaz();
    }
}