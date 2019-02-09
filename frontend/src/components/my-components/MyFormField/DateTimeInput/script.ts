
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import * as moment from 'moment'
import * as trim from 'lodash.trim'

const FORMAT = 'DD/MM/YYYY HH:mm'


require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class DateTimeInput extends Vue {

  @Prop() value: Date // datetime iso format
  @Prop({ type: String }) name: string
  @Prop({ type: Boolean, default: false }) required: boolean
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: Boolean, default: true }) showPicker: boolean

  pickerDate: string = ''
  date: string = ''
  time: string = ''
  dialog = false

  data() {
    let momentDate, date, time, pickerDate
    if (this.value) {
      if (typeof (this.value) === 'string') {
        momentDate = moment(this.value)
      } else {
        momentDate = this.value
      }
      date = momentDate.format('DD/MM/YYYY')
      pickerDate = momentDate.format('YYYY-MM-DD')
      time = momentDate.format('hh:mm')
    }
    return { date, pickerDate, time }
  }

  inputDateChanged(event) {
    const { value } = event.target
    if (value.length === 3 && value[2] !== '/') {
      this.date = `${value.slice(0, 2)}/${value.slice(2)}`
    } else if (value.length === 6 && value[5] !== '/') {
      this.date = `${value.slice(0, 5)}/${value.slice(5)}`
    } else {
      this.date = value
    }
    this.validate()
  }

  datePicked(pickerDate) {
    this.pickerDate = pickerDate
    this.date = this.fromInputDateToFrenchDate(pickerDate)
    this.validate()
  }

  fromInputDateToPickerDate(dateString) {
    return moment(dateString, 'DD/MM/YYYY', true).format('YYYY-MM-DD')
  }

  fromInputDateToFrenchDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).format('DD/MM/YYYY')
  }

  timeChanged(event) {
    let time = event.target.value || ''
    while (time.indexOf('::') > -1) {
      time = time.replace('::', ':')
    }
    const trimedTime = trim(time, ':')
    if (trimedTime.length === 2) {
      time = `${trimedTime}:`
    }
    if (time.length > 5) {
      time = time.slice(0, 5)
    }
    this.time = time
    this.validate()
  }


  validate() {
    const parsedDatetime = moment(`${this.date} ${this.time || ''}`, FORMAT, true);
    let datetime
    if (parsedDatetime.isValid()) {
      datetime = parsedDatetime.format('YYYY-MM-DD HH:mm')
      this.pickerDate = parsedDatetime.format('YYYY-MM-DD')
      this.time = parsedDatetime.format('HH:mm')
      this.$emit('on-error', '')
    } else {
      datetime = `${this.date} ${this.time}`
      if (this.time === '') {
        this.$emit('on-error', 'format invalide')
      }
    }
    this.$emit('change', datetime)
    this.$emit('input', datetime)
  }

  closeDialog() {
    this.dialog = false
  }
}