osc = require('osc-min')
udp = require("dgram")

if(process.argv[2]){
    inport = parseInt process.argv[2]
} else {
    inport = 41234
}


sock = udp.createSocket("udp4", msg, rinfo){
    try{
        console.log(osc.fromBuffer,msg);
    }
    catch (error){
        console.log "invalid OSC packet"
    }
}
sock.bind inport