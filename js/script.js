// Elementos del DOM para el formulario de contacto
const contactFab = document.querySelector('.contact-fab');
const contactModal = document.querySelector('.contact-modal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');

// Elementos del DOM para el carrusel
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentIndex = 0;

// Funciones del carrusel
function showSlide(index) {
    items.forEach(item => item.classList.remove('active'));
    
    if (index >= items.length) currentIndex = 0;
    if (index < 0) currentIndex = items.length - 1;
    
    items[currentIndex].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

// Cambio automático de slides cada 5 segundos
setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
}, 5000);

// Funciones del formulario de contacto
contactFab.addEventListener('click', () => {
    contactModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.style.display = 'none';
    }
});

// Validación y envío del formulario
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, ingresa un email válido');
        return;
    }

    try {
        // Aquí simularemos el envío del formulario
        // En un caso real, aquí irían las credenciales de tu servicio de email
        console.log('Enviando datos:', formData);
        
        // Simular delay de envío
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Cerrar modal
        contactModal.style.display = 'none';
        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
});

// Prevenir que el formulario se cierre al hacer clic dentro del modal
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Manejo de modales de proyectos
const projectButtons = document.querySelectorAll('.card-btn');
const projectModals = document.querySelectorAll('.project-modal');
const closeProjectButtons = document.querySelectorAll('.close-project-modal');

// Abrir modal del proyecto correspondiente
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.closest('.project-card').dataset.project;
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    });
});

// Cerrar modales de proyectos
closeProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.project-modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
});

// Cerrar modal al hacer clic fuera
projectModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Animación de entrada para las tarjetas de proyectos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('fade-in');
    projectObserver.observe(card);
});

// Manejar el clic en el botón CTA
document.querySelector('.cta-button').addEventListener('click', () => {
    // Abrir el modal de contacto
    contactModal.style.display = 'flex';
}); 