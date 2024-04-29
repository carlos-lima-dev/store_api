import nodemailer from "nodemailer";
import {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

// Configurar o transporte do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendEmail = (req: Request, res: Response) => {
  const {name, email, message} = req.body;
  const from = `"React E-commerce or Portfolio"`;
  const mailOptions = {
    from: from,
    to: "carloslima.dev32@gmail.com",
    subject: "Nova mensagem do formulário de contato",
    html: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333333;
          margin-bottom: 20px;
        }
        p {
          color: #666666;
          margin-bottom: 10px;
        }
        .message {
          border-left: 5px solid #007bff;
          padding-left: 10px;
        }
        .footer {
          margin-top: 20px;
          border-top: 1px solid #ccc;
          padding-top: 10px;
          text-align: center;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Nova mensagem do formulário de contato</h1>
        <p><strong>Nome:</strong>${name}</p>
        <p><strong>Email:</strong>  ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <div class="message">
          <p> ${message}</p>
        </div>
      </div>
      <div class="footer">
        <p>Este é um email automático, por favor, não responda.</p>
      </div>
    </body>
    </html>
    
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro ao enviar o email");
    } else {
      console.log("Email enviado: " + info.response);
      res.status(200).send("Email enviado com sucesso");
    }
  });
};
