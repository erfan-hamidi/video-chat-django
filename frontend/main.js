let localstream;
let remotestream;
let peerconnection;

let APP_ID = '17efe9ea06594eeb86780a955fd30b91';
let token = null;
let uid = String(Math.floor(Math.random() * 10000));
let clinet;
let channel;

const servers = {
    iceServers:[
        {
            urls:['stun1.l.google.com:19302','stun2.l.google.com:19302']
        }
    ]
}

let init = async ()  => {
    localstream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
    document.getElementById("user-1").srcObject = localstream
}


let createOffer = async () => {
    peerconnection = new RTCPeerConnection(servers)

    remotestream = new MediaStream()
    document.getElementById('user-2').srcObject = remotestream
    

    localstream.getTracks().forEach((track) => {
        peerconnection.addTrack(track, localstream)
    })

    peerconnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remotestream.addTrack(track)
        })
    }

    peerconnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('new ICE candidate', event.candidate)
        }
    }

    let offer =  await peerconnection.createOffer()
    await peerconnection.setLocalDescription(offer)

    console.log('offer:', offer)

}

init()