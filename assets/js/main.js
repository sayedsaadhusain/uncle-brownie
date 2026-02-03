/* Uncle Brownie Main JS */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Uncle Brownie Website Loaded');

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // Pizza Size Selection Logic
    const sizeSelectors = document.querySelectorAll('.size-selector');
    if (sizeSelectors.length > 0) {
        sizeSelectors.forEach(selector => {
            const inputs = selector.querySelectorAll('input[type="radio"]');
            const card = selector.closest('.menu-card');
            const priceDisplay = card.querySelector('.menu-price');
            const orderBtn = card.querySelector('.btn-whatsapp');
            const itemName = selector.getAttribute('data-item-name');

            function updateCard() {
                const selected = selector.querySelector('input[type="radio"]:checked');
                if (selected) {
                    const price = selected.getAttribute('data-price');
                    const size = selected.value;

                    // Update Price Display
                    priceDisplay.textContent = `₹${price}`;

                    // Update WhatsApp Link
                    // Format: “Hello Uncle Brownie 👋 I would like to order: 🍕 Item Name – Size – ₹Price ...”
                    const message = `Hello Uncle Brownie 👋\nI would like to order:\n🍕 ${itemName} – ${size} – ₹${price}\nPickup / Delivery:\nContact:`;
                    const encodedMessage = encodeURIComponent(message);
                    orderBtn.href = `https://wa.me/916262707048?text=${encodedMessage}`;
                }
            }

            inputs.forEach(input => {
                input.addEventListener('change', updateCard);
            });

            // Initialize on load
            updateCard();
        });
    }

    // Menu Search Functionality
    // Menu Search Functionality
    const searchInput = document.getElementById('menuSearch');
    const noResultsMsg = document.getElementById('noResultsMsg');

    if (searchInput) {
        // Initialize tracking classes (visible by default)
        document.querySelectorAll('.menu-card').forEach(c => c.classList.add('search-visible'));

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.menu-card');
            const sections = document.querySelectorAll('section[id]');
            let globalVisibleCount = 0;

            // 1. Filter Cards
            cards.forEach(card => {
                const title = card.querySelector('.menu-title').textContent.toLowerCase();
                const descEl = card.querySelector('.text-muted');
                const desc = descEl ? descEl.textContent.toLowerCase() : '';

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = 'block';
                    card.classList.add('search-visible');
                    card.classList.remove('search-hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('search-visible');
                    card.classList.add('search-hidden');
                }
            });

            // 2. Hide Empty Sections
            sections.forEach(section => {
                const sectionCards = section.querySelectorAll('.menu-card');
                if (sectionCards.length > 0) {
                    const visibleCardsInSection = section.querySelectorAll('.menu-card.search-visible');
                    if (visibleCardsInSection.length === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                        globalVisibleCount += visibleCardsInSection.length;
                    }
                }
            });

            // 3. Show/Hide "No Results" Message
            if (noResultsMsg) {
                if (globalVisibleCount === 0 && query.length > 0) {
                    noResultsMsg.style.display = 'block';
                    sections.forEach(s => s.style.display = 'none');
                } else if (globalVisibleCount > 0) {
                    noResultsMsg.style.display = 'none';
                } else if (query.length === 0) {
                    sections.forEach(s => s.style.display = 'block');
                    noResultsMsg.style.display = 'none';
                }
            }
        });

        // Add focus effect via JS
        searchInput.addEventListener('focus', () => {
            searchInput.style.boxShadow = '0 10px 30px rgba(68, 81, 53, 0.2)';
            searchInput.style.borderColor = 'rgba(68, 81, 53, 0.3)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            searchInput.style.borderColor = 'rgba(0,0,0,0.05)';
        });
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
