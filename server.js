const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Dynamic port for Cloud (Railway) & Local fallback

app.use(cors());
app.use(express.json());

// MySQL Database Connection Pool
const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database Connection Failed:', err.message);
    } else {
        console.log('Successfully connected to MySQL Database: varelia_resort_db');
        connection.release();
    }
});

// Serve static frontend files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Fallback home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// 1. API: Save a New Booking (from booking.html)
app.post('/api/bookings', (req, res) => {
    const { booking_ref, guest_name, guest_email, check_in, check_out, total_amount_pkr } = req.body;

    const query = `INSERT INTO reservations (booking_ref, guest_name, guest_email, check_in, check_out, total_amount_pkr) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [booking_ref, guest_name, guest_email, check_in, check_out, total_amount_pkr], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, message: 'Reservation successfully saved to SQL Database!', bookingId: result.insertId });
    });
});

// 2. API: Fetch All Bookings (for dashboard)
app.get('/api/bookings', (req, res) => {
    db.query('SELECT * FROM reservations ORDER BY created_at DESC', (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json(results);
    });
});

// 3. API: Save Contact / Inquiry Message
app.post('/api/inquiries', (req, res) => {
    const { msg_ref, name, email, phone, subject, message } = req.body;

    const query = `INSERT INTO guest_inquiries (msg_ref, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [msg_ref, name, email, phone, subject, message], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, message: 'Inquiry saved successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`VARELIA Resort Server is running on port ${PORT}`);
});