/**
 * Nova AI Landing Page - Interactive Logic & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Background on Scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu-actions .btn');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });
  }

  // 3. Interactive Pricing Switch (Monthly vs Yearly)
  const pricingToggle = document.getElementById('pricing-toggle-input');
  const amountDisplays = document.querySelectorAll('.price-display .amount');
  const billingNotes = document.querySelectorAll('.billing-note');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
      const isYearly = e.target.checked;

      amountDisplays.forEach(amountEl => {
        const monthlyPrice = amountEl.getAttribute('data-monthly');
        const yearlyPrice = amountEl.getAttribute('data-yearly');
        
        // Quick subtle scale animation
        amountEl.style.transform = 'scale(0.9)';
        amountEl.style.opacity = '0.5';
        
        setTimeout(() => {
          amountEl.textContent = isYearly ? yearlyPrice : monthlyPrice;
          amountEl.style.transform = 'scale(1)';
          amountEl.style.opacity = '1';
        }, 150);
      });

      billingNotes.forEach(noteEl => {
        const monthlyNote = noteEl.getAttribute('data-monthly');
        const yearlyNote = noteEl.getAttribute('data-yearly');
        noteEl.textContent = isYearly ? yearlyNote : monthlyNote;
      });
    });
  }

  // 4. Interactive How It Works - Tab Switcher
  const demoTabs = document.querySelectorAll('.demo-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      demoTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // 5. Interactive Mouse Spotlight Glow on Feature Cards
  const glowCards = document.querySelectorAll('.interactive-glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Interactive FAQ Accordion
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.closest('.faq-item');
      const content = parentItem.querySelector('.faq-content');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean accordion experience
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const otherTrigger = item.querySelector('.faq-trigger');
          const otherContent = item.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        parentItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        parentItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      }
    });
  });

  // 7. Video Demo Modal Logic
  const watchDemoBtn = document.getElementById('watch-demo-btn');
  const demoModal = document.getElementById('demo-modal');
  const modalClose = document.getElementById('modal-close');

  function openModal() {
    if (demoModal) {
      demoModal.classList.add('open');
      demoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('open');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (watchDemoBtn) watchDemoBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('open')) {
      closeModal();
    }
  });

  // 8. Newsletter / CTA Submission with Toast Notification
  const newsletterForm = document.getElementById('newsletter-form');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('user-email-input');
      if (emailInput && emailInput.value) {
        showToast(`🎉 Terima kasih! Undangan uji coba telah dikirim ke ${emailInput.value}`);
        emailInput.value = '';
      }
    });
  }

  // 9. Interactive Metric Counter Animation on Load
  const animatedMetrics = document.querySelectorAll('.m-val');
  animatedMetrics.forEach(metric => {
    metric.style.transition = 'color 0.3s ease';
  });
});
