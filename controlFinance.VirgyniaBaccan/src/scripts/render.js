import { insertedValues } from "./valuesData.js"

export const render = (array) => {
    const mainList = document.querySelector(".mainList")

    mainList.innerHTML = ''

    if (insertedValues.length > 0) {

        array.forEach((insertedValue) => {
            const card = createCard(insertedValue)

            mainList.appendChild(card)

        });
    } else {
        const cardEmpty = createEmptyCard()
        mainList.appendChild(cardEmpty)
    }

    handleDeleteInsertedValue(insertedValues)
    sum(array)
}


const handleDeleteInsertedValue = (array) => {
    const buttons = document.querySelectorAll(".button__delete")
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {

            const insertedValueID = event.target.dataset.insertedValueID

            const findInsertedValueIndex = array.findIndex(insertedValue => insertedValue.id === Number(insertedValueID))

            const removedItem = array.splice(findInsertedValueIndex, 1)

            render(array)
            sum(array)
        })
    })
}

export const sum = (array) => {

    const valuesSum = document.querySelector(".values__sum")


    const totalSum = array.reduce((acc, currentValue) => {
        return acc += currentValue.value
    }, 0)

    valuesSum.innerText = `R$ ${totalSum.toFixed(2)}`
}

const createEmptyCard = () => {
    const cardEmpty = document.createElement("li")
    const title = document.createElement("h2")
    const text = document.createElement("p")

    cardEmpty.classList.add("card__empty")
    title.classList.add("title__empty")
    text.classList.add("text__empty")

    title.innerText = "Nenhum valor cadastrado"
    text.innerText = "Registrar novo valor"

    cardEmpty.append(title, text)

    cardEmpty.addEventListener('click', () => {
        const modal = document.querySelector(".modal__controller")
        modal.showModal()

        closeModal()
    })

    return cardEmpty

}

const createCard = (insertedValue) => {
    const card = document.createElement("li")
    const value = document.createElement('h2')
    const categoryID = document.createElement("p")
    const deleteBtn = document.createElement("img")
    const divCard = document.createElement("div")

    value.classList.add("card__value")
    categoryID.classList.add("card__categoryID")
    card.classList.add('list__card')
    divCard.classList.add("div__card")
    deleteBtn.classList.add("button__delete")

    if (insertedValue.categoryID == 0) {
        categoryID.innerText = "Entrada"
    } else if (insertedValue.categoryID == 1) {
        categoryID.innerText = "Saída"
    }

    value.innerText = `R$ ${insertedValue.value.toFixed(2)}`
    deleteBtn.src = "./src/assets/trash.svg"
    deleteBtn.dataset.insertedValueID = insertedValue.id

    divCard.append(categoryID, deleteBtn)
    card.append(value, divCard)

    return card

}

export function filterButtons() {
    const mainButtons = document.querySelectorAll(".main__button")
    mainButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id == "button__all") {
                render(insertedValues)
            } else if (button.id == "button__entry") {
                const insertedValuesfiltered = insertedValues.filter(insertedValue => insertedValue.categoryID == 0)
                render(insertedValuesfiltered)
            } else {
                const insertedValuesfiltered = insertedValues.filter(insertedValue => insertedValue.categoryID == 1)
                render(insertedValuesfiltered)
            }
        })

    })

}

export const handleModal = () => {
    const modal = document.querySelector(".modal__controller")
    const navButton = document.querySelector(".nav__button")

    navButton.addEventListener('click', () => {
        modal.showModal()

        closeModal()
    })
}

function closeModal() {

    const modal = document.querySelector(".modal__controller")
    const buttonCloseModal = document.querySelector(".button__closeModal")

    buttonCloseModal.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}

