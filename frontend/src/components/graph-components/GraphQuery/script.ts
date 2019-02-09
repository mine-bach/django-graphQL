import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DocumentNode } from 'graphql'
import Loading from '../../Loading/script'
import NotFound404 from '../../NotFound404/script'


@Component({
  template: require("./template.html"),
  components: {
    Loading,
    NotFound404,
  }
})
export default class GraphQuery extends Vue {
  @Prop({ type: Object }) query: DocumentNode

  loading = true
  error = false

  mounted() {
    this.$apollo.query({
      query: this.query
    }).then(result => this.dataLoaded(result))
  }
  dataLoaded(result) {
    this.loading = false
    if (result.networkStatus === 8) {
      this.error = true
    }
    else {
      this.$emit('success', result.data)
    }
  }
}

