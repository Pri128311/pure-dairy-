/* ============================================
   PureDairy - Modern Dairy Products Store
   Fresh Dairy Delivered Daily
   ============================================ */

// Product Data Array - Dairy Food Products
const products = [
    {
        id: 1,
        name: "Full Cream Milk",
        category: "Milk",
        price: 65,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Toned Milk",
        category: "Milk",
        price: 45,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Fresh Paneer",
        category: "Paneer",
        price: 180,
        image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?w=400&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Curd (Dahi)",
        category: "Curd & Yogurt",
        price: 40,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Butter",
        category: "Butter & Cheese",
        price: 220,
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Cheese Slices",
        category: "Butter & Cheese",
        price: 150,
        image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Desi Ghee",
        category: "Ghee",
        price: 450,
        image: "https://images.unsplash.com/photo-1600622667222-28c5e7d4a7e1?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        name: "Chocolate Ice Cream",
        category: "Ice Cream",
        price: 120,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop"
    }
];

// Cart Array (from LocalStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* ============================================
   Utility Functions
   ============================================ */

// Save cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Format price in INR
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

/* ============================================
   Product Rendering
   ============================================ */

// Render products on products page
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <span>🛒</span> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Render featured products on home page
function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;

    // Get first 4 products as featured
    const featuredProducts = products.slice(0, 4);

    featuredGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <span>🛒</span> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

/* ============================================
   Cart Functions
   ============================================ */

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Show notification
        showNotification('Product already in cart!', 'warning');
    } else {
        cart.push(product);
        saveCart();
        showNotification('Product added to cart!', 'success');
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Render cart items on cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartElement = document.getElementById('empty-cart');
    const cartContentElement = document.getElementById('cart-content');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartElement) emptyCartElement.style.display = 'block';
        if (cartContentElement) cartContentElement.style.display = 'none';
        if (cartTotalElement) cartTotalElement.textContent = '₹0';
    } else {
        // Show cart items
        if (emptyCartElement) emptyCartElement.style.display = 'none';
        if (cartContentElement) cartContentElement.style.display = 'block';

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        🗑️ Remove
                    </button>
                </div>
            </div>
        `).join('');

        // Update total
        if (cartTotalElement) {
            cartTotalElement.textContent = formatPrice(calculateTotal());
        }
    }
}

/* ============================================
   Notification System
   ============================================ */

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${type === 'success' ? '✓' : '⚠'}</span>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#1976d2' : '#d32f2f'};
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyframe animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Mobile Menu Toggle
   ============================================ */

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

/* ============================================
   Page Load Initialization
   ============================================ */

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Determine which page we're on and render accordingly
    if (document.getElementById('products-grid')) {
        renderProducts();
    }
    
    if (document.getElementById('featured-grid')) {
        renderFeaturedProducts();
    }
    
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    // Setup mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.toggleMenu = toggleMenu;

