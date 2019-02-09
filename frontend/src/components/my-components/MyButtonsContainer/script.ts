
import Vue from 'vue'
import { Component } from 'vue-property-decorator'


require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class MyButtonsContainer extends Vue {

  nbButtons = 0

  mounted() {
    this.nbButtons = this.$el.querySelectorAll('.my-button-element').length
  }

  get containerClass() {
    if (this.nbButtons % 2 === 0) {
      return 'even-nb-actions'
    }
    return 'odd-nb-actions'
  }
}