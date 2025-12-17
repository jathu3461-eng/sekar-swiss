// Product Data
const products = [
    {
        id: 1,
        name: "Royal Gold Wedding Invitation",
        category: "wedding",
        code: "WC-001",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Exquisite gold foil wedding card with premium finish. Handcrafted with Swiss precision."
    },
    {
        id: 2,
        name: "Executive Business Card Set",
        category: "business",
        code: "BC-001",
        price: 49.00,
        image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium embossed business cards on 400gsm cardstock. Perfect for networking."
    },
    {
        id: 3,
        name: "Laser Cut Floral Design",
        category: "laser",
        code: "LC-001",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Intricate laser cut floral patterns with delicate Swiss craftsmanship."
    },
    {
        id: 4,
        name: "Luxury Gift Bag Collection",
        category: "gift",
        code: "GB-001",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium quality gift bags with golden foil stamping and satin ribbons."
    },
    {
        id: 5,
        name: "Premium Wedding Suite",
        category: "wedding",
        code: "WC-002",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Complete wedding invitation suite with RSVP cards and envelopes."
    },
    {
        id: 6,
        name: "Corporate Business Cards",
        category: "business",
        code: "BC-002",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1602576666092-5b3c8bc09e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Corporate business cards with spot UV coating and embossing."
    }
];

// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;
let cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initHeaderScroll();
    initMobileMenu();
    renderProducts();
    initProductFilters();
    initCartSystem();
    initQuoteForm();
    initFileUpload();
    initSmoothScrolling();
    updateCartDisplay();
    
    // Update quote summary when quantity changes
    document.getElementById('quantity').addEventListener('input', updateQuoteSummary);
    
    // Newsletter subscription
    document.getElementById('subscribeBtn').addEventListener('click', subscribeNewsletter);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', proceedToCheckout);
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.querySelectorAll('button, a, .category-card, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'products', 'order', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-badge">${product.category.toUpperCase()}</div>
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-content">
                <div class="product-code">${product.code}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="section-description">${product.description}</p>
                <div class="product-price">CHF ${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="action-btn action-btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="action-btn action-btn-secondary" onclick="showProductModal(${product.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Product Filters
function initProductFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
}

// Cart System Functions
function initCartSystem() {
    // Cart toggle
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cart').classList.add('active');
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cart').classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cart = document.getElementById('cart');
        const cartBtn = document.getElementById('cartBtn');
        if (cart.classList.contains('active') && !cart.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
            cart.classList.remove('active');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
    showNotification('Product added to cart', 'success');
    
    // Open cart on mobile
    if (window.innerWidth < 768) {
        document.getElementById('cart').classList.add('active');
    }
}

function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartTotal').textContent = `CHF ${cartTotal.toFixed(2)}`;
    
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center mt-4">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--silver);"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <div>
                        <button onclick="updateCartQuantity(${item.id}, -1)" style="background: none; border: none; color: var(--gold); cursor: pointer; padding: 0 5px;">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)" style="background: none; border: none; color: var(--gold); cursor: pointer; padding: 0 5px;">+</button>
                    </div>
                    <div class="cart-item-price">CHF ${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    showNotification('Proceeding to checkout...', 'success');
    // In a real app, this would redirect to checkout page
    setTimeout(() => {
        document.getElementById('cart').classList.remove('active');
        window.scrollTo({
            top: document.getElementById('order').offsetTop - 100,
            behavior: 'smooth'
        });
    }, 1000);
}

// Product Modal
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                    <div>
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: var(--border-radius);">
                    </div>
                    <div>
                        <div class="product-code">${product.code}</div>
                        <h2 style="color: var(--navy); margin: 1rem 0;">${product.name}</h2>
                        <p style="margin-bottom: 2rem;">${product.description}</p>
                        <div style="font-size: 2rem; color: var(--gold); font-weight: 700; margin-bottom: 2rem;">
                            CHF ${product.price.toFixed(2)}
                        </div>
                        <button class="btn btn-primary" onclick="addToCart(${product.id}); this.parentElement.parentElement.parentElement.parentElement.remove()">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Quote Form
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            productType: document.getElementById('productType').value,
            designDetails: document.getElementById('designDetails').value,
            quantity: parseInt(document.getElementById('quantity').value)
        };
        
        try {
            // Send to backend
            const response = await fetch('http://localhost:5000/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showNotification('Quote request submitted successfully! We will contact you within 24 hours.', 'success');
                form.reset();
                updateQuoteSummary();
            } else {
                showNotification('Error submitting form. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error submitting form. Please try again.', 'error');
        }
    });
}

// File Upload
function initFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');
    
    fileUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                showNotification('File size must be less than 10MB', 'error');
                return;
            }
            
            fileUpload.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>File selected: ${file.name}</p>
                <small>Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</small>
            `;
            fileUpload.style.borderColor = 'var(--gold)';
            showNotification('File uploaded successfully', 'success');
        }
    });
    
    // Drag and drop
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = 'var(--gold)';
        fileUpload.style.background = 'rgba(212, 175, 55, 0.1)';
    });
    
    fileUpload.addEventListener('dragleave', () => {
        fileUpload.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        fileUpload.style.background = 'transparent';
    });
    
    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        fileUpload.style.background = 'transparent';
        
        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });
}

// Update Quote Summary
function updateQuoteSummary() {
    const quantity = parseInt(document.getElementById('quantity').value) || 100;
    const baseCost = 150.00; // Base printing cost for 100 units
    const serviceFee = 25.00;
    
    // Calculate cost based on quantity
    let printingCost = (baseCost * quantity) / 100;
    
    // Add premium for certain product types
    const productType = document.getElementById('productType').value;
    if (productType === 'wedding' || productType === 'laser') {
        printingCost *= 1.3; // 30% premium
    }
    
    const estimatedTotal = serviceFee + printingCost;
    
    document.getElementById('printingCost').textContent = `CHF ${printingCost.toFixed(2)}`;
    document.getElementById('estimatedTotal').textContent = `CHF ${estimatedTotal.toFixed(2)}`;
}

// Newsletter Subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        document.getElementById('newsletterEmail').value = '';
    }, 500);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // Clear any existing content
    notification.innerHTML = '';
    notification.className = 'notification';
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.classList.add(type, 'show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}