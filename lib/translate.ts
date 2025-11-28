// lib/translate.ts
export async function translateText(text: string, dest: string) {
  const res = await fetch('http://127.0.0.1:8000/translate/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dest }),
  });
  if (!res.ok) throw new Error('Error al traducir');
  const data = await res.json();
  return data.translated_text as string;
}