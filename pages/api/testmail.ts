import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Types & Interfaces 

interface Data{
    message: string,
    email: {
        email: string,
        message: string
    }
}

type BodyRequest = {
    email: string,
    message: string
}

type TestAccount = nodemailer.TestAccount;
type SMTPTransporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
type SendMessageInfo = SMTPTransport.SentMessageInfo;

// Test Mailer

export default async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    if(req.method === "POST"){    
        const body: BodyRequest = JSON.parse(req.body);
        console.log("Sent Email:", body);

        let testAccount: TestAccount  = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter: SMTPTransporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info: SendMessageInfo = await transporter.sendMail({
            from: body.email, // sender address
            to: "TesttheKid@example.com, TesttheKid@example.com", // list of receivers
            subject: "Customer Email", // Subject line
            text: body.message, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).json({ message: "Successfully Sent an Email...", email: body })
    }
}