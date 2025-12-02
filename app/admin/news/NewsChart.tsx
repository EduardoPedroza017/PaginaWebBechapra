import { NewsItem } from "./NewsFilter";

interface Props {
  data: NewsItem[];
  theme: 'light' | 'dark';
}

export default function NewsChart({ data, theme }: Props) {
  // Agrupar noticias por día
  const counts: Record<string, number> = {};
  data.forEach(n => {
    const d = n.date.slice(0, 10);
    counts[d] = (counts[d] || 0) + 1;
  });
  const labels = Object.keys(counts).sort();
  const values = labels.map(l => counts[l]);

  // Simple bar chart SVG
  return (
    <div className={`rounded-xl p-4 shadow mb-8 ${theme === 'dark' ? 'bg-[#10192b]' : 'bg-white'}`}>
      <div className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Noticias por día</div>
      <svg width={Math.max(300, labels.length * 60)} height={180}>
        {values.map((v, i) => (
          <g key={i}>
            <rect
              x={40 + i * 60}
              y={150 - v * 30}
              width={30}
              height={v * 30}
              fill={theme === 'dark' ? '#60a5fa' : '#2563eb'}
            />
            <text x={55 + i * 60} y={145} textAnchor="middle" fontSize={14} fill={theme === 'dark' ? '#fff' : '#222'}>{v}</text>
            <text x={55 + i * 60} y={170} textAnchor="middle" fontSize={12} fill={theme === 'dark' ? '#fff' : '#222'}>{labels[i].slice(5)}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
