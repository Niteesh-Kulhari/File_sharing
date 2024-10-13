import { NextResponse } from 'next/server';
import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req) {
  const res = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@nkulhari.com',
      to: [`${res.emailToSend}`],
      subject: res?.userName + " shared a file with you",
      react: EmailTemplate({ res }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
