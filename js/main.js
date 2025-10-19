// Smooth scroll para navegación
        document.querySelectorAll('.category-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                const offset = 80; // Altura del navbar
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Activar botón
                document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Intersection Observer para animaciones al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar todas las secciones
        document.querySelectorAll('.category-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });

        // Highlight del botón de categoría activa al scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.category-section');
            const navButtons = document.querySelectorAll('.category-item');

            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('href') === `#${current}`) {
                    btn.classList.add('active');
                }
            });
        });

        // Funcionalidad de búsqueda
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const menuItems = document.querySelectorAll('.menu-item');

                menuItems.forEach(item => {
                    const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                    const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();

                    if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }