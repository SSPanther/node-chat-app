var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        // assert from match
        // assert text match
        // assert createdAt is number
        var from = 'Stephen';
        var text = 'Hello world!';

        var msg = generateMessage(from, text);

        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(msg.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Stephen';
        var latitude = 2;
        var longitude = 1;
        var expectedUrl = 'https://www.google.com/maps?q=2,1';
        
        var locationMsg = generateLocationMessage(from, latitude, longitude);

        
        expect(locationMsg.from).toBe(from);
        expect(locationMsg.url).toBe(expectedUrl);
        expect(locationMsg.createdAt).toBeA('number');
    })
})