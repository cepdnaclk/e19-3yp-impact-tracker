import nodemailer from "nodemailer";

export async function sendInvitationEmail(
  recipientEmail: string,
  invitationToken: string
): Promise<void> {

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    service: "gmail",
    auth: {
      user: "impax.kmksh@gmail.com",
      pass: "cnnt aube maeq odwu",
    },
  });

  // Compose the email
  const mailOptions = {
    from: "impax.kmksh@gmail.com",
    to: recipientEmail,
    subject: "Invitation to join the team",
    text: `Click the following link to accept the invitation: https://5000/accept-invitation/${invitationToken}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
