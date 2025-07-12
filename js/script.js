// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFilters();
    initSearch();
    initModals();
    initRecipeCards();
    initContactForm();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link (on mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 700 && hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Filter functionality for catalog page
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodItems = document.querySelectorAll('.food-item');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter food items
            if (foodItems.length > 0) {
                filterFoodItems(category);
            }
            
            // Filter recipe cards
            if (recipeCards.length > 0) {
                filterRecipeCards(category);
            }
        });
    });
}

function filterFoodItems(category) {
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterRecipeCards(category) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const recipeSearch = document.getElementById('recipeSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const foodItems = document.querySelectorAll('.food-item');
            
            foodItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.description').textContent.toLowerCase();
                const seller = item.querySelector('.seller').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || seller.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    if (recipeSearch) {
        recipeSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const recipeCards = document.querySelectorAll('.recipe-card');
            
            recipeCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.recipe-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Sort functionality
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    const difficultySelect = document.getElementById('difficultySelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortFoodItems(sortBy);
        });
    }
    
    if (difficultySelect) {
        difficultySelect.addEventListener('change', function() {
            const difficulty = this.value;
            filterByDifficulty(difficulty);
        });
    }
}

function sortFoodItems(sortBy) {
    const foodGrid = document.getElementById('foodGrid');
    const foodItems = Array.from(foodGrid.children);
    
    foodItems.sort((a, b) => {
        if (sortBy === 'name') {
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            return nameA.localeCompare(nameB);
        } else if (sortBy === 'price-low') {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA;
        } else if (sortBy === 'rating') {
            const ratingA = parseFloat(a.getAttribute('data-rating'));
            const ratingB = parseFloat(b.getAttribute('data-rating'));
            return ratingB - ratingA;
        }
    });
    
    // Clear and re-append sorted items
    foodGrid.innerHTML = '';
    foodItems.forEach(item => foodGrid.appendChild(item));
}

function filterByDifficulty(difficulty) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const cardDifficulty = card.getAttribute('data-difficulty');
        
        if (difficulty === 'all' || cardDifficulty === difficulty) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal functionality
function initModals() {
    const cartModal = document.getElementById('cartModal');
    const recipeModal = document.getElementById('recipeModal');
    
    // Cart modal
    if (cartModal) {
        const closeBtn = cartModal.querySelector('.close');
        const addToCartButtons = document.querySelectorAll('.btn-primary');
        
        addToCartButtons.forEach(button => {
            if (button.textContent.includes('Add to Cart')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    addToCart(this);
                });
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                cartModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }
    
    // Recipe modal
    if (recipeModal) {
        const closeBtn = recipeModal.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                recipeModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === recipeModal) {
                recipeModal.style.display = 'none';
            }
        });
    }
}

// Shopping cart functionality
let cart = [];

function addToCart(button) {
    const foodItem = button.closest('.food-item');
    const recipeCard = button.closest('.recipe-card');
    
    let item;
    
    if (foodItem) {
        item = {
            name: foodItem.querySelector('h3').textContent,
            price: foodItem.querySelector('.price').textContent,
            seller: foodItem.querySelector('.seller').textContent,
            quantity: 1
        };
    } else if (recipeCard) {
        item = {
            name: recipeCard.querySelector('h3').textContent,
            price: '$0.00', // Recipes are free
            seller: 'Recipe Collection',
            quantity: 1
        };
    }
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    updateCartDisplay();
    showCartModal();
    
    // Show success message
    showNotification('Item added to cart!', 'success');
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.seller}</p>
                </div>
                <div class="cart-item-price">
                    <span>${item.price}</span>
                    <span>Qty: ${item.quantity}</span>
                </div>
                <button onclick="removeFromCart('${item.name}')" class="remove-btn">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', '').replace('/lb', '').replace('/each', '').replace('/dozen', ''));
            return sum + (price * item.quantity);
        }, 0);
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
    showNotification('Item removed from cart!', 'info');
}

function showCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'block';
    }
}

// Recipe card functionality
function initRecipeCards() {
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    
    recipeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showRecipeDetails(this);
        });
    });
}

function showRecipeDetails(button) {
    const recipeCard = button.closest('.recipe-card');
    const recipeModal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipeModalContent');
    
    if (recipeCard && recipeModal && modalContent) {
        const title = recipeCard.querySelector('h3').textContent;
        const description = recipeCard.querySelector('.recipe-description').textContent;
        const ingredients = recipeCard.querySelector('.recipe-ingredients').innerHTML;
        const meta = recipeCard.querySelector('.recipe-meta').innerHTML;
        
        modalContent.innerHTML = `
            <h2>${title}</h2>
            <p class="recipe-description">${description}</p>
            <div class="recipe-meta">${meta}</div>
            <div class="recipe-ingredients">${ingredients}</div>
            <div class="recipe-instructions">
                <h3>Cooking Instructions</h3>
                <ol>
                    <li>Gather all the ingredients listed above.</li>
                    <li>Follow the traditional cooking methods for this dish.</li>
                    <li>Pay attention to cooking times and temperatures.</li>
                    <li>Season to taste and serve hot.</li>
                    <li>Enjoy your delicious homemade meal!</li>
                </ol>
            </div>
            <div class="recipe-tips">
                <h3>Chef's Tips</h3>
                <ul>
                    <li>Use fresh ingredients for the best results</li>
                    <li>Don't rush the cooking process</li>
                    <li>Experiment with seasonings to suit your taste</li>
                    <li>Share your creation with loved ones!</li>
                </ul>
            </div>
        `;
        
        recipeModal.style.display = 'block';
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                // Simulate form submission
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.backgroundColor = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item-info h4 {
        margin: 0;
        font-size: 1rem;
    }
    
    .cart-item-info p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .cart-item-price {
        text-align: right;
    }
    
    .remove-btn {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        cursor: pointer;
        font-size: 1.2rem;
        margin-left: 10px;
    }
    
    .recipe-instructions,
    .recipe-tips {
        margin-top: 20px;
    }
    
    .recipe-instructions ol,
    .recipe-tips ul {
        padding-left: 20px;
    }
    
    .recipe-instructions li,
    .recipe-tips li {
        margin-bottom: 8px;
        line-height: 1.6;
    }
`;

document.head.appendChild(style);

// Initialize sorting functionality
initSorting(); 