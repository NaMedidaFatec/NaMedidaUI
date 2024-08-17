import * as Yup from 'yup';

const UserValidation = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório'),
});

export default UserValidation;
