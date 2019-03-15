
const request = require('supertest');
const server = require('./server.js');



describe('server.js', () => {
    describe('/route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        })
        it('should get response in JSON format..', () => {
            request(server)
                .get('/')
                .then(response => {
                    expect(response.type).toBe('application/json')    
                })    
        })
        it('should return with a body like: {Message: "working"', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({Message: "working"});
        });
    })
    
    describe('POST/greet endpoint', () => {
        it('should greet the person', async () => {
            let response = await request(server)
                .post('/greet')
                .send({ firstName : "Kim", lastName : "Soucy"});    
            expect(response.body).toEqual({Hello : "Kim Soucy"});
        })
        it('should get response in JSON format..', () => {
            request(server)
                .post('/greet')
                .then(response => {
                    expect(response.type).toBe('application/json')    
                })    
        })
    })  

    
    describe("delete users", () => {
        it('should delete a user', async() => {
            let response = await request(server)
                .delete('/user/:id');                 
            expect(response.status).toBe(202);
        });

        it("delete should return JSON", async () => {
            const response = await request(server).delete('/user/:id');
            expect(response.type).toEqual('application/json');
        });
    })  
}) 

