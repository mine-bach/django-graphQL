import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  template: require("./template.html"),
})
export default class Test extends Vue {
  hello = 'coucou'
}
