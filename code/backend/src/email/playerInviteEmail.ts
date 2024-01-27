import nodemailer from "nodemailer";

export async function sendInvitationEmail(
    fullName: string,
    recipientEmail: string,
    invitationToken: string,
    teamName: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "impax.kmksh@gmail.com",
      pass: "cnnt aube maeq odwu",
    },
  });

  const signature = "IMPAX TEAM";

  // <a href="http://16.170.235.219:5000/accept-invitation/${invitationToken}">Verify Email Here</a><br><br>
  const mailOptions = {
    from: "impax.kmksh@gmail.com",
    to: recipientEmail,
    subject: "Invitation Email",
    html: `
    <p>Hello ${fullName},</p>
    
    <p>You've been invited to join the team ${teamName}! Click the following link to accept the invitation:</p>
    
    <a href="http://16.170.235.219:5000/player/accept-invitation/token/${invitationToken}" 
    style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; 
    text-decoration: none; border-radius: 5px;">Accept Invitation</a><br><br>
    
    <div>
      <img src="cid:Impax" alt="Impax Team" style="width: 100px; height: auto; max-width: 100%;" />
    </div>
    <p><i><b>${signature}</b></i></p>
    
  `,
    attachments: [
      {
        filename: "Impax.jpeg",
        path: "./asserts/Impax.jpeg",
        cid: "Impax", // same cid value as in the html img src
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("email sent successfully");
}
