class ExpandableList extends HTMLUListElement {
    toggleBtn: HTMLButtonElement | null

    constructor(){
        super()
        this.style.position = 'relative'
        this.toggleBtn = document.createElement('button')
        this.toggleBtn.style.position='absolute'
        this.toggleBtn.style.border='none'
        this.toggleBtn.style.background='none'
        this.toggleBtn.style.padding='0'
        this.toggleBtn.style.top='0'
        this.toggleBtn.style.left='5px'
        this.toggleBtn.style.cursor='pointer'
        this.toggleBtn.innerText='>'
        this.toggleBtn.addEventListener('click', () => {
            if(this.dataset){
                this.dataset.expanded = Boolean(!this.isExpanded).toString()
            }
        })
        this.appendChild(this.toggleBtn)
    }

    static get observedAttributes(){
        return ["data-expanded"]
    }

    attributeChangedCallback(name, oldValue, newValue){
        console.log(name, oldValue, newValue)
        this.updateStyles()
    }

    connectedCallback(){
        this.updateStyles()
    }

    updateStyles(){
        if(!this.toggleBtn){
            return
        }

        const transform = this.isExpanded ? "rotate(90deg)": ""
        this.toggleBtn.style.transform = transform

        ;[...this.children].forEach((child) => {
            if(child !== this.toggleBtn && Object.hasOwn(child, "style")){
                
                child.style.display = this.isExpanded ? "" : "none"
            }
        })
        
    }

    get isExpanded(){
        return this.dataset.expanded !== "false" && this.dataset.expanded !== null
    }
}

customElements.define('expandable-list', ExpandableList, {extends: "ul"})