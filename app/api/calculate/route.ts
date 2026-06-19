// app/api/calculate/route.ts
import { NextResponse } from 'next/server';
import { calculateCareerMetrics, CalculationInput } from '@/lib/calculator';

export async function POST(request: Request) {
  try {
    const body: CalculationInput = await request.json();
    
    // Basic validation
    if (body.experienceYears === undefined || !body.skillMatchScore) {
      return NextResponse.json({ error: 'Missing required validation metrics' }, { status: 400 });
    }

    const report = calculateCareerMetrics(body);
    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process metrics computation' }, { status: 500 });
  }
}