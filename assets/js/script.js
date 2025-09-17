/*===== NAVIGATION MENU =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*===== ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== GALLERY FILTER =====*/
const filterButtons = document.querySelectorAll('.filter__btn');
const galleryItems = document.querySelectorAll('.gallery__item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const city = formData.get('city');
        const service = formData.get('service');
        const message = formData.get('message');

        // Create WhatsApp message
        let whatsappMessage = `Hello! I'm interested in your services.\n\n`;
        whatsappMessage += `Name: ${name}\n`;
        whatsappMessage += `Phone: ${phone}\n`;
        if (city) whatsappMessage += `City: ${city}\n`;
        if (service) whatsappMessage += `Service Needed: ${service}\n`;
        if (message) whatsappMessage += `Message: ${message}\n`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Open WhatsApp
        window.open(`https://wa.me/923005289089?text=${encodedMessage}`, '_blank');

        // Reset form
        contactForm.reset();

        // Show success message
        showNotification('Message sent! You will be redirected to WhatsApp.', 'success');
    });
}

/*===== SMOOTH SCROLLING =====*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

/*===== INITIALIZE AOS =====*/
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initial scroll reveal
    revealOnScroll();
});

/*===== GALLERY LIGHTBOX =====*/
const galleryImages = document.querySelectorAll('.gallery__item img');

galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        createLightbox(this.src, this.alt);
    });
});

function createLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__content">
            <img src="${src}" alt="${alt}" class="lightbox__image">
            <button class="lightbox__close">&times;</button>
        </div>
    `;

    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const content = lightbox.querySelector('.lightbox__content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

    const image = lightbox.querySelector('.lightbox__image');
    image.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    `;

    const closeBtn = lightbox.querySelector('.lightbox__close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Add to body
    document.body.appendChild(lightbox);

    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);

    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/*===== FLOATING CONTACT BUTTONS ANIMATION =====*/
const floatingButtons = document.querySelectorAll('.floating__btn');

floatingButtons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.2}s`;
});

/*===== SCROLL TO TOP FUNCTIONALITY =====*/
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const floatingContacts = document.querySelector('.floating__contacts');

    if (scrollTop > 500) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'floating__btn scroll-to-top';
            scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollTopBtn.style.background = '#34495e';
            scrollTopBtn.addEventListener('click', scrollToTop);
            floatingContacts.appendChild(scrollTopBtn);
        }
    } else {
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        if (scrollTopBtn) {
            scrollTopBtn.remove();
        }
    }
});

/*===== LAZY LOADING FOR IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== FORM VALIDATION =====*/
function validateForm(form) {
    (() => {
        const contactForm = document.getElementById('contact-form');
        const phoneInput = document.getElementById('phone');
        if (!contactForm) return;

        /* Live sanitize phone: allow only + digits space - ( ) */
        if (phoneInput) {
            phoneInput.setAttribute('inputmode', 'tel');
            phoneInput.setAttribute('maxlength', '20');
            phoneInput.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
            });
        }

        /* Helpers */
        function showFieldError(field, message) {
            clearFieldError(field);
            const div = document.createElement('div');
            div.className = 'field-error';
            div.textContent = message;
            div.style.cssText = 'color:#e74c3c;font-size:.875rem;margin-top:.25rem;';
            field.style.borderColor = '#e74c3c';
            field.parentNode.appendChild(div);
        }

        function clearFieldError(field) {
            const e = field.parentNode.querySelector('.field-error');
            if (e) e.remove();
            field.style.borderColor = '';
        }

        function isValidPhone(v) {
            const val = String(v || '').trim();
            const digits = val.replace(/\D/g, '');
            return /^[+\d][\d\s\-()]+$/.test(val) && digits.length >= 10 && digits.length <= 15;
        }

        function validateForm(form) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let ok = true;

            inputs.forEach(input => {
                const val = input.value.trim();

                if (!val) {
                    showFieldError(input, 'This field is required');
                    ok = false;
                    return;
                } else {
                    clearFieldError(input);
                }

                if (input.type === 'email') {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!re.test(val)) {
                        showFieldError(input, 'Please enter a valid email address');
                        ok = false;
                    }
                }

                if (input.type === 'tel') {
                    if (!isValidPhone(val)) {
                        showFieldError(input, 'Enter a valid phone number (10–15 digits)');
                        ok = false;
                    }
                }
            });

            return ok;
        }

        /* Submit -> open WhatsApp (no false “sent” message) */
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm(contactForm)) {
                if (typeof showNotification === 'function')
                    showNotification('Please fix the highlighted fields.', 'warning');
                return;
            }

            const data = new FormData(contactForm);
            const name = data.get('name') || '';
            const phone = data.get('phone') || '';
            const city = data.get('city') || '';
            const service = data.get('service') || '';
            const message = data.get('message') || '';

            let msg = `Hello! I'm interested in your services.\n\n`;
            msg += `Name: ${name}\n`;
            msg += `Phone: ${phone}\n`;
            if (city) msg += `City: ${city}\n`;
            if (service) msg += `Service Needed: ${service}\n`;
            if (message) msg += `Message: ${message}\n`;

            const url = `https://wa.me/923005289089?text=${encodeURIComponent(msg)}`;
            const win = window.open(url, '_blank', 'noopener');

            // Inform only; do NOT claim success or reset the form here.
            if (typeof showNotification === 'function') {
                if (win) {
                    showNotification('WhatsApp opened. Tap “Send” in WhatsApp to submit your message.', 'info');
                } else {
                    showNotification('Couldn’t open WhatsApp. Please allow pop-ups or use the WhatsApp button.', 'error');
                }
            }
        });
    })();
}

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedRevealOnScroll = debounce(revealOnScroll, 10);

window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', revealOnScroll);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedRevealOnScroll);

/*===== PRELOADER =====*/
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*===== ANALYTICS TRACKING =====*/
function trackEvent(eventName, eventData = {}) {
    // Google Analytics tracking (if implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function (e) {
    if (e.target.matches('.btn, .nav__contact-btn, .floating__btn')) {
        const buttonText = e.target.textContent.trim() || e.target.getAttribute('aria-label') || 'Button';
        trackEvent('button_click', {
            button_text: buttonText,
            button_type: e.target.className
        });
    }
});

/*===== ACCESSIBILITY IMPROVEMENTS =====*/
// Keyboard navigation for gallery
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.matches('.gallery__item img')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Focus management for mobile menu
const navToggleBtn = document.getElementById('nav-toggle');
const navCloseBtn = document.getElementById('nav-close');

if (navToggleBtn) {
    navToggleBtn.addEventListener('click', function () {
        setTimeout(() => {
            const firstNavLink = document.querySelector('.nav__link');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        }, 100);
    });
}

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

/*===== INITIALIZATION =====*/
document.addEventListener('DOMContentLoaded', function () {
    console.log('Muhammad Shabir Construction Website Loaded Successfully');

    // Initialize any additional features here
    initializeWebsite();
});

function initializeWebsite() {
    // Add any initialization code here
    console.log('Website initialized');

    // Track page load
    trackEvent('page_load', {
        page_title: document.title,
        page_url: window.location.href
    });
}



/* === Fix hero being hidden under the fixed header (mobile-safe) === */
(function(){
  const header = document.getElementById('header') || document.querySelector('.header');

  function setHeaderVar(){
    const h = header ? header.offsetHeight : 64; // px
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

  // Run early and after layout settles (AOS/images can change heights)
  document.addEventListener('DOMContentLoaded', setHeaderVar);
  window.addEventListener('load', setHeaderVar);
  window.addEventListener('resize', () => { clearTimeout(window.__hdrT); window.__hdrT = setTimeout(setHeaderVar, 100); });
  // one extra tick after animations
  setTimeout(setHeaderVar, 350);
})();

(function(){
  const navMenu = document.getElementById('nav-menu');
  const toggle  = document.getElementById('nav-toggle');
  const close   = document.getElementById('nav-close');

  function openMenu(){
    navMenu && navMenu.classList.add('show-menu');
    document.body.classList.add('menu-open');
    toggle && toggle.setAttribute('aria-expanded','true');
    // lock background scroll on small screens
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    navMenu && navMenu.classList.remove('show-menu');
    document.body.classList.remove('menu-open');
    toggle && toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = ''; // restore
  }

  toggle && toggle.addEventListener('click', openMenu);
  close  && close.addEventListener('click', closeMenu);

  // close when a menu link is tapped
  document.addEventListener('click', (e)=>{
    if (e.target.closest('.nav__menu .nav__link')) closeMenu();
  });
  // close on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && navMenu?.classList.contains('show-menu')) closeMenu();
  });
})();

// Belt-and-suspenders: update if the header's height ever changes later
(function(){
  const header = document.getElementById('header') || document.querySelector('.header');
  if (!header) return;
  const update = () => {
    const h = Math.ceil(header.getBoundingClientRect().height || 64);
    document.documentElement.style.setProperty('--header-h', h + 'px');
  };
  // Watch header size changes (wraps, font swap, AOS tweaks, etc.)
  if ('ResizeObserver' in window) {
    new ResizeObserver(update).observe(header);
  }
  // Also recalc on orientation change and after fonts load
  window.addEventListener('orientationchange', () => setTimeout(update, 120));
  if (document.fonts?.ready) document.fonts.ready.then(update);
})();


