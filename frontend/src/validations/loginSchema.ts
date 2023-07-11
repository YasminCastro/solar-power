import * as yup from "yup";

const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("O email não pode ser vazio")
    .email("Digite um email válido"),
  password: yup.string().required("A senha não pode ser vazia"),
});

export default fieldValidationSchema;
