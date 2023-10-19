let localstream;
let remotestream;
let peerconnection;


let init = async ()  => {
    localstream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
    document.getElementById("user-1").srcObject = localstream
}


let createOffer = async () => {
    peerconnection = new RTCPeerConnection()

    remotestream = new MediaStream()
    document.getElementById('user-2').srcObject = remotestream
    
    let offer =  await peerconnection.createOffer()
    await peerconnection.setLocalDescription(offer)

    console.log('offer:', offer)

}

init()