export interface LocationData {
  address: string;
  colonia?: string;
  municipality?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const companyLocation: LocationData = {
  address: "Av. Paseo de la Reforma 505",
  colonia: "Cuauhtémoc",
  municipality: "Cuauhtémoc",
  city: "Ciudad de México",
  state: "CDMX",
  country: "México",
  zipCode: "06500",
  phone: "+52 55 1234 5678",
  email: "contacto@bechapra.com",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=19.4326,-99.1332",
  coordinates: {
    lat: 19.4326,
    lng: -99.1332,
  },
};
