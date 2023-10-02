import * as yup from "yup";

const newInverterSchema = yup.object().shape({
  name: yup.string().required("O nome não pode ser vazio"),
  cep: yup.string().required("O CEP não pode ser vazio"),
  maxRealTimePower: yup.number().default(10),
});

export default newInverterSchema;
