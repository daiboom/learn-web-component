
const template = document.createElement('template')
template.innerHTML = `
<label>
  <input type="checkbox" />
  <slot></slot>
  <span class="description">
    <slot name="description"></slot>
  </span>
</label>
`
class TodoItem extends HTMLElement {
    checkbox: HTMLInputElement | null

    constructor(){
        super()
        const shadow = this.attachShadow({mode: "open"})
        shadow.append(template.content.cloneNode(true))
        this.checkbox = shadow.querySelector("input")
    }

    static get observedAttirebutes(){
        return ["checked"]
    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log(name, oldValue, newValue)
        if(name === 'checked') {
            this.updatedCheck(newValue)
        }

    }

    connectedCallback(){
        console.log('connected')
    }

    disconnectedCallback(){
        console.log('disconnected')
    }
    
    updatedCheck(value){
        if(this.checkbox){
            this.checkbox.checked = value !== null && value !== "false"
        }
       

    }
}


customElements.define('todo-item', TodoItem)
// const item = document.querySelector("todo-item")
// item?.remove()