export interface Branch {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  locationUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
