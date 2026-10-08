

const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5000/api`;

const ApiService = {
    async getBookings() {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error (getBookings):', error);
            return { success: false, error: 'Server unreachable' };
        }
    },

    async createBooking(bookingData) {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            return await response.json();
        } catch (error) {
            console.error('API Error (createBooking):', error);
            return { success: false, error: 'Server unreachable' };
        }
    }
};