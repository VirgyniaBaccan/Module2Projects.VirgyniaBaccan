
function renderUserProfile() {
    const userInfos = JSON.parse(localStorage.getItem("user"))

    const user = document.querySelector(".div__user")

    const userImg = document.createElement("img")
    userImg.classList.add("user__img")
    userImg.src = userInfos.avatar_url

    const username = document.createElement("h2")
    username.classList.add("user__name")
    username.innerText = userInfos.name

    user.append(userImg, username)
}

renderUserProfile()

function changeUser() {
    const button = document.querySelector(".button__changeUser")
    button.addEventListener('click', () => {
        localStorage.clear()
        open('../../index.html', '_self')
    })
}

changeUser()

function renderUserRepos() {

    const userRepos = JSON.parse(localStorage.getItem("repos"))
    const listRepos = document.querySelector(".list__repos")

    userRepos.forEach(repo => {

        const cardRepos = document.createElement("li")

        const repoName = document.createElement("h2")
        repoName.innerText = repo.name
        repoName.classList.add("repo__name")
        
        const repoDescription = document.createElement("p")
        repoDescription.innerText = repo.description
        repoDescription.classList.add("repo__description")

        const repoLink = document.createElement("button")
        repoLink.innerText = 'Repositório'
        repoLink.classList.add("repo__link")
        
        repoLink.addEventListener('click', () => {
            open( repo.html_url, '_blank')
        })

        listRepos.appendChild(cardRepos)
        cardRepos.append(repoName, repoDescription, repoLink)
    });
    
}

renderUserRepos()
