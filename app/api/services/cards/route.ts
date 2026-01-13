import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    // For now, return empty array to avoid 404 logs
    // This can be updated when the backend endpoint is implemented
    const services: any[] = [];

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error in services/cards API:', error);
    // Return empty array on error to avoid breaking the frontend
    return NextResponse.json([]);
  }
}