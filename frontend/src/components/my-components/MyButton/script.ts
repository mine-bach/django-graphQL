
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

const colorValidator = (value) => [
  'black',
  'yellow',
  'orange',
  'lightblue',
  'blue',
].includes(value)

require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class MyButton extends Vue {
  @Prop({ type: String }) text
  @Prop({ type: Object }) to
  @Prop({ type: String }) href: string
  @Prop({ type: String }) target: string
  @Prop({ type: String }) type
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: String, validator: colorValidator }) color: string

  onClick(value) {
    this.$emit('click', value)
  }

  dialog: boolean = false

  get colorClass(): string {
    if (this.color) {
      return `${this.color}-bgcolor white--text`
    }
    return 'yellow-bgcolor white--text'
  }
}
