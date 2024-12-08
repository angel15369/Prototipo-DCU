// Inicializar lista de reportes desde localStorage o crear una vacía
let reportes = JSON.parse(localStorage.getItem('reportes')) || [];

// Mostrar vista previa de imagen al seleccionar un archivo
if (document.getElementById('imagen')) {
    const imagenInput = document.getElementById('imagen');
    const preview = document.getElementById('preview');

    imagenInput.addEventListener('change', () => {
        const file = imagenInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
    });
}

// Agregar un nuevo reporte
if (document.getElementById('form-reporte')) {
    const formReporte = document.getElementById('form-reporte');
    formReporte.addEventListener('submit', (e) => {
        e.preventDefault();
        const descripcion = document.getElementById('descripcion').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const imagen = document.getElementById('imagen').files[0];

        let imagenDataURL = null;

        if (imagen) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenDataURL = e.target.result;

                const nuevoReporte = {
                    descripcion,
                    ubicacion,
                    imagen: imagenDataURL,
                    fecha: new Date().toISOString(),
                };

                reportes.push(nuevoReporte);
                localStorage.setItem('reportes', JSON.stringify(reportes)); // Guardar en localStorage
                alert('Reporte agregado exitosamente');
                window.location.href = 'index.html'; // Volver a la lista
            };
            reader.readAsDataURL(imagen);
        } else {
            const nuevoReporte = {
                descripcion,
                ubicacion,
                imagen: null,
                fecha: new Date().toISOString(),
            };

            reportes.push(nuevoReporte);
            localStorage.setItem('reportes', JSON.stringify(reportes)); // Guardar en localStorage
            alert('Reporte agregado exitosamente');
            window.location.href = 'index.html'; // Volver a la lista
        }
    });
}

// Mostrar los reportes en la página principal
if (document.getElementById('lista-reportes')) {
    const listaReportes = document.getElementById('lista-reportes');
    if (reportes.length === 0) {
        listaReportes.innerHTML = '<p>No hay reportes aún. Agrega uno nuevo.</p>';
    } else {
        reportes.forEach((reporte, index) => {
            const reporteElemento = document.createElement('div');
            reporteElemento.classList.add('reporte');
            reporteElemento.innerHTML = `
                <strong>${reporte.descripcion}</strong><br>
                Ubicación: ${reporte.ubicacion}<br>
                Fecha: ${new Date(reporte.fecha).toLocaleDateString()}<br>
                ${reporte.imagen ? `<img src="${reporte.imagen}" alt="Imagen del reporte" class="preview-img">` : ''}
                <button class="eliminar-reporte" data-index="${index}">Eliminar</button>
            `;
            listaReportes.appendChild(reporteElemento);
        });
    }

    // Agregar eventos para eliminar reportes
    document.querySelectorAll('.eliminar-reporte').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            reportes.splice(index, 1); // Eliminar reporte
            localStorage.setItem('reportes', JSON.stringify(reportes)); // Actualizar localStorage
            location.reload(); // Recargar la página
        });
    });
}
