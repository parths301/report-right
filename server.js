const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail address
        pass: 'your-app-password' // Replace with your Gmail app password
    }
});

app.post('/submit-form', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'parthsh.ind@gmail.com',
        subject: `New Contact Form Submission - ${service}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message}
`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});