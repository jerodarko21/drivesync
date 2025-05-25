// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count in header if it exists
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  
  // Handle mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
  }
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        highlightInvalidFields(form);
      }
    });
  });
});

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(price);
}

function highlightInvalidFields(form) {
  const invalidFields = form.querySelectorAll(':invalid');
  invalidFields.forEach(field => {
    field.classList.add('invalid');
  });
}