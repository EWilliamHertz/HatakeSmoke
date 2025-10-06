document.addEventListener('DOMContentLoaded', () => {
    const langEnBtn = document.getElementById('lang-en');
    const langSvBtn = document.getElementById('lang-sv');
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-sv]');
    
    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                // Check if the element is an input placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) {
                       el.placeholder = text;
                    }
                } else {
                     el.textContent = text;
                }
            }
        });

        // Update active language button style
        if (lang === 'sv') {
            langSvBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            document.documentElement.lang = 'sv';
        } else {
            langEnBtn.classList.add('active');
            langSvBtn.classList.remove('active');
            document.documentElement.lang = 'en';
        }
        
        // Store user's preference
        localStorage.setItem('preferredLanguage', lang);
    };

    if (langEnBtn && langSvBtn) {
        langEnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('en');
        });

        langSvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('sv');
        });
    }

    // Check for saved language preference on page load
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
        setLanguage(preferredLanguage);
    } else {
        // Default to English if no preference is saved
        setLanguage('en');
    }
});
