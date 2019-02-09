
import Vue from 'vue'
import { Component } from 'vue-property-decorator'


require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class NotFound404 extends Vue {
}
