const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");
require("dotenv").config();

const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;

        await Contact.create({ username, email, message });

       
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: [email, process.env.EMAIL_USER],
            subject: "Contact Form Submission Received",
            text: `Hello ${username},\n\nThank you for reaching out! We have received your message:\n"${message}"\n\nWe will get back to you shortly.\n\nBest Regards,\n INE INFOTECH`,
        };

        
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.log("Error in sending message:", error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

module.exports = { contactForm };
