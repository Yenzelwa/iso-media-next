import { NextResponse } from 'next/server';

export async function parseJson(req: Request) {
  try {
    return await req.json();
  } catch (error) {
    throw new Error('Invalid JSON in request body');
  }
}

export function json(data: unknown, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(code: string, message: string, details: Record<string, unknown> = {}, status: number = 400) {
  return NextResponse.json({
    error: { code, message, details }
  }, { status });
}