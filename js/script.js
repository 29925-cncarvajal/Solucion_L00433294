
function getSelectedEntrega() {
    const entregaRadios = document.getElementsByName('entrega');
    for (let i = 0; i < entregaRadios.length; i++) {
        if (entregaRadios[i].checked) return entregaRadios[i].value;
    }
    return null;
}

/* --------------------- Formulario de Registro --------------------- */
// Maneja la visibilidad/estado cuando el usuario elige tipo de entrega
function toggleEnvio() {
    const seleccionado = getSelectedEntrega();
    const formConfidencial = document.getElementById('formConfidencial') || document.getElementById('formConfidenci');
    const enviarDatos = document.getElementById('enviarDatos');

    if (seleccionado === 'tercero') {
        if (formConfidencial) formConfidencial.style.display = 'block';
        if (enviarDatos) enviarDatos.disabled = false; // compatibilidad: no bloquear por defecto
        return;
    }

    if (seleccionado === 'propietario') {
        if (enviarDatos) enviarDatos.disabled = false;
        if (formConfidencial) formConfidencial.style.display = 'none';
        return;
    }

    // Ninguna selección
    if (enviarDatos) enviarDatos.disabled = true;
    if (formConfidencial) formConfidencial.style.display = 'none';
}

// Enviar datos del formulario de registro (valida formularios relacionados)
function enviarDatosEnvio() {
    const form = document.getElementById('formEnvio');
    const btn = document.getElementById('enviarDatos');
    if (!form) return;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Si el usuario seleccionó 'tercero', validar también el formulario confidencial
    const seleccionado = getSelectedEntrega();
    if (seleccionado === 'tercero') {
        const formC = document.getElementById('formConfidencial');
        if (!formC) {
            alert('Complete la información confidencial antes de enviar.');
            return;
        }
        if (!formC.checkValidity()) {
            formC.reportValidity();
            return;
        }
    }

    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Enviando datos ……....';
    }
    form.submit();
}

function guardarConfidencial() {
    // Simulación de guardado; se puede ampliar con validaciones o envío separado
    alert('Información confidencial guardada (simulación).');
}

/* --------------------- Formulario de Producto --------------------- */
function borrarDatos() {
    // Resetea el formulario de producto
    if (document.forms['FormProducto']) document.forms['FormProducto'].reset();
}

function enviarFormulario(button) {
    // Utilidad genérica para botones que envían formularios
    if (!button || !button.form) return;
    button.disabled = true;
    button.value = 'Enviando datos ……....';
    button.form.submit();
}

/* --------------------- Formulario de Contacto --------------------- */
function validar() {
    var correo = document.getElementById('txtEmail') ? document.getElementById('txtEmail').value : '';
    var telefono = document.getElementById('txtTelefono') ? document.getElementById('txtTelefono').value : '';
    var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;

    if (!expresion.test(correo)) {
        alert('El correo no es válido');
        return false;
    }
    if (telefono.length != 10) {
        alert('El telefono no es correcto');
        return false;
    } else if (isNaN(telefono)) {
        alert('El telefono ingresado no es un número');
        return false;
    } else {
        alert('Datos ingresados correctamente');
        if (checkSubmit()) {
            alert('Ejecutado checkSubmit() correctamente....');
            window.open('FormContactoEnviado.html');
            return true;
        } else {
            alert('Script checkSubmit() No se ejecuto correctamente');
            return true;
        }
    }
}

function checkSubmit() {
    var btn = document.getElementById('btnEnviar');
    if (btn) {
        btn.value = 'Datos enviados correctamente';
        btn.disabled = true;
    }
    // Nota: window.close() puede no funcionar según el contexto del navegador
    try { window.close(); } catch (e) { /* no-op */ }
    return true;
}

/* --------------------- Login / Utilidades --------------------- */
function validarLogin() {
    const usuario = document.getElementById('usuario') ? document.getElementById('usuario').value : '';
    const contrasena = document.getElementById('contrasena') ? document.getElementById('contrasena').value : '';

    if (usuario === '' || contrasena === '') {
        alert('Falta un campo por llenar');
        return false;
    }
    return true;
}

function handleSubmit(button) {
    // Validar el formulario de contacto antes de enviar
    if (validar()) {
        if (!button || !button.form) return;
        button.disabled = true;
        button.value = 'Enviando datos …………';
        button.form.submit();
    }
}
