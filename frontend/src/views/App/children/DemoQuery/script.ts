import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import GraphQuery from 'src/components/graph-components/GraphQuery/script'
import { UserQuery } from 'src/generated/graphql'


require("./style.scss")
@Component({
  template: require("./template.html"),
  components: {
    GraphQuery
  }
})
export default class DemoQuery extends Vue {
  query = require("./query.graphql")
  users : any = []

  dataLoaded(data : UserQuery.Query){
    if (data.users){
      this.users = data.users
    }
  }
}

