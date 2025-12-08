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

export interface Message {
  type: "success" | "error";
  text: string;
}
