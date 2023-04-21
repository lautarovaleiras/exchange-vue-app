<template>
<div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Currency convertion</div>
          <div class="card-body">
            <b-form @submit.prevent="submitForm">
              <b-form-group>
                <b-form-select  v-model="selectedFrom" :options="options" required>
                </b-form-select>
              </b-form-group>

              <b-form-group>
                <b-form-select  v-model="selectedTo"  :options="options" required>
                </b-form-select>
              </b-form-group>

              <b-form-group>
                <b-form-input v-model="amountValue" placeholder="$ 0.00" type="number" required></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Convert</b-button>
            </b-form>
          </div>

          <p v-show="amountConverted !== null">Result: {{ amountConverted }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppExchange',
  computed: { ...mapGetters(['isAuthenticated', 'getToken']) },

  props: {
    msg: String
  },
  data () {
    return {
      amountValue: null,
      selectedFrom: null,
      selectedTo: null,
      options: [],
      amountConverted: null
    }
  },
  methods: {
    async doFetch () {
      try {
        const body = {
          from: this.selectedFrom,
          to: this.selectedTo,
          amount: Number(this.amountValue)
        }
        const response = await fetch('http://localhost:3000/exchange/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        this.amountConverted = data?.amountConverted || 'no hay datos'
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    },
    submitForm (event) {
      event.preventDefault()
      this.doFetch()
    }
  },
  mounted () {
    console.log(this.getToken)
    console.log(this.isAuthenticated)

    fetch('http://localhost:3000/exchange/currencies')
      .then(response => response.json())
      .then(data => {
        this.options = data.map(c => {
          return {
            value: c.currencyISO,
            text: `${c.currencyISO} - ${c.CurrencyName}`
          }
        })
      })
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
