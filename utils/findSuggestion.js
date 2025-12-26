// Lightweight suggestion helper used by SubServicePageForm
function normalize(v){
  if (!v) return ''
  return String(v).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
}

function findSuggestion(base, handles){
  const b = normalize(base)
  if (!b) return null
  const set = new Set(handles.map(h=>String(h||'')).map(normalize))
  if (!set.has(b)) return b
  // collect used suffixes
  const used = new Set()
  const re = new RegExp('^' + b + '-(\\d+)$')
  set.forEach(h => {
    const m = h.match(re)
    if (m) used.add(parseInt(m[1],10))
  })
  // find smallest missing >=2
  for (let i=2;i<1000;i++){
    if (!used.has(i)) return `${b}-${i}`
  }
  return `${b}-1000`
}

module.exports = { findSuggestion, normalize }
