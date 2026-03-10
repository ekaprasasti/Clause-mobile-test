// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 8;
        const opacity = Math.random() * 0.4 + 0.1;

        const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${opacity};
        `;

        container.appendChild(particle);
    }
}

createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate elements on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in to sections
document.querySelectorAll('.section-header, .component-card, .pattern-card, .usecase-card, .loop-step, .challenge-card, .impl-step, .flow-step').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Counter observer
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ===== TABS FUNCTIONALITY =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Set active
        btn.classList.add('active');
        const targetContent = document.getElementById(`tab-${targetTab}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===== COPY CODE FUNCTIONALITY =====
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (e) {
        console.warn('Copy failed');
    }
    document.body.removeChild(textarea);
}

// Copy buttons for code blocks
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const codeBlock = btn.closest('.code-block-wrap');
        if (codeBlock) {
            const code = codeBlock.querySelector('code');
            if (code) {
                const text = code.textContent;
                copyToClipboard(text);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            }
        }
    });
});

// Make copyToClipboard global for inline usage
window.copyToClipboard = copyToClipboard;

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (target) {
            const navHeight = navbar ? navbar.offsetHeight : 80;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinkElements.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--primary-light)';
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -70% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ===== TIMELINE FLOW INTERACTION =====
const flowSteps = document.querySelectorAll('.flow-step');
flowSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        flowSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
    });
});

// ===== LOOP STEPS STAGGER ANIMATION =====
const loopSteps = document.querySelectorAll('.loop-step');
const loopObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loopSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 100);
        });
        loopObserver.disconnect();
    }
}, { threshold: 0.2 });

if (loopSteps.length > 0) {
    loopSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    loopObserver.observe(loopSteps[0].parentElement || document.body);
}

// ===== COMPONENTS GRID STAGGER =====
const componentCards = document.querySelectorAll('.component-card');
const compObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        componentCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
        compObserver.disconnect();
    }
}, { threshold: 0.1 });

if (componentCards.length > 0) {
    componentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    compObserver.observe(componentCards[0].parentElement || document.body);
}

// ===== USE CASES FILTER (optional visual enhancement) =====
const usecaseCards = document.querySelectorAll('.usecase-card');
usecaseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        usecaseCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.6';
                c.style.transform = 'scale(0.98)';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        usecaseCards.forEach(c => {
            c.style.opacity = '';
            c.style.transform = '';
        });
    });
});

// ===== ARCH DIAGRAM HOVER EFFECT =====
const archBoxes = document.querySelectorAll('.arch-box');
archBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-3px)';
        box.style.transition = 'transform 0.2s ease';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = '';
    });
});

// ===== BRAIN NODE INTERACTION =====
const nodes = document.querySelectorAll('.node');
nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        const label = node.dataset.label;
        const tooltip = document.createElement('div');
        tooltip.id = 'node-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(10, 10, 15, 0.95);
            border: 1px solid rgba(99, 102, 241, 0.4);
            color: #e2e8f0;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 600;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -130%);
        `;
        tooltip.textContent = label;
        document.body.appendChild(tooltip);

        node.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = e.clientY + 'px';
        });
    });

    node.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById('node-tooltip');
        if (tooltip) tooltip.remove();
    });
});

// ===== PATTERN CARDS CODE HIGHLIGHT =====
document.querySelectorAll('.code-snippet code').forEach(codeEl => {
    // Simple syntax highlighting for demo code
    let html = codeEl.textContent;
    // Highlight comments
    html = html.replace(/(#[^\n]*)/g, '<span style="color:#546e7a;font-style:italic">$1</span>');
    // Highlight keywords
    html = html.replace(/\b(import|from|async|await|def|return|await|True|False)\b/g, '<span style="color:#c792ea">$1</span>');
    // Highlight strings
    html = html.replace(/"([^"]*)"/g, '<span style="color:#c3e88d">"$1"</span>');
    codeEl.innerHTML = html;
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('open');
    }
});

// ===== SCROLL PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #06b6d4);
    z-index: 9999;
    transition: width 0.1s linear;
    width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
});

// ===== IMPL STEPS ANIMATION =====
const implSteps = document.querySelectorAll('.impl-step');
const implObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

implSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    implObserver.observe(step);
});

console.log('%c🤖 Agentic AI + OpenClaw', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cWebsite berhasil dimuat!', 'color: #10b981; font-size: 14px;');
