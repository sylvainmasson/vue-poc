<template>
  <div align="left">
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <label>Album {{ album.title }} de {{ album.artist }}</label>
      </div>
      <div class="panel-body">
        <div class="form-group col-sm-12">
            <label class="col-sm-3 text-right">Artist : </label>
            <div class="col-sm-9">{{ album.artist }}</div>
        </div>
        <div class="form-group col-sm-12">
            <label class="col-sm-3 text-right">Title : </label>
            <div class="col-sm-9">{{ album.title }}</div>
        </div>
        <div class="form-group col-sm-12">
            <label class="col-sm-3 text-right">Style : </label>
            <div class="col-sm-9">{{ album.style }}</div>
        </div>
        <div class="form-group col-sm-12" v-show="album.url">
            <label class="col-sm-3 text-right">Lien vers all music : </label>
            <div class="col-sm-9">
                <a v-bind:href="album.url" target="_blank">{{album.title}}</a>
            </div>
        </div>
      </div>
      <div class="panel-footer clearfix">
        <div class="pull-right">
             <button class="btn btn-success"  v-on:click="goToListe()">
                <span class="glyphicon glyphicon-arrow-left"></span>&nbsp;Retour liste
              </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'FicheAlbum',
  data () {
    return {
      album: {},
      key: this.$route.params.key
    }
  },
  firebase () {
    return {
      album: {
        source: firebase.database().ref('albums/' + this.$route.params.key),
        asObject: true
      }
    }
  },
  methods: {
    goToListe: function () {
      console.log('retour')
      this.$router.push('/albums')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
