const nodemailer = require("nodemailer");
const email = process.env.EMAILSMTP;
const password = process.env.PWDSMTP;

const authRegistOperator = async (penerima, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    await transporter.sendMail({
      from: "noreply",
      to: penerima,
      subject: "Kode Verifikasi Operator FSS Krenova",
      html: `
        <p>Klik button <b>Verifikasi</b> di bawah ini untuk memverifikasi akun Anda.</p>
    
        <a href="${link}" 
           style="display: inline-block; padding: 10px 20px; background-color: #28a745; 
                  color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Verifikasi
        </a>
    
        <p style="margin-top: 20px;">Jika terjadi masalah, maka klik link di bawah:</p>
        <a href="${link}">${link}</a>
    
        <p><b>Link verifikasi berlaku selama 3 menit!</b></p>
      `,
    });

    console.log("Email Berhasil dikirim!");
    return true;
  } catch (error) {
    console.error("Error Models Mail/authOperator :", error);
    throw error;
  }
};

module.exports = authRegistOperator;
