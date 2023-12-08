class Footer extends HTMLElement {
    constructor() {
        super()
        this.appendChild(this.build())
    }

    build() {
        const textContent = document.createElement('span')
        textContent.innerHTML = '&copy; 2023 Inspire API 📜'

        const content = document.createElement('div')
        content.classList.add('container', 'mx-auto', 'p-3')
        content.appendChild(textContent)

        const componentRoot = document.createElement('footer')
        componentRoot.classList.add('border-top')
        componentRoot.appendChild(content)

        return componentRoot
    }
}
customElements.define('footer-component', Footer)

export default Footer