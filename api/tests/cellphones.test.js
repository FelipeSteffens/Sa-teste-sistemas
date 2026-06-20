const request = require('supertest');
const app = require('../src/app');

describe('API Celulares', () => {

  describe('POST /api/cellphones/criar', () => {
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

  describe('Operações com IDs', () => {
    let idExistente;
    const payloadBase = { marca: 'MarcaA', modelo: 'ModelB', cor: 'Branco', preco: 999, descricao: 'Celular de teste' };
    const idInexistenteInofensivo = 999999; 

  
    beforeEach(async () => {
      const createRes = await request(app)
        .post('/api/cellphones/criar')
        .send(payloadBase);
      
      idExistente = createRes.body.id;
    });


    describe('GET /api/cellphones/listar/:id', () => {
      test('Deve retornar 200 e o celular correspondente para um ID existente', async () => {
        const getRes = await request(app).get(`/api/cellphones/listar/${idExistente}`);
        
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body.id).toBe(idExistente);
        expect(getRes.body).toMatchObject(payloadBase);
      });

      test('Deve retornar 404 caso o celular não seja encontrado', async () => {
        const res = await request(app).get(`/api/cellphones/listar/${idInexistenteInofensivo}`);
        expect(res.statusCode).toBe(404);
      });
    });

    // --- PUT ---
    describe('PUT /api/cellphones/atualizar/:id', () => {
      test('Deve atualizar um celular existente e retornar 200 com os dados atualizados', async () => {
        const updatedPayload = { marca: 'MarcaU', modelo: 'ModelU2', cor: 'Azul', preco: 1100, descricao: 'Descricao atualizada' };
        
        const updateRes = await request(app)
          .put(`/api/cellphones/atualizar/${idExistente}`)
          .send(updatedPayload);

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toMatchObject(updatedPayload);

    
        const getRes = await request(app).get(`/api/cellphones/listar/${idExistente}`);
        expect(getRes.body).toMatchObject(updatedPayload);
      });

      test('Deve retornar 404 ao tentar atualizar um celular inexistente', async () => {
        const updatedPayload = { marca: 'X', modelo: 'Y', cor: 'Preto', preco: 1, descricao: 'N/A' };
        const res = await request(app)
          .put(`/api/cellphones/atualizar/${idInexistenteInofensivo}`)
          .send(updatedPayload);

        expect(res.statusCode).toBe(404);
      });
    });

    describe('DELETE /api/cellphones/deletar/:id', () => {
      test('Deve deletar um celular existente e retornar 204; subsequentemente GET deve retornar 404', async () => {
        const deleteRes = await request(app).delete(`/api/cellphones/deletar/${idExistente}`);
        
    
        expect(deleteRes.statusCode).toBe(204); 

        const getRes = await request(app).get(`/api/cellphones/listar/${idExistente}`);
        expect(getRes.statusCode).toBe(404);
      });

      test('Deve retornar 404 ao tentar deletar um celular inexistente', async () => {
        const res = await request(app).delete(`/api/cellphones/deletar/${idInexistenteInofensivo}`);
        expect(res.statusCode).toBe(404);
      });
    });
  });
});
