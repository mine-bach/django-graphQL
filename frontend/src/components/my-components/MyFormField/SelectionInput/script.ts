
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import MultiSelect from 'vue-multiselect'

const TYPES = ['radio', 'toggle', 'selection', 'switch']

require("./style.scss")
@Component({
  template: require('./template.html'),
  components: {
    MultiSelect,
  }
})
export default class SelectionInput extends Vue {
  @Prop({ type: String }) innerClass: string
  @Prop() value: string
  @Prop({ type: String, default: 'radio', validator: (o) => TYPES.indexOf(o) > -1 }) type: 'radio' | 'toggle' | 'selection' | 'switch'
  @Prop({ type: String, required: true }) name: string
  @Prop({ type: Boolean, default: false }) nullable: boolean
  @Prop({ type: String, required: false, default: "choisissez une option" }) placeholder: string
  @Prop({ type: Boolean, default: false }) required: boolean
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: Array, default: () => [] }) choices: { name: string, value: string, text: string }[]
  @Prop({ type: String, default: '' }) selectionGroupLabel: string
  @Prop({ type: String, default: '' }) selectionGroupValues: string

  toggleValue = null
  selection: { value: string, text: string } = { value: '', text: '' }

  data() {
    if (this.type === 'toggle' || this.type === 'switch' || this.type === 'radio') {
      return {
        toggleValue: this.value
      }
    } else if (this.type === 'selection') {
      let selection = []
      if (this.selectionGroupLabel) {
        for (const itemsByLabel of this.choices) {
          for (const item of itemsByLabel[this.selectionGroupValues]) {
            if (item.value === this.value) {
              selection.push(item)
            }
          }
        }
      } else {
        selection = this.choices.filter((o) => o.value === this.value)
      }
      return { selection }
    }
  }

  onRadioInput(event) {
    const value = event.target.value
    this.$emit('input', value)
  }

  onToggleValue(value) {
    if (!this.disabled) {
      if (value === this.toggleValue && this.nullable) {
        value = null
      }
      this.toggleValue = value
      this.$emit('input', value)
    }
  }

  onSelectionInput(selection) {
    if (!selection) {
      selection = { value: '', text: '' }
    }
    this.$emit('selected', selection)
    this.$emit('input', selection.value)
  }

  get isRadio() {
    return this.type === 'radio'
  }

  get isToggle() {
    return this.type === 'toggle'
  }

  get isSwitch() {
    return this.type === 'switch'
  }

  get isSelection() {
    return this.type === 'selection'
  }
}