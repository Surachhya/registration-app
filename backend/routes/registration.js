const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',       // your email
        pass: 'your_app_password_or_oauth'  // app password or OAuth token
    }
});

router.post('/', async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();

        // Send confirmation email
        // Prepare email message
        const mailOptions = {
            from: '"Workshop Team" <your_email@gmail.com>',  // sender address
            to: data.emailAddress,                            // recipient from form
            subject: 'Workshop Request Confirmation',
            text: `Hello ${data.firstName},

                    Thank you for your interest in our workshops! A member of our team will reach out soon.

                    Best regards,
                    Workshop Team`
                };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email send error:', error);
                // You can decide if you want to fail the request or just log the email error
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


        res.status(201).json({ message: 'Registration saved!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving registration' });
    }
});
// GET all registrations (for listing)
router.get('/', async (req, res) => {
    try {
        // Select only fields needed: firstName, lastName, phone, emailAddress, createdAt, IsCompleted
        const registrations = await Registration.find({}, 'firstName lastName phone emailAddress createdAt IsCompleted').sort({ createdAt: -1 });
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching registrations' });
    }
});

// PATCH to update completion status
router.patch('/:id/complete', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Request not found' });

        registration.IsCompleted = true;
        await registration.save();

        res.json({ message: 'Marked as complete' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating registration' });
    }
});
// DELETE a registration
router.delete('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Request not found' });

        res.json({ message: 'Registration deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting registration' });
    }
});

module.exports = router;
