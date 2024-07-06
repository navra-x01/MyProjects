// const { JSDOM } = require("jsdom");

// const dom = new JSDOM();
// const document = dom.window.document;

console.log("Hello");

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

let currentSong= new Audio()
let songs
let currFolder

async function getSongs(folder) {
  currFolder=folder
  let a = await fetch(`/${folder}/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }


  

  //Show all the songs in the playlist
  let songul= document.querySelector(".songList").getElementsByTagName("ul")[0]
  songul.innerHTML=""
  for(const i of songs) {
    songul.innerHTML+= `<li class="flex">
    <img class="invert" src="img/music.svg" alt="">
    

    <div class="info">
        <div>${i}</div>
        <div>navra</div>
    </div>

    <div class="playnow flex">
        <span>Play Now</span>
        <img class="invert" src="img/play.svg" alt="">
    </div>

</li>`
  }

  //Attach an event listener to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
  })

  return songs
  
}

// .split("(320)")[0]

const playMusic=(track)=>{
  // let audio= new Audio("/songs/" + track)
  // audio.play()
  currentSong.src=`/${currFolder}/` + track
  currentSong.play()
  play.src="img/pause.svg"

  document.querySelector(".songinfo").innerHTML= decodeURI(track)
  document.querySelector(".songtime").innerHTML= "00:00 / 00:00"
}

async function displayAlbums(){
  let a = await fetch(`/songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  // console.log(div)
  let anchors=div.getElementsByTagName("a")
  // div.getElementsByTagName("a")
  // console.log(anchors)
  let cardContainer=document.querySelector(".cardContainer")
  let array= Array.from(anchors)
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) {
      let folder=(e.href.split("/").slice(-1)[0])
      // console.log(e.href.split("/").slice(-1)[0])
      // console.log(e.href.includes("/songs"))
      //Get the meta data of the folder
      let a = await fetch(`/songs/${folder}/info.json`);
      let response = await a.json();
      console.log(response)
      cardContainer.innerHTML+= `<div data-folder="${folder}" class="card ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" color="#000000" fill="black">
          <!-- Add a circle with a green background and increased padding -->
          <circle cx="16" cy="16" r="16" fill="green" />
          <path d="M22.8906 16.846C22.5371 18.189 20.8667 19.138 17.5257 21.0361C14.296 22.8709 12.6812 23.7884 11.3798 23.4196C10.8418 23.2671 10.3516 22.9776 9.95624 22.5787C9 21.6139 9 19.7426 9 16C9 12.2574 9 10.3861 9.95624 9.42132C10.3516 9.02245 10.8418 8.73288 11.3798 8.58042C12.6812 8.21165 14.296 9.12907 17.5257 10.9639C20.8667 12.862 22.5371 13.811 22.8906 15.154C23.0365 15.7084 23.0365 16.2916 22.8906 16.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      </svg>
      
      
      <img src="/songs/${folder}/cover.jpeg" alt="">
      <div>${response.title}</div>
      <div>${response.description}</div>
  </div>`
    }
  }
 
  //Load the playlist on clicking the card
    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
      e.addEventListener("click", async item => {
          console.log("Fetching Songs")
          songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
          playMusic(songs[0])

      })
  })

  
}

async function main(){

    //Get the list of all songs
  songs = await getSongs("songs/cs")
  
    
    // .replaceAll("%5","").replaceAll("%2","")
    // .replaceAll("%20", "" )

    //Display all the albums on the page
    displayAlbums()

    


    //Attach event listener to play,previous and next
    play.addEventListener("click",()=>{
      if (currentSong.paused) {
        currentSong.play()
        play.src="img/pause.svg"
      }
      else{
        currentSong.pause()
        play.src="img/play.svg"
      }
    })


    //Listen for time update event
    currentSong.addEventListener("timeupdate" ,()=>{
      document.querySelector(".songtime").innerHTML= `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
    })


    //Add event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
      let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100
      document.querySelector(".circle").style.left = percent + "%"
      currentSong.currentTime =((currentSong.duration)*percent)/100
    })


    //Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
      document.querySelector(".left").style.left="0"
    })

    //Add an event listener to close
    document.querySelector(".close").addEventListener("click",()=>{
      document.querySelector(".left").style.left="-100%"
    })

    //Add an event listener to previous and next
    next.addEventListener("click",()=>{
      let index= (songs.indexOf(currentSong.src.split("/").slice(-1)[0]))
      
      if ((index+1)< songs.length ) {
        playMusic(songs[index+1])
      }
    })

    prev.addEventListener("click",()=>{
      let index= (songs.indexOf(currentSong.src.split("/").slice(-1)[0]))
      
      if ((index-1)>=0) {
        playMusic(songs[index-1])
      }
    })


    //Add an event listener to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
      currentSong.volume = parseInt(e.target.value)/100
      if (currentSong.volume>0) {
        document.querySelector(".vol").src=document.querySelector(".vol").src.replace("mute.svg","volume.svg")
      }
    })


    //Add an event listener to mute the track
    document.querySelector(".vol").addEventListener("click",e=>{
      
      if (e.target.src.includes("volume.svg")) {
        e.target.src= e.target.src.replace("volume.svg","mute.svg")
        currentSong.volume=0
        document.querySelector(".range").getElementsByTagName("input")[0].value=0
      }
      else{
        e.target.src=e.target.src.replace("mute.svg","volume.svg")
        currentSong.volume=0.5
        document.querySelector(".range").getElementsByTagName("input")[0].value=50
      }
    })
    
    
    
}

main()

