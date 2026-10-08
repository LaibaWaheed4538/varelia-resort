

const AuthService = {
    isAdminLoggedIn() {
        return localStorage.getItem('varelia_admin_auth') === 'true';
    },

    loginAdmin(username, password) {
        // Secure verification for management portal
        if (username === 'admin' && password === 'varelia2026') {
            localStorage.setItem('varelia_admin_auth', 'true');
            return true;
        }
        return false;
    },

    logoutAdmin() {
        localStorage.removeItem('varelia_admin_auth');
        window.location.href = 'index.html';
    }
};