// import { TestMutation } from 'src/graphql'

import Vue from 'vue'
import { Component } from 'vue-property-decorator'


@Component({
  template: require("./template.html"),
})
export default class DemoMutation extends Vue {
  hello = 'coucou'
  text = ''

  // createLink () {
  //   const { text } = this.$data
  //   this.$apollo.mutate({
  //     mutation: TestMutation,
  //     variables: {
  //       text,
  //     }
  //   })
  // }
}