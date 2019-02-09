import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import Quill from 'quill'
require('quill/dist/quill.snow.css')


const MAX_IMAGE_SIZE = 600 * 1000

export type ToolbarType = 'minimal' | 'full'

const toolbarTypeValidator = (value: ToolbarType) => ['minimal', 'full'].includes(value)


require("./style.scss")
@Component({
  template: require("./template.html"),
})
export default class HtmlEditor extends Vue {

  @Prop({ type: [String, Object] }) value: string
  @Prop({ type: String }) placeholder: string
  @Prop({ type: Boolean, default: false }) disable: boolean
  @Prop({ type: String, validator: toolbarTypeValidator, default: 'full' }) toolbarType: ToolbarType

  get toolbarOptions() {
    const textDecoration = ['bold', 'italic', 'underline', 'strike']
    const textDecorationAdvanced = ['blockquote', 'code-block']
    const headers = [{ 'header': 1 }, { 'header': 2 }]
    const list = [{ 'list': 'ordered' }, { 'list': 'bullet' }]
    const scripts = [{ 'script': 'sub' }, { 'script': 'super' }]
    const indent = [{ 'indent': '-1' }, { 'indent': '+1' }]
    const textSize = [{ 'size': ['small', false, 'large', 'huge'] }]
    const headersAdvanced = [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
    const color = [{ 'color': [] }, { 'background': [] }]
    const font = [{ 'font': [] }]
    const align = [{ align: 'right' }, { align: 'center' }, { align: 'justify' }]
    const clean = ['clean']
    const medias = ['link', 'image', 'video']

    const toolbars = {
      full: [
        textDecoration,
        textDecorationAdvanced,
        headers,
        list,
        scripts,
        indent,
        textSize,
        headersAdvanced,
        color,
        font,
        align,
        clean,
        medias
      ],
      minimal: [
        align
      ]
    }
    return toolbars[this.toolbarType]
  }


  get quillOptions() {
    return {
      placeholder: this.placeholder,
      readOnly: this.disable,
      modules: {
        toolbar: this.toolbarOptions
      },
      theme: 'snow'
    }
  }

  editor = null
  mounted() {
    this.editor = new Quill(this.$el, this.quillOptions)

    if (this.value && this.value !== '') {
      this.editor.pasteHTML(this.value)
    }
    this.editor.on('text-change', (delta, source) => {
      let error = false
      const insertion = delta.ops && delta.ops.filter((o) => !!o.insert).map((o) => o.insert) || []
      const image = insertion.length && typeof (insertion[0]) === 'object' && insertion[0].image || null
      if (image) {
        if (image.length > MAX_IMAGE_SIZE) {
          error = true
        }
      }
      if (error) {
        this.editor.setContents(source)
        this.$notify({
          type: 'warning',
          title: 'Attention !',
          text: `L'image que vous avez sélectionnée est trop lourde. Elle ne doit pas dépasser ${MAX_IMAGE_SIZE / 1000} Ko`
        })
      } else {
        this.$emit('text-change', this.editor, delta, source)
        this.$emit('input', this.editor.root.innerHTML)
      }
    })
    this.editor.on('selection-change', (range) => {
      this.$emit('selection-change', this.editor, range)
    })
  }


  @Watch('value')
  onValueChange(val: string | { value: string, force: boolean }) {
    if (typeof (val) === 'object' && val.force) {
      this.editor.pasteHTML(val.value)
    }
  }

  inputChanged(value) {
    this.$emit('input', value)
    this.$emit('change', value)
  }

}