<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> Poc vue</router-link>
    </div>
    <ul class="nav navbar-nav navbar-left">
      <li><a href="/post">Post</a></li>
      <li v-show="isLoggedIn()"><a href="/albums">Albums</a></li>
      <li><a href="/public-battles">Public battles</a></li>
      <li v-show="isLoggedIn()"><a href="/private-battles">Private battles</a></li>
      <li><a href="/table-example">Exemple table</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn, login, logout } from '../../utils/auth'

export default {
  name: 'app-nav',
  methods: {
    handleLogin () {
      login()
    },
    handleLogout () {
      logout()
    },
    isLoggedIn () {
      return isLoggedIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
