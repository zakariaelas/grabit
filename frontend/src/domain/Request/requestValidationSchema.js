import * as yup from 'yup';

const validationSchema = yup.object().shape({
  // from: yup
  //   .string()
  //   .trim()
  //   .nullable()
  //   .required('You must enter a valid pick up address'),
  // destination: yup
  //   .string()
  //   .nullable()
  //   .required('You must enter a valid destination address'),
  description: yup.string().nullable(),
  minBudget: yup
    .number()
    .typeError('Enter a number')
    .min(0, 'Minimum budget cannot be negative'),
  maxBudget: yup
    .number()
    .typeError('Enter a number')
    .min(
      yup.ref('minBudget'),
      'Max budget cannot be less than min budget',
    ),
  date: yup
    .date()
    .typeError('You must enter a valid date')
    .required('You must enter a valid date'),
  schedule: yup.string(),
  items: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required('You must enter a valid item'),
      }),
    )
    .required('Not valid'),
});

export default validationSchema;
