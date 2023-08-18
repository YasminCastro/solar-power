export default {
  key: 'SolarData',
  options: {},
  async handle({ data }) {
    try {
      console.log('TESTE');
      console.log(data);
      return Promise.resolve('Ok');
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
};
