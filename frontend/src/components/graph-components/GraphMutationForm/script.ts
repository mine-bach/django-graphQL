
import Vue from 'vue'
import { DocumentNode } from 'graphql'
import { Component, Prop } from 'vue-property-decorator'
import Loading from 'src/components/Loading/script'
import FormValidation from './FormValidation/script'

require('./style.scss')

@Component({
  template: require('./template.html'),
  components: {
    FormValidation,
    Loading,
  }
})
export default class GraphMutationForm extends Vue {
  @Prop({ type: Object, required: true }) mutation : DocumentNode
  @Prop({ type: Object, required: true }) variables: object
  @Prop({ type: Object }) form: object
  @Prop({ type: Boolean, default: true }) validateOnChange: boolean
  @Prop({ type: Object }) validators?: object

  errors = {}
  generalErrors = ''
  loading = false

  save(isValid) {
    if (!isValid) {
      return
    }
    this.loading = true
    try {
      console.log(this.mutation)
      this.$apollo.mutate({
        mutation: this.mutation,
        variables: this.variables
      }).then(result => this.dataLoaded(result))
    } catch (e) {
      console.log("e", e)
      this.$emit('error', e)
    }
    this.loading = false
  }

  dataLoaded(result){
    console.log(result.data)
    let resultMutation
    if (result && result.data){
      resultMutation = Object.values(result.data)["0"]
      this.errors = JSON.parse(resultMutation.errors)
    } 
    if (this.errors) {
      try {
        if (this.errors['__all__']) {
          this.generalErrors = this.errors['__all__']
        }
      } catch (e) {
        this.generalErrors = ""
      }
    } else {
      this.$emit('success', result.data)
    }
  }

  onCancel(value) {
    this.$emit('on-cancel', value)
  }
}