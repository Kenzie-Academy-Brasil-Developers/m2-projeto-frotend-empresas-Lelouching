import { renderCompanies } from "./render.js"
import { toastWarn } from "./toast.js"

const getSectors = async () => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const responseJSON = await fetch("http://localhost:6278/sectors", options)
    const response = await responseJSON.json()

    return response
}

const getAllCompaniesHome = async () => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer null"
        }
    }

    const responseJSON = await fetch("http://localhost:6278/companies", options)
    const response = await responseJSON.json()

    return response
}

const getCompanies = async (sector) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer null"
        }
    }

    const responseJSON = await fetch("http://localhost:6278/companies", options)
    const response = await responseJSON.json()

    const filter = response.filter((data) => data.sectors.description == sector)

    renderCompanies(filter)
}

const registerUser = async (data) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:6278/auth/register",  options)
    const response = await responseJSON.json()

    if(response.error) {
        toastWarn("Email ou senha inválidos", "toast-alert")
    } else {
        toastWarn("Criação de usuário bem sucedida", "toast-success")
        setTimeout(() => {
            window.location.assign("../login/index.html")
        }, 4000)
    }
}

const loginUser = async (data) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:6278/auth/login", options)
    const response = await responseJSON.json()

    if(response.error) {
        toastWarn("Email ou senha inválidos", "toast-alert")
    } else {
        toastWarn("Login efetuado com sucesso", "toast-success")
        validateUser(response.token)
    }
}

const validateUser = async (token) => {
    
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/auth/validate_user", options)
    const response = await responseJSON.json()
    
    const dadosToken = {
        token: token,
        is_admin: response.is_admin
    }

    localStorage.setItem("token-user", JSON.stringify(dadosToken))

    setTimeout(() => {
        if(response.is_admin) {
            window.location.assign("../adminPage/index.html")
        } else {
            window.location.assign("../userPage/index.html")
        }
    }, 1500)
}

const loggedUserInfo = async () => {

    const userInfo = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/users/profile", options)
    const response = await responseJSON.json()

    return response
}

const editUserInfo = async (data) => {
    
    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:6278/users", options)
    const response = await responseJSON.json()

    if(!responseJSON.ok) {
        toastWarn("O email já existe, tente novamente", "toast-alert")
    } else {
        toastWarn("Dados mudados com sucesso", "toast-success")
    }
}

const coworkersList = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/users/departments/coworkers", options)
    const response = await responseJSON.json()

    return response
}

const getAllCompanies = async () => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const responseJSON = await fetch("http://localhost:6278/companies", options)
    const response = await responseJSON.json()

    return response
}

const getDeparmentsCompany = async (uuid) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch(`http://localhost:6278/departments/${uuid}`, options)
    const response = await responseJSON.json()

    return response
}

const createDepartmentAdmin = async (data) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:6278/departments", options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível criar o departamento, tente novamente", "toast-alert")
    } else {
        toastWarn("Departamento criado com sucesso", "toast-success")
    }
}

const usersOutOfWork = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/admin/out_of_work", options)
    const response = await responseJSON.json()

    return response
}

const hireUser = async (data) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:6278/departments/hire/", options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível contratar o usuário, tente novamente", "toast-alert")
    } else {
        toastWarn("Usuário contratado com sucesso", "toast-success")
    }
}

const allUsers = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/users", options)
    const response = await responseJSON.json()

    return response
}

const dimissUser = async (userID) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch(`http://localhost:6278/departments/dismiss/${userID}`, options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível demitir o usuário, tente novamente", "toast-alert")
    } else {
        toastWarn("Usuário demitido com sucesso", "toast-success")
    }
}

const editDepartmentDescription = async (departmentUuid, description) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        },
        body: JSON.stringify(description)
    }

    const responseJSON = await fetch(`http://localhost:6278/departments/${departmentUuid}`, options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível atualizar a descrição, tente novamente", "toast-alert")
    } else {
        toastWarn("Descrição atualizada com sucesso", "toast-success")
    }
}

const deleteDeparmentAdmin = async (departmentUuid) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch(`http://localhost:6278/departments/${departmentUuid}`, options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível deletar o departamento, tente novamente", "toast-alert")
    } else {
        toastWarn("Departamento deletado com sucesso", "toast-success")
    }
}

const getAllDepartments = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/departments", options)
    const response = await responseJSON.json()

    return response
}

const editUserInfoAdmin = async (userID, data) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch(`http://localhost:6278/admin/update_user/${userID}`, options)
    const response = await responseJSON.json()

    if(!responseJSON.ok) {
        toastWarn("Não foi possível atualizar o usuário, tente novamente", "toast-alert")
    } else {
        toastWarn("Usuário atualizado com sucesso", "toast-success")
    }
}

const deleteUserFromSite = async (userID) => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch(`http://localhost:6278/admin/delete_user/${userID}`, options)

    if(!responseJSON.ok) {
        toastWarn("Não foi possível deletar o usuário, tente novamente", "toast-alert")
    } else {
        toastWarn("Usuário deletado com sucesso", "toast-success")
    }
}

const getDepartmentsUserLogged = async () => {

    const tokenUser = JSON.parse(localStorage.getItem("token-user"))

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenUser.token}`
        }
    }

    const responseJSON = await fetch("http://localhost:6278/users/departments", options)
    const response = await responseJSON.json()

    return response
}

export { getAllCompaniesHome, getCompanies, getSectors, registerUser, loginUser, loggedUserInfo, editUserInfo, coworkersList, getAllCompanies, getDeparmentsCompany, createDepartmentAdmin, usersOutOfWork, hireUser, allUsers, dimissUser, editDepartmentDescription, deleteDeparmentAdmin, getAllDepartments, editUserInfoAdmin, deleteUserFromSite, getDepartmentsUserLogged }