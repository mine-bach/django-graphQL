import { Component, Vue } from 'vue-property-decorator'
import GraphMutationForm from 'src/components/graph-components/GraphMutationForm/script'
import MyFormField from 'src/components/my-components/MyFormField/script'
import { UserInformationsInput, UserInformationFormSave } from 'src/generated/graphql'
import { links } from 'src/router/app'

require("./style.scss")
@Component({
  template: require('./template.html'),
  components: {
    MyFormField,
    GraphMutationForm
  },
})
export default class UserInformation extends Vue {
  mutation = require("./save.mutation.graphql")

  form : UserInformationsInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  }
  
  variables : UserInformationFormSave.Variables = {
    input: this.form
  }

  formSaved(){
    this.$router.push(links.home)
  }
}
