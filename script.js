SC.initialize({
  client_id: '',
});
var loadTrack;

var input = $("#input").val();

var trackArr;
var l;
var currentTrack;
var currentIndex;
var currentTitle;
var currentCreator;
var currentArt;
var currentGenre;
var currentRelease;
var titleArr;
var id;
var songName = $("#song-title")[0];
var creator = $("#song-creator")[0];
var artWork = $("#art")[0];
var genre = $("#genre")[0];
var releaseYear = $("#releaseYear")[0];
var songList = $("#songList")[0];

var soundcloud = {
   songs: trackArr,
   currentTitle: 0,
   currentIndex: 0,
   currentCreator: 0,
   currentArt: 0,
   currentGenre: 0,
   currentRelease: 0,
   getTracks: function get() {
       SC.get("/tracks",{
       q: $("#input").val()
     }).then(function(response) {
       trackArr = response;
       l = trackArr.length;
       this.currentIndex = 0;
       this.currentTitle = 0;
       this.currentCreator = 0;
       this.currentArt = 0;
       this.currentGenre = 0;
       this.currentRelease = 0;
       for (this.currentTitle = 0; this.currentTitle < trackArr.length; this.currentTitle++) {
       // console.log(trackArr[this.currentTitle].title);
       songList.innerHTML += trackArr[this.currentTitle].title + "<p>";
      }
     }).then(function() {
     SC.stream('/tracks/' + trackArr[this.currentIndex].id).then(function(sound){
         currentTrack = sound;
        });
      });
   },

   play: function playTrack() {
     currentTrack.play();
     songName.innerText = trackArr[this.currentTitle].title;
     songName.href = trackArr[this.currentTitle].permalink_url;
     creator.href = trackArr[this.currentCreator].user.permalink_url;
     creator.innerText = trackArr[this.currentCreator].user.permalink;
     artWork.src = trackArr[this.currentArt].artwork_url;
     genre.innerText = trackArr[this.currentGenre].genre;
     releaseYear.innerText = trackArr[this.currentRelease].release_year;
     currentTrack.on("finish",function(){
       console.log( "Next Track" );
       soundcloud.next();
     });
   },
   pause: function pauseTrack() {
     currentTrack.pause();
   },

   // advances to next track, then loops back to beginning.
   next: function nextTrack() {
     this.pause();
     this.currentIndex++;
     this.currentTitle++;
     this.currentCreator++;
     this.currentArt++;
     this.currentGenre++;
     this.currentRelease++;
     if (this.currentIndex < l || this.currentTitle < l || this.currentCreator < l || this.currentArt < l) {
       songName.innerText = trackArr[this.currentTitle].title;
       songName.href = trackArr[this.currentTitle].permalink_url;
       creator.href = trackArr[this.currentCreator].user.permalink_url;
      creator.innerText = trackArr[this.currentCreator].user.permalink;
       artWork.src = trackArr[this.currentArt].artwork_url;
       genre.innerText = trackArr[this.currentGenre].genre;
       releaseYear.innerText = trackArr[this.currentRelease].release_year;
       SC.stream('/tracks/' + trackArr[this.currentIndex].id).then(function(sound){
         currentTrack = sound;
         currentTrack.play();
         currentTrack.on("finish",function(){
           console.log( "Next Track" );
           soundcloud.next();
       });
     });
   } else if (this.currentIndex == l || this.currentTitle == l || this.currentCreator == l || this.currentArt == l) {
     this.currentIndex = 0;
     this.currentTitle = 0;
     this.currentCreator = 0;
     this.currentArt = 0;
     this.currentGenre = 0;
     this.currentRelease = 0;
     songName.innerText = trackArr[this.currentTitle].title;
     songName.href = trackArr[this.currentTitle].permalink_url;
     creator.href = trackArr[this.currentCreator].user.permalink_url;
    creator.innerText = trackArr[this.currentCreator].user.permalink;
     genre.innerText = trackArr[this.currentGenre].genre;
     releaseYear.innerText = trackArr[this.currentRelease].release_year;
     artWork.src = trackArr[this.currentArt].artwork_url;
       SC.stream('/tracks/' + trackArr[this.currentIndex].id).then(function(sound){
         currentTrack = sound;
         currentTrack.play();
         currentTrack.on("finish",function(){
           console.log( "Next Track" );
           soundcloud.next();
           });
         });
       }
   }
}
