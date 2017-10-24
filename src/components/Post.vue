<template>
  <div >
    <form id="search">
      Search <input name="query" v-model="filterKey">
    </form>
  <gridTemplate
    :data="data"
    :columns="columns"
    :filter-key="filterKey">
  </gridTemplate>
  </div>
</template>

<script>
import GridTemplate from '@/components/Grid'

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
      filterKey: ''
    }
  },
  mounted () {
    this.$http.get('https://jsonplaceholder.typicode.com/comments').then(response => {
      this.data = response.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
