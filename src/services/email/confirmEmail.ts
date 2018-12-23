import sgMail from '@sendgrid/mail';
const { NODE_ENV, SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

export const confirmEmail = async (to: string, link: string) => {
  const msg = {
    to,
    from: 'test@test.com',
    subject: 'Confirm Email',
    html:
      `<html>
      <head>
          <title>Confirm Email</title>
      </head>
      <body>
        <p>Hello,</p>
        <p>Please confirm your email by clicking the link below!</p>
        <br>
        <a href="${link}">Confirm email</a>
      </body>
    </html>`,
  };
  if (NODE_ENV === 'test') { return; }
  await sgMail.send(msg);
};
