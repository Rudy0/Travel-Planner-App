const handleSubmit = require('../src/client/js/app');


describe('Test if function exist' , () => {
    test('It should return true', () => {
        expect(handleSubmit).toHaveProperty("handleSubmit");
    });
});