import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  recipientEmail: string,
  invitationToken: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "impax.kmksh@gmail.com",
      pass: "cnnt aube maeq odwu",
    },
  });

  const mailOptions = {
    from: "impax.kmksh@gmail.com",
    to: recipientEmail,
    subject: "Verification Email",
    text: `Click the following link to verify your email: http://localhost:5000/accept-invitation/${invitationToken}`,
  };

  await transporter.sendMail(mailOptions);
}
