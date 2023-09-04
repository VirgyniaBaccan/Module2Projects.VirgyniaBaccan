import { renderCards, renderDepCards } from "./render.js"
import { toast } from "./toasts.js"

const baseUrl = `http://localhost:3333/`
const token = JSON.parse(localStorage.getItem("@kenz.emp:token"))

const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

}

const green = '#36B37E';
const red = '#FF5630';

export async function getAllCategories() {
        const categories = await fetch(`${baseUrl}categories/readAll`, {
                method: 'GET'
        })
                .then(response => response.json()) //quando promise se transforma em respose, passa para json
        return categories
}

export async function getAllCompanies() {
        const companies = await fetch(`${baseUrl}companies/readAll`, {
                method: 'GET'
        })
                .then(response => response.json())
        return companies
}

export async function getCompanyByCategory(value) {
        const companiesFiltered = await fetch(`${baseUrl}companies/readByCategory/${value}`, {
                method: 'GET'
        })
                .then(async (response) => {
                        const responseJson = await response.json()
                        return responseJson
                })
        return companiesFiltered
}

export function changeSelect() {
        const select = document.querySelector("#select")

        select.addEventListener('change', async (event) => {
                const selectValue = event.target.value

                if (selectValue == "") {
                        renderCards(true)
                } else {
                        const filterCompanies = await getCompanyByCategory(selectValue)

                        renderCards(false, filterCompanies)
                }
        })


}

export async function loginRequest(loginBody) {

        const tokenLogin = await fetch(`${baseUrl}auth/login`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(loginBody)
        })
                .then(async (response) => {
                        if (response.ok) {

                                const responseJson = await response.json()
                                const token = JSON.stringify(responseJson.authToken)

                                if (responseJson.isAdm) {

                                        localStorage.setItem('@kenz.emp:token', token)
                                        JSON.stringify(localStorage.setItem('isAdm', responseJson.isAdm))

                                        toast('Login realizado com sucesso', green)

                                        setTimeout(() => {
                                                window.location.replace("./adminPage.html")
                                        }, 2000)

                                } else {

                                        localStorage.setItem('@kenz.emp:token', token)
                                        JSON.stringify(localStorage.setItem('isAdm', responseJson.isAdm))

                                        toast('Login realizado com sucesso', green)

                                        setTimeout(() => {
                                                window.location.replace("./userPage.html")
                                        }, 2000)
                                }
                        } else {
                                const responseJson = await response.json()

                                toast(responseJson.message, red)

                        }
                })
        return tokenLogin
}

export function bodyLogin() {

        const inputs = document.querySelectorAll(".input__login")
        const button = document.querySelector("#button__login")

        let loginBody = {}
        let count = 0

        button.addEventListener('click', async (event) => {
                event.preventDefault()

                inputs.forEach(input => {
                        if (input.value.trim() === '') {
                                count++
                        }

                        loginBody[input.name] = input.value
                })

                if (count !== 0) {
                        count = 0
                        toast('Por favor, preencha os campos necessários', red)
                } else {
                        const token = await loginRequest(loginBody)

                        return token
                }
        })

}

export async function registerRequest(registerBody) {

        const newRegister = await fetch(`${baseUrl}employees/create`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(registerBody)
        })
                .then(async (response) => {
                        if (response.ok) {

                                // const responseJson = await response.json()

                                toast('Cadastro realizado com sucesso', green)

                                setTimeout(() => {
                                        window.location.replace("./loginPage.html")
                                }, 2000)

                                // return responseJson
                        } else {

                                const responseJson = await response.json()

                                toast(responseJson.message, red)
                        }
                })
        return newRegister
}

export function bodyRegister() {
        const inputs = document.querySelectorAll(".input__register")
        const button = document.querySelector("#button__register")

        let registerBody = {}
        let count = 0

        button.addEventListener('click', async (event) => {
                event.preventDefault()

                inputs.forEach(input => {
                        if (input.value.trim() === '') {
                                count++
                        }

                        registerBody[input.name] = input.value
                })

                if (count !== 0) {
                        count = 0
                        toast("Por favor, preencha os campos necessários", red)
                } else {
                        return registerRequest(registerBody)
                }
        })

}

export async function getEmployeesProfile() {
        const employeeProfile = await fetch(`${baseUrl}employees/profile`, {
                method: 'GET',
                headers: requestHeaders
        })
                .then(response => response.json())

        return employeeProfile
}

export async function getDepartmentById(departmentId) {
        const departmentById = await fetch(`${baseUrl}departments/readById/${departmentId}`, {
                method: 'GET',
                headers: requestHeaders
        })
                .then(response => response.json())
        return departmentById

}

export async function getAllDepartments() {
        const allDepartments = await fetch(`${baseUrl}departments/readAll`, {
                method: 'GET',
                headers: requestHeaders
        })
                .then(response => response.json())

        return allDepartments
}

export function changeDepSelect() {
        const select = document.querySelector("#select__company")

        select.addEventListener('change', async (event) => {
                const selectValue = event.target.value
                const allCompanies = await getAllCompanies()


                if (selectValue == "") {
                        renderDepCards(true)
                } else {
                        const filterCompanie = allCompanies.filter(element => element.name == selectValue)
                        // console.log(filterCompanie)
                        const companieId = filterCompanie[0].id
                        // console.log(companieId)
                        const filteredDepartments = await getDepartmentByCompany(companieId)
                        // console.log(filteredDepartments)

                        renderDepCards(false, filteredDepartments)
                }
        })
}

export async function getDepartmentByCompany(value) {
        const departmentsFiltered = await fetch(`${baseUrl}departments/readByCompany/${value}`, {
                method: 'GET',
                headers: requestHeaders,
        })
                .then(async (response) => {
                        const responseJson = await response.json()
                        return responseJson
                })
        // console.log(departmentsFiltered)
        return departmentsFiltered
}

export async function createDepartments(newDep) {
        const newDepartment = await fetch(`${baseUrl}departments/create`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(newDep)
        })
                .then(async (response) => {

                        const responseJson = await response.json()

                        return responseJson
                })
        return newDepartment
}

export async function getAllEmployees() {
        const allEmployees = await fetch(`${baseUrl}employees/readAll`, {
                method: 'GET',
                headers: requestHeaders
        })
                .then(response => response.json())

        return allEmployees
}

export async function updateDepartments(depId, updateBody) {
        const department = await fetch(`${baseUrl}departments/update/${depId}`, {
                method: 'PATCH',
                headers: requestHeaders,
                body: JSON.stringify(updateBody)
        }).then(async (response) => {
                const responseJson = await response.json()
                return responseJson
        })
        return department
}

export async function getEmployeesOutOfWork() {
        const employeesOf = await fetch(`${baseUrl}employees/outOfWork`, {
                method: 'GET',
                headers: requestHeaders
        })
                .then(response => response.json())
        // console.log(employeesOf)
        return employeesOf
}
// getEmployeesOutOfWork()

export async function hireEmployee(employeeId, departmentId) {
        const hiredEmployee = await fetch(`${baseUrl}employees/hireEmployee/${employeeId}`, {
                method: 'PATCH',
                headers: requestHeaders,
                body: JSON.stringify(departmentId)
        })
                .then(async (response) => {
                        const responseJson = await response.json()
                        return responseJson
                })
        return hiredEmployee
}
// hireEmployee()

export async function deleteDep(depId) {
        const departmentDeleted = await fetch(`${baseUrl}departments/delete/${depId}`, {
                method: 'DELETE',
                headers: requestHeaders,
        })
                .then(async (response) => {
                        const responseJson = await response.json()

                        return responseJson
                })
        console.log(departmentDeleted)
        return departmentDeleted
}

export async function deleteEmployee(userId) {
        const userDeleted = await fetch(`${baseUrl}employees/deleteEmployee/${userId}`, {
                method: 'DELETE',
                headers: requestHeaders,
        })
                .then(async (response) => {
                        const responseJson = await response.json()
                        return responseJson
                })
        return userDeleted
}


export async function updateEmployee(userId, updateBodyEmp) {
        const employee = await fetch(`${baseUrl}employees/updateEmployee/${userId}`, {
                method: 'PATCH',
                headers: requestHeaders,
                body: JSON.stringify(updateBodyEmp)
        }).then(async (response) => {
                const responseJson = await response.json()
                return responseJson
        })
        return employee
}

export async function dismissEmployee(employee_id) {

        const employeeDismiss = await fetch(`${baseUrl}employees/dismissEmployee/${employee_id}`, {
                method: "PATCH",
                headers: requestHeaders
        })
                .then(async res => {
                        const responseJson = res.json()
                        return responseJson
                })

        return employeeDismiss
}