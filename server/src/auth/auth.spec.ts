const http = require('node:http')

const exampleUser = JSON.stringify({
  "userName": "XxPredatorxX",
  "password": "12345678"
})
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(exampleUser)
  }
};

jest.setTimeout(20000)
describe('AuthService', () => {

  describe('authorization', () => {
    it('should authorize and return token', async () => {
      const req = await http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          expect(Object.values(JSON.parse(chunk))).toBeDefined()
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      req.write(exampleUser);
      req.end();
      
    })
  })
  
});
