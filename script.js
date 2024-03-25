// Obtener los elementos
const entrada = document.getElementById('todo-input');
const btnAgregar = document.getElementById('add-btn');
const btnTareaMasRapida = document.getElementById('fastest-task-btn');
const btnBorrarTodo = document.getElementById('clear-all-btn');
const lista = document.getElementById('todo-list');

// Almacenar las tareas
const tareas = [];
const tiemposCompletados = [];

// Agregar evento al botón
btnAgregar.addEventListener('click', function() {
    // Crear un nuevo elemento de lista
    const li = document.createElement('li');
    const tarea = entrada.value;
    tareas.push(tarea);
    li.textContent = tarea;

    // Agregar el elemento de lista a la lista
    lista.appendChild(li);

    // Crear un timestamp para la creación de la tarea
    const fechaCreacion = new Date();
    console.log(`La tarea "${tarea}" fue creada en ${fechaCreacion}`);

    // Agregar evento 'click' al elemento de lista
    li.addEventListener('click', function() {
        const indice = Array.from(lista.children).indexOf(this);
        if (this.style.textDecoration === 'line-through') {
            this.style.textDecoration = 'none';
            tiemposCompletados[indice] = undefined; // Marcar como indefinido en lugar de eliminar
        } else {
            this.style.textDecoration = 'line-through';
            const fechaCompletado = new Date();
            tiemposCompletados[indice] = fechaCompletado.getTime();
            console.log(`La tarea "${tarea}" fue completada en ${fechaCompletado}`);
        }
    });
});

// Función para resaltar la tarea más rápida
function resaltarTareaMasRapida() {
    // Eliminar resaltado de todas las tareas
    const items = Array.from(lista.children);
    items.forEach((item) => {
        item.style.backgroundColor = '';
    });

    // Filtrar las tareas que no han sido completadas
    const tareasCompletadas = tiemposCompletados.filter(time => time !== undefined);

    // Si no hay tareas completadas, no hacer nada
    if (tareasCompletadas.length === 0) {
        return;
    }

    // Encontrar el índice de la tarea que se completó más rápido
    const indiceTareaMasRapida = tiemposCompletados.indexOf(Math.min(...tareasCompletadas));

    // Resaltar la tarea más rápida
    items.forEach((item, indice) => {
        if (indice === indiceTareaMasRapida && tiemposCompletados[indice] !== undefined) {
            item.style.backgroundColor = 'yellow';
        }
    });
}

// Agregar evento al botón de tarea más rápida
btnTareaMasRapida.addEventListener('click', resaltarTareaMasRapida);

// Agregar evento al botón de borrar todo
btnBorrarTodo.addEventListener('click', function() {
    // Eliminar todas las tareas de la lista
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Limpiar los arrays de tareas y tiemposCompletados
    tareas.length = 0;
    tiemposCompletados.length = 0;
});