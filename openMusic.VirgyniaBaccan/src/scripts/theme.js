export const changeTheme = () => {

    const themeButton = document.querySelector(".theme__button")
    const html = document.querySelector("html")

    const modePreference = JSON.parse(localStorage.getItem('dark__mode'))

    if (modePreference) {
        themeButton.src = "./src/assets/img/sun.svg"
        html.classList.add('dark__mode')
    } else {
        themeButton.src = "./src/assets/img/moon.svg"
        html.classList.remove('dark__mode')
    }

    themeButton.addEventListener('click', () => {
        html.classList.toggle("dark__mode")

        if (html.classList == "dark__mode") {
            themeButton.src = "./src/assets/img/sun.svg"
            localStorage.setItem('dark__mode', true)
        } else {
            themeButton.src = "./src/assets/img/moon.svg"
            localStorage.setItem('dark__mode', false)
        }
    })
}
