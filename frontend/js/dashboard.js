

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

async function loadDashboardData() {
    try {
        const response = await fetch(`${window.location.protocol}//${window.location.hostname}:5000/api/bookings`);
        const result = await response.json();

        if (result.success && result.data) {
            const bookings = result.data;
            
            // Calculate Total Revenue & Bookings Count
            let totalRevenue = 0;
            bookings.forEach(b => {
                totalRevenue += parseFloat(b.total_amount_pkr || 0);
            });

            // Update UI Elements if present
            const totalBookingsEl = document.getElementById('stat-total-bookings');
            const totalRevenueEl = document.getElementById('stat-total-revenue');
            
            if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
            if (totalRevenueEl) totalRevenueEl.textContent = `PKR ${totalRevenue.toLocaleString()}`;

            // Populate Table if exists
            const tableBody = document.getElementById('dashboard-bookings-table');
            if (tableBody) {
                tableBody.innerHTML = '';
                bookings.forEach(b => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight:600; color:#D4AF37;">${b.booking_ref}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${b.guest_name}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${b.check_in} to ${b.check_out}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight:600; color:#0f172a;">PKR ${parseFloat(b.total_amount_pkr).toLocaleString()}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
    }
}