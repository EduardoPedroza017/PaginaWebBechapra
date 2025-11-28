'use client';

import { useState } from 'react';
import { translateText } from '@/lib/translate';

export default function TranslateExample() {
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const result = await translateText(input, lang);
      setTranslated(result);
    } catch {
      setTranslated('Error al traducir');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Ejemplo de Traducción</h2>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Texto a traducir"
        rows={3}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <div>
        <label>Idioma destino:&nbsp;
          <select value={lang} onChange={e => setLang(e.target.value)}>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
            <option value="pt">Portugués</option>
            <option value="es">Español</option>
          </select>
        </label>
      </div>
      <button onClick={handleTranslate} disabled={loading || !input} style={{ marginTop: 8 }}>
        {loading ? 'Traduciendo...' : 'Traducir'}
      </button>
      <div style={{ marginTop: 16 }}>
        <strong>Traducción:</strong>
        <div style={{ background: '#f9f9f9', padding: 8, borderRadius: 4, minHeight: 40 }}>
          {translated}
        </div>
      </div>
    </div>
  );
}