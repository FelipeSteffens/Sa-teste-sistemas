const request = require('supertest');
const app = require('../src/app');

describe('API Usuários', () => {

  describe('POST /api/users/register', () => {
    test('Deve criar um usuario com sucesso e retornar 201', async () => {
      const payload = { nome: 'victor', email: 'victor@gmail.com', senha: 'P123'};

      const res = await request(app)
        .post('/api/users/register')
        .send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject(payload);
    });
  });

  describe('Operações com IDs', () => {
    let idExistente;
    const payloadBase = { nome: 'josé', email: 'josé@gmail.com', senha: 'P123'};
    const idInexistenteInofensivo = 999999; 

  
    beforeEach(async () => {
      const createRes = await request(app)
        .post('/api/users/register')
        .send(payloadBase);
  console.log('TEST DEBUG createRes.body =>', createRes.body);
  idExistente = createRes.body.id;
  console.log('TEST DEBUG idExistente set to =>', idExistente);
    });


    describe('GET /api/users/listar/:id', () => {
      test('Deve retornar 200 e o usuário correspondente para um ID existente', async () => {
        const getRes = await request(app).get(`/api/users/listar/${idExistente}`);
        
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.id).toBe(idExistente);
        expect(getRes.body).toMatchObject(payloadBase);
      });

      test('Deve retornar 404 caso o usuário não seja encontrado', async () => {
        const res = await request(app).get(`/api/users/listar/${idInexistenteInofensivo}`);
        expect(res.statusCode).toBe(404);
      });
    });

    // --- PUT ---
    describe('PUT /api/users/atualizar/:id', () => {
      test('Deve atualizar um usuário existente e retornar 200 com os dados atualizados', async () => {
        const updatedPayload = { nome: 'lucas', email: 'victo3r@gmail.com', senha: 'P123'};
        
        const updateRes = await request(app)
          .put(`/api/users/atualizar/${idExistente}`)
          .send(updatedPayload);

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toMatchObject(updatedPayload);

    
        const getRes = await request(app).get(`/api/users/listar/${idExistente}`);
        expect(getRes.body).toMatchObject(updatedPayload);
      });

      test('Deve retornar 404 ao tentar atualizar um usuario inexistente', async () => {
       const updatedPayload = { nome: 'lucasV', email: 'victo233r@gmail.com', senha: 'P123'};
        const res = await request(app)
          .put(`/api/users/atualizar/${idInexistenteInofensivo}`)
          .send(updatedPayload);

        expect(res.statusCode).toBe(404);
      });
    });

    describe('DELETE /api/users/deletar/:id', () => {
      test('Deve deletar um usuario existente e retornar 204; subsequentemente GET deve retornar 404', async () => {
  console.log('TEST DEBUG idExistente before DELETE =>', idExistente);
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