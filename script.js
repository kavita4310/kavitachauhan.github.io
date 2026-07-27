// ===========================
// Theme Management
// ===========================

const themeManager = (() => {
    const THEME_KEY = 'portfolio-theme';
    const THEMES = {
        AUTO: 'auto',
        LIGHT: 'light',
        DARK: 'dark'
    };

    const init = () => {
        const savedTheme = localStorage.getItem(THEME_KEY) || THEMES.AUTO;
        setTheme(savedTheme);
        attachEventListeners();
    };

    const setTheme = (theme) => {
        localStorage.setItem(THEME_KEY, theme);
        updateThemeButtons(theme);

        if (theme === THEMES.AUTO) {
            document.documentElement.removeAttribute('data-theme');
        } else if (theme === THEMES.LIGHT) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (theme === THEMES.DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    };

    const updateThemeButtons = (activeTheme) => {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (activeTheme === THEMES.AUTO) {
            document.getElementById('autoTheme').classList.add('active');
        } else if (activeTheme === THEMES.LIGHT) {
            document.getElementById('lightTheme').classList.add('active');
        } else if (activeTheme === THEMES.DARK) {
            document.getElementById('darkTheme').classList.add('active');
        }
    };

    const attachEventListeners = () => {
        document.getElementById('autoTheme')?.addEventListener('click', () => setTheme(THEMES.AUTO));
        document.getElementById('lightTheme')?.addEventListener('click', () => setTheme(THEMES.LIGHT));
        document.getElementById('darkTheme')?.addEventListener('click', () => setTheme(THEMES.DARK));
    };

    return { init, setTheme };
})();

themeManager.init();

// ===========================
// Smooth Scrolling Enhancement
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Active Navigation Link
// ===========================

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

setActiveNavLink();

// ===========================
// Scroll Animation for Elements
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .experience-item, .project-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Mobile Navigation Toggle
// ===========================

const handleMobileNav = () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        // Add mobile-specific behavior if needed
    }
};

window.addEventListener('resize', handleMobileNav);
handleMobileNav();

// ===========================
// Analytics Helper
// ===========================

const trackEvent = (eventName, details) => {
    if (window.gtag) {
        gtag('event', eventName, details);
    }
};

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('external_link_click', {
            'link_url': link.href,
            'link_text': link.textContent
        });
    });
});

// Track email clicks
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('email_click', {
            'email': link.href
        });
    });
});

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('phone_click', {
            'phone': link.href
        });
    });
});

// ===========================
// Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Console message
// ===========================

console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #007AFF;');
console.log('%cLooking at my portfolio? Let\'s connect! Email: kavita4310ios@gmail.com', 'font-size: 14px; color: #64748B;');