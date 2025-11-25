// ===== PRODUCTS DATA =====
const products = [
    {
        id: 1,
        name: 'Гантели 10кг',
        category: 'fitness',
        price: 3500,
        description: 'Профессиональные гантели с неопреновым покрытием',
        image: 'images/dumbbell.jpg'
    },
    {
        id: 2,
        name: 'Коврик для йоги',
        category: 'fitness',
        price: 1500,
        description: 'Нескользящий коврик из натуральных материалов',
        image: 'images/fitness-mat.jpg'
    },
    {
        id: 3,
        name: 'Беговые кроссовки',
        category: 'running',
        price: 7500,
        description: 'Легкие кроссовки для бега с амортизацией',
        image: 'images/sneakers.jpg'
    },
    {
        id: 4,
        name: 'Фитнес-браслет',
        category: 'equipment',
        price: 4500,
        description: 'Мониторинг пульса и активности',
        image: 'images/MiSmartBand9-fitness-tracker.jpg'
    },
    {
        id: 5,
        name: 'Футбольный мяч',
        category: 'sport',
        price: 2000,
        description: 'Профессиональный футбольный мяч размер 5',
        image: 'images/SoccerBall.jpg'
    },
    {
        id: 6,
        name: 'Скакалка',
        category: 'fitness',
        price: 800,
        description: 'Регулируемая скакалка для кардио тренировок',
        image: 'images/jump-rope.jpg'
    },
    {
        id: 7,
        name: 'Бутылка для воды',
        category: 'equipment',
        price: 600,
        description: 'Спортивная бутылка 750мл',
        image: 'images/bottleForWater.jpg'
    },
    {
        id: 8,
        name: 'Велосипедный шлем',
        category: 'equipment',
        price: 3200,
        description: 'Защитный шлем с вентиляцией',
        image: 'images/bikeHelmet.jpg'
    },
    {
        id: 9,
        name: 'Теннисная ракетка',
        category: 'sport',
        price: 5500,
        description: 'Профессиональная ракетка для большого тенниса',
        image: 'images/tennisRacket.jpg'
    },
    {
        id: 10,
        name: 'Компрессионная футболка',
        category: 'running',
        price: 2800,
        description: 'Дышащая футболка для бега',
        image: 'images/compressTShirt.jpg'
    },
    {
        id: 11,
        name: 'Эспандер',
        category: 'fitness',
        price: 1200,
        description: 'Набор эластичных лент для тренировок',
        image: 'images/expanders.jpg'
    },
    {
        id: 12,
        name: 'Баскетбольный мяч',
        category: 'sport',
        price: 2500,
        description: 'Официальный размер баскетбольного мяча',
        image: 'images/basketBall.jpg'
    }
];

// ===== STATE MANAGEMENT =====
let cart = [];
let currentFilter = 'all';
let searchQuery = '';

// ===== DOM ELEMENTS =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const searchBtn = document.getElementById('searchBtn');
const searchPanel = document.getElementById('searchPanel');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');

// ===== MOBILE MENU TOGGLE =====
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking on nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ===== SEARCH PANEL =====
searchBtn.addEventListener('click', () => {
    searchPanel.classList.add('active');
    // Small delay to ensure the panel is fully displayed before focusing
    setTimeout(() => searchInput.focus(), 100);
});

searchClose.addEventListener('click', () => {
    searchPanel.classList.remove('active');
    searchInput.value = '';
    searchQuery = '';
    renderProducts();
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderProducts();
});

// ===== CART FUNCTIONALITY =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Товар добавлен в корзину');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        totalPrice.textContent = '0 ₽';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('ru-RU')} ₽ × ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Удалить">×</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = `${total.toLocaleString('ru-RU')} ₽`;
        checkoutBtn.disabled = false;
    }
    
    // Save cart to localStorage
    localStorage.setItem('sportshop_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('sportshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

cartModalClose.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Спасибо за заказ! В реальном магазине здесь была бы форма оформления заказа.');
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== PRODUCT FILTERING =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts();
    });
});

// Category cards filtering
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        currentFilter = category;
        
        // Update filter buttons
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            }
        });
        
        // Scroll to catalog
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        
        // Render filtered products
        renderProducts();
    });
});

// ===== RENDER PRODUCTS =====
function renderProducts() {
    let filteredProducts = products;
    
    // Filter by category
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px 0;">Товары не найдены</p>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toLocaleString('ru-RU')} ₽</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Купить
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'fitness': 'Фитнес',
        'running': 'Бег',
        'sport': 'Спорт',
        'equipment': 'Снаряжение'
    };
    return categories[category] || category;
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background-color: #F15A24;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        animation: slideInUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Activate home link when at top
    if (scrollY < 100) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' || link.classList.contains('nav-link:first-child')) {
                link.classList.add('active');
            }
        });
    }
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();

    // Add fade-in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('section, .product-card, .category-card, .feature, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (searchPanel.classList.contains('active')) {
            searchPanel.classList.remove('active');
            searchInput.value = '';
            searchQuery = '';
            renderProducts();
        }
    }

    // Open search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchPanel.classList.add('active');
        searchInput.focus();
    }
});
