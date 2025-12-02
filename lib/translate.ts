export async function translateText(text: string, dest: string) {
  const res = await fetch('http://localhost:5000/admin/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dest }),
  });
  if (!res.ok) throw new Error('Error al traducir');
  const data = await res.json();
  return data.translated as string;
}
