import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const quoteSchema = z.object({
  productCategory: z.string().min(1),
  quantity: z.coerce.number().min(1).max(500),
  payloadRequirement: z.string().min(1),
  deliveryTimeline: z.string().min(1),
  customRequirements: z.string().optional(),
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  country: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = quoteSchema.parse(body)

    // In production: save to Supabase, trigger CRM webhook, send confirmation email via Resend
    // await supabase.from('quote_requests').insert({ ...data, status: 'new', created_at: new Date().toISOString() })
    // await sendQuoteConfirmationEmail(data.email, data.name, data.productCategory)

    console.log('[Quote Request]', {
      to: data.email,
      company: data.company,
      product: data.productCategory,
      qty: data.quantity,
    })

    return NextResponse.json(
      { success: true, message: 'Quote request received. Our team will contact you within 24 hours.' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 },
      )
    }
    console.error('[API /quote]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    )
  }
}
