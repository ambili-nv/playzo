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