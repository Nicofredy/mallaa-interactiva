document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.ramo');

    botones.forEach(btn => {
        const requeridos = btn.dataset.requiere?.split(',') || [];

        // Inicialmente bloquear si tiene requisitos
        if (requeridos.length > 0) {
            btn.classList.add('bloqueado');
            btn.disabled = true;
        }

        btn.addEventListener('click', () => {
            if (btn.classList.contains('bloqueado')) return;

            btn.classList.toggle('aprobado');

            actualizarEstado();
        });
    });

    function actualizarEstado() {
        document.querySelectorAll('.ramo').forEach(btn => {
            const requeridos = btn.dataset.requiere?.split(',') || [];

            if (requeridos.length > 0) {
                const aprobados = requeridos.every(id => 
                    document.getElementById(id)?.classList.contains('aprobado')
                );

                if (aprobados) {
                    btn.classList.remove('bloqueado');
                    btn.disabled = false;
                }
            }
        });
    }
});

