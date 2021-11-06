console.log("Welcome to The World of Music on Spot")

//Initialize the Variable
let songIndex = 0;
let audioElement = new Audio('Music/Badtameez Dil.mp3')
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));


let songs = [
    {songName: "Badtameez Dil.mp3", filePath: "Music/Badtameez Dil.mp3", coverPath:"Cover/2.jpg"},
    {songName: "Adayein Bhi Hain", filePath: "Music/Adayein Bhi Hain.mp3", coverPath:"Cover/1.jpg"},
    {songName: "Akon - africa.mp3", filePath: "Music/Akon - africa.mp3", coverPath:"Cover/3.jpg"},
    {songName: "Alcoholic.mp3", filePath: "Music/Alcoholic.mp3", coverPath:"Cover/4.jpg"},
    {songName: "Boss.mp3", filePath: "Music/Boss.mp3", coverPath:"Cover/5.jpg"},
    {songName: "Beparwah.mp3", filePath: "Music/Beparwah.mp3", coverPath:"Cover/6.jpg"},
    {songName: "Dagabaaz.mp3", filePath: "Music/Dagabaaz.mp3", coverPath:"Cover/7.jpg"},
    {songName: "Dard Dilo Ke.mp3", filePath: "Music/Dard Dilo Ke.mp3", coverPath:"Cover/8.jpg"},
]

songitem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


//Handle play /pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();  
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();  
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Music/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        audioElement.currentTime = 0;
        
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})