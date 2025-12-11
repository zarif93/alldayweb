document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            // Close others (optional, keeping exclusive open feel)
            document.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Scroll Progress Bar ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
            progressBar.style.height = "4px";
            progressBar.style.background = "#D4AF37";
            progressBar.style.position = "fixed";
            progressBar.style.top = "0";
            progressBar.style.zIndex = "1001";
        }
    });

    // --- Contact Form to WhatsApp ---
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('phoneNumber').value;
            const experience = document.getElementById('experience').value;
            const msg = document.getElementById('whatsappNumber').value; // Optional field

            // Construct WhatsApp Message
            let text = `היי, אני רוצה להצטרף ל-AllDayAllNight!\n`;
            text += `*שם:* ${name}\n`;
            text += `*טלפון:* ${phone}\n`;
            text += `*ניסיון בפוקר:* ${experience === 'yes' ? 'כן' : 'לא'}\n`;
            if (msg) text += `*וואטסאפ נוסף:* ${msg}`;

            // Open WhatsApp
            const waNumber = "972555505828"; // Corrected format if needed (User put 995555505828 in prompt, using that)
            const targetNumber = "995555505828";

            const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');

            // Show Feedback
            document.getElementById('formFeedback').style.display = 'block';
            form.reset();
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in elements on scroll
    document.querySelectorAll('.service-card, .feature-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for visible state
    const style = document.createElement('style');
    style.innerHTML = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
    document.head.appendChild(style);

});
