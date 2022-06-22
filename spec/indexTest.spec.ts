//const supertest=require('supertest')
var request = require("request");
const server = require("../index");


it("should get the image uploaded in to the disk with multer", () => {
    const data =server.multer.diskStorage
    
    expect(data).toBeDefined();
});


it('should call imageResized on load', async() => {
 
      
 await request.post('http://localhost:3000/images',(_err,response,body)=> {
     
      expect(request.body).toBeDefined()
   })
    ;
 
  })

