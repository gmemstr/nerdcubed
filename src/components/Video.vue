<template>
  <div class="video">
    <h1>{{video}}</h1>
    <iframe :src="video_id" allowfullscreen="allowfullscreen" type="text/html" height="576" frameborder="0" width="1024">{{video}}</iframe>
  </div>
</template>

<script>
export default {
  name: 'Single',
  data () {
    return {
      video: null,
      video_id: null,
      exists: false
    }
  },
  created () {
    this.getthisvid()
  },
  watch: {
    '$route': 'getthisvid'
  },
  methods: {
    getthisvid () {
      getvids(data => {
        var videos = JSON.parse(data)
        for (var i = videos.length - 1; i >= 0; i--) {
          if (videos[i]['path'].replace('videos/', '') === '/' + this.$route.params.title + '/') {
            this.video = videos[i].title
            this.video_id = 'https://www.youtube.com/embed/' + videos[i]['youtube_id']
            this.exists = true
          }
        }
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
