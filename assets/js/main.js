// main.js - Versión simplificada y funcional
class SistemaEducaWeb {
    constructor() {
        this.calculadora = null;
        this.analizador = null;
        this.inicializarSistema();
    }

    async inicializarSistema() {
        await this.cargarComponentes();
        this.inicializarModulos();
        this.inicializarEventosGlobales();
    }

    async cargarComponentes() {
        try {
            // Cargar header y footer en paralelo
            const [headerData, footerData] = await Promise.all([
                this.cargarComponente('components/header.html'),
                this.cargarComponente('components/footer.html')
            ]);

            if (headerData) document.getElementById('header').innerHTML = headerData;
            if (footerData) document.getElementById('footer').innerHTML = footerData;

            console.log('✅ Componentes cargados correctamente');
        } catch (error) {
            console.warn('⚠️ Algunos componentes no se cargaron:', error.message);
        }
    }

    async cargarComponente(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (error) {
            console.warn(`No se pudo cargar ${url}:`, error.message);
            return null;
        }
    }

    inicializarModulos() {
        // Solo inicializar en páginas que tengan la calculadora
        const displayMatematico = document.getElementById('display-matematico');
        
        if (displayMatematico) {
            console.log('🚀 Inicializando módulos matemáticos...');
            
            // Inicializar calculadora
            try {
                this.calculadora = new CalculadoraCientifica();
                console.log('✅ Calculadora inicializada');
            } catch (error) {
                console.error('❌ Error inicializando calculadora:', error);
            }

            // Inicializar analizador si existe
            if (typeof AnalizadorMatematico !== 'undefined') {
                try {
                    this.analizador = new AnalizadorMatematico();
                    console.log('✅ Analizador matemático inicializado');
                } catch (error) {
                    console.error('❌ Error inicializando analizador:', error);
                }
            }
        }
    }

    inicializarEventosGlobales() {
        console.log('🔧 Eventos globales inicializados');
        // Aquí puedes añadir eventos que necesites en toda la aplicación
    }
}

// Inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new SistemaEducaWeb();
    });
} else {
    // DOM ya está listo
    window.app = new SistemaEducaWeb();
}