document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de ramo
    const subjects = document.querySelectorAll('.subject');
    
    // Cargar estado guardado del localStorage
    loadProgress();
    
    // Actualizar estado de los ramos basado en prerrequisitos
    updateLockedStatus();
    
    // Añadir event listeners a cada ramo
    subjects.forEach(subject => {
        subject.addEventListener('click', function() {
            if (!this.classList.contains('locked')) {
                this.classList.toggle('approved');
                
                // Guardar estado en localStorage
                saveProgress();
                
                // Actualizar estado de los ramos que dependan de este
                updateLockedStatus();
            }
        });
    });
    
    // Función para guardar el progreso en localStorage
    function saveProgress() {
        const progress = {};
        subjects.forEach(subject => {
            progress[subject.dataset.id] = subject.classList.contains('approved');
        });
        localStorage.setItem('vetProgress', JSON.stringify(progress));
    }
    
    // Función para cargar el progreso desde localStorage
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
    
    // Función para actualizar el estado de bloqueo de los ramos
    function updateLockedStatus() {
        subjects.forEach(subject => {
            // Reset locked status
            subject.classList.remove('locked');
            
            // Verificar prerrequisitos
            const prereqs = subject.dataset.prereq;
            if (prereqs) {
                const prereqList = prereqs.split(',');
                const allPrereqsMet = prereqList.every(prereqId => {
                    const prereqSubject = document.querySelector(`.subject[data-id="${prereqId}"]`);
                    return prereqSubject && prereqSubject.classList.contains('approved');
                });
                
                if (!allPrereqsMet && !subject.classList.contains('approved')) {
                    subject.classList.add('locked');
                    
                    // Mostrar información de prerrequisitos
                    let prereqNames = prereqList.map(prereqId => {
                        const prereqSubject = document.querySelector(`.subject[data-id="${prereqId}"]`);
                        return prereqSubject ? prereqSubject.textContent.trim().split('(')[0] : '';
                    }).filter(name => name !== '');
                    
                    if (prereqNames.length > 0) {
                        let prereqInfo = subject.querySelector('.prereq-info');
                        if (!prereqInfo) {
                            prereqInfo = document.createElement('div');
                            prereqInfo.className = 'prereq-info';
                            subject.appendChild(prereqInfo);
                        }
                        prereqInfo.textContent = `Prerrequisitos: ${prereqNames.join(', ')}`;
                    }
                } else {
                    // Eliminar información de prerrequisitos si ya no es necesaria
                    const prereqInfo = subject.querySelector('.prereq-info');
                    if (prereqInfo) {
                        prereqInfo.remove();
                    }
                }
            }
        });
    }
    
    // Botón para resetear todo (opcional)
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reiniciar Progreso';
    resetButton.style.display = 'block';
    resetButton.style.margin = '20px auto';
    resetButton.style.padding = '10px 20px';
    resetButton.style.backgroundColor = '#e91e63';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso?')) {
            subjects.forEach(subject => {
                subject.classList.remove('approved', 'locked');
                const prereqInfo = subject.querySelector('.prereq-info');
                if (prereqInfo) {
                    prereqInfo.remove();
                }
            });
            localStorage.removeItem('vetProgress');
        }
    });
    
    document.querySelector('.container').appendChild(resetButton);
});
