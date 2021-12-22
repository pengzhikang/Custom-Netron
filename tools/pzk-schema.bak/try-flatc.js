var flatbuffers = require('./pzk-schema/flatbuffers.js').flatbuffers
var pzkm = require('./pzk-schema.js').pzkm
var builder = new flatbuffers.Builder(1024)

var author = builder.createString("name")
