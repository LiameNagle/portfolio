const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
async function main(){
  const uri = "mongodb+srv://Cs230:Yz5kD0NYC7CRAQ42@cs230projectcluster.outxr.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
  const client = new MongoClient(uri);
  try{

    await client.connect();// connect to mongodb on atlas cloud
    var arycoust =await insertcoustomer(client);// coustomer collection is filled and object ids are returned in an array 
    var aryprod =await insertproduct(client);// product ^^^^^^^^^^^^^^^^^^^^^^^
    await insertorder(client,arycoust,aryprod);//the order collection if fillled whit the two arrays 
    var res = await findCoustomer(client,arycoust);
    var res2 = await updateCoustomer(client,arycoust,res);
    await deleateCoustomer(client,res);
  }catch(e){
        console.error(e);
      }finally{
      await client.close();
    }
}
main().catch(console.error);

async function insertcoustomer(client){
  var bool= true;// is used in fill doc array to determin to fill coustomer or product a bit dumb
  var array = [];// will be filled whit ids 
  for(var i =0;i<5;i++){
    var doc = await filldocrnd(bool);// makes a document in the form {Tital: data};
    var res = await client.db("OnlinePhoneStore").collection("Customer").insertOne(doc);//inserts the doc from filldoc to OnlinePhoneStore/Coustomer
    array.push(res.insertedId);// res if results from the insert used in orders is returned after function
  }
  console.log("the rows has been added from coustomer have been added");// @TODO might want to show table in cli
  return array;// array of ids
}

async function insertproduct(client){
  var array  = [];// fills whit ids
  var bool=false;// set to false for fillldocrnd
  for(var i =0;i<5;i++){
    var doc = await filldocrnd(bool);// bool determins whiter its gonna be coustomer or product doc returned 
    var res =await client.db("OnlinePhoneStore").collection("Product").insertOne(doc);// inserts doc into products 
    array.push(res.insertedId);//pushes id ontoarray because its easier and will have more scaling 
  }
  console.log("the rows from product have been added");
  return array;
}


async function findCoustomer(client,array){

  const res = await client
  .db("OnlinePhoneStore")
  .collection("Customer")
  .findOne({
    "_id":array[Math.floor(Math.random()*5)]
  });

  console.log("Title: "+res.Titale+"\nName:"+res.FirstName+"\nSurname: "+res.Surname+"\nMoblile: "+res.Moblie+"\nEmail: "+res.Email+
  "\nAddress: "+res.AddressLine1+" "+res.AddressLine2+"\nTwon "+res.Town+"\nCounty: "+res.County +"\nEir Code: "+res.EIRCOAD);

  return res;
}


async function updateCoustomer(client,array,found){

  var doc ={};
  doc = await filldocrnd(true);

  console.log(""+found.Moblie);
  //findres.Moblie
  await client
  .db("OnlinePhoneStore")
  .collection("Customer")
  .updateOne(
    {"Moblie":found.Moblie},{$set:{Moblie:doc.Moblie}}
    );
    await client
  .db("OnlinePhoneStore")
  .collection("Customer")
  .updateOne(
    {"Email":found.Email},{$set:{Email:doc.Email}}
    );
    await client
  .db("OnlinePhoneStore")
  .collection("Customer")
  .updateOne(
    {"Titale":found.Titale},{$set:{Titale:doc.Titale}}
    );
  console.log("Title: "+found.Titale+"\nName:"+found.FirstName+"\nSurname: "+found.Surname+"\nMoblile: "+found.Moblie+"\nEmail: "+found.Email+
  "\nAdfounds: "+found.AddressLine1+" "+found.AddressLine2+"\nTwon "+found.Town+"\nCounty: "+found.County +"\nEir Code: "+found.EIRCOAD);
}
async function deleateCoustomer(client,found){
  await client
  .db("OnlinePhoneStore")
  .collection("Product")
  .deleteOne({"Moblie":found.Moblie,
  "Email":found.Email,
  "Titale":found.Titale});
}


async function insertorder(client,array1,array2){
  for(var i =0;i<5;i++){
    //console.log("check1"+array1[i]); debugging stm
    for(var j =0;j<5;j++){// inner and outer loop to show many to one
      var doc ={
        CoustomerID: array1[i],
        ProductID: array2[j]
      }
    await client.db("OnlinePhoneStore").collection("Orders").insertOne(doc);//used for insert 
    // console log
    // build table
  }
}
}

async function filldocrnd(bool){
  var doc = {};
  if (bool){// arrays to select random data
var Titlearray = ["Master",",Miss","Miss","Mr","Mx","Mrs"];
var fnamearray = ["Andrew","Jhon","Zara","Peater","Jmaes","David","Liam","Aaron","Danial","Matt","Lindsy","Bridget","Tomas","Jhon","Margret","Niel"];
var lnamearray= ["Nagle","Tomson","Perterson","Ford","Nagle","Keaton","Yamamori","Loyd","Smith","May","Ritchard","Pratt","Holland","Downey","philly","Baker"];
var add1array = ["ocean","beach","mounatin","summerset","O'connol","Parnell"];
var add2array = ["Drive","Road","Street","Park","Bolovard","Quay"];
var caparray = ["Antrim","Armagh","Carlow","Cavan","Clare","Cork","Derry","Donegal","Down","Dublin","Fermanagh","Galway"];
var countiesarray = ['Antrim','Armagh','Carlow','Cavan','Clare','Cork','Derry','Donegal','Down','Dublin','Fermanagh','Galway','Kerry','Kildare','Kilkenny','Laois'];
var fnamernd =fnamearray[Math.floor(Math.random()*15)];
var lnamernd = lnamearray[Math.floor(Math.random()*15)];
 doc  = {
  Titale:Titlearray[Math.floor(Math.random()*6)],
  FirstName:fnamernd,
  Surname:lnamernd,
  Moblie: Math.floor(Math.random()*99999999),
  Email: fnamernd+""+Math.floor(Math.random()*15)+""+lnamernd+"@gmail.com",
  AddressLine1:"Co "+countiesarray[Math.floor(Math.random()*15)]+" "+caparray[Math.floor(Math.random()*11)],
  AddressLine2:Math.floor(Math.random()*25)+" "+add1array[Math.floor(Math.random()*5)]+" "+add2array[Math.floor(Math.random()*5)],
  Town: caparray[Math.floor(Math.random()*11)],
  County: countiesarray[Math.floor(Math.random()*15)],
  EIRCOAD: "EA"+Math.floor(Math.random()*9)+" S"+Math.floor(Math.random()*99)+""
}// forms data 
  }else{
    var companyarray = ["Apple","BLU Products","Caterpillar","Firefly","Garmin","Google","HP","InFocus","Lenovo","MyPhone","Cloudfone"]
    doc = {
      Manufactuer: companyarray[Math.floor(Math.random()*10)],
      Model:"S"+Math.floor(Math.random()*9),
      Price:"$ "+Math.floor(Math.random()*200)%100
    }
  }
  //console.log("check");
return doc;
}
