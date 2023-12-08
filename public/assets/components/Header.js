import DataLinks from "/assets/Data/DataLinks.js"

class Header extends HTMLElement {
    constructor() {
        super()
        this.appendChild(this.build())
    }

    build() {
        const content = document.createElement('nav')
        content.classList.add('d-flex', 'justify-content-between', 'container', 'p-3')
        content.appendChild(this.home())
        content.appendChild(this.ListLinks())

        const componentRoot = document.createElement('header')
        componentRoot.classList.add('bg-light', 'shadow-sm', 'border-bottom')
        componentRoot.appendChild(content)

        return componentRoot
    }

    home() {
        const logo = document.createElement('span')
        logo.classList.add('logo')
        logo.textContent = '📜'
        logo.style = 'font-size: 1.5rem;'

        const logoText = document.createElement('span')
        logoText.textContent = 'Home'

        const home = document.createElement('a')
        home.classList.add('d-flex', 'gap-2', 'align-items-center', 'nav-link')
        home.href = DataLinks.home.url
        home.append(logo)
        home.append(logoText)

        return home
    }

    ListLinks() {
        const list = document.createElement('ul')
        list.classList.add('d-flex', 'gap-2', 'list-unstyled', 'my-auto')
        DataLinks.nav.map(linkItem => {
            let listItem = document.createElement('li')
            listItem.appendChild(this.NewLink(linkItem))
            list.appendChild(listItem)
        }).join('')

        return list
    }

    NewLink(linkItem) {
        let link = document.createElement('a')
        link.classList.add('nav-link')
        link.href = linkItem.url
        link.textContent = linkItem.name

        return link
    }
}
customElements.define('header-component', Header)

export default Header