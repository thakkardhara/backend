const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;

        await Contact.create({ username, email, message });
        const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        
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
           <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa; border-radius: 10px; text-align: left; max-width: 700px; margin: auto; border: 1px solid #ddd;">
    
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 10px;">
        <img src="cid:unique@logo" alt="INE INFOTECH Logo" style="width: 140px; height: 100px; object-fit: contain;">
    </div>
    
    <h2 style="color: #0056b3;text-align: center; margin-bottom: 10px;">Thank You for Contacting INE INFOTECH!</h2>

    <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
       Dear <strong>${formattedUsername}</strong>, We have received your message and will get back to you as soon as possible.
    </p>

    <!-- Message Card -->
    <div style="background: #fff; padding: 15px; border-left: 5px solid #0056b3; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: left;">
        <p style="font-style: italic; color: #555; margin: 0;">"${message}"</p>
    </div>

    <p style="color: #333; font-size: 16px; margin-top: 20px;">
        If you have any urgent queries, feel free to reply to this email.
    </p>

    <!-- Signature -->
    <div style="margin-top: 20px; text-align: left;">
        <strong style="color: #0056b3; font-size: 18px;">Best Regards,</strong><br>
        <span style="font-size: 16px; color: #333;">INE INFOTECH Team</span>
            <p style="color: #333; font-size: 14px; margin: 5px 0;">
             <strong>Address:</strong> 407, 4th Floor, Hrishikesh 2,<br> Opp. Navrangpura, Ahmedabad - 380009
        </p>
    </div>

    <!-- Contact Details Section -->
    <div style="margin-top: 30px; padding-top: 15px; text-align: center;">
        <table style="width: 100%; font-size: 14px; color: #333; border-spacing: 0;">
            <tr>
                <td style="text-align: center; padding: 5px;">
                    📧 <strong>Email:</strong> <a href="mailto:jay@ineinfotech.com" style="color: #0056b3; text-decoration: none;">jay@ineinfotech.com</a>
                </td>
                <td style="text-align: center; padding: 5px;">
                    | 
                </td>
                <td style="text-align: center; padding: 5px;">
                    📞 <strong>Phone:</strong> <a href="tel:+916299097431" style="color: #0056b3; text-decoration: none;">+91 6299097431</a>
                </td>
                <td style="text-align: center; padding: 5px;">
                    | 
                </td>
                <td style="text-align: center; padding: 5px;">
            🌐 <strong>Website:</strong> <a href="https://ineinfotech.com" target="_blank" style="color: #0056b3; text-decoration: none;">ineinfotech.com</a>
                 
                </td>
            </tr>
        </table>
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
