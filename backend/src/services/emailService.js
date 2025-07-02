// backend/src/services/emailService.js

import nodemailer from 'nodemailer';
import config from '../config/environment.config.js';

// Create Transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465,
        auth: {
            user: config.email.user,
            pass: config.email.password
        }
    })
}

// Email templates
const templates = {
    'email-verification': (data) => ({
        subject: 'Verify Your GetMax Healthcare Account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Welcome to GetMax Healthcare!</h2>
                <p>Hi ${data.name},</p>
                <p>Thank you for registering with GetMax Healthcare. Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.verificationUrl}" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Verify Email Address
                    </a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
                <p>This verification link will expire in 24 hours.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    If you didn't create an account with GetMax Healthcare, please ignore this email.
                </p>
            </div>
        `
    }),

    'password-reset': (data) => ({
        subject: 'Reset Your GetMax Healthcare Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Password Reset Request</h2>
                <p>Hi ${data.name},</p>
                <p>We received a request to reset your password for your GetMax Healthcare account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.resetUrl}" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
                <p>This reset link will expire in ${data.expiresIn}.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                </p>
            </div>
        `
    }),

    'welcome': (data) => ({
        subject: 'Welcome to GetMax Healthcare!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Welcome to GetMax Healthcare!</h2>
                <p>Hi ${data.name},</p>
                <p>Welcome to GetMax Healthcare! We're excited to have you on board.</p>
                <p>Here's what you can do next:</p>
                <ul>
                    <li>Complete your profile</li>
                    <li>Explore our RCM services</li>
                    <li>Try our products like BET Tool and EBV Bot</li>
                    <li>Request a pricing estimate</li>
                </ul>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/dashboard" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Get Started
                    </a>
                </div>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'contact-confirmation': (data) => ({
        subject: 'Thank you for contacting GetMax Healthcare',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Thank You for Contacting Us!</h2>
                <p>Hi ${data.name},</p>
                <p>Thank you for reaching out to GetMax Healthcare regarding your <strong>${data.inquiryType.replace('-', ' ')}</strong>.</p>
                <p>We have received your inquiry and our team will review it promptly. You can expect to hear from us within 24 hours.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Reference ID:</strong> ${data.contactId}</p>
                    <p>Please keep this reference ID for your records.</p>
                </div>
                <p>In the meantime, feel free to explore our website to learn more about our RCM services and products.</p>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'demo-confirmation': (data) => ({
        subject: 'Demo Scheduled - GetMax Healthcare',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Your Demo is Scheduled!</h2>
                <p>Hi ${data.name},</p>
                <p>Great news! Your <strong>${data.demoType.replace('-', ' ')}</strong> has been scheduled.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Demo Details:</h3>
                    <p><strong>Date:</strong> ${data.demoDate}</p>
                    <p><strong>Time:</strong> ${data.demoTime}</p>
                    <p><strong>Type:</strong> ${data.demoType.replace('-', ' ')}</p>
                </div>
                <p>You will receive a calendar invitation and meeting link shortly. Please ensure you have a stable internet connection for the best experience.</p>
                <p>If you have any questions or need to reschedule, please contact us immediately.</p>
                <p>We look forward to showing you how GetMax Healthcare can transform your revenue cycle!</p>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'proposal-sent': (data) => ({
        subject: 'Proposal - GetMax Healthcare',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Your Custom Proposal is Ready!</h2>
                <p>Hi ${data.name},</p>
                <p>Thank you for your interest in GetMax Healthcare. We've prepared a custom <strong>${data.proposalType.replace('-', ' ')}</strong> specifically for your needs.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Proposal Summary:</h3>
                    <p><strong>Type:</strong> ${data.proposalType.replace('-', ' ')}</p>
                    <p><strong>Estimated Value:</strong> $${data.estimatedValue?.toLocaleString()}</p>
                    <p><strong>Valid Until:</strong> ${data.validUntil}</p>
                </div>
                <p>Our proposal includes detailed information about services, implementation timeline, and expected outcomes tailored to your specific requirements.</p>
                <p>We'd love to discuss this proposal with you in detail. Please let us know when you'd be available for a follow-up call.</p>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'pricing-estimate': (data) => ({
        subject: 'Your GetMax Healthcare Pricing Estimate',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Your Pricing Estimate is Ready!</h2>
                <p>Hi ${data.name},</p>
                <p>Thank you for using our pricing calculator. Based on the information you provided for <strong>${data.companyName}</strong>, here's your estimated pricing:</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Recommended Model: ${data.estimatedPricing?.recommendedModel || 'FTE'}</h3>
                    ${data.estimatedPricing?.fteModel ? `
                    <div style="margin: 15px 0;">
                        <h4>FTE Model:</h4>
                        <p>Monthly Cost: $${data.estimatedPricing?.fteModel?.monthlyCost?.toLocaleString?.() || 'N/A'}</p>
                        <p>Annual Cost: $${data.estimatedPricing.fteModel.annualCost?.toLocaleString()}</p>
                        <p>Staff Count: ${data.estimatedPricing.fteModel.staffCount} FTEs</p>
                    </div>
                    ` : ''}
                    ${data.potentialSavings?.annualSavings ? `
                    <div style="margin: 15px 0; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
                        <h4 style="color: #2d5a2d; margin-top: 0;">Potential Annual Savings: $${data.potentialSavings.annualSavings.toLocaleString()}</h4>
                        <p style="color: #2d5a2d;">Cost Reduction: ${data.potentialSavings.costReduction?.toFixed(1)}%</p>
                    </div>
                    ` : ''}
                </div>
                <p><strong>Reference ID:</strong> ${data.requestId}</p>
                <p>This is an automated estimate. Our team will review your requirements and may contact you with a more detailed, customized quote.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/contact" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Schedule a Consultation
                    </a>
                </div>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'custom-quote': (data) => ({
        subject: 'Your Custom Quote - GetMax Healthcare',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Your Custom Quote</h2>
                <p>Hi ${data.name},</p>
                <p>We've prepared a custom quote for <strong>${data.companyName}</strong> based on your specific requirements.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Quote Details:</h3>
                    <p><strong>Valid Until:</strong> ${data.validUntil}</p>
                    <p><strong>Reference ID:</strong> ${data.requestId}</p>
                    ${data.additionalNotes ? `<p><strong>Additional Notes:</strong> ${data.additionalNotes}</p>` : ''}
                </div>
                <p>This quote includes customized pricing based on your volume, requirements, and implementation timeline.</p>
                <p>Please review the attached detailed quote and let us know if you have any questions or would like to discuss next steps.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/contact" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Accept Quote
                    </a>
                </div>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    }),

    'newsletter-confirmation': (data) => ({
        subject: 'Confirm Your Newsletter Subscription - GetMax Healthcare',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Confirm Your Newsletter Subscription</h2>
                <p>Hi ${data.name || 'there'},</p>
                <p>Thank you for subscribing to the GetMax Healthcare newsletter! To complete your subscription, please confirm your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.confirmationUrl}" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Confirm Subscription
                    </a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #666;">${data.confirmationUrl}</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Your Newsletter Preferences:</h3>
                    <p><strong>Interests:</strong> ${data.interests?.join(', ') || 'RCM Updates, Industry News'}</p>
                </div>
                <p>This confirmation link will expire in 24 hours.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                    If you didn't subscribe to our newsletter, please ignore this email.
                </p>
            </div>
        `
    }),

    'newsletter-welcome': (data) => ({
        subject: 'Welcome to GetMax Healthcare Newsletter!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5932EA;">Welcome to Our Newsletter!</h2>
                <p>Hi ${data.name || 'there'},</p>
                <p>🎉 Welcome to the GetMax Healthcare newsletter! Your subscription has been confirmed and you're all set to receive our latest updates.</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">What to Expect:</h3>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Latest RCM industry insights and trends</li>
                        <li>Product updates and new feature announcements</li>
                        <li>Best practices and tips for revenue cycle optimization</li>
                        <li>Case studies and success stories</li>
                        <li>Exclusive webinar invitations and resources</li>
                    </ul>
                </div>
                <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2d5a2d;">Your Preferences:</h3>
                    <p style="color: #2d5a2d;"><strong>Interests:</strong> ${data.interests?.join(', ') || 'RCM Updates, Industry News'}</p>
                    <p style="color: #2d5a2d;"><strong>Frequency:</strong> ${data.frequency || 'Weekly'}</p>
                </div>
                <p>Want to update your preferences or unsubscribe? You can manage your subscription at any time using the links in our emails.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}" 
                       style="background-color: #5932EA; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Visit Our Website
                    </a>
                </div>
                <p>Thank you for joining our community!</p>
                <p>Best regards,<br>GetMax Healthcare Team</p>
            </div>
        `
    })
};

// Send email function
export const sendEmail = async ({ to, subject, template, data }) => {
    console.log('📧 Email Config:', {
        host: config.email.host,
        port: config.email.port,
        user: config.email.user,
        password: config.email.password ? '✅ SET' : '❌ MISSING'
    });

    // Fallback to console log if credentials are missing
    if (!config.email.user || !config.email.password) {
        console.warn('⚠ Email credentials missing. Logging email content to console instead.\n');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Body:', templates[template]?.(data).html || data?.html || data?.message);
        return { messageId: 'logged-locally' };
    }

    try {
        const transporter = createTransporter();

        console.log("📨 Sending email via:", transporter.options);
        await transporter.verify();

        let emailContent;
        if (template && templates[template]) {
            emailContent = templates[template](data);
            subject = emailContent.subject;
        }

        const mailOptions = {
            from: `"GetMax Healthcare" <${config.email.user}>`,
            to: to,
            subject: subject,
            html: emailContent?.html || data?.html || `<p>${data?.message || 'No content'}</p>`
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', result.messageId);
        return result;

    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw Error('Failed to send email');
    }
};

// Send bulk emails
export const sendBulkEmails = async (emails) => {
    const results = [];

    for (const email of emails) {
        try {
            const result = await sendEmail(email);
            results.push({ success: true, email: email.to, messageId: result.messageId });
        } catch (error) {
            results.push({ success: false, email: email.to, error: error.message });
        }
    }

    return results;
};

// Test email connection
export const testEmailConnection = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email server connection verified');
        return true;
    } catch (error) {
        console.error('❌ Email server connection failed:', error);
        return false;
    }
};