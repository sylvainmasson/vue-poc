<template>
  <div align="left">
    <h3>Crud sur firebase : base de données NoSQL fourni par Google</h3>
    </br>
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <div class="col-sm-12">
          <div class="col-sm-7 text-left">
            <label>Liste des albums &nbsp</label>
            <button class="btn btn-primary" v-on:click="addAlbum()" >Ajouter un album</button>
          </div>
          <div class="col-sm-5 text-right">
            Recherche : <input name="query" v-model="filterKey">
          </div>
        </div>
      </div>
    <div class="panel-body">
      <table class="table table-condensed table-responsive">
      <thead>
          <tr>
                <th v-for="column in columns"
                @click="sortBy(column)"
                :class="{ active: sortColumn == column }">
                    {{column }}
                  <span class="arrow" :class="sortOrders[column] > 0 ? 'asc' : 'dsc'">
                  </span>
                </th>
                <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredData">
            <td v-for="key in columns">
              {{entry[key]}}
            </td>
            <td>
              <button class="btn btn-success"  v-on:click="goToAlbum(entry)">
                <span class="glyphicon glyphicon-eye-open"></span>&nbsp;Détail
              </button>
              <button class="btn btn-primary" v-on:click="modifyAlbum(entry)">
                <span class="glyphicon glyphicon-pencil"></span>&nbsp;Modifier
              </button>
              <button class="btn btn-danger" v-on:click="removeAlbum(entry)">
                <span class="glyphicon glyphicon-trash"></span>&nbsp;Supprimer
              </button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
    <br/>
    <div class="panel panel-default" v-if="modify != null">
      <div class="panel-heading clearfix">
        <label>Modification ou ajout &nbsp</label>
      </div>
      <div class="panel-body">
        <form id="form" v-on:submit.prevent="saveAlbum">
          <input type="text" v-model="selectedAlbum.artist" placeholder="Artist">
          <input type="text" v-model="selectedAlbum.title" placeholder="Title">
          <input type="text" v-model="selectedAlbum.style" placeholder="Style">
          <input type="text" v-model="selectedAlbum.url" placeholder="Url all music">
          <input type="number" v-model="selectedAlbum.nbPistes" placeholder="Nombre de pistes">
          <button class="btn btn-success"  v-on:click="saveAlbum()">
            <span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;Enregistrer
          </button>
          <button class="btn btn-sm btn-default" v-on:click="cancel()">
            <span class="glyphicon glyphicon-repeat"></span>&nbsp;Annuler
          </button>
        </form>
        <ul class="text-danger">
          <li v-show="!validation.artist">Artist cannot be empty.</li>
          <li v-show="!validation.title">Title cannot be empty.</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyA4Xfv-Mstbo1tuc6hAIGZRZD12Dukf14w',
  authDomain: 'my-project-50ad4.firebaseapp.com',
  databaseURL: 'https://my-project-50ad4.firebaseio.com',
  projectId: 'my-project-50ad4',
  storageBucket: 'my-project-50ad4.appspot.com',
  messagingSenderId: '946937399162'
}
firebase.initializeApp(config)

var albumsRef = firebase.database().ref('albums')

var resetAlbum = function () {
  return {
    artist: '',
    title: '',
    style: '',
    url: '',
    nbPistes: 0
  }
}

var duplicateAlbum = function (album) {
  return {
    artist: album.artist,
    title: album.title,
    style: album.style,
    url: album.url,
    nbPistes: album.nbPistes
  }
}

export default {
  name: 'Album',
  data () {
    return {
      albums: [],
      columns: ['artist', 'title', 'style', 'nbPistes'],
      selectedAlbum: {
        artist: '',
        title: '',
        style: '',
        url: '',
        nbPistes: 0
      },
      sortColumn: 'artist',
      sortOrders: { artist: 1, title: 1, style: 1, nbPistes: 1 },
      filterKey: '',
      modify: null
    }
  },
  // Récupération des valeurs sans vueFire
  /* mounted () {
    albumsRef.on('value', function (snapshot) {
      this.albums = snapshot.val()
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }, */
  // Récupération des valeurs avec vueFire, import dans index.js
  firebase: {
    albums: albumsRef
  },
   // computed property for form validation state and filtering, sorting data
  computed: {
    validation: function () {
      return {
        artist: !!this.selectedAlbum.artist.trim(),
        title: !!this.selectedAlbum.title.trim()
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
    filteredData: function () {
      var sortColumn = this.sortColumn
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortColumn] || 1
      var data = this.albums
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortColumn) {
        data = data.slice().sort(function (a, b) {
          a = a[sortColumn]
          b = b[sortColumn]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    saveAlbum: function () {
      // On enregistre si le formulaire est valide
      if (this.isValid) {
        // Modification
        if (this.modify) {
          albumsRef.child(this.key).set(
            {
              artist: this.selectedAlbum.artist,
              title: this.selectedAlbum.title,
              style: this.selectedAlbum.style,
              url: this.selectedAlbum.url,
              nbPistes: this.selectedAlbum.nbPistes
            }
          )
          this.modify = null
        } else {
          // Ajout
          albumsRef.push(this.selectedAlbum)
          this.selectedAlbum = resetAlbum()
        }
      }
    },
    addAlbum: function () {
      this.modify = false
      this.selectedAlbum = resetAlbum()
    },
    modifyAlbum: function (album) {
      // Enregistrement de l'album avant modification pour rechargement si clic sur annuler
      this.savedAlbum = duplicateAlbum(album)
      this.selectedAlbum = album
      this.key = album['.key']
      this.modify = true
    },
    removeAlbum: function (album) {
      console.log(album['.key'])
      albumsRef.child(album['.key']).remove()
    },
    goToAlbum: function (album) {
      this.$router.push('/albums/' + album['.key'])
    },
    cancel: function () {
      if (this.modify) {
        // Restauration de l'album avant modification
        this.selectedAlbum.artist = this.savedAlbum.artist
        this.selectedAlbum.title = this.savedAlbum.title
        this.selectedAlbum.style = this.savedAlbum.style
        this.selectedAlbum.url = this.savedAlbum.url
        this.selectedAlbum.nbPistes = this.savedAlbum.nbPistes
      }
      this.modify = null
    },
    sortBy: function (column) {
      this.sortColumn = column
      this.sortOrders[column] = this.sortOrders[column] * -1
      console.log(this.sortOrders[column])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
