const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");
const path = require("path");
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
            attachments: [{
                filename: "logo.png",
                path: path.join(__dirname, "../public/logo.png"), 
                cid: "unique@logo"  
            }],
            html: `
            <div style="font-family: Arial, sans-serif; padding: 10px; text-align: left;">
        
                <h2 style="color: #0056b3; margin: 0;">Thank You for Contacting Us, ${username}!</h2>
        
                <p style="color: #333; font-size: 16px;">We have received your message:</p>
        
                <!-- Message card (left-aligned) -->
                <div style="padding: 15px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px;">
                    <p style="font-style: italic; color: #555; margin: 0;">"${message}"</p>
                </div>
        
                <p style="color: #333; font-size: 16px; margin-top: 20px;">Our team will get back to you as soon as possible.</p>
        
                <!-- Logo on left side of Best Regards -->
                <div style="display: flex; align-items: center; margin-top: 20px;">
                    <img src="cid:unique@logo" alt="INE INFOTECH Logo" style="max-width: 80px;object-fit: contain; margin-right: 10px;">
                    <div>
                        <strong style="color: #0056b3;">Best Regards,</strong><br>
                        INE INFOTECH
                    </div>
                </div>
        
            </div>
        `,
        
        
        };
        
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Message sent successfully" });

    } catch (error) {
        console.log("Error in sending message:", error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

module.exports = { contactForm };
