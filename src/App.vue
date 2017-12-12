<template>
  <div class="spinner" v-if="loading">
  <div class="cube1"></div>
  <div class="cube2"></div>
</div>
  <div id="app" v-else>

    <header>
      <router-link to="/"><img src="./assets/logo.jpg" alt="Logo" id="logo"></router-link>
      <div id="social">
        <!-- Icons from https://github.com/simple-icons/simple-icons/ -->
        <a href="https://youtube.com/user/officialnerdcubed"><svg aria-labelledby="simpleicons-youtube-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title id="simpleicons-youtube-icon">YouTube icon</title><path fill="#ffffff" class="a" d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg></a>
        <a href="https://twitter.com/DanNerdCubed"><svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path fill="#ffffff" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg></a>
      <a href="https://twitch.tv/nerdcubed"><svg aria-labelledby="simpleicons-twitch-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitch-icon">Twitch icon</title><path fill="#ffffff" d="M2.089 0L.525 4.175v16.694h5.736V24h3.132l3.127-3.132h4.695l6.26-6.258V0H2.089zm2.086 2.085H21.39v11.479l-3.652 3.652H12l-3.127 3.127v-3.127H4.175V2.085z"/><path fill="#ffffff" d="M9.915 12.522H12v-6.26H9.915v6.26zm5.735 0h2.086v-6.26H15.65v6.26z"/></svg></a>
      </div>

    </header>
    <router-view />
    <div class="list">
      <h3 style="font-weight:lighter;">Recent Videos</h3>
      <button v-if="!more" id="btn-more" v-on:click="more=true">&#x25BE; Load All &#x25BE;</button>
      <button v-if="more" id="btn-more" v-on:click="more=false">&#x25B4; Collapse &#x25B4;</button>
      <ul>
        <li v-for="video in videos" :key="video.youtube_id">
          <router-link :to="'/video' + video.path.replace('videos/','')" :style="video.small"></router-link>
        </li>
      </ul>
      <transition name="fade" tag="div">
      <div v-if="more" id="more">
        <ul>
        <li v-for="video in all" :key="video.youtube_id">
          <router-link :to="'/video' + video.path.replace('videos/','')" :style="video.small"></router-link>
        </li>
      </ul>
      </div>
    </transition>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      videos: {},
      loading: true,
      all: {},
      more: false
    }
  },
  created () {
    this.getallvids()
  },
  methods: {
    getallvids () {
      getvids(data => {
        this.all = JSON.parse(data)
        this.videos = this.all.splice(0, 6)
        this.loading = false
        this.all = this.all.splice(5)
      })
    }
  }
}
function getvids (callback) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) { callback(xmlHttp.responseText) }
  }
  xmlHttp.open('GET', '/static/feed.json', true)
  xmlHttp.send()
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400');
#logo {
  top:0; left:0;
  position:absolute;
  max-width:10vw;
  max-height: 10vh;
}
#btn-more {
  font-weight: lighter;
  border: none;
  background-color: #FF002A;
  color: white;
  font-size: 120%;
  font-family: 'Oswald';
}
#social {
  top:10vh; left:0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  padding: 1vh;
  background-color: #FF002A;
  max-width: 2vw;
}
iframe {
  max-height: 75vw;
  max-width: 100vw;
}
#social a {
  color: white;
}
body {
  background: #252525 url("./assets/background-cf3e151a.jpg")
}
.list ul {
  padding:0;margin:0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.list li, .list li a {
  display: block;
  margin:0.5vh;
}
#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  /*margin-top: 30px;*/
}
.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1, .cube2 {
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
