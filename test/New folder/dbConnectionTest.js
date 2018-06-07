const assert=require('chai').assert
const connection=require('../modules/dbConnection')

describe('Database Connection Test',()=>{
	it('Test should return true',()=>{
		assert.notEqual(connection,0);
		//assert.equal(app(),'hello');
	});
});