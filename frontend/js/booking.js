document.addEventListener('DOMContentLoaded', () => {
    initBookingForm();
});

function initBookingForm() {
    const checkinInput = document.getElementById('booking-checkin');
    const checkoutInput = document.getElementById('booking-checkout');
    const suiteSelect = document.getElementById('booking-suite');
    const guestsSelect = document.getElementById('booking-guests');
    const transportSelect = document.getElementById('booking-transport'); 
    const guideSelect = document.getElementById('booking-guide');         
    const diningSelect = document.getElementById('booking-dining');       
    const packageSelect = document.getElementById('booking-package');   
    
    const summaryNights = document.getElementById('summary-nights');
    const summaryPrice = document.getElementById('summary-price');
    const form = document.getElementById('resort-booking-form');

    if (!checkinInput || !checkoutInput || !form) return;

    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkinInput.value = today;
    checkoutInput.min = tomorrow.toISOString().split('T')[0];
    checkoutInput.value = tomorrow.toISOString().split('T')[0];

    function calculateTotal() {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        const ratePerNight = parseFloat(suiteSelect ? suiteSelect.value : 0) || 0;
        
        const transportFee = parseFloat(transportSelect ? transportSelect.value : 0) || 0;
        const guideFee = parseFloat(guideSelect ? guideSelect.value : 0) || 0;
        const diningFee = parseFloat(diningSelect ? diningSelect.value : 0) || 0;      
        const packageFee = parseFloat(packageSelect ? packageSelect.value : 0) || 0;   

        if (checkinDate && checkoutDate && checkoutDate > checkinDate) {
            const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            const stayTotal = nights * ratePerNight;
            const total = stayTotal + transportFee + guideFee + diningFee + packageFee;

            if (summaryNights) summaryNights.textContent = `${nights} Night${nights > 1 ? 's' : ''} Stay + Add-ons`;
            if (summaryPrice) summaryPrice.textContent = `PKR ${total.toLocaleString()}`;
        } else {
            if (summaryNights) summaryNights.textContent = 'Invalid date selection';
            if (summaryPrice) summaryPrice.textContent = 'PKR 0';
        }
    }

    checkinInput.addEventListener('change', () => {
        const selectedCheckin = new Date(checkinInput.value);
        const minCheckout = new Date(selectedCheckin);
        minCheckout.setDate(minCheckout.getDate() + 1);
        
        checkoutInput.min = minCheckout.toISOString().split('T')[0];
        if (new Date(checkoutInput.value) <= selectedCheckin) {
            checkoutInput.value = minCheckout.toISOString().split('T')[0];
        }
        calculateTotal();
    });

    if (checkoutInput) checkoutInput.addEventListener('change', calculateTotal);
    if (suiteSelect) suiteSelect.addEventListener('change', calculateTotal);
    if (transportSelect) transportSelect.addEventListener('change', calculateTotal);
    if (guideSelect) guideSelect.addEventListener('change', calculateTotal);
    if (diningSelect) diningSelect.addEventListener('change', calculateTotal);      
    if (packageSelect) packageSelect.addEventListener('change', calculateTotal);   

    calculateTotal();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const guestNameInput = document.getElementById('booking-name');
        const guestName = guestNameInput ? guestNameInput.value : 'Valued Guest';
        const guestEmailInput = document.getElementById('booking-email');
        const guestEmail = guestEmailInput ? guestEmailInput.value : 'guest@example.com';
        
        const rawPriceText = summaryPrice ? summaryPrice.textContent.replace('PKR', '').replace(/,/g, '').trim() : '0';
        const totalAmount = parseFloat(rawPriceText) || 0;

        const bookingRefCode = 'VR-' + Math.floor(10000 + Math.random() * 90000);

        const bookingData = {
            booking_ref: bookingRefCode,
            guest_name: guestName,
            guest_email: guestEmail,
            check_in: checkinInput.value,
            check_out: checkoutInput.value,
            total_amount_pkr: totalAmount
        };

        const isLocal = window.location.hostname === 'localhost' || window.location.hostname.includes('192.168.');
        const backendURL = isLocal 
            ? 'http://localhost:3000/api/bookings'
            : 'https://varelia-resort-production.up.railway.app/api/bookings';

        try {
            const response = await fetch(backendURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert(`Dear ${guestName},\n\nYour sanctuary reservation at VARELIA Luxury Resort has been successfully secured and registered in our private archives.\n\nReservation Reference: ${bookingRefCode}\nTotal Investment: ${summaryPrice ? summaryPrice.textContent : 'PKR ' + totalAmount}\n\nOur private concierge will contact you shortly to curate your arrival.`);
                form.reset();
                calculateTotal();
            } else {
                alert('Reservation Notice: ' + result.error);
            }
        } catch (err) {
            console.error('Server connection error:', err);
            alert('Connection Notice: Unable to reach the VARELIA server. Please ensure the backend node is active.');
        }
    });
}