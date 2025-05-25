// Services data
const services = {
  car: [
    {
      id: 'c1',
      name: "Basic Change Oil",
      time: "1 hr",
      price: 2300,
      image: "https://images.pexels.com/photos/8985530/pexels-photo-8985530.jpeg",
      description: "Complete oil change service using high-quality oil"
    },
    {
      id: 'c2',
      name: "Brake System Check",
      time: "45 mins",
      price: 1500,
      image: "https://images.pexels.com/photos/8985608/pexels-photo-8985608.jpeg",
      description: "Comprehensive brake system inspection and maintenance"
    },
    {
      id: 'c3',
      name: "Engine Tune-up",
      time: "2 hrs",
      price: 3500,
      image: "https://images.pexels.com/photos/8985619/pexels-photo-8985619.jpeg",
      description: "Complete engine performance optimization"
    }
  ],
  motorcycle: [
    {
      id: 'm1',
      name: "Replace Brake Pads",
      time: "45 mins",
      price: 800,
      image: "https://images.pexels.com/photos/8985544/pexels-photo-8985544.jpeg",
      description: "Professional brake pad replacement service"
    },
    {
      id: 'm2',
      name: "Chain Maintenance",
      time: "30 mins",
      price: 500,
      image: "https://images.pexels.com/photos/8985548/pexels-photo-8985548.jpeg",
      description: "Chain cleaning, lubrication and adjustment"
    },
    {
      id: 'm3',
      name: "Full Service",
      time: "3 hrs",
      price: 2500,
      image: "https://images.pexels.com/photos/8985552/pexels-photo-8985552.jpeg",
      description: "Complete motorcycle maintenance service"
    }
  ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  initializeVehicleSelection();
  updateCartDisplay();
  
  // Add click handler for view cart button
  document.getElementById('viewCart').addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
});

// Vehicle selection handling
function initializeVehicleSelection() {
  const buttons = document.querySelectorAll('.btn-vehicle');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      e.target.classList.add('active');
      
      const vehicleType = e.target.dataset.vehicle;
      showServices(vehicleType);
    });
  });
}

// Show services based on vehicle type
function showServices(vehicleType) {
  const carSection = document.getElementById('carServices');
  const motoSection = document.getElementById('motorcycleServices');
  
  // Hide both sections first
  carSection.hidden = true;
  motoSection.hidden = true;
  
  if (vehicleType === 'car' || vehicleType === 'both') {
    carSection.hidden = false;
    renderServices('car');
  }
  
  if (vehicleType === 'motorcycle' || vehicleType === 'both') {
    motoSection.hidden = false;
    renderServices('motorcycle');
  }
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
  const modal = document.getElementById('serviceModal');
  modal.hidden = false;
}

function closeModal() {
  document.getElementById('serviceModal').hidden = true;
}

function goToCart() {
  window.location.href = 'cart.html';
}