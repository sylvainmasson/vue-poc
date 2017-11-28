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
        <vue-good-table
        :columns='columnsTable'
        :rows='filteredData'
        :paginate='true'
        :lineNumbers='false'
        :defaultSortBy="{field: 'artist', type :'asc'}"
        styleClass="table table-bordered condensed">
          <template slot="table-row-after" slot-scope="props">
            <td>
              <button class="btn btn-success"  v-on:click="goToAlbum(props.row)">
                <span class="glyphicon glyphicon-eye-open"></span>&nbsp;Détail
              </button>
              <button class="btn btn-primary" v-on:click="modifyAlbum(props.row)">
                <span class="glyphicon glyphicon-pencil"></span>&nbsp;Modifier
              </button>
              <button class="btn btn-danger" v-on:click="removeAlbum(props.row)">
                <span class="glyphicon glyphicon-trash"></span>&nbsp;Supprimer
              </button>
            </td>
          </template>
        </vue-good-table>
      </div>
    </div>
    <br/>
    <div class="panel panel-default" v-if="modify != null">
      <div class="panel-heading clearfix">
        <label>Modification ou ajout &nbsp</label>
      </div>
      <div class="panel-body">
        <form id="form" v-on:submit.prevent="saveAlbum">
          <div class="form-group" :class="{'has-error': !validation.artist }"> 
            <label class="control-label" for="artist">Artist *</label>
            <input type="text" id="artist" class="form-control" v-model="selectedAlbum.artist">
            <p class="text-danger" v-show="!validation.artist">Artist cannot be empty.</p>
          </div>
          <div class="form-group" :class="{'has-error': !validation.title }"> 
            <label class="control-label" for="title">Title *</label>
            <input type="text" id="title" class="form-control" v-model="selectedAlbum.title">
            <p class="text-danger" v-show="!validation.title">Title cannot be empty.</p>
          </div>
          <div class="form-group"> 
            <label class="control-label" for="style">Style</label>
            <input type="text" id="style" class="form-control" v-model="selectedAlbum.style">
          </div>
          <div class="form-group"> 
            <label class="control-label" for="url">Url all music</label>
            <input type="text" id="url" class="form-control" v-model="selectedAlbum.url">
          </div>
          <div class="form-group"> 
            <label class="control-label" for="url">Nombre de pistes</label>
            <input type="number" v-model="selectedAlbum.nbPistes">
          </div>
          <button class="btn btn-success"  v-on:click="saveAlbum()" :disabled="!isValid">
            <span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;Enregistrer
          </button>
          <button class="btn btn-sm btn-default" v-on:click="cancel()">
            <span class="glyphicon glyphicon-repeat"></span>&nbsp;Annuler
          </button>
        </form>
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
      modify: null,
      columnsTable: [
        {
          label: 'Artiste',
          field: 'artist',
          filterable: true
        },
        {
          label: 'Titre',
          field: 'title',
          filterable: true
        },
        {
          label: 'Style',
          field: 'style',
          filterable: true
        },
        {
          label: 'Nombre de pistes',
          field: 'nbPistes',
          type: 'number',
          filterable: true
        },
        {
          label: 'Actions',
          field: null
        }
      ]
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
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var data = this.albums
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
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
