var pzkm = pzkm || {};
const { int32 } = require('flatbuffers');
var pmflatc = require('flatbuffers');
//const fs = fs || require('fs');
// below code is the same as:
// var zip = (zip == undefined)? require('./zip'):zip;
var zip = zip || require('./zip');
pzkm.schema = require('./pzk-model/p-model').PModel;
pzkm.mdatatype = require('./pzk-model/data-type').DataType;

pzkm.ModelFactory = class {
    match(context){
        const tags = context.tags('flatbuffers');
        if (tags.get('file_identifier') === 'pzkm'){
            return 'pzkm.flatbuffers';
        }
        return 'pzkm.flatbuffers';
        //return undefined;
    }

    open(context, match){
        return context.require('./pzk-model/p-model').then(() => {
            let model = null;
            // const attachments = new Map();
            switch(match){
                case 'pzkm.flatbuffers':{
                    const stream = context.stream;
                    try{
                        // stream ---> Uint8Array
                        const filebuffer = [];
                        for(var n = 0; n < stream.length; n++){
                            filebuffer.push(stream.byte(n));
                        }
                        const bufferuint8 = new Uint8Array(filebuffer);
                        const reader = new pmflatc.ByteBuffer(bufferuint8);
                        model = pzkm.schema.getRootAsPModel(reader);
                    }
                    catch(error){
                        const message = error && error.message ? error.message:error.toString();
                        throw new pzkm.Error('File format is not pzkm.PModel (' + message.replace(/\.$/, '') + ').');
                    }
                    // try {
                    //     // why zip model stream in here?
                    //     const archive = zip.Archive.open(stream);
                    //     if (archive){
                    //         for (const entry of archive.entries) {
                    //             attachments.set(entry[0], entry[1]);
                    //         }
                    //     }
                    // }
                    // catch (error) {
                    //     const message = error && error.message ? error.message:error.toString();
                    //     throw new pzkm.Error('Zip stream Failed (' + message.replace(/\.$/, '') + ').');
                    // }
                    break;
                }
                default:{
                    throw new pzkm.Error("Unknown PModel format '" + match + "'.");
                }
            }
            return pzkm.Metadata.open(context).then((metadata) => {
                return new pzkm.Model(metadata, model);
            });
        });
    }
};

pzkm.Model = class{
    constructor(metadata, model){
        this._version = "1.0";
        this._format = 'PModel';
        this._runtime = 'v1.0';
        this._name = model.modelName();
        this._version = model.version();
        this._author = model.author();
        const model_time = model.createTime();
        this._description = "mode create time is " + model_time.year() + "/" + model_time.month() + "/"
            + model_time.day() + " " + model_time.hour() + ":" + model_time.min() +
            ":" + model_time.sec();
        this._license = "none";
        this._graphs = [];
        this._graphs.push(new pzkm.Graph(metadata, model));
    }
    // model format eg: TensorFlow Litev1.2
    get format() {
        return this._format;
    }
    // min_runtime_version
    get runtime() {
        return this._runtime;
    }
    // model name
    get name() {
        return this._name;
    }
    // model version
    get version() {
        return this._version;
    }
    // model description
    get description() {
        return this._description;
    }
    // author name
    get author() {
        return this._author;
    }
    // license optonal
    get license() {
        return this._license;
    }
    // about view graphs
    // important for us
    get graphs() {
        return this._graphs;
    }
};
pzkm.Graph = class {
    constructor(metadata, model){
        this._name = "";
        this._input = [];
        this._outputs = [];
        this._nodes = [];
        // create all the tensor
        var alltensor = new Map();
        for(var index = 0; index < model.allTensorNum(); index++){
            var onetensor = model.tensorBuffer(index);
            alltensor.set(onetensor.id(), new pzkm.Argument(onetensor));
        }
        // set input for model
        for(index = 0; index < model.modelRuntimeInputNum(); index++){
            var input_id = model.modelRuntimeInputId(index);
            this._input.push(new pzkm.Parameter(input_id.toString(), true, alltensor.get(input_id)));
        }
        // set output for model
        for(index = 0; index < model.modelRuntimeOutputNum(); index++){
            var output_id = model.modelRuntimeOutputId(index);
            this._outputs.push(new pzkm.Parameter(output_id.toString(), true, alltensor.get(output_id)));
        }
        // set node for model
        for(index = 0; index < model.layerNum(); index++){
            var onelayer = model.layerBuffer(index);
            this._nodes.push(new pzkm.Node(metadata, onelayer, alltensor));
        }
    }
    get name(){
        return this._name;
    }
    get groups(){
        return false;
    }
    get inputs(){
        return this._input;
    }
    get outputs(){
        return this._outputs;
    }
    get nodes(){
        return this._nodes;
    }
};
// desr one node
pzkm.Node = class {
    constructor(metadata, nodebuffer, tensor_list){
        this._name = nodebuffer.name();
        // this._type = nodebuffer.type();
        this._input = [];
        this._outputs = [];
        this._attributes = [];
        //this._chain = [];
        this._group = false;
        const metajson = metadata.type(nodebuffer.type());
        if (metajson === null){
            this._type = {name: nodebuffer.type(), category: 'custom'};
        }
        else{
            this._type = metajson;
        }
        // set input tensor for node
        for(var index = 0 ; index < nodebuffer.inputNum(); index++){
            const con = nodebuffer.inputId(index);
            const input = tensor_list.has(con.tensorId())?tensor_list.get(con.tensorId()):null;
            if(input === null){
                continue;
            }
            this._input.push(new pzkm.Parameter(con.name(), true, input));
            // if(Object.prototype.hasOwnProperty(this._type, "inputs")){
                
            // }
            // let tflag = (metajson === null);
            // if (tflag === false){
            //     if (metajson.hasOwnProperty("inputs")){
            //         if (metajson.inputs.length === 0){
            //             tflag = true;
            //         }
            //     }
            //     else{
            //         tflag = true;
            //     }
            // }
            // if (tflag){
            //     this._input.push(new pzkm.Parameter(con.name(), true, input));
            // }
            // else{
            //     var where_index = 0;
            //     for(where_index = 0; where_index < metajson.inputs.length; where_index++){
            //         if (metajson.inputs[where_index].name === con.name()){
            //             break;
            //         }
            //     }
            //     this._input.push(new pzkm.Parameter(where_index.toString(), true, input));
            // }
        }
        // set output tensor for node
        for (index = 0; index < nodebuffer.outputNum(); index++){
            const con = nodebuffer.outputId(index);
            const output = tensor_list.has(con.tensorId())?tensor_list.get(con.tensorId()):null;
            if(output === null){
                continue;
            }
            let tflag = (this._type === null);
            if (tflag === false){
                if (Object.prototype.hasOwnProperty.call(this._type, "outputs")){
                    if (this._type.outputs.length === 0){
                        tflag = true;
                    }
                }
                else{
                    tflag = true;
                }
            }
            if (tflag){
                this._outputs.push(new pzkm.Parameter(con.name(), true, output));
            }
            else{
                let where_index = 0;
                for(; where_index < this._type.outputs.length; where_index++){
                    if(this._type.outputs[where_index].name === con.name()){
                        break;
                    }
                }
                if (this._type.outputs.length === 0){
                    if(this._outputs.length === 0){
                        where_index = 1;
                    }
                    else{
                        for(var m = 0; m < this._outputs.length; m++){
                            where_index = int32(this._outputs[m].location) + 1;
                        }
                    }
                }
                this._outputs.push(new pzkm.Parameter(where_index.toString(), true, output));
            }
        }
        // set attributes for node
        var attr = nodebuffer.attrs();
        for (index = 0; index < attr.metaNum(); index++){
            const oneattr = attr.buffer(index);
            if(oneattr.require() === true){
                this._attributes.push(new pzkm.Attribute(oneattr, true));
            }
            else{
                this._attributes.push(new pzkm.Attribute(oneattr, false));
            }
        }
    }
    get name(){
        return this._name;
    }
    get type(){
        return this._type;
    }
    get inputs(){
        return this._input;
    }
    get outputs(){
        return this._outputs;
    }
    get group(){
        return this._group;
    }
    get _chain(){
        return this._chain;
    }
    get attributes(){
        return this._attributes;
    }
};

// desr node attributes
pzkm.Attribute = class {
    constructor(attmetabuffer, visible){
        this._name = attmetabuffer.key();
        this._type = null;
        var data = pzkm.mtype.readdata(attmetabuffer.bufferArray(), attmetabuffer.bufferData(), [attmetabuffer.bufferEleNum()]);
        this._value = data.result.toString();
        this._visible = visible;
    }
    get name(){
        return this._name;
    }
    get type(){
        return this._type;
    }
    get value(){
        return this._value;
    }
    get visible(){
        return this._visible;
    }
};

// desr tensor
pzkm.Parameter = class  {
    constructor(name, visible, onetensor, org = false){
        this._name = name;
        this._visible = visible;
        this._arguments = org?[new pzkm.Argument(onetensor)]:[onetensor];
    }
    get name(){
        return this._name;
    }
    get visible(){
        return this._visible;
    }
    get arguments(){
        return this._arguments;
    }
};

// desr tensor arguments
// param1: onetensor, which is binary data
pzkm.Argument = class {
    constructor(onetensor){
        this._location = onetensor.id().toString();
        this._name = onetensor.name() + '\n' + this._location;
        this._initalizer = onetensor.tesorType() === 0 ? new pzkm.Tensor(this._location, this._name, onetensor): null;
        this._quantization = null;
        this._description = null;
        this._type = this._initalizer === null ? new pzkm.TensorType(onetensor.shape(), pzkm.mtype.trantype(onetensor.dataType()), null):this._initalizer.type;
    }
    get name(){
        return this._name;
    }
    get location(){
        return this._location;
    }
    get type(){
        return this._type;
    }
    get quantization(){
        return this._quantization;
    }
    get description(){
        return this._description;
    }
    get initializer(){
        return this._initalizer;
    }
};
// desr weight data
// param1: buffer, which is binary data about Tenosr
pzkm.Tensor = class {
    constructor(location, name, buffer){
        this._location = location;
        this._name = name;
        this._type = new pzkm.TensorType(buffer.shape(), pzkm.mtype.trantype(buffer.dataType()), null);
        this._kind = buffer.tesorType() === 0 ? '': 'Variable';
        // read the tensor shape
        const dimszie = buffer.shape().dimsize() || 0;
        var dimsshape = [];
        if (dimszie !== 0){
            dimsshape = buffer.shape().dimsArray();
        }
        var tensor_context = pzkm.mtype.readdata(buffer.weights().bufferArray(), buffer.dataType(), dimsshape);
        this._state = tensor_context.state;
        this._value = tensor_context.state === null? tensor_context.result:null;
    }
    get name(){
        return this._name;
    }
    get type(){
        return this._type;
    }
    get location(){
        return this._location;
    }
    get kind(){
        return this._kind;
    }
    get state(){
        return this._state;
    }
    get value(){
        return this._value;
    }
    toString(){
        return JSON.stringify(this._value, null, 4);
    }
};

pzkm.mtype = class {
    static trantype(index){
        return pzkm.mdatatype[index];
    }
    static typelen(index){
        if(typeof(index) !== 'string'){
            index = pzkm.mdatatype[index];
        }
        let dlen = 1;
        switch(index){
            case 'BOOL':
            case 'UINT4':
            case 'INT8':
            case 'INT4':
            case 'UINT8':
            case 'QSYMMEINT4':
            case 'QSYMMEINT8':
            case 'QASYMMEUINT4':
            case 'QASYMMEUINT8':
            case 'CHAR':
                dlen = 1;
                break;
            case 'INT16':
            case 'UINT16':
            case 'FP16':
                dlen = 2;
                break;
            case 'INT32':
            case 'FP32':
            case 'UINT32':
                dlen = 4;
                break;
        }
        return dlen;
    }
    // read the array data from array_buffer
    static readdata(array_buffer, type_index, dims){
        var context = {};
        context.state = null;
        context.index = 0;
        context.count = 0;
        context.result = [];
        const dims_num = dims.reduce((a,b)=>a*b, 1);
        if (array_buffer == null || array_buffer.length === 0 || dims.length === 0 || dims_num === 0){
            context.state = 'Tensor data is empty';
            return context;
        }
        const datatype = pzkm.mtype.trantype(type_index);
        const datalen = pzkm.mtype.typelen(type_index);
        if (datalen * dims > array_buffer.byteLength){
            context.state = 'Invaile Tensor data';
            return context;
        }
        context.datatype = datatype;
        context.limit = 10000;
        context.data = new DataView(array_buffer.buffer, array_buffer.byteOffset, array_buffer.byteLength);
        context.shape = dims;
        // normal tensor data
        context.result = pzkm.mtype.decode(context, 0);
        // if (context.state !== null){
        //     return context.state;
        // }
        // else{
        //     return context.result;
        // }
        return context;
    }
    static decode(context, dimension) {
        const shape = (context.shape.length == 0) ? [ 1 ] : context.shape;
        const size = shape[dimension];
        const results = [];
        if (dimension == shape.length - 1) {
            for (let i = 0; i < size; i++) {
                if (context.count > context.limit) {
                    results.push('...');
                    return results;
                }
                switch (context.datatype) {
                    case 'BOOL':
                        results.push(context.data.getUint8(context.index) === 0 ? false : true);
                        context.index += 1;
                        context.count++;
                        break;
                    case 'UINT4':
                    case 'QASYMMEUINT4':
                    case 'QASYMMEUINT8':
                    case 'UINT8':
                        results.push(context.data.getUint8(context.index));
                        context.index += 1;
                        context.count++;
                        break;
                    case 'UINT32':
                        results.push(context.data.getUint32(context.index));
                        context.index += 4;
                        context.count++;
                        break;
                    case 'INT4':
                    case 'QSYMMEINT4':
                    case 'QSYMMEINT8':
                    case 'INT8':
                        results.push(context.data.getInt8(context.index));
                        context.index += 1;
                        context.count++;
                        break;
                    case 'UINT16':
                        results.push(context.data.getUint16(context.index, true));
                        context.index += 2;
                        context.count++;
                        break;
                    case 'INT16':
                        results.push(context.data.getInt16(context.index, true));
                        context.index += 2;
                        context.count++;
                        break;
                    case 'INT32':
                        results.push(context.data.getInt32(context.index, true));
                        context.index += 4;
                        context.count++;
                        break;
                    case 'int64':
                        results.push(context.data.getInt64(context.index, true));
                        context.index += 8;
                        context.count++;
                        break;
                    case 'FP16':
                        results.push(context.data.getFloat16(context.index, true));
                        context.index += 2;
                        context.count++;
                        break;
                    case 'FP32':
                        results.push(context.data.getFloat32(context.index, true));
                        context.index += 4;
                        context.count++;
                        break;
                    case 'float64':
                        results.push(context.data.getFloat64(context.index, true));
                        context.index += 8;
                        context.count++;
                        break;
                    case 'CHAR':
                        results.push(context.data[context.index++]);
                        context.count++;
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            for (let j = 0; j < size; j++) {
                if (context.count > context.limit) {
                    results.push('...');
                    return results;
                }
                results.push(pzkm.mtype.decode(context, dimension + 1));
            }
        }
        if (context.shape.length == 0) {
            return results[0];
        }
        return results;
    }
};

// param1:tensorshape, which is binary data
pzkm.TensorType = class {
    constructor(tensorshape, datatype, denotation){
        this._shape = new pzkm.TensorShape(tensorshape);
        this._datatype = typeof(datatype) === 'string' ? datatype:datatype.toString();
        this._datatype = this._datatype || '';
        this._denotation = denotation || '';
    }
    get shape(){
        return this._shape;
    }
    get datatype(){
        return this._datatype;
    }
    get denotation(){
        return this._denotation;
    }
    toString(){
        return this._datatype + this._shape.toString();
    }
};
// param1:oneshape, which is binary data
pzkm.TensorShape = class {
    constructor(oneshape){
        //var dim_num = oneshape.dimsize();
        this._dimensions = oneshape.dimsArray() || [];
    }
    get dimensions(){
        return this._dimensions;
    }
    toString(){
        if(!this._dimensions || this._dimensions.length == 0){
            return '';
        }
        return '[' + this._dimensions.map((d1) => d1.toString()).join(',') + ']';
    }
};
// just about metadata.json
pzkm.Metadata = class {

    static open(context) {
        if (pzkm.Metadata._metadata) {
            return Promise.resolve(pzkm.Metadata._metadata);
        }
        // read the json metadata file
        // return Promise object
        return context.request('pzkm-metadata.json', 'utf-8', null).then((data) => {
            pzkm.Metadata._metadata = new pzkm.Metadata(data);
            // when success load metadata.json, return pzkm.Metadata._metadata
            return pzkm.Metadata._metadata;
        }).catch(() => {
            pzkm.Metadata._metadata = new pzkm.Metadata(null);
            return pzkm.Metadata._metadata;
        });
    }

    constructor(data) {
        this._types = new Map();
        this._attributes = new Map();
        if (data) {
            const metadata = JSON.parse(data);
            this._types = new Map(metadata.map((item) => [ item.name, item ]));
        }
    }
    // return the dict :[key=name:value],return value, if not existing, then set this
    type(name) {
        if (!this._types.has(name)) {
            this._types.set(name, { name: name });
        }
        return this._types.get(name);
    }
    // return value when key=type+':'+name in this._attributes, if not existing,then set this
    attribute(type, name) {
        const key = type + ':' + name;
        if (!this._attributes.has(key)) {
            this._attributes.set(key, null);
            const metadata = this.type(type);
            // "attributes" must be included in metadata.json
            if (metadata && Array.isArray(metadata.attributes)) {
                for (const attribute of metadata.attributes) {
                    this._attributes.set(type + ':' + attribute.name, attribute);
                }
            }
        }
        return this._attributes.get(key);
    }
};
pzkm.Error = class extends Error {

    constructor(message) {
        super(message);
        this.name = 'Error loading TensorFlow Lite model.';
    }
};

if(typeof module !== 'undefined' && typeof module.exports === 'object'){
    module.exports.ModelFactory = pzkm.ModelFactory;
}