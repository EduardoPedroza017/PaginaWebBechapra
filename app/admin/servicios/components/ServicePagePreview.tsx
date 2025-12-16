import React from 'react'

interface Benefit { title: string; description?: string; icon?: string; image?: string }

interface Props {
  handle?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  benefits?: Benefit[]
  theme?: 'dark' | 'light'
}

export const ServicePagePreview: React.FC<Props> = ({ heroTitle, heroSubtitle, heroImage, benefits = [], theme = 'dark' }) => {
  return (
    <div className={`w-full rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#071123] text-white' : 'bg-white text-gray-900'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 items-center">
        <div>
          <p className="inline-block text-sm bg-slate-800/60 px-3 py-1 rounded-full mb-3">Servicio Premium</p>
          <h2 className="text-4xl font-extrabold leading-tight mb-3">
            {heroTitle || 'Título del servicio'}
          </h2>
          <p className="text-slate-300 max-w-lg">{heroSubtitle || 'Subtítulo o introducción del servicio que aparece en el hero.'}</p>
          <div className="mt-6">
            <button className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold">Contactar a Bechapra</button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {heroImage ? (
            <img src={heroImage} alt="hero" className="w-[420px] h-[260px] object-cover rounded-2xl shadow-2xl" />
          ) : (
            <div className="w-[420px] h-[260px] bg-slate-800/40 rounded-2xl flex items-center justify-center">Sin imagen</div>
          )}
        </div>
      </div>

      {benefits.length > 0 && (
        <div className="p-6 border-t border-slate-700">
          <h3 className="text-2xl font-bold mb-4">Beneficios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-900/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white">{b.icon ? <img src={b.icon} alt="icon" className="w-6 h-6" /> : '✓'}</div>
                  <div>
                    <h4 className="font-semibold">{b.title}</h4>
                    <p className="text-sm text-slate-300">{b.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicePagePreview
