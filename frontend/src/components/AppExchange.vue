<template>
<div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Currency convertion</div>
          <div class="card-body">
            <b-form @submit.prevent="submitForm">
        <b-form-group>
          <b-form-select  v-model="fromSelected" :options="from">
          </b-form-select>
        </b-form-group>

        <b-form-group>
          <b-form-select  v-model="toSelected"  :options="to">
          </b-form-select>
        </b-form-group>

        <b-form-group >
          <b-form-input v-model="inputValue" placeholder="Enter a value"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <b-button @click="doFetch">Fetch Data</b-button>
    <p>Response: {{ res }}</p>
  </div> -->

</template>

<script>
export default {
  name: 'AppExchange',
  props: {
    msg: String
  },
  data () {
    return {
      fromSelected: null,
      from: [
        { value: null, text: 'From' }
      ],
      toSelected: null,
      to: [
        { value: null, text: 'To' }
      ]
    }
  },
  methods: {
    async doFetch () {
      try {
        const response = await fetch('')
        const data = await response.json()
        this.res = data
      } catch (error) {
        // Log error in Db
      }
    }
  },
  mounted () {
    console.log('init')
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
