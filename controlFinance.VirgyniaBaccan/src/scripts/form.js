import { render, filterButtons, sum } from "./render.js";

export const handleRegisterForm = (array) => {
    const modal = document.querySelector(".modal__controller")
    const input = document.querySelector(".modal__input")
    const buttonEntry = document.querySelector(".button__entry")
    const buttonExit = document.querySelector(".button__exit")
    const buttonCancel = document.querySelector(".button__cancel")
    const buttonInsertValue = document.querySelector(".button__insertValue")

    let newCategoryId = -1


    buttonCancel.addEventListener('click', (event) => {
        event.preventDefault()

        modal.close()
        cleanInput()
    })

    buttonEntry.addEventListener('click', (event) => {
        event.preventDefault()

        newCategoryId = 0
    })

    buttonExit.addEventListener('click', (event) => {
        event.preventDefault()

        newCategoryId = 1
    })

    buttonInsertValue.addEventListener('click', (event) => {

        event.preventDefault()

        if (newCategoryId === -1) {
            // Exibe uma mensagem de erro ou realiza outra ação apropriada
            alert("Selecione uma categoria válida!");
            return; // Interrompe a execução do código
        }

        let newInsertedValue = { id: 0, value: 0, categoryID: 0 }

        newInsertedValue.id = array.length + 1

        newInsertedValue.value = Number(input.value)


        newInsertedValue.categoryID = newCategoryId


        array.push(newInsertedValue)


        render(array)
        filterButtons()
        sum(array)
        modal.close()
        cleanInput()

    })

}


const cleanInput = () => {
    const input = document.querySelector(".modal__input")
    input.value = ""
}