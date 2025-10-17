// modulo-copisi.js
class ModuloCOPISI {
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

    generarExplicacionPotenciaCOPISI(base, resultado) {
        return `
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
        `;
    }

    generarExplicacionMultiplicacionCOPISI(izquierda, derecha, resultado) {
        return `
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
        `;
    }

    generarExplicacionSumaCOPISI(izquierda, derecha, resultado) {
        return `
            <div class="paso-detallado">
                <h6>➕ PASO 3: Resolver la Suma ${izquierda} + ${derecha}</h6>
                <p><strong>¿Qué es sumar?</strong></p>
                <p>Sumar es <strong>combinar o juntar</strong> cantidades.</p>
                
                <div class="row mt-3">
                    <div class="col-md-6">
                        <strong>🎯 CONCRETO:</strong>
                        <p>Tenemos ${izquierda} objetos y agregamos ${derecha} más:</p>
                        <div class="suma-visual mb-2">
                            ${this.generarSumaVisual(izquierda, derecha, resultado)}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <strong>🔢 SIMBÓLICO:</strong>
                        <p>${izquierda} + ${derecha} = ${resultado}</p>
                        <p><strong>Regla PAPOMUDAS:</strong> La suma se resuelve al final, después de potencias y multiplicaciones.</p>
                    </div>
                </div>
            </div>
        `;
    }

    generarResumenLogros() {
        return `
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
        `;
    }

    generarPreguntasReflexion() {
        return `
            <div class="p-3 bg-light rounded">
                <h6>💭 Para reflexionar:</h6>
                <p class="mb-2"><small><em>"Las matemáticas no son solo números, son una forma de pensar y resolver problemas. Cada expresión matemática cuenta una historia sobre cantidades, relaciones y patrones."</em></small></p>
                <p class="mb-0"><strong>Pregunta:</strong> <small>¿En qué situaciones de tu vida diaria usas el mismo tipo de pensamiento que aplicaste aquí?</small></p>
            </div>
        `;
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

    generarGruposVisuales(filas, columnas) {
        let html = '<div style="font-family: monospace;">';
        for (let i = 0; i < filas; i++) {
            html += `<div class="mb-1"><small>Grupo ${i + 1}: ${'•'.repeat(columnas)}</small></div>`;
        }
        html += '</div>';
        return html;
    }

    generarSumaVisual(izquierda, derecha, resultado) {
        return `
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
        `;
    }
}