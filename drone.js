var phantom=require('node-phantom'),
    child_process = require('child_process');

  //mmmmmega if!
  if(process.argv[2]){

    if (typeof process.argv[2] == 'string'){
      if(ValidUrl(process.argv[2])){
        startPhantom(process.argv[2]);
      } else{
        console.log('invalid url')
      }

    } else {
      console.log('not a string')
    }
  } else {
    console.log('no url!')
  }


// gimmy a real url! mmmkay
function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

// show me the pic yoo
createScreenshot = function(page, filename) {
  return page.render(filename, function() {
    child_process.exec("open " + filename);
    return process.exit();
  });
};




function startPhantom(url){
  console.log('Creating drone..');
  url = process.argv[2];

  phantom.create(function(err,ph) {
    return ph.createPage(function(err,page) {
      page.set('viewportSize', {
        width: 1000,
        height: 1000
      });

      /* 
      if you want to clip the img.
      should be added to process.argv
      page.set('clipRect', {
        top: 0,
        left: 0,
        width: 1000,
        height: 1000
      });
      */
      console.log("Opening " + url + " ...");
      return page.open(url, function(status) {
        console.log("Rendering screenshot ...");
        return setTimeout((function() {
          var name = url.replace('http://', '').replace('https://');
          return createScreenshot(page, 'img/'+name+'.png');
        }), 1000);
      });
    });
  });

}
