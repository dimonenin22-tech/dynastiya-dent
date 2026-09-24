/**
 * Династія Dent — Client JavaScript
 * Interactive Booking Modal, Service Selection & Mobile Actions
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const serviceInput = document.getElementById('client-service');
  const nameInput = document.getElementById('client-name');
  const phoneInput = document.getElementById('client-phone');
  const bookingForm = document.getElementById('booking-form');
  const modalSuccess = document.getElementById('modal-success');
  const successCloseBtn = document.getElementById('success-close-btn');

  // Open modal handler
  function openModal(serviceName = 'Первинна консультація') {
    if (!modal) return;
    if (serviceInput && serviceName) {
      let matched = false;
      for (let i = 0; i < serviceInput.options.length; i++) {
        if (serviceInput.options[i].value === serviceName || serviceInput.options[i].text.includes(serviceName)) {
          serviceInput.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && serviceInput.options.length > 0) {
        serviceInput.value = serviceName;
      }
    }
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Reset success view if previously submitted
    if (modalSuccess) modalSuccess.style.display = 'none';
    if (bookingForm) bookingForm.style.display = 'flex';

    // Focus first input
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 100);
  }

  // Close modal handler
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Attach open listeners to all trigger buttons
  document.querySelectorAll('.open-booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Первинна консультація';
      openModal(service);
    });
  });

  // Close button click
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Success button close
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      closeModal();
      if (bookingForm) bookingForm.reset();
    });
  }

  // Phone input formatting helper (+380...)
  if (phoneInput) {
    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value) {
        phoneInput.value = '+380';
      }
    });

    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^\d+]/g, '');
      if (!val.startsWith('+380')) {
        val = '+380';
      }
      e.target.value = val.slice(0, 13); // +380XXXXXXXXX
    });
  }

  // Booking Form Submission Handler
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value.trim() : '';

      if (!name || phone.length < 10) {
        alert('Будь ласка, вкажіть ваше ім\'я та коректний номер телефону (+380...).');
        return;
      }

      console.log('Заявка на прийом «Династія Dent»:', { name, phone, service, time: new Date().toISOString() });

      // Show success message
      bookingForm.style.display = 'none';
      if (modalSuccess) {
        modalSuccess.style.display = 'block';
      }
    });
  }

  // ==========================================================================
  // Before/After Slider Interaction (Strict Anti-Stretch Rule: CSS clip-path)
  // ==========================================================================
  const baRange = document.getElementById('ba-range');
  const baSlider = document.getElementById('ba-slider');

  if (baRange && baSlider) {
    const updateSlider = (val) => {
      baSlider.style.setProperty('--slider-pos', `${val}%`);
    };

    baRange.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });

    baRange.addEventListener('change', (e) => {
      updateSlider(e.target.value);
    });
  }

  // Cases Switcher Data
  const casesData = {
    1: {
      category: "Ортодонтія та виправлення прикусу",
      duration: "Термін: 14 місяців",
      title: "Виправлення глибокого прикусу та вирівнювання зубного ряду",
      desc: "Лікування металевою брекет-системою. Корекція оклюзії та створення правильного естетичного перекриття. Лікар-ортодонт: Тетяна Миколаївна.",
      service: "Ортодонтичне лікування",
      beforeImg: "assets/before_after/case1_before.webp",
      afterImg: "assets/before_after/case1_after.webp"
    },
    2: {
      category: "Ортодонтія & Дитячий прикус",
      duration: "Термін: 12 місяців",
      title: "Апаратне розширення щелепи та усунення скученості зубів",
      desc: "Усунення дистального зміщення, гармонізація профілю обличчя та вирівнювання зубів. Лікар-ортодонт: Тетяна Миколаївна.",
      service: "Ортодонтичне лікування",
      beforeImg: "assets/before_after/case2_before.webp",
      afterImg: "assets/before_after/case2_after.webp"
    },
    3: {
      category: "Ортопедія та естетичні вініри",
      duration: "Термін: 2 візити (7–10 днів)",
      title: "Керамічні ультратонкі вініри E.max на зону посмішки",
      desc: "Корекція форми та кольору зубів, відновлення мікрорельєфу емалі без надмірного препарування. Стоматолог-ортопед: Олександр Олександрович.",
      service: "Керамічні вініри та коронки",
      beforeImg: "assets/before_after/case3_before.webp",
      afterImg: "assets/before_after/case3_after.webp"
    }
  };

  const caseTabs = document.querySelectorAll('.case-tab');
  const caseCategory = document.getElementById('case-category');
  const caseDuration = document.getElementById('case-duration');
  const caseTitle = document.getElementById('case-title');
  const caseDesc = document.getElementById('case-desc');
  const caseCtaBtn = document.getElementById('case-cta-btn');
  const baImgBefore = document.getElementById('ba-img-before');
  const baImgAfter = document.getElementById('ba-img-after');

  caseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const caseId = tab.getAttribute('data-case');
      const data = casesData[caseId];
      if (!data) return;

      caseTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      if (caseCategory) caseCategory.textContent = data.category;
      if (caseDuration) caseDuration.textContent = data.duration;
      if (caseTitle) caseTitle.textContent = data.title;
      if (caseDesc) caseDesc.textContent = data.desc;
      if (caseCtaBtn) {
        caseCtaBtn.setAttribute('data-service', data.service);
      }
      if (baImgBefore && data.beforeImg) {
        baImgBefore.src = data.beforeImg;
      }
      if (baImgAfter && data.afterImg) {
        baImgAfter.src = data.afterImg;
      }

      // Reset slider to center
      if (baRange && baSlider) {
        baRange.value = 50;
        baSlider.style.setProperty('--slider-pos', '50%');
      }
    });
  });
});

