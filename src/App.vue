<template>
  <div>
    <div class="columns  is-mobile is-multiline is-gapless">
      <div class="column is-2">
        menu
      </div>
      <div class="column">
        live code
      </div>
    </div>
  </div>
</template>

<script>
const io = require('socket.io-client/dist/socket.io')
const socket = io.connect()
console.log(socket)
console.log('testxcx')
export default {
  name: 'App',
  data () {
    return {
      list: {
        name: 'Root',
        path: '/',
        children: []
      }
    }
  },
  mounted () {
    socket.on('list', (list) => {
      if (list.name.lastIndexOf('\\') !== -1) {
        list.name = list.name.substring(list.name.lastIndexOf('\\') + 1, list.name.length)
      }
      this.list = list
      console.log(this.list)
    })
  }
}
</script>

<style>
.is-sidebar-menu {
  padding: 2.5rem;
  background-color: red;
}
.is-sidebar-menu > li > a {
  color: yellow;
}

</style>
