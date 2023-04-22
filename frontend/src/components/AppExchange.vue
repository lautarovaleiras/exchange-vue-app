<template>
<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Currency convertion</div>
          <div class="card-body">

            <app-spinner v-if="mounting"></app-spinner>
            <b-form @submit.prevent="submitForm" v-show="!mounting">
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
              <b-button type="submit" variant="primary" :disabled="!isFormValid">Convert</b-button>
            </b-form>
          </div>
          <div class="spinner" v-if="isLoading">
            <b-spinner  variant="primary" label="Spinning"></b-spinner>
          </div>

          <div v-show="amountConverted !== null" class="card-footer bg-light">
            <p class="mb-0">Result:</p>
            <h4 class="mb-0">{{ amountConverted }}</h4>
          </div>

          <div v-show="badRequest != null" class="card-footer bg-light">
            <h4 class="mb-0">{{ badRequest }}</h4>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { isEmpty } from 'lodash'
import AppSpinner from './AppSpinner.vue'

export default {
  name: 'AppExchange',
  components: { AppSpinner },
  computed: {
    ...mapGetters(['isAuthenticated', 'getToken']),
    amountState () {
      const regex = /[^0-9.]/g
      const isValid = !regex.test(this.amountValue)
      return isValid && !isEmpty(this.amountValue) && this.amountValue > 0 && this.amountValue.length < 14 // max 14 for avoid big numbers
    },
    isFormValid () {
      return this.amountState && this.selectedFrom && this.selectedTo
    }
  },
  data () {
    return {
      amountValue: null,
      selectedFrom: 'ARS',
      selectedTo: 'USD',
      options: [],
      amountConverted: null,
      isLoading: false,
      mounting: true,
      badRequest: null
    }
  },
  methods: {
    async doFetch () {
      this.isLoading = true
      try {
        const body = {
          from: this.selectedFrom,
          to: this.selectedTo,
          amount: Number(this.amountValue)
        }
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/exchange/convert`, body)
        const amount = response.data?.amountConverted
        this.amountConverted = amount ? amount.toFixed(3) : 'Sin datos'
      } catch (error) {
        if (error?.response?.status === 400) {
          console.info(error.response.data.message)

          this.badRequest = error.response.data.message
        }
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    submitForm (event) {
      event.preventDefault()
      this.doFetch()
    }
  },
  mounted () {
    this.mounting = true
    axios.get(`${process.env.VUE_APP_API_URL}/exchange/currencies`)
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
      }).finally(() => {
        this.mounting = false
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

.spinner{
  justify-content: center;
  padding: 1rem;
  display: flex;
}

</style>
