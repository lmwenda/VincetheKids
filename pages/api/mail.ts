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

// Test Mailer

export default async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    if(req.method === "POST"){    
        const body: BodyRequest = JSON.parse(req.body);
        console.log("Sent Email:", body);

        // create reusable transporter object using the default SMTP transport
        let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
            service: "hotmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info: SMTPTransport.SentMessageInfo = await transporter.sendMail({
            from: body.email, // sender address
            to: process.env.EMAIL_USERNAME, // list of receivers
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