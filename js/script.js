// EmailJS configuration
emailjs.init("MxxrOLdRiz3tV9i51");

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
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Mostrar loader
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        await emailjs.sendForm(
            'service_rbw0qkx',     // Tu Service ID
            'template_zjl35md',    // Tu Template ID
            contactForm,
            'MxxrOLdRiz3tV9i51'   // Tu Public Key
        );
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado con éxito!');
        contactForm.reset();
        contactModal.style.display = 'none';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
        // Restaurar botón
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
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

// Manejo del tema oscuro/claro
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Verificar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
}); 