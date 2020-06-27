var api = require('./src/api.js').app;
const fs = require('fs');
const glassesFilepath = './src/glasses.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/glasses', function (request, response) {
  response.json(getGlasses());
});

api.get('/glasses/:id', function (request, response) {
  let glass = getGlassById(request.params.id);
  if (glass) response.json(glass);
  response.json('not found');
});

api.put('/glasses', function (request, response) {
  response.json(request.body);
  saveGlass(request.body);
  
});

api.post('/glasses', function (request, response) {
 
  let glasses = [];
  try {
    glasses = JSON.parse(fs.readFileSync(glassesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var selglass=getGlassById(request.body.id)
  if(selglass!=null) {
    var pos=0;
    for(var i=0;i<glasses.length;i++){
      if(glasses[i].id==request.body.id) pos=i;
    }
    glasses[pos]=request.body;

  }
  var selglass=getGlassById(request.body.id);
  if (selglass != null) {glasses[request.body.id-1]=request.body};
  try {
    fs.writeFileSync(glassesFilepath, JSON.stringify(glasses));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }




  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('Glass was saved succesfully');
});

api.delete('/glasses/:index', function (request, response) {
  let glasses = [];
  try {
    glasses = JSON.parse(fs.readFileSync(glassesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  var oof=0;
  for(var i=0;i<glasses.length;i++) {
    if(glasses[i].id==request.params.index) oof=i;
    }
  glasses.splice(oof,1);
  if (glasses==null) console.log();
  else{
  try {
    fs.writeFileSync(glassesFilepath, JSON.stringify(glasses));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}
   response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getGlasses() {
  let glasses = [];
  try {
    glasses = JSON.parse(fs.readFileSync(glassesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return glasses;
}

function saveGlass(glass) {
  let glasses = getGlasses();// citire json din fisier
  let maxId = getMaxId(glasses);  
  glass.id = maxId+1;// generare id unic
  glasses.push(glass);// adaugare masina noua in array
  try {
    fs.writeFileSync(glassesFilepath, JSON.stringify(glasses));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(glasses) {
  let max = 0;
  for (var i=0; i<glasses.length;i++) {
    if(max < glasses[i].id) {
      max = glasses[i].id;
    }
  }
  return max;
}

function getGlassById(id){
  let glasses = getGlasses();// citire json din fisier
  let selectedGlass = null;
  for(var i=0; i<glasses.length; i++) {
    if(id == glasses[i].id) selectedGlass = glasses[i];
  }
  return selectedGlass;
}