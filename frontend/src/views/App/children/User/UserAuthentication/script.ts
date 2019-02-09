import { Component, Vue } from 'vue-property-decorator'
import GraphMutationForm from 'src/components/graph-components/GraphMutationForm/script'
import MyFormField from 'src/components/my-components/MyFormField/script'
import { UserAuthenticationInput, UserAuthenticationFormCheck } from 'src/generated/graphql'
import { links } from 'src/router/app'

@Component({
  template: require('./template.html'),
  components: {
    MyFormField,
    GraphMutationForm
  },
})
export default class UserAuthentication extends Vue {
  mutation = require("./check.mutation.graphql")

  form : UserAuthenticationInput = {
    email: "",
    password: ""
  }
  
  variables : UserAuthenticationFormCheck.Variables = {
    input: this.form
  }
  
  forget(){
    window.localStorage.removeItem('token')
    this.$store.commit('forget_auth_user')
  }

  formSaved(){
    this.$apollo.mutate({
      mutation: require('./authenticate.mutation.graphql'),
      variables: {
        ...this.form
      }
    }).then(result =>{
      let token
      if (result && result.data){
        token = Object.values(result.data)["0"].token
      }
      window.localStorage.setItem('token', token)
      this.$store.commit('get_auth_user', this.$apollo)
      this.$router.push(links.home)
    })
  }
}
