import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  name: yup.string().required(),
});
