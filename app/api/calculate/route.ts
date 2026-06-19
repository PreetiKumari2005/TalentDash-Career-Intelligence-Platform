
import { NextResponse } from 'next/server';
import { calculateInHandSalary } from '@/lib/calculator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.annualCTC || isNaN(Number(body.annualCTC))) {
      return NextResponse.json({ error: 'Valid Annual CTC is required' }, { status: 400 });
    }

    const salaryReport = calculateInHandSalary(Number(body.annualCTC));
    return NextResponse.json({ success: true, data: salaryReport });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process breakdown parameters' }, { status: 500 });
  }
}