let search = document.getElementById("song-name");


const searchButton = document.getElementById("song-search");
searchButton.addEventListener('click',function(){
   
    fetch(`https://api.lyrics.ovh/suggest/${search.value}`)
    .then(response => response.json())
    .then(data => {
         //console.log(data);
        // const songName = document.getElementById("song-name").value;
        //  songName.innerText = data.name;
        const lyricsSuggestion = document.getElementById("lyrics-suggestion");
        lyricsSuggestion.innerHTML ='';
        for (let i = 0; i < 10; i++) {
            const user =  data.data[i];
            
            lyricsSuggestion.innerHTML +=`
           <div class = "row">
           <div class = "col-md-9 text-md-left text-center">
             <h1>${user.title}</h1>                     
             <p class="color"> Album By ${user.album.title} </p> 
             </div>
             <div class = "col-md-3 text-md-right text-center">
             <button onclick="getTheLyrics('${user.artist.name}','${user.title}')" class=" btn btn-success"> Get Lyrics </button>
           </div>
           </div>
             `
            
             
            
        }
    })
    
})

function getTheLyrics(artist,title){
         
      fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
      .then(res => res.json())
     .then(data => {
      const lyrics = data.lyrics;
      console.log(lyrics);
      document.getElementById("lyrics-show").innerHTML = `
      <h2 class="bg-color">${artist} - ${title} </h2> 
      <pre class="bg-color"> ${lyrics} </pre>
      `
     })
}