import nodemailer from "nodemailer";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const emailtaufik = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: emailtaufik,
        pass: pass,
    },
});

const SENDMAIL = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

app.post('/email/send', async (req, res) => {

    var nama = req.body.nama;
    var email = req.body.email;
    var notelp = req.body.notelp;
    var paket = req.body.paket;
    var alamat = req.body.alamat;

    const message = "PELANGGAN BARU PRISMA"
    const options = {
        from: "PRISMA SSN <sender@gmail.com>", // sender address
        to: "taufiklah87@gmail.com", // receiver email
        subject: "PELANGGAN BARU PRISMA", // Subject line
        text: nama,
        html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>Pelanggan Baru PRISMA</h2> <div class="form-container"> <h3 class="form-heading" align="left">Nama Lengkap</h3><p class="form-answer" align="left">${nama}</p> <h3 class="form-heading" align="left">Email</h3><p class="form-answer" align="left">${email}</p> <h3 class="form-heading" align="left">Nomor Telpon</h3><p class="form-answer" align="left">${notelp}</p> <h3 class="form-heading" align="left">Paket</h3><p class="form-answer" align="left">${paket}</p> <h3 class="form-heading" align="left">Alamat Lengkap</h3><p class="form-answer" align="left">${alamat}</p> </div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
    }

    await SENDMAIL(options, (info) => {
        console.log("Email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
    });
    res.status(200);
});

app.listen(3000, (error) => {
    console.log("Jalan")
}
);
