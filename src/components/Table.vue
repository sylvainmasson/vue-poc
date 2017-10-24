<template>
  <div >
   <h3>Tableau filtré et trié : récupération des données par vue-resource sur jsonplaceholder
    </h3>
  <form id="search">
    Search <input name="query" v-model="filterKey">
  </form>
   <table>
    <thead>
      <tr>
        <tr >
            <th v-for="column in columns"
            @click="sortBy(column)"
            :class="{ active: sortColumn == column }">
                {{column }}
              <span class="arrow" :class="sortOrders[column] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
      </tr>
    </thead>
    <tbody>
       <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
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
  },
  computed: {
    filteredData: function () {
      var sortColumn = this.sortColumn
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortColumn] || 1
      var data = this.data
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
    sortBy: function (column) {
      console.log('Colonne à trier : ' + column)
      this.sortColumn = column
      this.sortOrders[column] = this.sortOrders[column] * -1
      console.log(this.sortOrders[column])
    }
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
