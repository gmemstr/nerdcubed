<template>
  <div id="app">
    <header>
      <router-link to="/"><img src="./assets/logo.jpg" alt="Logo" id="logo"></router-link>
    </header>
    <router-view />
    <div class="list">
      <ul>
        <li v-for="video in videos">
          <router-link :to="'/video' + video.path.replace('videos/','')" :style="video.small"></router-link>
        </li>
      </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      videos: null
    }
  },
  created () {
    this.getallvids()
  },
  methods: {
    getallvids () {
      getvids(data => {
        this.videos = JSON.parse(data)
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
#logo {
  top:0; left:0;
  position:absolute;
  max-width:5vw;
}
body {
  background: #252525 url("./assets/background-cf3e151a.jpg")
}
.list li a {
  display: inline-block;
}
.list li {
  display: inline-block;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>
