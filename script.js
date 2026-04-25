document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true, // A animação ocorre apenas uma vez
        offset: 50
    });

    // 2. Sticky Header (Muda de cor ao rolar)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Animação do Contador de Estatísticas (Prova Social)
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const startCounting = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Usar IntersectionObserver para iniciar o contador quando chegar na seção
    const statsSection = document.querySelector('.social-proof');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                startCounting();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // 4. LGPD Banner
    const lgpdBanner = document.getElementById('lgpd-banner');
    const btnAceitar = document.getElementById('aceitar-cookies');
    
    // Mostra o banner após 2 segundos se não tiver sido aceito antes
    if (!localStorage.getItem('lgpd_accepted')) {
        setTimeout(() => {
            lgpdBanner.classList.add('show');
        }, 2000);
    }

    if(btnAceitar) {
        btnAceitar.addEventListener('click', () => {
            lgpdBanner.classList.remove('show');
            localStorage.setItem('lgpd_accepted', 'true');
        });
    }

    // 5. Iniciar Swiper (Carrossel de Depoimentos)
    if(typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }
});
