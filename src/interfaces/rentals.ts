import { Game } from './games';
import { Customer } from './customers';
import { Category } from './categories';

export interface Rental {
  id?: number;
  customerId: number;
  gameId: number;
  daysRented: number;
  rentDate?: Date;
  returnDate?: Date;
  originalPrice: number;
}
export interface RentalGameCustomer extends Rental, Game, Customer, Category {
  customerName: string;
  gameName: string;
}
export interface RentalFilters {
  customerId?: number;
  gameId?: number;
}
