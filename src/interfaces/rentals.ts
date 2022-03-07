import { Game } from './games';
import { Customer } from './customers';
import { Category } from './categories';
import { RepositoriesFilters } from './repositoriesFilters';

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
export interface RentalFilters extends RepositoriesFilters {
  customerId?: number;
  gameId?: number;
}
