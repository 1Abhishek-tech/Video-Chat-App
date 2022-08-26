const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(function (stream) {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})
socket.emit('join-room', ROOM_ID); // join the room
socket.on('user-connected', () => { // user-connected is the event name
    connectToNewUser();
})
const connectToNewUser = () => {
    console.log('user')
}
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', (e) => {
        video.play();
    });
    videoGrid.append(video)
}