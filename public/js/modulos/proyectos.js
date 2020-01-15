import Swal from 'sweetalert2';
import axios from 'axios';
import { exportDefaultDeclaration } from 'babel-types';

const btnEliminar = document.querySelector('#eliminar-proyecto');
if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        // Accedemos a los atributos personalizados
        const urlProyecto = e.target.dataset.proyectoUrl;
        // console.log(urlProyecto);
        // return;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // On this block we'll send a petiton to axios            
            if (result.value) {
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                axios.delete(url, { params: { urlProyecto } })
                    .then(function(respuesta) {
                        console.log(respuesta);
                        Swal.fire(
                            'Deleted!',
                            respuesta.data,
                            'success'
                        );
                        // // Redirect to user to home
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    });
            }
        })
    });
}

export default btnEliminar;