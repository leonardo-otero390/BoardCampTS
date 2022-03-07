export interface Game {
  id?: number;
  name: string;
  image: string;
  stockTotal: number;
  categoryId: number;
  pricePerDay: number;
  categoryName?: string;
}
