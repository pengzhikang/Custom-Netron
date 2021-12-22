const fs = require('fs');
var flatbuffers = require('flatbuffers');
var PModel = require('./pzk-model/p-model').PModel;
var builder = new flatbuffers.Builder(1024);

var author = builder.createString("name");
var version = builder.createString("v1.0");
var modelname = builder.createString("what fuck");
console.log("try use flatbuffer");
console.log(author == undefined);
console.log("try load custom model file");
var bytes = new Uint8Array(fs.readFileSync('/home/pengzhikang/project/custom-model/build/release/first.pzkm'));
var buf = new flatbuffers.ByteBuffer(bytes);

var mymodel = PModel.getRootAsPModel(buf);

console.log("author is " + mymodel.author());
console.log("model version is " + mymodel.version());
console.log("model name is " + mymodel.modelName());
var model_time = mymodel.createTime();
console.log("mode create time is " + model_time.year() + "/" + model_time.month() + "/"
                + model_time.day() + " " + model_time.hour() + ":" + model_time.min() +
                ":" + model_time.sec());
// try read the array from custom model
var inputid_array = mymodel.modelRuntimeInputIdArray();

console.log("model runtime input id list is above:");
for(x in inputid_array)
{
    console.log(x + ",");
}
var tensor_array = mymodel.tensorBuffer();
console.log("model tensor length is "+ mymodel.tensorBufferLength());
for (var i = 0; i < mymodel.tensorBufferLength(); i++)
{
    console.log(mymodel.tensorBuffer(i).id() + ":" + mymodel.tensorBuffer(i).name());
}
// for (t in tensor_array)
// {
//     console.log(t.id() + ",");
// }