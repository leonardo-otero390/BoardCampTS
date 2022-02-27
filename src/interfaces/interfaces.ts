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
}
