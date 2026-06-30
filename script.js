// =====================================================
// Portfolio interactions
// =====================================================
document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Mobile nav toggle ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Active nav tab on scroll ---------- */
    const tabs = document.querySelectorAll('.tab');
    const sections = Array.from(tabs)
        .map(tab => document.querySelector(tab.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = '#' + entry.target.id;
                const tab = document.querySelector(`.tab[href="${id}"]`);
                if (!tab) return;
                if (entry.isIntersecting) {
                    tabs.forEach(t => t.classList.remove('is-active'));
                    tab.classList.add('is-active');
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => navObserver.observe(section));
    }

    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll(
        '.section__head, .table-wrap, .skill-card, .project-card, .commit, .cert-card, .event-card, .contact__terminal, .contact-form'
    );
    revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), prefersReducedMotion ? 0 : i * 50);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                status.textContent = '✗ error: please fill in every field.';
                status.classList.add('is-error');
                return;
            }
            if (!emailPattern.test(email)) {
                status.textContent = '✗ error: that email address looks off.';
                status.classList.add('is-error');
                return;
            }

            status.classList.remove('is-error');
            const label = submitBtn.querySelector('.btn__label');
            const originalLabel = label.textContent;
            label.textContent = 'Sending…';
            submitBtn.disabled = true;

            // NOTE: this demo simulates sending. To actually deliver messages,
            // wire this up to a backend endpoint, or a form service like
            // Formspree / Resend / EmailJS, then POST { name, email, message } there.
            setTimeout(() => {
                status.textContent = `✓ thanks ${name.split(' ')[0]} — message sent. I'll reply at ${email}.`;
                label.textContent = originalLabel;
                submitBtn.disabled = false;
                form.reset();
            }, 900);
        });
    }

    /* ---------- Smooth-scroll offset for sticky header ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight + 1;
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    });

});