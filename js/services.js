// Services data
const services = {
  car: [
    {
      id: 'c1',
      name: "Basic Change Oil",
      time: "1 hr",
      price: 2300,
      image: "https://www.cbac.com/images/blog/10-Tips-for-a-Successful-Oil-Change.jpg",
      description: "Complete oil change service using high-quality oil"
    },
    // ... other car services
  ],
  motorcycle: [
    {
      id: 'm1',
      name: "Replace Brake Pads",
      time: "18 mins",
      price: 500,
      image: "https://www.supercheapauto.com.au/on/demandware.static/-/Library-Sites-supercheap-shared-library/default/dwe0dc8f6a/blog/how-to-change-motorcycle-brake-pads-2-2.jpg",
      description: "Professional brake pad replacement service"
    },
    // ... other motorcycle services
  ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initializeVehicleSelection();
  updateCartDisplay();
});

// Vehicle selection handling
function initializeVehicleSelection() {
  const buttons = document.querySelectorAll('.btn-vehicle');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const vehicleType = e.target.dataset.vehicle;
      showServices(vehicleType);
    });
  });
}

// Show services based on vehicle type
function showServices(vehicleType) {
  const carSection = document.getElementById('carServices');
  const motoSection = document.getElementById('motorcycleServices');
  
  if (vehicleType === 'car' || vehicleType === 'both') {
    carSection.hidden = false;
    renderServices('car');
  }
  
  if (vehicleType === 'motorcycle' || vehicleType === 'both') {
    motoSection.hidden = false;
    renderServices('motorcycle');
  }
  
  document.querySelector('.vehicle-selector').hidden = true;
}

// Render service cards
function renderServices(type) {
  const container = document.querySelector(`#${type}Services .services-grid`);
  container.innerHTML = services[type].map(service => createServiceCard(service)).join('');
}

// Create service card HTML
function createServiceCard(service) {
  return `
    <div class="service-card" data-id="${service.id}">
      <img src="${service.image}" alt="${service.name}" loading="lazy">
      <div class="service-info">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p class="service-time">⏱ ${service.time}</p>
        <p class="service-price">₱${service.price}</p>
        <button class="btn btn-primary" onclick="addToCart('${service.id}')">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Cart functionality
function addToCart(serviceId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const service = findService(serviceId);
  
  if (service) {
    cart.push({
      id: service.id,
      name: service.name,
      price: service.price
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showModal();
  }
}

// Find service by ID
function findService(id) {
  return services.car.find(s => s.id === id) || 
         services.motorcycle.find(s => s.id === id);
}

// Update cart display
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').textContent = `₱${total}`;
}

// Modal handling
function showModal() {
  document.getElementById('serviceModal').hidden = false;
}

function closeModal() {
  document.getElementById('serviceModal').hidden = true;
}

function goToCart() {
  window.location.href = 'cart.html';
}