<template>
  <div >
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <div class="col-sm-12">
          <div class="col-sm-7 text-left">
            <label>Liste des posts provenant de JsonPlaceHolder&nbsp {{formatted}}</label>
          </div>
          <div class="col-sm-5 text-right">
            Recherche : <input name="query" v-model="filterKey">
          </div>
        </div>
      </div>
      <div class="panel-body">
        <gridTemplate
          :data="data"
          :columns="columns"
          :filter-key="filterKey"
          :sort-key="sortColumn">
        </gridTemplate>
      </div>
    </div>
  </div>
</template>

<script>
import GridTemplate from '@/components/Grid'
import axios from 'axios'

export default {
  name: 'Post',
  components: {
    GridTemplate
  },
  data () {
    return {
      data: [],
      columns: ['postId', 'id', 'name', 'email', 'body'],
      sortColumn: 'name',
      sortOrders: { postId: 1, id: 1, name: 1, email: 1, body: 1 },
      filterKey: '',
      formatted: null
    }
  },
  mounted () {
    axios.get('http://jsonplaceholder.typicode.com/comments')
    .then(response => {
      // JSON responses are automatically parsed.
      this.data = response.data
      this.formatted = Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(2501.7599999998)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
