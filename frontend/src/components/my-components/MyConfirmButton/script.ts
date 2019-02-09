
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
export default class MyConfirmButton extends Vue {

  @Prop({ type: String }) headline: string
  @Prop({ type: String }) confirmText: string
  @Prop({ type: String }) confirmButtonLabel: string
  @Prop({ type: String }) cancelButtonLabel: string
  @Prop({ type: String }) buttonClass: string
  @Prop({ type: String, validator: colorValidator }) color: string
  @Prop({ type: Boolean, default: false }) disabled: boolean
  @Prop({ type: Boolean, default: false }) cancelOnly: boolean

  dialog: boolean = false
  confirmButtonDisabled = false

  data() {
    return {
      innerHeadline: this.headline || "Continuer ?",
      innerConfirmText: this.confirmText || 'Êtes-vous sûr de vouloir effectuer cette action ?',
      innerConfirmButtonLabel: this.confirmButtonLabel || "Confirmer",
      innerCancelButtonLabel: this.cancelButtonLabel || "Annuler",
    }
  }

  closeDialog() {
    this.dialog = false
  }

  cancelButtonClicked() {
    this.closeDialog()
  }

  confirmButtonClicked() {
    this.confirmButtonDisabled = true
    this.$emit('confirm')
    this.closeDialog()
    this.confirmButtonDisabled = false
  }
}