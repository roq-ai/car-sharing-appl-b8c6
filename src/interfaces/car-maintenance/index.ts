import { CarInterface } from 'interfaces/car';
import { GetQueryInterface } from 'interfaces';

export interface CarMaintenanceInterface {
  id?: string;
  maintenance_date: any;
  maintenance_details: string;
  car_id: string;
  service_center: string;
  service_cost: number;
  created_at?: any;
  updated_at?: any;

  car?: CarInterface;
  _count?: {};
}

export interface CarMaintenanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  maintenance_details?: string;
  car_id?: string;
  service_center?: string;
}
