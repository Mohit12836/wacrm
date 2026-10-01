import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try fetching from local QR service if running
    const res = await fetch('http://127.0.0.1:4100/status', {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json({
        status: 'offline',
        qr: null,
        message: 'Local QR Engine is offline. Start the service using start_qr_agent.bat on your PC.',
      });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      status: 'offline',
      qr: null,
      message: 'Local QR Engine is offline. Start the service using start_qr_agent.bat on your PC.',
    });
  }
}
