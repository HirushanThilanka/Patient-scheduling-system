const assert=require('chai').assert
const connection=require('../modules/dbConnection')

describe('Database Connection Test',()=>{
	it('Test should return false',()=>{
		assert.equal(connection,0);
		//assert.equal(app(),'hello');
	});
});