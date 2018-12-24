import Axios from 'axios';

const { URL } = process.env;

it('sends invalid if id is invalid', async () => {
  const res = await Axios.get(`${URL}/confirm/1`);
  expect(res.data).toBe('invalid');
});