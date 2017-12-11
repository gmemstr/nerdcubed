<template>
  <div class="video">
    <h1>{{ video }}</h1>
    <iframe :src="video_id" allowfullscreen="allowfullscreen" type="text/html" height="480" frameborder="0" width="854">{{video}}</iframe>
  </div>
</template>

<script>
export default {
  name: 'Latest',
  data () {
    return {
      video: 'Loading',
      video_id: null
    }
  },
  created () {
    this.getlatestvid()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getlatestvid'
  },
  methods: {
    getlatestvid () {
      getvids(data => {
        var video = JSON.parse(data)[0]
        this.video = video['title']
        this.video_id = 'https://www.youtube.com/embed/' + video['youtube_id']
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
