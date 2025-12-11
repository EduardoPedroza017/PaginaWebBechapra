// Estados y ciudades principales de México
export const mexicoStates = [
  { code: "AGU", name: "Aguascalientes" },
  { code: "BCN", name: "Baja California" },
  { code: "BCS", name: "Baja California Sur" },
  { code: "CAM", name: "Campeche" },
  { code: "CHP", name: "Chiapas" },
  { code: "CHH", name: "Chihuahua" },
  { code: "COA", name: "Coahuila" },
  { code: "COL", name: "Colima" },
  { code: "CMX", name: "Ciudad de México" },
  { code: "DUR", name: "Durango" },
  { code: "GUA", name: "Guanajuato" },
  { code: "GRO", name: "Guerrero" },
  { code: "HID", name: "Hidalgo" },
  { code: "JAL", name: "Jalisco" },
  { code: "MEX", name: "Estado de México" },
  { code: "MIC", name: "Michoacán" },
  { code: "MOR", name: "Morelos" },
  { code: "NAY", name: "Nayarit" },
  { code: "NLE", name: "Nuevo León" },
  { code: "OAX", name: "Oaxaca" },
  { code: "PUE", name: "Puebla" },
  { code: "QUE", name: "Querétaro" },
  { code: "ROO", name: "Quintana Roo" },
  { code: "SLP", name: "San Luis Potosí" },
  { code: "SIN", name: "Sinaloa" },
  { code: "SON", name: "Sonora" },
  { code: "TAB", name: "Tabasco" },
  { code: "TAM", name: "Tamaulipas" },
  { code: "TLA", name: "Tlaxcala" },
  { code: "VER", name: "Veracruz" },
  { code: "YUC", name: "Yucatán" },
  { code: "ZAC", name: "Zacatecas" },
];

// Ciudades principales por estado
export const citiesByState: Record<string, string[]> = {
  AGU: ["Aguascalientes", "Jesús María", "Calvillo", "Rincón de Romos", "San Francisco de los Romo"],
  BCN: ["Tijuana", "Mexicali", "Ensenada", "Rosarito", "Tecate", "San Quintín"],
  BCS: ["La Paz", "Los Cabos", "San José del Cabo", "Cabo San Lucas", "Loreto", "Ciudad Constitución"],
  CAM: ["Campeche", "Ciudad del Carmen", "Champotón", "Escárcega", "Calkiní"],
  CHP: ["Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Tapachula", "Comitán", "Palenque", "Chiapa de Corzo"],
  CHH: ["Chihuahua", "Ciudad Juárez", "Delicias", "Cuauhtémoc", "Parral", "Nuevo Casas Grandes"],
  COA: ["Saltillo", "Torreón", "Monclova", "Piedras Negras", "Acuña", "Sabinas"],
  COL: ["Colima", "Manzanillo", "Tecomán", "Villa de Álvarez", "Armería"],
  CMX: ["Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "Magdalena Contreras", "Miguel Hidalgo", "Milpa Alta", "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"],
  DUR: ["Durango", "Gómez Palacio", "Lerdo", "Santiago Papasquiaro", "Canatlán"],
  GUA: ["León", "Irapuato", "Celaya", "Salamanca", "Guanajuato", "San Miguel de Allende", "Silao", "Dolores Hidalgo"],
  GRO: ["Acapulco", "Chilpancingo", "Iguala", "Taxco", "Zihuatanejo", "Chilapa"],
  HID: ["Pachuca", "Tulancingo", "Tula", "Huejutla", "Actopan", "Tizayuca"],
  JAL: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta", "Tlajomulco", "Lagos de Moreno", "Tepatitlán"],
  MEX: ["Toluca", "Ecatepec", "Naucalpan", "Tlalnepantla", "Nezahualcóyotl", "Cuautitlán Izcalli", "Atizapán", "Metepec", "Huixquilucan", "Texcoco"],
  MIC: ["Morelia", "Uruapan", "Lázaro Cárdenas", "Zamora", "Apatzingán", "Zitácuaro", "Pátzcuaro"],
  MOR: ["Cuernavaca", "Jiutepec", "Cuautla", "Temixco", "Yautepec", "Emiliano Zapata"],
  NAY: ["Tepic", "Bahía de Banderas", "Santiago Ixcuintla", "Compostela", "Tuxpan"],
  NLE: ["Monterrey", "San Pedro Garza García", "San Nicolás de los Garza", "Guadalupe", "Apodaca", "Santa Catarina", "Escobedo"],
  OAX: ["Oaxaca de Juárez", "Salina Cruz", "Juchitán", "Tuxtepec", "Huatulco", "Puerto Escondido"],
  PUE: ["Puebla", "Tehuacán", "San Martín Texmelucan", "Atlixco", "Cholula", "Huauchinango"],
  QUE: ["Querétaro", "San Juan del Río", "El Marqués", "Corregidora", "Tequisquiapan"],
  ROO: ["Cancún", "Playa del Carmen", "Chetumal", "Cozumel", "Tulum", "Felipe Carrillo Puerto"],
  SLP: ["San Luis Potosí", "Soledad de Graciano Sánchez", "Ciudad Valles", "Matehuala", "Rioverde"],
  SIN: ["Culiacán", "Mazatlán", "Los Mochis", "Guasave", "Navolato", "Guamúchil"],
  SON: ["Hermosillo", "Ciudad Obregón", "Nogales", "San Luis Río Colorado", "Guaymas", "Navojoa"],
  TAB: ["Villahermosa", "Cárdenas", "Comalcalco", "Paraíso", "Macuspana", "Tenosique"],
  TAM: ["Reynosa", "Matamoros", "Nuevo Laredo", "Tampico", "Ciudad Victoria", "Ciudad Madero"],
  TLA: ["Tlaxcala", "Apizaco", "Huamantla", "San Pablo del Monte", "Chiautempan"],
  VER: ["Veracruz", "Xalapa", "Coatzacoalcos", "Córdoba", "Orizaba", "Poza Rica", "Boca del Río", "Minatitlán"],
  YUC: ["Mérida", "Valladolid", "Tizimín", "Progreso", "Kanasín", "Umán"],
  ZAC: ["Zacatecas", "Fresnillo", "Guadalupe", "Jerez", "Río Grande", "Loreto"],
};

// Obtener todas las ciudades de un estado
export function getCitiesByState(stateCode: string): string[] {
  return citiesByState[stateCode] || [];
}

// Obtener el nombre del estado por código
export function getStateName(stateCode: string): string {
  const state = mexicoStates.find(s => s.code === stateCode);
  return state?.name || stateCode;
}
