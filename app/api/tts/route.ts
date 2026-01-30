import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

    if (!DEEPGRAM_API_KEY) {
      console.error('ERROR: DEEPGRAM_API_KEY is missing in .env.local');
      return NextResponse.json({ error: 'API key missing' }, { status: 401 });
    }

    // Using "Orion" (English Male) - Very crisp and professional for AI
    // Other options: 'aura-helios-en' (Male), 'aura-stella-en' (Female)
    const voice = 'aura-athena-en'; 

    const response = await fetch(
      `https://api.deepgram.com/v1/speak?model=${voice}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepgram API Error Details:', errorText);
      throw new Error('Deepgram API error');
    }

    const arrayBuffer = await response.arrayBuffer();
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}
