// modulo-papomudas.js
class ModuloResolucion {
    constructor() {
        this.explicador = new ModuloExplicaciones();
        this.utilidades = new ModuloUtilidades();
    }

    obtenerProcesoResolucion(expresion, expresionOriginal) {
        const pasos = [];
        let expresionActual = expresion;

        // Paso inicial
        pasos.push(this.explicador.generarPasoInicial(expresionActual));

        // Resolver paso a paso según PAPOMUDAS
        expresionActual = this.resolverPotencias(pasos, expresionActual);
        expresionActual = this.resolverMultiplicaciones(pasos, expresionActual);
        expresionActual = this.resolverSumas(pasos, expresionActual);

        // Paso final
        pasos.push(this.generarPasoFinal(expresionActual, expresionOriginal));

        return pasos;
    }

    resolverPotencias(pasos, expresion) {
        let expresionActual = expresion;
        if (expresionActual.includes('²')) {
            const paso = this.explicador.generarExplicacionPotencia(expresionActual);
            if (paso) {
                pasos.push(paso);
                expresionActual = this.utilidades.extraerExpresionActual(paso.expresion);
            }
        }
        return expresionActual;
    }

    resolverMultiplicaciones(pasos, expresion) {
        let expresionActual = expresion;
        const paso = this.explicador.generarExplicacionMultiplicacion(expresionActual);
        if (paso) {
            pasos.push(paso);
            expresionActual = this.utilidades.extraerExpresionActual(paso.expresion);
        }
        return expresionActual;
    }

    resolverSumas(pasos, expresion) {
        let expresionActual = expresion;
        const paso = this.explicador.generarExplicacionSuma(expresionActual);
        if (paso) {
            pasos.push(paso);
            expresionActual = this.utilidades.extraerExpresionActual(paso.expresion);
        }
        return expresionActual;
    }

    generarPasoFinal(expresionActual, expresionOriginal) {
        try {
            const resultado = this.utilidades.evaluarExpresionSegura(
                this.utilidades.prepararExpresionParaEvaluacion(expresionActual)
            );
            
            return {
                expresion: `<span class="resultado-final fs-4 text-success">= ${resultado}</span>`,
                explicacion: this.explicador.generarReflexionFinalPedagogica(expresionOriginal, resultado),
                ejemploConcreto: "¡Has completado el proceso matemático! Como seguir una receta paso a paso hasta obtener el plato final.",
                imagenMental: "Imagina que cada operación matemática es un escalón que te lleva a la respuesta correcta.",
                operacion: "Resolución completa",
                verificacion: `Comprobación final: ${expresionOriginal} = ${resultado}`,
                esFinal: true
            };
        } catch (error) {
            return {
                expresion: "Error en cálculo final",
                explicacion: "No se pudo obtener el resultado final de la expresión.",
                ejemploConcreto: "A veces necesitamos revisar nuestros pasos, como cuando una receta no sale bien.",
                esFinal: true
            };
        }
    }
}