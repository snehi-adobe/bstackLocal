const fs = require('fs')
describe('Local React webSite ', () => {

    beforeEach('Browser URL', async() => {
      browser.url('');
    })
  
    afterEach('end of the test', async() => {
    })
  
    it('is Logo Present', async() => {
       console.log(await browser.getPageSource());
       fs.readFile('../param.log',"utf8", (err, data) => {
       if (data.toString().localeCompare("Snehi_testuser") == 1){
       console.log("Local site not connected to browserstack live");
       }
       else {
        console.error("Local site NOT connected to browserstack live");
       }
       
      
     })

    })
});