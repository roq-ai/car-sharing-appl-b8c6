import * as yup from 'yup';

export const carMaintenanceValidationSchema = yup.object().shape({
  maintenance_date: yup.date().required(),
  maintenance_details: yup.string().required(),
  service_center: yup.string().required(),
  service_cost: yup.number().integer().required(),
  car_id: yup.string().nullable().required(),
});
