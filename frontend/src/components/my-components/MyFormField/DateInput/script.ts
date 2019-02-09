
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import * as moment from 'moment'

const FORMAT = 'DD/MM/YYYY'


const formatDateMask = (input) => {
  const value = input || ''
  if (value.length === 3 && value[2] !== '/') {
    return `${value.slice(0, 2)}/${value.slice(2)}`
  } else if (value.length === 6 && value[5] !== '/') {
    return `${value.slice(0, 5)}/${value.slice(5)}`
  } else {
    return value
  }
}


require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class DateInput extends Vue {

  @Prop() value: Date
  @Prop({ type: String }) name: string
  @Prop({ type: Boolean, default: false }) required: boolean
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: Boolean, default: true }) showPicker: boolean
  @Prop({ type: Boolean, default: false }) showResult: boolean

  val: string
  dialog = false
  dateVal: string = null
  isValid: boolean = false

  data() {
    let val = this.value && `${this.value}` || ''
    if (val) {
      const newVal = moment(val, 'YYYY-MM-DD', true).format(FORMAT)
      if (newVal === 'Invalid date') {
        val = moment(val, FORMAT).format(FORMAT)
      } else {
        val = newVal
      }
    }
    return { val }
  }

  mounted() {
    if (this.val) {
      this.validate()
    }
  }

  @Watch('dateVal')
  dateValChanged(dateVal) {
    this.val = moment(dateVal, 'YYYY-MM-DD', true).format(FORMAT)
    this.$emit('input', this.val)
  }

  @Watch('val')
  onChange(val) {
    if (typeof (val) === 'object') {
      val = val.target.value
    }
    const newVal = formatDateMask(val)
    this.val = newVal
    if (newVal.length === 10) {
      this.validate()
    } else {
      this.isValid = false
    }
  }

  get result(): string {
    return moment(this.val, FORMAT, true).format('DD MMMM YYYY')
  }


  validate() {
    const parsedDate = moment(this.val, FORMAT, true)
    if (parsedDate.isValid()) {
      this.dateVal = moment(this.val, FORMAT, true).format('YYYY-MM-DD')
      this.isValid = true
      this.$emit('on-error', "")
    } else {
      this.isValid = false
      this.$emit('on-error', "format invalide")
    }
    this.$emit('input', this.val)
  }

  closeDialog() {
    this.dialog = false
  }
}