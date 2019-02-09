import MyButton from './MyButton/script'
import MyButtonsContainer from './MyButtonsContainer/script'
import MyConfirmButton from './MyConfirmButton/script'

export default {
    install(Vue) {
        Vue.component('my-button', MyButton)
        Vue.component('my-buttons-container', MyButtonsContainer)
        Vue.component('my-confirm-buttons', MyConfirmButton)
    }

}