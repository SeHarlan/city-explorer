const { app } = require('./app.js');
const request = require('supertest');

describe('/GET /location', () => {
    test('It should respond with an object of the correct shape',
    
        async(done) => {
            
            const response = await request(app).get('/location');
         
            expect(response.body).toEqual({
                formatted_query: expect.any(String), 
                latitude: expect.any(Number), 
                longitude: expect.any(Number)
            });
            
            expect(response.statusCode).toBe(200);
            done();
        });
});

describe('/GET /weather', () => {
    test('It should respond with an object of the correct shape',
    
        async(done) => {
            
            const response = await request(app).get('/weather');
         
            expect(response.body).toEqual({
                upComingWeather: [
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) },
                    { forecast: expect.any(String), time: expect.any(String) }
                ]
            });
            
            expect(response.statusCode).toBe(200);
            done();
        });
});