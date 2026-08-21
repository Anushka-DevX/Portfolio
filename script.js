/* ==========================================================================
   ANUSHKA SHARMA - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. Theme Engine (Dark / Light Mode Toggle with Persistence)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    // Check saved preference or default to light white theme
    const savedTheme = localStorage.getItem('anushka_portfolio_theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('anushka_portfolio_theme', newTheme);

            showToast(newTheme === 'light' ? 'Switched to Light Mode ☀️' : 'Switched to Dark Mode 🌙');
        });
    }

    // ----------------------------------------------------------------------
    // 2. Mobile Drawer Navigation Toggle
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
    }

    if (closeDrawerBtn && mobileDrawer) {
        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer) mobileDrawer.classList.remove('open');
        });
    });

    // ----------------------------------------------------------------------
    // 3. Skill Filter Tabs
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 4. Animated Stat Counters on Scroll
    // ----------------------------------------------------------------------
    const statCards = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateCounters = () => {
        statCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-target'));
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                // Preserve trailing signs (%+, DA %, +, %)
                if (target === 30) {
                    card.textContent = `+${current}%`;
                } else if (target === 10) {
                    card.textContent = `${current}% DA`;
                } else if (target === 100) {
                    card.textContent = `${current}%`;
                } else if (target === 5) {
                    card.textContent = `${current}+`;
                } else {
                    card.textContent = current;
                }
            }, 30);
        });
    };

    // Intersection Observer for Stats Section
    const statsSection = document.querySelector('.stats-bar-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedStats) {
                    animatedStats = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // ----------------------------------------------------------------------
    // 5. Interactive Live SEO Health Check & ROI Simulator Tool
    // ----------------------------------------------------------------------
    const runAuditBtn = document.getElementById('runAuditBtn');
    const toolUrlInput = document.getElementById('toolUrlInput');
    const toolCategorySelect = document.getElementById('toolCategorySelect');
    const auditTargetName = document.getElementById('auditTargetName');
    const scoreVal = document.getElementById('scoreVal');
    const dialStroke = document.getElementById('dialStroke');
    const crawlPill = document.getElementById('crawlPill');
    const recommendationText = document.getElementById('recommendationText');

    const auditDataPresets = {
        ecommerce: {
            score: 84,
            brokenLinks: "8 Broken Product Links Found",
            recommendation: "Shopify Store Optimization: Optimize image alt tags across product catalog, resolve 8 404 URL redirect chains, fix structured product schema (JSON-LD), and craft high-converting meta titles for category pages."
        },
        services: {
            score: 76,
            brokenLinks: "15 Broken Local Citation Links",
            recommendation: "Local SEO Audit: Optimize Google Business Profile integration, perform local keyword research via Ubersuggest, implement NAP (Name, Address, Phone) consistency, and build geo-targeted backlinks."
        },
        tech: {
            score: 91,
            brokenLinks: "3 Crawl Delay Errors",
            recommendation: "Technical SEO Audit: Minify render-blocking resources, clean XML sitemap indexation, configure robots.txt directives, and implement Canonical URLs to eliminate duplicate parameter URLs."
        },
        blogs: {
            score: 72,
            brokenLinks: "19 Broken External Links",
            recommendation: "Content & On-Page SEO Audit: Clean 19 broken external blog citations with Screaming Frog, restructure H1/H2 header hierarchies, write targeted meta descriptions, and build high-authority backlinks via Ahrefs."
        }
    };

    if (runAuditBtn) {
        runAuditBtn.addEventListener('click', () => {
            const rawUrl = toolUrlInput.value.trim() || 'myshopifystore.com';
            const category = toolCategorySelect.value;
            const preset = auditDataPresets[category] || auditDataPresets.ecommerce;

            // Simple URL display cleaning
            const cleanUrl = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

            // Animate Audit Button State
            runAuditBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Auditing...`;
            runAuditBtn.disabled = true;

            setTimeout(() => {
                runAuditBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> Run Audit Simulation`;
                runAuditBtn.disabled = false;

                // Update Output DOM
                auditTargetName.textContent = cleanUrl;
                scoreVal.textContent = preset.score;
                dialStroke.setAttribute('stroke-dasharray', `${preset.score}, 100`);
                crawlPill.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${preset.brokenLinks}`;
                recommendationText.textContent = preset.recommendation;

                showToast(`SEO Audit report generated for ${cleanUrl}!`);
            }, 800);
        });
    }

    // ----------------------------------------------------------------------
    // 6. Dynamic Year in Footer
    // ----------------------------------------------------------------------
    const yearVal = document.getElementById('yearVal');
    if (yearVal) {
        yearVal.textContent = new Date().getFullYear();
    }

    // ----------------------------------------------------------------------
    // 7. Interactive Resume Modal Viewer (View Resume Live without Download)
    // ----------------------------------------------------------------------
    const openResumeModalBtn = document.getElementById('openResumeModalBtn');
    const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
    const resumeModal = document.getElementById('resumeModal');

    if (openResumeModalBtn && resumeModal) {
        openResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent page background scrolling
        });
    }

    if (closeResumeModalBtn && resumeModal) {
        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (resumeModal) {
        // Close modal when clicking outside card area
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// --------------------------------------------------------------------------
// 7. Global Helper Functions: Copy to Clipboard & Contact Form Handler
// --------------------------------------------------------------------------

function copyToClipboard(text, buttonElement) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied "${text}" to clipboard!`);
            if (buttonElement) {
                const originalHTML = buttonElement.innerHTML;
                buttonElement.innerHTML = `<i class="fa-solid fa-check" style="color: var(--brand-emerald);"></i>`;
                setTimeout(() => {
                    buttonElement.innerHTML = originalHTML;
                }, 2000);
            }
        }).catch(err => {
            showToast(`Failed to copy: ${err}`);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${text}" to clipboard!`);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('senderName').value;
    const emailInput = document.getElementById('senderEmail').value;
    const msgInput = document.getElementById('senderMsg').value;

    if (!nameInput || !emailInput || !msgInput) {
        showToast('Please fill out all required fields (*)');
        return;
    }

    showToast(`Thank you ${nameInput}! Your message has been sent to Anushka. 🚀`);
    
    // Reset Form
    event.target.reset();
}

function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--brand-cyan);"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}
