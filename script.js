document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const closeMenu = document.querySelector('.close-menu');
    const quickViewBtns = document.querySelectorAll('.btn-small');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const header = document.querySelector('header');
    const scrollElements = document.querySelectorAll('.fade-in');
    
    // Check if elements exist before adding event listeners
    if (!mobileMenu || !overlay || !closeMenu) {
        createMobileMenu();
    }
    
    if (!modal || !closeModal) {
        createModal();
    }
    
    // Initialize functions
    initMobileMenu();
    initQuickView();
    initScrollAnimation();
    initStickyHeader();
    initTestimonialSlider();
    
    // Mobile Menu Functions
    function createMobileMenu() {
        // Create mobile menu
        const mobileMenuDiv = document.createElement('div');
        mobileMenuDiv.className = 'mobile-menu';
        
        mobileMenuDiv.innerHTML = `
            <span class="close-menu"><i class="fas fa-times"></i></span>
            <ul class="mobile-nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#collection">Collection</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="mobile-nav-icons">
                <a href="#search"><i class="fas fa-search"></i></a>
                <a href="#account"><i class="fas fa-user"></i></a>
                <a href="#cart"><i class="fas fa-shopping-cart"></i></a>
            </div>
        `;
        
        // Create overlay
        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'overlay';
        
        // Append to body
        document.body.appendChild(mobileMenuDiv);
        document.body.appendChild(overlayDiv);
    }
    
    function initMobileMenu() {
        const mobileMenuElement = document.querySelector('.mobile-menu');
        const overlayElement = document.querySelector('.overlay');
        const closeMenuBtn = document.querySelector('.close-menu');
        
        // Define closeMobileMenu function within scope
        function closeMobileMenu() {
            if (mobileMenuElement) {
                mobileMenuElement.classList.remove('active');
            }
            if (overlayElement) {
                overlayElement.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
        
        // Toggle mobile menu
        if (hamburger && mobileMenuElement && overlayElement) {
            hamburger.addEventListener('click', function() {
                mobileMenuElement.classList.add('active');
                overlayElement.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Close mobile menu
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMobileMenu);
        }
        
        if (overlayElement) {
            overlayElement.addEventListener('click', closeMobileMenu);
        }
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Quick View Modal Functions
    function createModal() {
        // Create modal
        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal';
        
        modalDiv.innerHTML = `
            <div class="modal-content">
                <span class="close-modal"><i class="fas fa-times"></i></span>
                <div class="product-details">
                    <div class="product-gallery">
                        <img src="https://images.unsplash.com/photo-1583744946564-b52d01a7b321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Product Image">
                    </div>
                    <div class="product-info-details">
                        <h2>Casual T-Shirt</h2>
                        <div class="product-price">$29.99</div>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(4.5/5)</span>
                        </div>
                        <div class="product-description">
                            <p>A comfortable and stylish casual t-shirt made from 100% organic cotton. Perfect for everyday wear.</p>
                        </div>
                        <div class="product-meta">
                            <p><strong>SKU:</strong> TS-001</p>
                            <p><strong>Category:</strong> T-Shirts</p>
                            <p><strong>Tags:</strong> Casual, Summer, Cotton</p>
                        </div>
                        <div>
                            <h4>Size:</h4>
                            <div class="size-options">
                                <div class="size-option">S</div>
                                <div class="size-option active">M</div>
                                <div class="size-option">L</div>
                                <div class="size-option">XL</div>
                            </div>
                        </div>
                        <div>
                            <h4>Color:</h4>
                            <div class="color-options">
                                <div class="color-option" style="background-color: #000;"></div>
                                <div class="color-option active" style="background-color: #3498db;"></div>
                                <div class="color-option" style="background-color: #e74c3c;"></div>
                            </div>
                        </div>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(modalDiv);
    }
    
    function initQuickView() {
        const modalElement = document.querySelector('.modal');
        const closeModalBtn = document.querySelector('.close-modal');
        
        // Define closeQuickViewModal function
        function closeQuickViewModal() {
            if (modalElement) {
                modalElement.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
        
        // Open modal
        if (quickViewBtns && quickViewBtns.length > 0 && modalElement) {
            quickViewBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    modalElement.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    
                    // Get product info from the clicked product
                    const productCard = this.closest('.product-card');
                    if (productCard) {
                        const productName = productCard.querySelector('h3').textContent;
                        const productPrice = productCard.querySelector('.price').textContent;
                        const productImage = productCard.querySelector('img').src;
                        
                        // Update modal content
                        const modalTitle = modalElement.querySelector('.product-info-details h2');
                        const modalPrice = modalElement.querySelector('.product-price');
                        const modalImage = modalElement.querySelector('.product-gallery img');
                        
                        if (modalTitle) modalTitle.textContent = productName;
                        if (modalPrice) modalPrice.textContent = productPrice;
                        if (modalImage) modalImage.src = productImage;
                    }
                });
            });
        }
        
        // Close modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeQuickViewModal);
        }
        
        if (modalElement) {
            modalElement.addEventListener('click', function(e) {
                if (e.target === modalElement) {
                    closeQuickViewModal();
                }
            });
        }
        
        // Initialize quantity buttons
        initQuantityButtons();
        
        // Initialize size and color options
        initOptions();
        
        // Add to cart button
        initAddToCart(closeQuickViewModal);
    }
    
    function initQuantityButtons() {
        const minusBtn = document.querySelector('.minus');
        const plusBtn = document.querySelector('.plus');
        const quantityInput = document.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && quantityInput) {
            minusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    value--;
                    quantityInput.value = value;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value < 10) {
                    value++;
                    quantityInput.value = value;
                }
            });
        }
    }
    
    function initOptions() {
        const sizeOptions = document.querySelectorAll('.size-option');
        const colorOptions = document.querySelectorAll('.color-option');
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    function initAddToCart(closeModalCallback) {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const modalElement = document.querySelector('.modal');
        
        if (addToCartBtn && modalElement) {
            addToCartBtn.addEventListener('click', function() {
                // Get product details
                const productName = modalElement.querySelector('h2').textContent;
                const productPrice = modalElement.querySelector('.product-price').textContent;
                const quantityInput = modalElement.querySelector('.quantity-input');
                const sizeActive = modalElement.querySelector('.size-option.active');
                const colorActive = modalElement.querySelector('.color-option.active');
                
                if (productName && productPrice && quantityInput && sizeActive && colorActive) {
                    const quantity = quantityInput.value;
                    const size = sizeActive.textContent;
                    const color = window.getComputedStyle(colorActive).backgroundColor;
                    
                    // Show confirmation message
                    alert(`Added to cart: ${quantity} x ${productName} (${size}, ${color}) - ${productPrice}`);
                    
                    // Update cart count
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        cartCount.textContent = parseInt(cartCount.textContent) + parseInt(quantity);
                    }
                    
                    // Close modal
                    if (typeof closeModalCallback === 'function') {
                        closeModalCallback();
                    }
                }
            });
        }
    }
    
    // Scroll Animation Function
    function initScrollAnimation() {
        if (!scrollElements || scrollElements.length === 0) return;
        
        const elementInView = (el, percentageScroll = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.getBoundingClientRect().height;
            const windowHeight = window.innerHeight;
            
            const threshold = (windowHeight - (elementHeight * (percentageScroll / 100))) / 2;
            
            return elementTop <= windowHeight - threshold;
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('fade-in');
        };
        
        const hideScrollElement = (element) => {
            element.classList.remove('fade-in');
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };
        
        // Initialize elements as hidden
        scrollElements.forEach(el => hideScrollElement(el));
        
        // Add scroll event listener
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Trigger once on load
        handleScrollAnimation();
    }
    
    // Sticky Header Function
    function initStickyHeader() {
        if (!header) return;
        
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Testimonial Slider Function
    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        
        if (!slider || testimonials.length === 0) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Auto scroll
        let scrollInterval;
        
        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                slider.scrollLeft += 1;
                
                if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                    slider.scrollLeft = 0;
                }
            }, 20);
        };
        
        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };
        
        // Start auto scroll
        startAutoScroll();
        
        // Stop auto scroll on hover
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our latest updates soon.`);
                emailInput.value = '';
            }
        });
    }
});