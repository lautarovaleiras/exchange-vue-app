<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <b-button @click="doFetch">Fetch Data</b-button>
  <p>Response: {{ res }}</p>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      title: 'Testing API',
      res: null
    }
  },

  methods: {
    async doFetch () {
      try {
        const response = await fetch('https://e2o1weg9ce.execute-api.us-east-1.amazonaws.com/dev/stats')
        const data = await response.json()
        this.res = data
      } catch (error) {
        // Log error in Db
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
