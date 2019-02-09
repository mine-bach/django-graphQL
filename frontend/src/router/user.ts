import { RouteConfig } from 'vue-router'
import UserInformation from "src/views/App/children/User/UserInformation/script"
import UserAuthentication from "src/views/App/children/User/UserAuthentication/script"


export const links = {
  signUp: 'signUp',
  register: 'register'
}

const routes: RouteConfig[] = [
  {
    name: links.signUp,
    path: '/sign-up',
    component: UserInformation,
    meta: { title: "S'enregistrer" },
  },
  {
    name: links.register,
    path: '/register',
    component: UserAuthentication,
    meta: { title: "S'enregistrer" },
  },
]

export default routes as RouteConfig[]
