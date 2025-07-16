document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de ramo
    const subjects = document.querySelectorAll('.subject');
    
    // Cargar progreso guardado
    loadProgress();
    
    // Actualizar estado inicial
    updateLockedStatus();
    
    // Añadir event listeners
    subjects.forEach(subject => {
        subject.addEventListener('click', function() {
            if (!this.classList.contains('locked')) {
                toggleSubject(this);
                saveProgress();
                updateLockedStatus();
            }
        });
        
        // Crear tooltip para prerrequisitos
        const prereqs = subject.dataset.prereq;
        if (prereqs) {
            const tooltip = document.createElement('div');
            tooltip.className = 'prereq-tooltip';
            tooltip.textContent = `Prerrequisitos: ${getPrereqNames(prereqs)}`;
            subject.appendChild(tooltip);
        }
    });
    
    // Botón de reset
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.textContent = 'Reiniciar Progreso';
    resetBtn.addEventListener('click', resetProgress);
    document.querySelector('.container').appendChild(resetBtn);
    
    // Función para alternar estado de aprobación
    function toggleSubject(subject) {
        subject.classList.toggle('approved');
    }
    
    // Función para obtener nombres de prerrequisitos
    function getPrereqNames(prereqIds) {
        return prereqIds.split(',').map(id => {
            const prereqSubject = document.querySelector(`.subject[data-id="${id}"]`);
            return prereqSubject ? prereqSubject.querySelector('h4').textContent : '';
        }).filter(name => name).join(', ');
    }
    
    // Función para guardar progreso
    function saveProgress() {
        const progress = {};
        subjects.forEach(subject => {
            progress[subject.dataset.id] = subject.classList.contains('approved');
        });
        localStorage.setItem('vetProgress', JSON.stringify(progress));
    }
    
    // Función para cargar progreso
    function loadProgress() {
        const savedProgress = localStorage.getItem('vetProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            subjects.forEach(subject => {
                if (progress[subject.dataset.id]) {
                    subject.classList.add('approved');
                }
            });
        }
    }
    
    // Función para actualizar estado de bloqueo
    function updateLockedStatus() {
        subjects.forEach(subject => {
            subject.classList.remove('locked');
            
            const prereqs = subject.dataset.prereq;
            if (prereqs && !subject.classList.contains('approved')) {
                const allPrereqsMet = prereqs.split(',').every(id => {
                    const prereqSubject = document.querySelector(`.subject[data-id="${id}"]`);
                    return prereqSubject && prereqSubject.classList.contains('approved');
                });
                
                if (!allPrereqsMet) {
                    subject.classList.add('locked');
                }
            }
        });
    }
    
    // Función para reiniciar progreso
    function resetProgress() {
        if (confirm('¿Estás seguro de que deseas reiniciar todo tu progreso?')) {
            subjects.forEach(subject => {
                subject.classList.remove('approved', 'locked');
            });
            localStorage.removeItem('vetProgress');
        }
    }
});
