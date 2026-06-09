const request = require('supertest');
const app = require('../src/app');

describe('Cellphones API', () => {
  test('POST /api/cellphones should create a cellphone and return 201', async () => {
    const payload = { marca: 'MarcaX', modelo: 'ModelY', cor: 'Preto', preco: 1999 };

    const res = await request(app).post('/api/cellphones').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.marca).toBe(payload.marca);
  });

  test('GET /api/cellphones/:id should return 200 for existing id', async () => {
    // First create
    const payload = { marca: 'MarcaA', modelo: 'ModelB', cor: 'Branco', preco: 999 };
    const createRes = await request(app).post('/api/cellphones').send(payload);
    const id = createRes.body.id;

    const getRes = await request(app).get(`/api/cellphones/${id}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(id);
  });
});
