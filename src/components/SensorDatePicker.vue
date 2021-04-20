<template>
  <div style="height: 100%; padding: 10px;">

    <v-row class="mx-auto my-auto">

      <v-col xs="12" sm="6" md="4" lg="2" xl="1">
        <v-menu v-model="fromVisible" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field color="teal" v-model="fromDate" :label="$t('from')" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker color="teal" v-model="fromDate" :max="fromDateMax" @input=updateDate></v-date-picker>
        </v-menu>
      </v-col>

      <v-col xs="12" sm="6" md="4" lg="2" xl="1">
        <v-menu v-model="toVisible" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field color="teal" v-model="toDate" :label="$t('to')" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker color="teal" v-model="toDate" :min="toDateMin" :max="toDateMax" @input=updateDate></v-date-picker>
        </v-menu>
      </v-col>

    </v-row>

    <v-snackbar color="teal darken-4" v-model="snackbarVisible" timeout=3000>
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="teal accent-4" text v-bind="attrs" @click="snackbarVisible = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import Vue from 'vue';
import weatherStationClient from "@/mixins/WeatherStationClient"
import dateParser from "@/mixins/DateParser"
import store from "@/store/index"

export default Vue.extend({

  mixins: [dateParser, weatherStationClient],

  data() {
    return {
      fromDate: '',
      fromDateMax: '',
      toDate: '',
      toDateMin: '',
      toDateMax: '',
      fromVisible: false,
      toVisible: false,
      snackbarVisible: false,
      snackbarText: ''
    }
  },

  created() {
    this.resetDatePickers()
  },

  methods: {
    updateDate() {
      this.fromVisible = false
      this.toVisible = false
      let from = this.convertStringToDate(this.fromDate + ' 00:00:00', 'YYYY-MM-DD hh:mm:ss')
      from = this.formatDate(from, 'YYYYMMDD-hhmmss')

      let to = ''
      let today = this.formatDate(new Date(), 'YYYY-MM-DD')
      if (this.toDate === today) {
        let currentTime = this.formatDate(new Date(), ' hh:mm:ss')
        to = this.convertStringToDate(this.toDate + currentTime, 'YYYY-MM-DD hh:mm:ss')
      } else if (this.toDate < today) {
        to = this.convertStringToDate(this.toDate + ' 23:59:59', 'YYYY-MM-DD hh:mm:ss')
      } else if (this.toDate > today) {
        this.resetDatePickersWithWarning(this.$t('invalidDateError'))
        console.error('Invalid date')
        return
      }

      if (this.fromDate > this.toDate) {
        this.resetDatePickersWithWarning(this.$t('invalidDateError'))
        console.error('Invalid date')
        return
      }

      if (this.fromDate > today) {
        this.resetDatePickersWithWarning(this.$t('invalidDateError'))
        console.error('Invalid date')
        return
      }

      to = this.formatDate(to, 'YYYYMMDD-hhmmss')

      this.updateAllowedDates()
      this.updateWeatherSensorData(store, from, to)
    },

    updateAllowedDates() {
      this.fromDateMax = this.toDate
      this.toDateMin = this.fromDate
      this.toDateMax = this.formatDate(new Date(), 'YYYY-MM-DD')
    },

    resetDatePickers() {
      this.fromDate = this.formatDate(this.convertStringToDate(store.state.from, 'YYYYMMDD-hhmmss'), 'YYYY-MM-DD')
      this.toDate = this.formatDate(this.convertStringToDate(store.state.to, 'YYYYMMDD-hhmmss'), 'YYYY-MM-DD')
      this.updateAllowedDates()
    },

    resetDatePickersWithWarning(warning) {
      this.snackbarText = warning
      this.snackbarVisible = true
      this.resetDatePickers()
    }
  }
})
</script>
