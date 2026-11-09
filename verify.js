/* ===== TIVRA Pay - Account Verification (Send OTP) =====
   Handles the mobile number form and the OTP loading popup.
   The loading animation keeps running until the popup is closed. */

(function () {
    'use strict';

    const form = document.getElementById('verifyForm');
    const phoneField = document.getElementById('verifyPhone');
    const overlay = document.getElementById('otpLoadingOverlay');

    if (!form || !phoneField || !overlay) return;

    function setError(message) {
        const field = phoneField.closest('.field');
        if (!field) return;
        const err = field.querySelector('.err');
        if (message) {
            field.classList.add('invalid');
            if (err) err.textContent = message;
        } else {
            field.classList.remove('invalid');
            if (err) err.textContent = '';
        }
    }

    /* Keep only digits, max 10 */
    phoneField.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        setError('');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = (phoneField.value || '').trim();
        if (!/^[0-9]{10}$/.test(phone)) {
            setError('Please enter a valid 10 digit mobile number');
            phoneField.focus();
            return;
        }

        setError('');

        /* Open the loading popup — the spinner keeps running */
        overlay.hidden = false;
        document.body.classList.add('is-locked');
    });
})();
