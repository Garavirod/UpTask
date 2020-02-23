const tareas = document.querySelector('.listado-pendientes');
// If there exist task
if (tareas) {
    // hre we add an event to task list
    tareas.addEventListener('click', e => {
        console.log(e.target.classList);
    });
}

export default tareas;