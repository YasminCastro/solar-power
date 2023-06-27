import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("O e-mail é obrigatório"),
  name: yup.string().required("O nome é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("A senha é obrigatório"),
  passwordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("A senha é obrigatório"),
});

export default registerSchema;
