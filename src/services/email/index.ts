const nodemailer = require("nodemailer");
import { email as emailConfig } from "../../../config";

interface Send {
  from: { name: string; email: string };
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport(emailConfig);

async function send(data: Send) {
  const { subject, text, html } = data;
  const to = Array.isArray(data.to) ? data.to.join(",") : data.to;
  const from = `"${data.from.name}" <${emailConfig.auth.user}>`;
  const replyTo = `"${data.from.name}" <${data.from.email}>`;

  transporter.sendMail({ from, replyTo, to, subject, text, html });
}

export default { send };
