import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(20),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Production: save to DB, send email notification to sales@tpkengineering.co.zw via Resend
    console.log('[Contact Form]', { from: data.email, subject: data.subject })

    return NextResponse.json(
      { success: true, message: 'Message received. We\'ll respond within 24 hours.' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 },
      )
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
