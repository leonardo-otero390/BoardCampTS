export interface Category {
  id: number;
  name: string;
}
export interface Game {
  id?: number;
  name: string;
  image: string;
  stockTotal: number;
  categoryId: number;
  pricePerDay: number;
  categoryName?: string;
}
export interface Customer {
  id?: number;
  name: string;
  phone: string;
  cpf: string;
  birthday: string;
}
export interface Rental {
  id?: number;
  customerId: number;
  gameId: number;
  daysRented: number;
  rentDate?: Date;
  originalPrice: number;
}
