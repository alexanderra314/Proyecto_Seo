// Función para sanitizar entrada de texto
const sanitizeInput = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };
  
  // Validación del formulario
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contactForm');
    const formErrors = document.querySelector('#formErrors');
  
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        validateInput(this);
      });
    });
  
    // Función de validación de inputs
    function validateInput(input) {
      const errorMessages = [];
      
      if (input.validity.valueMissing) {
        errorMessages.push(`El campo ${input.name} es requerido`);
      }
  
      if (input.validity.patternMismatch) {
        if (input.type === 'email') {
          errorMessages.push('Por favor, introduce un email válido');
        } else if (input.id === 'name') {
          errorMessages.push('El nombre solo debe contener letras y espacios');
        }
      }
  
      if (input.validity.tooLong) {
        errorMessages.push(`El campo ${input.name} es demasiado largo`);
      }
  
      // Mostrar errores específicos del campo
      const errorSpan = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : document.createElement('span');
      
      if (!input.nextElementSibling?.classList.contains('error-message')) {
        errorSpan.classList.add('error-message');
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
      }
  
      errorSpan.textContent = errorMessages.join('. ');
      errorSpan.style.color = 'var(--error-color)';
      errorSpan.style.fontSize = '0.8rem';
    }
  
    // Manejo del envío del formulario
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      formErrors.innerHTML = '';
      
      // Validar todos los campos
      let isValid = true;
      inputs.forEach(input => {
        if (!input.validity.valid) {
          isValid = false;
          validateInput(input);
        }
      });
  
      if (!isValid) {
        formErrors.textContent = 'Por favor, corrige los errores en el formulario';
        return;
      }
  
      // Recoger y sanitizar datos
      const formData = {
        name: sanitizeInput(form.name.value),
        email: sanitizeInput(form.email.value),
        message: sanitizeInput(form.message.value)
      };
  
      try {
        // Simular envío de datos
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mostrar mensaje de éxito
        form.reset();
        formErrors.style.color = 'var(--success-color)';
        formErrors.textContent = '¡Mensaje enviado con éxito!';
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          formErrors.textContent = '';
        }, 3000);
        
      } catch (error) {
        formErrors.style.color = 'var(--error-color)';
        formErrors.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
      }
    });
  });
  
  // Lazy loading de imágenes
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // El navegador soporta lazy loading nativo
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback para navegadores que no soportan lazy loading
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });
  
      images.forEach(img => imageObserver.observe(img));
    }
  });