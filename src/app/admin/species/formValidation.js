import * as yup from 'yup';

export default yup.object().shape({
  common_name: yup.string().required().min(3).max(50),
  scientific_name: yup.string(),
  category: yup.string(),
  description: yup.string().required().min(3).max(500),
})