import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the BSC RPC endpoint
    const response = await fetch('https://data-seed-prebsc-1-s1.binance.org:8545/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('RPC proxy error:', error);
    return NextResponse.json({ error: 'RPC request failed' }, { status: 500 });
  }
} 