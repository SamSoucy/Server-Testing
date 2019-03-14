const req = require('supertest');
const server = require('./server.js');

describe("route handler", () => {
    it("should return 200 ok", async () => {
        const res = await req(server).get("/");
            expect(res.status).toBe(200);
    });
    
    it("should respond with list of users", async () => {
        const userArray = { "name": "Kim", "age": 32, "occupation": "student" };
        const res = await req(server).get("/users");
        expect(res.body).toEqual(userArray);
    });
})

describe('Post("/")', () => {
    it("should respond with a success code of 201 when creating a new user", async () => {
        const user = { "name": "Kim", "age": 32, "occupation": "student" };
        const res = await req(server).post("/users").send(user);
        expect(res.status).toBe(201);
    });

    it("should responde with 422 error code when a name is not entered", async () => {
        const user = { "name": "", "age": 32, "occupation": "student" };
        const res = await req(server).post("/users").send(user);
        expect(res.status).toBe(422);
    });
});

describe("delete users", () => {
    it("should respond with 200 success code when a user has been deleted", async () => {
        const id = 1;
        const res = await req(server).delete("/users/:id");
        expect(res.status).toBe(200);
        
    });
    it("should respond with a json", async () => {
        const res = await req(server).delete('/users/id');
        expect(res.type).toEqual('application/json');
  });
});

