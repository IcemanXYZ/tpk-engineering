import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const serviceRequestSchema = z.object({
  registrationNumber: z.string().min(3),
  fleetId: z.string().optional(),
  priority: z.enum(['breakdown', 'scheduled', 'inspection']),
  faultDescription: z.string().min(10),
  locationDescription: z.string().min(5),
  contactName: z.string().min(2),
  contactPhone: z.string().min(8),
  contactEmail: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = serviceRequestSchema.parse(body)

    const ticketId = `SR-${Date.now().toString(36).toUpperCase()}`

    // Production:
    // 1. Create ticket in field service management system
    // 2. Dispatch SMS to on-call technician (breakdown priority)
    // 3. Send confirmation SMS/email to customer
    // 4. Log to Supabase service_requests table

    console.log('[Service Request]', {
      ticket: ticketId,
      priority: data.priority,
      vehicle: data.registrationNumber,
      location: data.locationDescription,
    })

    return NextResponse.json(
      {
        success: true,
        ticketId,
        message: `Service request ${ticketId} logged. Our team will contact you shortly.`,
        estimatedResponse:
          data.priority === 'breakdown' ? '1–2 hours' : '24 hours',
      },
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
