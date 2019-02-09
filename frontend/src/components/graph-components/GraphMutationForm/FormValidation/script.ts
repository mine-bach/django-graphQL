import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

export interface Validator {
  (value: any, form?: any): boolean | string
}

export type Validators<T> = {
  [name in (keyof T)]?: Validator[]
}

export type Rules<T> = {
  [name in (keyof T)]?: Validator[]
}


@Component({
  template: require('./template.html'),
})
export default class FormValidation<T> extends Vue {

  @Prop({ default: () => { } }) validators: Validators<T>
  @Prop({ type: Object }) form: T
  @Prop({ default: () => { } }) errors: object
  @Prop({ type: Boolean, default: true }) validateOnChange: boolean

  rules: Rules<T> = {}
  isValid: boolean = true
  validationErrors = null


  data() {
    return {
      validationErrors: { ...this.errors }
    }
  }

  @Watch('errors', { deep: true })
  errorsChanged(newErrors) {
    this.validationErrors = { ...newErrors }
    this.validateForm()
  }

  @Watch('form', { deep: true })
  formChanged() {
    this.validationErrors = null
    if (this.validateOnChange) {
      this.validateForm()
    }
  }

  get rulesFromErrors() {
    const errors = this.validationErrors
    if (!errors) {
      return {}
    }
    return Object.keys(errors).reduce((acc, name) => {
      const validators = errors[name]
      acc = { ...acc, [name]: validators }
      return acc
    }, {})
  }

  validateForm() {
    const form = this.form
    let errors = {}
    if (form) {
      const validators = this.validators || {}
      errors = Object.keys(validators)
        .filter((propertyName) => !!validators[propertyName as any])
        .reduce((acc, propertyName) => { 
          const rules = validators[propertyName]
          const ruleErrors = rules.map((rule) => rule(form[propertyName], form)).filter((error) => !!error)
          if (ruleErrors.length) {
            return { ...acc, [propertyName]: ruleErrors }
          }
          return acc
        }, {})
    }
    this.rules = {
      ...errors,
      ...this.rulesFromErrors
    }
    this.isValid = !Object.keys(this.rules).length
  }

  onSubmit() {
    this.validateForm()
    this.$emit('submit', this.isValid)
  }
}