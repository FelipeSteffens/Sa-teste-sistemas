const request = require('supertest');
const app = require('../src/app');

describe('API Celulares', () => {
 
  describe('POST /api/cellphones', () => {
    test('Deve criar um celular com sucesso e retornar 201', async () => {
      const payload = { marca: 'MarcaX', modelo: 'ModelY', cor: 'Preto', preco: 1999, descricao: 'Celular de teste' };

      const res = await request(app)
        .post('/api/cellphones/criar')
        .send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      
      expect(res.body).toMatchObject(payload);
    });
  });

  describe('GET /api/cellphones/:id', () => {
    test('Deve retornar 200 e o celular correspondente para um ID existente', async () => {
      const payload = { marca: 'MarcaA', modelo: 'ModelB', cor: 'Branco', preco: 999, descricao: 'Celular de teste' };
      const createRes = await request(app).post('/api/cellphones/criar').send(payload);
      const { id } = createRes.body;

      const getRes = await request(app).get(`/api/cellphones/listar/${id}`);
      
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body.id).toBe(id);
      expect(getRes.body).toMatchObject(payload);
    });

    test('Deve retornar 404 caso o celular não seja encontrado', async () => {
      const idInexistente = 9999; 
      const res = await request(app).get(`/api/cellphones/listar/${idInexistente}`);
      
      expect(res.statusCode).toBe(404);
    });
  });
});