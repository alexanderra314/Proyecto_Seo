// Función para sanitizar entrada de texto
const sanitizeInput = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Formulario enviado.");
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