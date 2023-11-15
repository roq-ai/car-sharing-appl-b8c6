import { BookingInterface } from 'interfaces/booking';
import { CarMaintenanceInterface } from 'interfaces/car-maintenance';
import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  make: string;
  model?: string;
  year: number;
  color?: string;
  license_plate: string;
  owner_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  car_maintenance?: CarMaintenanceInterface[];
  review?: ReviewInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
    car_maintenance?: number;
    review?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  color?: string;
  license_plate?: string;
  owner_id?: string;
}
