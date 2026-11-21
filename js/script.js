document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBookingForm();
  initContactForm();
});

function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (!navToggle || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const dateInput = document.getElementById('preferred-date');
  if (dateInput) {
   dateInput.min = new Date().toISOString().split('T')[0];
  }
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', openMenu);

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

function setError(errorEl, message) {
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function initBookingForm() {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;

  // If APPS_SCRIPT_URL is defined, booking.html handles its own form submission with Google Sheets
  if (typeof APPS_SCRIPT_URL !== 'undefined') return;

  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const serviceInput = document.getElementById('service');
  const dateInput = document.getElementById('preferred-date');
  const referralInput = document.getElementById('referral');
  const successBox = document.getElementById('booking-success');

  const nameError = document.getElementById('name-error');
  const mobileError = document.getElementById('mobile-error');
  const serviceError = document.getElementById('service-error');
  const dateError = document.getElementById('date-error');
  const referralError = document.getElementById('referral-error');

  const allErrors = [nameError, mobileError, serviceError, dateError, referralError];
  const egyptMobileRegex = /^01[0125][0-9]{8}$/;

  if (dateInput) {
    dateInput.min = getTodayDateString();
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    allErrors.forEach((el) => setError(el, ''));
    if (successBox) {
      successBox.classList.remove('visible');
    }

    let isValid = true;

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const mobileVal = mobileInput ? mobileInput.value.trim().replace(/[\s-]/g, '') : '';
    const serviceVal = serviceInput ? serviceInput.value : '';
    const dateVal = dateInput ? dateInput.value : '';
    const referralVal = referralInput ? referralInput.value : '';

    if (nameVal.length < 2) {
      setError(nameError, 'Please enter your full name (at least 2 characters).');
      isValid = false;
    }

    if (!egyptMobileRegex.test(mobileVal)) {
      setError(
        mobileError,
        'Invalid mobile number. Enter an 11-digit number starting with 010, 011, 012, or 015.'
      );
      isValid = false;
    }

    if (!serviceVal) {
      setError(serviceError, 'Please choose a department.');
      isValid = false;
    }

    if (!dateVal) {
      setError(dateError, 'Please choose a preferred date.');
      isValid = false;
    } else if (dateVal < getTodayDateString()) {
      setError(dateError, 'Please select today or a future date.');
      isValid = false;
    }

    if (!referralVal) {
      setError(referralError, 'Please select how you heard about us.');
      isValid = false;
    }

    if (isValid) {
      bookingForm.reset();
      if (dateInput) {
        dateInput.min = getTodayDateString();
      }
      if (successBox) {
        successBox.classList.add('visible');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
}

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('name')?.value.trim() || '';
    const emailVal = document.getElementById('email')?.value.trim() || '';
    const subjectVal = document.getElementById('subject')?.value.trim() || '';
    const messageVal = document.getElementById('message')?.value.trim() || '';

    if (!nameVal || !emailVal || !subjectVal || !messageVal) {
      alert('Please fill out all fields before sending.');
      return;
    }

    if (!emailRegex.test(emailVal)) {
      alert('Please enter a valid email address.');
      return;
    }

    contactForm.reset();
    alert('Your message has been sent to NileCare.');
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // 1. Doctors Specialty Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const doctorCards = document.querySelectorAll(".doctor-card");

  if (filterButtons.length > 0 && doctorCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const selected = this.getAttribute("data-filter");
        doctorCards.forEach((card) => {
          const specialty = card.getAttribute("data-specialty");
          if (selected === "All" || specialty === selected) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 2. Auto-select Department & Doctor from URL query params on booking.html
  const params = new URLSearchParams(window.location.search);
  const deptParam = params.get("dept");
  const doctorParam = params.get("doctor");

  const deptSelect =
    document.getElementById("department") ||
    document.querySelector('select[name="department"]');
  const notesInput =
    document.getElementById("notes") ||
    document.querySelector('textarea[name="notes"]');

  if (deptSelect && deptParam) {
    const matchedOption = Array.from(deptSelect.options).find(
      (opt) => opt.value.toLowerCase() === deptParam.toLowerCase() || opt.textContent.trim().toLowerCase() === deptParam.toLowerCase()
    );
    if (matchedOption) {
      deptSelect.value = matchedOption.value;
    }
  }

  if (notesInput && doctorParam && !notesInput.value.trim()) {
    notesInput.value = "Preferred Doctor: " + doctorParam;
  }

  // 3. Structured Booking Summary after Form Submission (only when APPS_SCRIPT_URL is not present)
  const bookingForm =
    document.getElementById("bookingForm") ||
    document.querySelector("form.booking-form") ||
    document.querySelector("form");

  if (bookingForm && window.location.pathname.toLowerCase().includes("booking")) {
    if (typeof APPS_SCRIPT_URL === 'undefined') {
      bookingForm.addEventListener("submit", function (e) {
        const nameInput =
          document.getElementById("fullName") ||
          document.getElementById("name") ||
          bookingForm.querySelector('input[type="text"]');
        const phoneInput =
          document.getElementById("phone") ||
          bookingForm.querySelector('input[type="tel"]');
        const dateInput =
          document.getElementById("date") ||
          bookingForm.querySelector('input[type="date"]');

        const nameVal = nameInput ? nameInput.value.trim() : "";
        const phoneVal = phoneInput ? phoneInput.value.trim() : "";
        const deptVal = deptSelect ? deptSelect.value : "";
        const dateVal = dateInput ? dateInput.value : "";
        const notesVal = notesInput ? notesInput.value.trim() : "";

        const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
        const todayStr = new Date().toISOString().split("T")[0];

        if (!nameVal || !egyptPhoneRegex.test(phoneVal) || !deptVal || !dateVal || dateVal < todayStr) {
          return;
        }

        e.preventDefault();

        let summaryBox = document.getElementById("bookingSummary");
        if (!summaryBox) {
          summaryBox = document.createElement("div");
          summaryBox.id = "bookingSummary";
          summaryBox.className = "booking-summary-box";
          bookingForm.insertAdjacentElement("afterend", summaryBox);
        }

        summaryBox.innerHTML =
          "<strong>Appointment Request Prepared</strong><br>" +
          "Patient: " + nameVal + "<br>" +
          "Mobile: " + phoneVal + "<br>" +
          "Department: " + deptVal + "<br>" +
          "Preferred Date: " + dateVal +
          (notesVal ? "<br>Notes: " + notesVal : "");
      });
    }
  }
});
