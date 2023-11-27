let rutina = [];
let numeroEjercicio = 1;

function generarInputs() {
    const series = parseInt(document.getElementById('seriesInput').value);
    const ejerciciosSection = document.getElementById('ejerciciosSection');

    for (let i = 1; i <= series; i++) {
        const ejercicioDiv = document.createElement('div');
        ejercicioDiv.innerHTML = `
            <h3>Serie ${i}</h3>
            <label for="pesoEjercicio${numeroEjercicio}">Peso (kg):</label>
            <input type="number" id="pesoEjercicio${numeroEjercicio}">
            <label for="repeticionesEjercicio${numeroEjercicio}">Repeticiones:</label>
            <input type="number" id="repeticionesEjercicio${numeroEjercicio}">
        `;
        ejerciciosSection.appendChild(ejercicioDiv);
        numeroEjercicio++;
    }
}

async function agregarOtroEjercicio() {
    const zonaCuerpo = document.getElementById('zonaCuerpo').value;
    const nombreEjercicio = document.getElementById('nombreEjercicio').value;

    const ejerciciosSection = document.getElementById('ejerciciosSection');
    const datosEjercicios = [];

    for (let i = 1; i < numeroEjercicio; i++) {
        const peso = document.getElementById(`pesoEjercicio${i}`).value;
        const repeticiones = document.getElementById(`repeticionesEjercicio${i}`).value;

        datosEjercicios.push({ peso, repeticiones });
    }

    const ejercicioInfoDiv = document.createElement('div');
    ejercicioInfoDiv.innerHTML = `
        <p>Zona del Cuerpo: ${zonaCuerpo}</p>
        <p>Nombre del Ejercicio: ${nombreEjercicio}</p>
    `;

    datosEjercicios.forEach((dato, i) => {
        ejercicioInfoDiv.innerHTML += `
            <p>Serie ${i + 1}: Peso: ${dato.peso} kg, Repeticiones: ${dato.repeticiones}</p>
        `;
    });

    ejerciciosSection.appendChild(ejercicioInfoDiv);

    const ejercicio = await obtenerEjercicio(nombreEjercicio);
    if (ejercicio) {
        rutina.push({ ...ejercicio, zonaCuerpo, datosEjercicios });
    }

    document.getElementById('nombreEjercicio').value = '';
    for (let i = 1; i < numeroEjercicio; i++) {
        document.getElementById(`pesoEjercicio${i}`).value = '';
        document.getElementById(`repeticionesEjercicio${i}`).value = '';
    }
    numeroEjercicio = 1;
}

async function obtenerEjercicio(nombre) {
        try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/2?nombre=${nombre}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener ejercicio de la API:', error);
        return null;
    }
}