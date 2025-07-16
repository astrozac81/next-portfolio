import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, social, email } = body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
      to: "isaac.laurent77@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL!, // Must be verified with SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSocial: ${social}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Social:</strong> ${social}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    await sgMail.send(msg);
    return NextResponse.json("Success!");
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
