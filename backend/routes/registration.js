const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'workshopteamreply@gmail.com',       
        pass: 'hmye sadb krbv celz', 
    }
});

const sendEmail = (data) => {
    const mailOptions = {
        from: '"Workshop Team" <workshopteamreply@gmail.com>', 
        to: data.emailAddress, 
        subject: 'Workshop Request Confirmation',
        text: `Hello ${data.firstName},
Thank you for your interest in our workshops at Towson University! We appreciate you taking the time to reach out.
A member of our team will review your request and get back to you shortly with more information.
In the meantime, if you have any urgent questions or need immediate assistance,
please feel free to reply to this email.
We look forward to helping you explore the opportunities available and supporting your educational journey.
Best regards,
The Towson University Workshop Team
`
            };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error:', error);

        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/', async (req, res) => {
    try {
        const newRegistration = new Registration(req.body);
        await newRegistration.save();

        sendEmail(newRegistration);

        res.status(201).json({ message: 'Registration saved!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving registration' });
    }
});

router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find({}, 'firstName lastName phone emailAddress createdAt IsCompleted').sort({ createdAt: -1 });
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching registrations' });
    }
});

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

router.get('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Request not found' });

        res.json(registration);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching registration' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(req
.params.id, req.body, { new: true });
        if (!registration) return res.status(404).json({ message: 'Request not found' });

        sendEmail(registration);

        res.json({ message: 'Registration updated', registration });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating registration' });
    }
});

module.exports = router;
