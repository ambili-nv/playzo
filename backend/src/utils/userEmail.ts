export const otpEmail = (otp:string, name:string)=>{
    return `

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .otp {
            font-size: 24px;
            color: #333333;
            text-align: center;
            margin: 20px 0;
        }
        .message {
            text-align: center;
            color: #666666;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>OTP Verification</h1>
        </div>
        <div class="message">
            <p>Dear ${name},</p>
            <p>Please use the following OTP to verify your email address.</p>
        </div>
        <div class="otp">
            <p><strong>${otp}</strong></p>
        </div>
        <div class="message">
            <p>This OTP is valid for the next 2 minutes.</p>
        </div>
        <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; 2024 plazo</p>
        </div>
    </div>
</body>
</html>

    `
}




export const forgotPasswordEmail = (name: string, verificationCode: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                        <tr>
                            <td align="center" bgcolor="#007bff" style="padding: 40px 0;">
                                <h1 style="color: #ffffff;">Password Reset</h1>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 30px;">
                                <p>Dear ${name},</p>
                                <p>We have received a request to reset your password. To reset your password, click the button below:</p>
                                <p style="text-align: center;">
                                    <a href="http://localhost:5173/reset-password/${verificationCode}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                                </p>
                                <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
                                <p>Thank you for using our service!</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" style="text-align: center; padding: 20px 0;">
                                <p>&copy; 2023 Craftopia</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
};
  


export const venueAcceptanceEmail = (ownerEmail: string, venueName: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Your CSS styles for the email template */
            </style>
        </head>
        <body>
            <div>
                <h2>Venue Accepted</h2>
                <p>Dear Owner,</p>
                <p>Your venue "${venueName}" has been accepted by the admin.</p>
                <p>Regards,<br>The Admin Team</p>
            </div>
        </body>
        </html>
    `;
};


export const venueRejectionEmail = (ownerEmail: string, venueName: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Your CSS styles for the email template */
            </style>
        </head>
        <body>
            <div>
                <h2>Venue Rejected</h2>
                <p>Dear Owner,</p>
                <p>Unfortunately, your venue "${venueName}" has been rejected by the admin.</p>
                <p>Regards,<br>The Admin Team</p>
            </div>
        </body>
        </html>
    `;
};