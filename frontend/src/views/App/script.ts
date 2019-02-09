import { Component, Vue } from 'vue-property-decorator'
import MyConfirmButton from 'src/components/my-components/MyConfirmButton/script'
import { links } from 'src/router/app'

require("./style.scss")
@Component({
  template: require('./template.html'),
  components: {
    MyConfirmButton,
  },
})
export default class App extends Vue {

  log() {
    console.log("action launched")
  }

  get homeLink() {
    return links.home
  }
  get demoViewLink() {
    return links.demoView
  }
  get aboutLink() {
    return links.about
  }

  get userSignUpLink() {
    return links.user.signUp
  }

  get userRegisterLink() {
    return links.user.register
  }

  get demoMutationLink() {
    return links.demoMutation
  }

  get demoQueryLink() {
    return links.demoQuery
  }


  

}
