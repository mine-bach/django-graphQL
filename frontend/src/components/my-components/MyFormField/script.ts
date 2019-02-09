
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import HtmlEditor from './HtmlEditor/script'
import { ToolbarType } from './HtmlEditor/script'
import DateInput from './DateInput/script'
import DateTimeInput from './DateTimeInput/script'
import SelectionInput from './SelectionInput/script'

import * as mailcheck from 'mailcheck'

const INPUT_TYPES = ['text', 'url', 'radio', 'toggle', 'selection', 'textarea', 'date', 'datetime', 'number', 'email', 'custom', 'switch', 'checkbox', 'mobile', 'html', 'password']
const ICONS = ['mobile', 'email', 'custom'] //, 'calendar', 'info', 'error', 'user', 'group', 'card', 'loyalty-card', 'message', 'image']


var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const isValidEmail = (email) => {
  return !!email.match(emailRegex)
}

var mobileRegex = /^\+?[0123456789 ]+$/i;
const isValidMobile = (mobile) => {
  return !!mobile.match(mobileRegex)
}

require("./style.scss")
@Component({
  template: require("./template.html"),
  components: {
    DateInput,
    DateTimeInput,
    HtmlEditor,
    SelectionInput,
  }
})
export default class MyFormField extends Vue {

  @Prop({ type: String, required: true, validator: (value) => INPUT_TYPES.indexOf(value) > -1 }) type: string
  @Prop({ type: String }) label: string
  @Prop({ type: String }) helpText: string
  @Prop({ type: String }) placeholder: string
  @Prop({ type: Boolean, default: false }) labelPlaceholder: boolean
  @Prop({ type: String, default: 'left' }) iconPosition: String
  @Prop({ type: Boolean, default: false }) required: boolean
  @Prop({ type: Boolean, default: false }) inline: boolean
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ required: true, type: Array, default: () => [] }) errors: string[]
  @Prop({ type: Array, default: () => [] }) choices: { name: string, text: string, value: any }[]
  @Prop({ type: Boolean, default: false }) nullable: boolean
  @Prop() value
  @Prop({ type: String }) name: string
  @Prop({ type: String }) labelIcon: string
  @Prop({ type: String }) suffix: string
  @Prop({ type: String, validator: (value) => ICONS.indexOf(value) > -1 }) icon: string
  @Prop({ type: String }) helpTooltipText: string
  @Prop({ type: [String, Number], default: '1' }) ratio: string
  @Prop({ type: Number }) min: number
  @Prop({ type: Number }) max: number
  @Prop({ type: Number }) maxlength: number
  @Prop({ type: Boolean }) primary: boolean
  @Prop({ type: Number, default: 1 }) step: number
  @Prop({ type: Boolean, default: false }) isPrice: boolean
  @Prop({ type: Boolean, default: false }) isPoint: boolean
  @Prop({ type: Boolean, default: true }) showDatePicker: boolean
  @Prop({ type: Boolean, default: false }) showDateResult: boolean
  @Prop({ type: String, default: 'full' }) toolbarType: ToolbarType


  val: string
  innerError: string = ''
  suggestion: string = ''
  innerLabel: string = ''
  innerPlaceholder: string = ''

  data() {
    let innerLabel = this.label
    let innerPlaceholder = this.placeholder
    if (this.labelPlaceholder) {
      innerLabel = ''
      innerPlaceholder = this.label
      if (this.required) {
        innerPlaceholder = `${innerPlaceholder}*`
      }
    }

    const ratio = this.ratio.toString()
    let containerClass = ''
    if (ratio === '0') {
      containerClass = 'main-container'
    } else if (ratio === '1') {
      containerClass = 'container-full'
    } else if (ratio === '2') {
      containerClass = 'container-half'
    }

    return {
      val: this.value,
      innerLabel,
      innerPlaceholder,
      containerClass,
    }
  }

  @Watch('label')
  labelChanged(label) {
    if (this.labelPlaceholder) {
      this.innerLabel = ''
      this.innerPlaceholder = this.buildPlaceholder(label)
    } else {
      this.innerLabel = label
    }
  }

  @Watch('placeholder')
  placeholderChanged(placeholder) {
    this.innerPlaceholder = this.buildPlaceholder(placeholder)
  }

  buildPlaceholder(value: string): string {
    let placeholder = value
    if (this.required) {
      placeholder = `${placeholder}*`
    }
    return placeholder
  }

  get error() {
    let error = this.errors.length && this.errors[0]
    return error || this.innerError || ''
  }

  inputChanged(event) {
    const value = event.target.value
    const that = this
    if (this.isEmail) {
      mailcheck.run({
        email: value,
        domainThreshold: 1,
        domains: [
          '9online.fr', 'aliceadsl.fr', 'aol.com', 'aol.fr', 'bbox.fr', 'cegetel.net', 'club-internet.fr',
          'free.fr', 'gmail.com', 'google.com', 'hotmail.com', 'hotmail.fr', 'icloud.com', 'laposte.net',
          'live.fr', 'me.com', 'msn.com', 'neuf.fr', 'noos.fr', 'numericable.fr', 'orange.fr',
          'outlook.com', 'outlook.fr', 'sfr.fr', 'voila.fr', 'wanadoo.fr', 'yahoo.com', 'yahoo.fr'],
        topLevelDomains: ['info', 'com', 'org', 'net', 'fr'],
        secondLevelDomains: [],
        suggested(suggestion) {
          that.suggestion = suggestion.full
        },
        empty() {
          that.suggestion = ''
        }
      })
    }
    this.valueChanged(value)
  }

  useSuggestion(suggestion) {
    this.valueChanged(suggestion)
    this.suggestion = ''
    this.innerError = ''
  }

  onChange(event) {
    const value = event.target.value
    this.val = value
    this.$emit('change', this.val)
  }

  @Watch('value')
  valueChanged(value) {
    if (value !== this.val) {
      this.val = value
      this.$emit('input', this.val)
    }
  }

  onError(message) {
    this.innerError = message
  }

  onFocus(value) {
    this.$emit('focus', value)
  }

  onBlur(event) {
    const value = event.target.value
    if (this.isEmail) {
      this.innerError = ''
      if (value && !isValidEmail(value)) {
        this.innerError = "L'email n'est pas valide"
      }
    }
    if (this.isMobile) {
      this.innerError = ''
      if (value && !isValidMobile(value)) {
        this.innerError = "Le numéro de téléphone n'est pas valide"
      }
    }
    this.$emit('blur', event)
  }

  get isDate() {
    return this.type === 'date'
  }

  get isDateTime() {
    return this.type === 'datetime'
  }

  get isSwitch() {
    return this.type === 'switch'
  }

  get isEmail() {
    return this.type === 'email'
  }

  get isCheckbox() {
    return this.type === 'checkbox'
  }

  get isRadio() {
    return this.type === 'radio'
  }

  get isToggle() {
    return this.type === 'toggle'
  }

  get isSelection() {
    return this.type === 'selection'
  }

  get isTextarea() {
    return this.type === 'textarea'
  }

  get isMobile() {
    return this.type === 'mobile'
  }

  get isHtml() {
    return this.type === 'html'
  }


  get isMobileIcon(): boolean {
    return this.icon == 'mobile'
  }
  get isEmailIcon(): boolean {
    return this.icon == 'email'
  }

  get iconPositionClassName() {
    if (this.icon) {
      let className
      if (this.iconPosition == 'right')
        className = 'align-icon-right'
      else {
        className = 'align-icon-left'
      }
      return className
    }
  }
}