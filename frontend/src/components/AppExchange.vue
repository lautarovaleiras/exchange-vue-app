<template>
<div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Currency convertion</div>
          <div class="card-body">
            <b-form @submit.prevent="submitForm">
              <b-input-group prepend="From">
                <b-form-select  v-model="selectedFrom" :options="options" required>
                </b-form-select>
              </b-input-group>
              <br>
              <b-input-group prepend="To">
                <b-form-select  v-model="selectedTo" :options="options" required>
                </b-form-select>
              </b-input-group>
              <br>

              <b-input-group prepend="$">
                <b-form-input v-model="amountValue" placeholder="0.00" type="text"  :state="amountState" aria-describedby="input-live-feedback" required></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  Invalid amount
                </b-form-invalid-feedback>
              </b-input-group>
              <br>
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
import axios from 'axios'

export default {
  name: 'AppExchange',
  computed: {
    ...mapGetters(['isAuthenticated', 'getToken']),
    amountState () {
      const regex = /[^0-9.]/g // Removed unnecessary quotes around the regex pattern
      const isValid = !regex.test(this.amountValue) // Changed "event" to "this.event" and inverted the result
      return isValid
    }
  },
  props: {
    msg: String
  },
  data () {
    return {
      amountValue: null,
      selectedFrom: null,
      selectedTo: 'USD',
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
        const response = await axios.post('http://localhost:3000/exchange/convert', body)
        const data = response.data
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

    axios.get('http://localhost:3000/exchange/currencies')
      .then(res => {
        this.options = res.data?.map(c => {
          return {
            value: c.currencyISO,
            text: `${c.currencyISO} - ${c.CurrencyName}`
          }
        })
      }).catch(error => {
        // Handle Error
        console.error(error)
      })
  },
  watch: {
    amountValue (newVal) {
      // Watch for changes in amountValue and trigger a re-render
      this.amountValue = newVal// Update amountValue with only numeric and decimal characters
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
