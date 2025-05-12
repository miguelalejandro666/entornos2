$(document).ready(function() {

    // Función para obtener el valor de una cookie
    function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // Función para establecer una cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Función para cargar las tareas desde las cookies
    function loadTasks() {
        const tasks = getCookie('tasks');
        if (tasks) {
            const taskArray = JSON.parse(tasks);
            taskArray.forEach(task => {
                addTaskToList(task);
            });
        }
    }

    // Función para agregar una tarea a la lista
    function addTaskToList(taskContent) {
        const taskDiv = $('<div></div>').addClass('to-do').text(taskContent);

        // Evento para eliminar tarea al hacer clic
        taskDiv.on('click', function() {
            const confirmation = window.confirm("¿Quieres eliminar esta tarea?");
            if (confirmation) {
                taskDiv.remove();
                updateCookie();
            }
        });

        // Insertar la tarea al principio de la lista
        $('#ft_list').prepend(taskDiv);
    }

    // Función para actualizar la cookie con las tareas actuales
    function updateCookie() {
        const tasks = [];
        $('#ft_list').find('.to-do').each(function() {
            tasks.push($(this).text());
        });
        setCookie('tasks', JSON.stringify(tasks), 7);
    }

    // Evento para crear una nueva tarea
    $('#new-task-btn').on('click', function() {
        const newTask = window.prompt("Añadir nueva tarea:");
        if (newTask && newTask.trim() !== "") {
            addTaskToList(newTask);
            updateCookie();
        }
    });

    // Cargar tareas al cargar la página
    loadTasks();

});