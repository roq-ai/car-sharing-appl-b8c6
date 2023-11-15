import { ReviewInterface } from 'interfaces/review';
import { CarInterface } from 'interfaces/car';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  car_id: string;
  user_id: string;
  booking_status: string;
  pickup_location: string;
  dropoff_location: string;
  created_at?: any;
  updated_at?: any;
  review?: ReviewInterface[];
  car?: CarInterface;
  user?: UserInterface;
  _count?: {
    review?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  car_id?: string;
  user_id?: string;
  booking_status?: string;
  pickup_location?: string;
  dropoff_location?: string;
}
