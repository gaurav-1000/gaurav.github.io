// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Typing animation for header
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const headerTitle = document.querySelector('.header-content h1');
    const originalText = headerTitle.textContent;
    typeWriter(headerTitle, originalText, 150);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced scroll animations with intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation for skill cards
            if (entry.target.classList.contains('skills-grid')) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll with theme awareness
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentTheme = body.getAttribute('data-theme');
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            nav.style.background = 'rgba(45, 55, 72, 0.95)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = '';
        nav.style.backdropFilter = 'none';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: var(--gradient-primary);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Initialize EmailJS with your actual EmailJS user ID
emailjs.init("K3nszoP_O6yTgWkiJ");

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        // Get form values
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Gaurav Katkar',
            to_email: 'gaurav.dev4242@gmail.com'
        };
        // Send email using EmailJS
        emailjs.send('service_5b8iz4d', 'template_6zoqxgf', templateParams)
            .then(function(response) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    let icon = 'info-circle';
    let bgColor = '#2196F3';
    if (type === 'success') {
        icon = 'check-circle';
        bgColor = '#4CAF50';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
        bgColor = '#f44336';
    }
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    document.body.appendChild(notification);
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Project demo functionality
function showProjectDemo(project) {
    const projectData = {
        mmdd: {
            title: 'Make My Dream Day',
            description: 'A comprehensive wedding planning marketplace revolutionizing how couples plan their special day.',
            features: [
                'Multi-category service discovery with 13+ categories',
                'Secure payment processing with PayU integration',
                'Real-time chat between users and vendors',
                'Custom e-invitation creator with drag-and-drop',
                'Advanced shopping cart with date management',
                'Location-based services with Google Maps',
                'User authentication with OTP verification',
                'Booking management and review system',
                'Vendor dashboard and analytics'
            ],
            tech: ['Flutter', 'Riverpod', 'REST APIs', 'PayU', 'Google Maps', 'SharedPreferences'],
            github: 'https://github.com/yourusername/mmdd-wedding-app',
            demo: 'https://mmdd-demo.vercel.app'
        },
        nobi: {
            title: 'Case Study: Nobi – Real-World Social Connection App',
            description: `<strong>Overview</strong><br>Nobi is a cross-platform mobile application designed to help users make meaningful, real-world connections by discovering and chatting with people nearby. Unlike traditional social apps, Nobi emphasizes privacy, digital wellness, and inclusivity, making it approachable for all personality types.<br><br><strong>My Role: Mobile Developer</strong><br>As the lead mobile developer, I was responsible for architecting, developing, and optimizing the entire mobile experience using Flutter. My work spanned from designing the app's modular structure to implementing advanced features like real-time location sharing, chat, and subscription management.<br><br><strong>Challenges & Solutions</strong><br><ol style='margin-left:20px; color:var(--text-secondary);'><li><strong>Real-Time, Privacy-First Location Sharing</strong><br><em>Challenge:</em> Enable users to appear on a map for others within a 100–200 meter radius, while giving them full control over their visibility and ensuring data privacy.<br><em>Solution:</em><ul><li>Integrated Google Maps SDK for Flutter and implemented background location tracking.</li><li>Developed "Check In" and "Ghost Mode" features, allowing users to control when they are visible.</li><li>Automated location removal after 30 minutes or during late hours (11 PM–6 AM) to promote digital wellness.</li><li>Ensured that location data is never shared beyond the intended radius.</li></ul></li><li><strong>Seamless Authentication & Real-Time Chat</strong><br><em>Challenge:</em> Provide a frictionless onboarding experience and enable instant, secure communication between users.<br><em>Solution:</em><ul><li>Used Firebase Authentication for secure sign-up and login flows.</li><li>Leveraged Firestore for real-time chat, ensuring messages are delivered instantly when two users "Buzz" each other.</li><li>Built custom onboarding and registration flows with clear legal and privacy information.</li></ul></li><li><strong>Subscription & Monetization</strong><br><em>Challenge:</em> Implement a robust, user-friendly subscription system for premium features.<br><em>Solution:</em><ul><li>Integrated RevenueCat for managing in-app purchases and subscriptions.</li><li>Designed clear UI for subscription details, terms, and management, with robust error handling and feedback.</li></ul></li><li><strong>Inclusive & Accessible UI/UX</strong><br><em>Challenge:</em> Create an interface that is vibrant, modern, and accessible to all users, including introverts and neurodivergent individuals.<br><em>Solution:</em><ul><li>Developed a custom design system with gradient backgrounds, accessible color schemes, and consistent typography.</li><li>Built reusable widgets for buttons, chat bubbles, and profile images (including dynamic emoji overlays).</li><li>Prioritized simplicity and clarity in all user flows.</li></ul></li></ol><br><strong>Tech Stack</strong><br>Flutter & Dart for cross-platform development<br>Firebase (Auth, Firestore, Crashlytics) for backend and analytics<br>GetX for state management and routing<br>Google Maps SDK for location features<br>RevenueCat for subscription management<br><br><strong>Results & Impact</strong><ul style='margin-left:20px; color:var(--text-secondary);'><li><strong>User Empowerment:</strong> Users can easily control their visibility, privacy, and digital presence.</li><li><strong>Performance:</strong> Achieved smooth, real-time updates and chat, with minimal latency and robust error handling.</li><li><strong>Inclusivity:</strong> The app is approachable for all users, with features designed to reduce social pressure and promote positive mental health.</li><li><strong>Scalability:</strong> The modular architecture allows for rapid feature development and easy maintenance.</li></ul><br><strong>Key Takeaways</strong><ul style='margin-left:20px; color:var(--text-secondary);'><li>Building privacy-first, real-time features requires careful architectural planning and a user-centric mindset.</li><li>Flutter's flexibility, combined with robust state management (GetX) and cloud services (Firebase), enables rapid development of complex, cross-platform apps.</li><li>Thoughtful UI/UX design can make social technology more inclusive and supportive for everyone.</li></ul>`,
            features: [],
            tech: [],
            github: '',
            demo: ''
        }
    };
    const data = projectData[project];
    if (!data) return;
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProjectModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${data.title}</h2>
                <button class="modal-close" onclick="closeProjectModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p class="modal-description">${data.description}</p>
            </div>
        </div>
    `;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
    .modal-content {
        background: var(--bg-card);
        border-radius: 20px;
        max-width: 700px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-heavy);
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 40px;
        border-bottom: 1px solid var(--border-color);
    }
    .modal-header h2 {
        color: var(--text-primary);
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
    .modal-close {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    .modal-close:hover {
        background: var(--gradient-primary);
        color: white;
    }
    .modal-body {
        padding: 40px;
    }
    .modal-description {
        color: var(--text-secondary);
        margin-bottom: 30px;
        font-size: 1.1rem;
        line-height: 1.7;
    }
    .modal-section {
        margin-bottom: 30px;
    }
    .modal-section h3 {
        color: var(--text-primary);
        margin-bottom: 20px;
        font-size: 1.4rem;
        font-weight: 600;
    }
    .modal-section ul {
        list-style: none;
        padding: 0;
    }
    .modal-section li {
        color: var(--text-secondary);
        margin-bottom: 12px;
        padding-left: 25px;
        position: relative;
        line-height: 1.6;
    }
    .modal-section li:before {
        content: '•';
        color: var(--primary-color);
        position: absolute;
        left: 0;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }
    .modal-actions {
        display: flex;
        gap: 20px;
        margin-top: 40px;
    }
    .modal-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 15px 25px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .github-btn {
        background: #333;
        color: white;
    }
    .github-btn:hover {
        background: #555;
        transform: translateY(-2px);
    }
    .demo-btn {
        background: var(--gradient-primary);
        color: white;
    }
    .demo-btn:hover {
        background: var(--gradient-secondary);
        transform: translateY(-2px);
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            max-height: 90vh;
        }
        .modal-actions {
            flex-direction: column;
        }
        .modal-header {
            padding: 20px 25px;
        }
        .modal-body {
            padding: 25px;
        }
    }
`;
document.head.appendChild(modalStyles); 