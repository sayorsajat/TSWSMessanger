import { HttpReqOption } from "../utils/options.factory";
let http = require('node:http')

const exampleRoom = {
  "roomId": Date.now().toString(),
  "userId": 1
}



jest.useFakeTimers()
describe('Rooms module', () => {
  afterAll(done => done())
  describe('joining room', () => {
    it('should create user_room relationship', async () => {
      const options = new HttpReqOption("/rooms", "POST", JSON.stringify(exampleRoom))
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          expect(Object.values(JSON.parse(chunk))).toBeDefined()
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      req.write(JSON.stringify(exampleRoom));
      req.end();
    });

  describe('finding rooms', () => {
    it('should find all rooms that user joined', async () => {
        http.get(`http://localhost:5000/rooms/${exampleRoom.userId}`, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                expect(parsedData).toBeDefined()
            } catch (e) {
                console.error(e.message);
            }
        });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
      })
    })
  })
});
