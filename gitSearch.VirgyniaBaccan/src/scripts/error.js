function returnHome() {
    const button = document.querySelector("button")
    button.addEventListener('click', () => {
        localStorage.clear()
        open('../../index.html','_self')
        
    })
}

returnHome()