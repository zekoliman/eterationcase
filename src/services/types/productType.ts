export interface ProductResponse {
  id: string;
  name: string;
  createdAt: string;
  image: string;
  price: string;
  model: string;
  brand: string;
  description: string;
}

export interface ErrorMessageTypes {
  title: string;
  description: string;
}
