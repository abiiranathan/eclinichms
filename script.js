/* ── NAV scroll effect ── */
const nav = document.getElementById('nav');
const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Form handler ── */
function handleSubmit(btn) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const facility = document.getElementById('facility').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !facility) {
        btn.textContent = 'Please fill in all required fields.';
        btn.style.background = '#c00';

        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
        }, 2500);

        return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        btn.textContent = 'Please enter a valid email.';
        btn.style.background = '#c00';

        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
        }, 2500);

        return;
    }

    // Limit message length
    const trimmedMessage = message.substring(0, 1200);

    // Build mail content
    const subject = encodeURIComponent(
        `Eclinic HMS Demo Request — ${facility}`
    );

    const body = encodeURIComponent(
        `Name: ${name}
Email: ${email}
Facility: ${facility}

Message:
${trimmedMessage}`
    );

    const mailto = `mailto:nabiira2by2@gmail.com?subject=${subject}&body=${body}`;

    try {
        // Open default mail client
        const link = document.createElement('a');
        link.href = mailto;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        btn.textContent = 'Opening your mail app… ✓';
        btn.style.background = '#00b97a';

    } catch (err) {
        console.error(err);

        // Fallback
        navigator.clipboard.writeText('nabiira2by2@gmail.com');

        btn.textContent = 'Email copied. Please send manually.';
        btn.style.background = '#c00';
    }

    // Reset button
    setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
    }, 3000);
}