import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try{
    const data = await req.json();
    // En producción aquí integrarías un servicio de correo, base de datos, etc.
    console.log('Contacto recibido:', data);
    return NextResponse.json({ ok: true });
  }catch(err){
    console.error('Error en /api/contact', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
