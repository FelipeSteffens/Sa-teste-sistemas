const request = require('supertest');
const app = require('../src/app');

const uniqueEmail = (prefix) => `${prefix}-${Date.now()}-${Math.random()}@gmail.com`;

describe('API Usuarios', () => {
  describe('POST /api/users/register', () => {
    test('Deve criar um usuario com sucesso e retornar 201', async () => {
      const payload = { nome: 'victor', email: uniqueEmail('victor'), senha: 'P123' };

      const res = await request(app)
        .post('/api/users/register')
        .send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject(payload);
    });
  });

  describe('Operacoes com IDs', () => {
    let idExistente;
    let payloadBase;
    const idInexistenteInofensivo = 999999;

    beforeEach(async () => {
      payloadBase = {
        nome: 'jose',
        email: uniqueEmail('jose'),
        senha: 'P123',
      };

      const createRes = await request(app)
        .post('/api/users/register')
        .send(payloadBase);

      idExistente = createRes.body.id;
    });

    describe('GET /api/users/listar/:id', () => {
      test('Deve retornar 200 e o usuario correspondente para um ID existente', async () => {
        const getRes = await request(app).get(`/api/users/listar/${idExistente}`);

        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.id).toBe(idExistente);
        expect(getRes.body).toMatchObject(payloadBase);
      });

      test('Deve retornar 404 caso o usuario nao seja encontrado', async () => {
        const res = await request(app).get(`/api/users/listar/${idInexistenteInofensivo}`);
        expect(res.statusCode).toBe(404);
      });
    });

    describe('PUT /api/users/atualizar/:id', () => {
      test('Deve atualizar um usuario existente e retornar 200 com os dados atualizados', async () => {
        const updatedPayload = {
          nome: 'lucas',
          email: uniqueEmail('lucas'),
          senha: 'P123',
        };

        const updateRes = await request(app)
          .put(`/api/users/atualizar/${idExistente}`)
          .send(updatedPayload);

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toMatchObject(updatedPayload);

        const getRes = await request(app).get(`/api/users/listar/${idExistente}`);
        expect(getRes.body).toMatchObject(updatedPayload);
      });

      test('Deve retornar 404 ao tentar atualizar um usuario inexistente', async () => {
        const updatedPayload = {
          nome: 'lucasV',
          email: uniqueEmail('lucasv'),
          senha: 'P123',
        };

        const res = await request(app)
          .put(`/api/users/atualizar/${idInexistenteInofensivo}`)
          .send(updatedPayload);

        expect(res.statusCode).toBe(404);
      });
    });

    describe('DELETE /api/users/deletar/:id', () => {
      test('Deve deletar um usuario existente e retornar 204; depois GET deve retornar 404', async () => {
        const deleteRes = await request(app).delete(`/api/users/deletar/${idExistente}`);

        expect(deleteRes.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/users/listar/${idExistente}`);
        expect(getRes.statusCode).toBe(404);
      });

      test('Deve retornar 404 ao tentar deletar um usuario inexistente', async () => {
        const res = await request(app).delete(`/api/users/deletar/${idInexistenteInofensivo}`);
        expect(res.statusCode).toBe(404);
      });
    });
  });
});
