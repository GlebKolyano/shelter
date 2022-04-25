export default function burgerMenu() {
  let header__burger = document.querySelector(".header__burger")
  let headerNav = document.querySelector(".header__nav")
  let head = document.body.querySelector(".header.pets-page")
  const BURGER_OVERLAY = document.querySelector(".burger-overlay")

header__burger.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("activeBurger")) {
    document.documentElement.style.overflowY = "scroll"
    header__burger.classList.remove("activeBurger")
    headerNav.style.right = "-320px"
    BURGER_OVERLAY.style.opacity = 0
    BURGER_OVERLAY.style.display = "none"
    head.style.backgroundColor = "white"

    setTimeout(() => {
      head.style.overflow = "hidden"
    }, 500) 
  } else {
    BURGER_OVERLAY.style.display = "block"
    BURGER_OVERLAY.style.opacity = 1
   
    document.documentElement.style.overflowY = "hidden"
    header__burger.classList.add("activeBurger")
    headerNav.style.right = "0px"
    head.style.overflow = "visible"
    head.style.backgroundColor = "transparent"
  }
})

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("header") || e.target.classList.contains("container")|| e.target.classList.contains("nav__link") || e.target.classList.contains("burger-overlay") ||  e.target.classList.contains("header__wrapper")) {
 
    header__burger.classList.remove("activeBurger")
    BURGER_OVERLAY.style.opacity = 0
    BURGER_OVERLAY.style.display = "none"
    headerNav.style.right = "-320px"
    document.body.style.paddingRight = "0px"
    document.documentElement.style.overflowY = "scroll"
    head.style.backgroundColor = "white"
   

    setTimeout(() => {
      head.style.overflow = "hidden"
    }, 500) 
  }  
})

}
