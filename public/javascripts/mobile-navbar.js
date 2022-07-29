class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// Evento para pesquisa de filmes (Trata o href da tag a), aplicado na versão web e mobile
let searchLink = document.querySelector('.search-box a')
let searchInput = document.querySelector('.search-box input')
searchLink.addEventListener('click', () => {
  searchLink.href = '/movie/search?filmePesquisado=' + searchInput.value;  
})

let searchLinkMobile = document.querySelector('.search-box-mobile a')
let searchInputMobile = document.querySelector('.search-box-mobile input')
console.log(searchLinkMobile);
searchLinkMobile.addEventListener('click', () => {
  searchLinkMobile.href = '/movie/search?filmePesquisado=' + searchInputMobile.value;  
})