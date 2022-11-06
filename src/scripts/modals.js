import { renderUsersRegistered } from "./render.js"
import { createDepartmentAdmin, deleteUserFromSite, editUserInfo, editUserInfoAdmin, getAllCompanies } from "./requests.js"

const openLoginRegister = () => {
    const buttonOpen = document.querySelector(".open-login-register")
    const nav = document.querySelector("nav")

    buttonOpen.addEventListener("click", () => {
        let verifyModal = document.querySelector(".div-login-register-modal")

        if(verifyModal) {
            verifyModal.classList.toggle("flex")
            return verifyModal.classList.toggle("flex-none")
        }
        let divLoginRegister = document.createElement("div")
        let buttonLogin = document.createElement("button")
        let anchorLogin = document.createElement("a")
        let buttonRegister = document.createElement("button")
        let anchorRegister = document.createElement("a")

        divLoginRegister.classList.add("flex", "div-login-register-modal", "align-i-center", "justify-around")
        buttonLogin.classList.add("button-site-1")
        buttonRegister.classList.add("button-site-2")
        anchorLogin.classList.add("anchor-style-none")
        anchorRegister.classList.add("anchor-style-none")

        buttonLogin.type = "button"
        buttonRegister.type = "button"
        buttonLogin.innerText = "Login"
        buttonRegister.innerText = "Cadastro"
        anchorLogin.href = "./pages/login/index.html"
        anchorRegister.href = "./pages/register/index.html"

        nav.appendChild(divLoginRegister)
        divLoginRegister.append(anchorLogin, anchorRegister)
        anchorLogin.appendChild(buttonLogin)
        anchorRegister.appendChild(buttonRegister)
        
    })
}

const openHomeLogin = () => {
    const buttonOpen = document.querySelector(".open-login-register")
    const nav = document.querySelector("nav")

    buttonOpen.addEventListener("click", () => {
        let verifyModal = document.querySelector(".div-login-register-modal")

        if(verifyModal) {
            verifyModal.classList.toggle("flex")
            return verifyModal.classList.toggle("flex-none")
        }
        let divHomeLogin = document.createElement("div")
        let buttonHome = document.createElement("button")
        let anchorHome = document.createElement("a")
        let buttonLogin = document.createElement("button")
        let anchorLogin = document.createElement("a")

        divHomeLogin.classList.add("flex", "div-login-register-modal", "align-i-center", "justify-around")
        buttonHome.classList.add("button-site-1")
        buttonLogin.classList.add("button-site-2")
        anchorHome.classList.add("anchor-style-none")
        anchorLogin.classList.add("anchor-style-none")

        buttonHome.type = "button"
        buttonLogin.type = "button"
        buttonHome.innerText = "Home"
        buttonLogin.innerText = "Login"
        anchorHome.href = "../../index.html"
        anchorLogin.href = "../login/index.html"

        nav.appendChild(divHomeLogin)
        divHomeLogin.append(anchorHome, anchorLogin)
        anchorHome.appendChild(buttonHome)
        anchorLogin.appendChild(buttonLogin)
        
    })
}

const openHomeRegister = () => {
    const buttonOpen = document.querySelector(".open-login-register")
    const nav = document.querySelector("nav")

    buttonOpen.addEventListener("click", () => {
        let verifyModal = document.querySelector(".div-login-register-modal")

        if(verifyModal) {
            verifyModal.classList.toggle("flex")
            return verifyModal.classList.toggle("flex-none")
        }
        let divHomeRegister = document.createElement("div")
        let buttonHome = document.createElement("button")
        let anchorHome = document.createElement("a")
        let buttonRegister = document.createElement("button")
        let anchorRegister = document.createElement("a")

        divHomeRegister.classList.add("flex", "div-login-register-modal", "align-i-center", "justify-around")
        buttonHome.classList.add("button-site-1")
        buttonRegister.classList.add("button-site-2")
        anchorHome.classList.add("anchor-style-none")
        anchorRegister.classList.add("anchor-style-none")

        buttonHome.type = "button"
        buttonRegister.type = "button"
        buttonHome.innerText = "Home"
        buttonRegister.innerText = "Cadastro"
        anchorHome.href = "../../index.html"
        anchorRegister.href = "../register/index.html"

        nav.appendChild(divHomeRegister)
        divHomeRegister.append(anchorHome, anchorRegister)
        anchorHome.appendChild(buttonHome)
        anchorRegister.appendChild(buttonRegister)
        
    })
}

const editUserInfoModal = () => {

    const imageEdit = document.querySelector(".image-edit-profile")

    imageEdit.addEventListener("click", () => {
        const modal = document.querySelector(".edit-user-info-background")
        const form = document.querySelector(".edit-user-info")
        const inputs = [...document.querySelectorAll(".input-edit-user")]
        const buttonClose = document.querySelector(".button-close-edit-user")

        modal.classList.remove("flex-none")
        modal.classList.add("flex")

        form.addEventListener("submit", (e) => {
            e.preventDefault()

            const username = inputs[0].value
            const email = inputs[1].value
            const password = inputs[2].value

            editUserInfo({
                username,
                email,
                password
            })

            modal.classList.add("flex-none")
            modal.classList.remove("flex")
            inputs.forEach(element => {
                element.value = ""
            });
        })

        buttonClose.addEventListener("click", () => {
            modal.classList.add("flex-none")
            modal.classList.remove("flex")
            inputs.forEach(element => {
                element.value = ""
            });
        })

        modal.addEventListener("click", (e) => {
            if(e.target.classList.contains("edit-user-info-background")) {
                modal.classList.add("flex-none")
                modal.classList.remove("flex")
                inputs.forEach(element => {
                    element.value = ""
                });
            }
        })
    })

}

const createDepartment = () => {
    const body = document.querySelector("body")
    const buttonCreate = document.querySelector(".div-create-company")

    buttonCreate.addEventListener("click", async () => {
        const divBackground = document.createElement("div")
        const formCreate = document.createElement("form")
        const buttonClose = document.createElement("button")
        const createDepartmentText = document.createElement("h2")
        const inputNameDeparment = document.createElement("input")
        const inputDescriptionDepartment = document.createElement("input")
        const divSelect = document.createElement("div")
        const arrowImage = document.createElement("img")
        const selectCompany = document.createElement("select")
        const optionSelectCompany = document.createElement("option")
        const buttonCreateDepartment = document.createElement("button")

        divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
        formCreate.classList.add("form-create-department", "flex", "flex-column")
        buttonClose.classList.add("button-close-modal-admin")
        createDepartmentText.classList.add("modals-title-admin")
        inputNameDeparment.classList.add("input-create-deparment")
        inputDescriptionDepartment.classList.add("input-create-deparment")
        divSelect.classList.add("div-select-company-admin")
        arrowImage.classList.add("arrow-select-admin")
        selectCompany.id = "choose-company-admin"
        selectCompany.name = "choose-company-admin"
        buttonCreateDepartment.classList.add("button-site-2-full")

        buttonClose.innerText = "X"
        buttonClose.type = "button"
        createDepartmentText.innerText = "Criar Departamento"
        inputNameDeparment.placeholder = "Nome do departamento"
        inputNameDeparment.required = true
        inputNameDeparment.type = "text"
        inputDescriptionDepartment.placeholder = "Descrição"
        inputDescriptionDepartment.required = true
        inputDescriptionDepartment.type = "text"
        arrowImage.src = "../../src/assets/img/arrow-2.svg"
        arrowImage.alt = "Seta para baixo"
        selectCompany.required = true
        optionSelectCompany.value = "select-company"
        optionSelectCompany.innerText = "Selecionar empresa"
        buttonCreateDepartment.type = "submit"
        buttonCreateDepartment.innerText = "Criar o departamento"

        body.appendChild(divBackground)
        divBackground.appendChild(formCreate)
        formCreate.append(buttonClose, createDepartmentText, inputNameDeparment, inputDescriptionDepartment, divSelect, buttonCreateDepartment)
        divSelect.append(arrowImage ,selectCompany)
        selectCompany.appendChild(optionSelectCompany)

        const companies = await getAllCompanies()

        companies.map((element) => {
            const option = document.createElement("option")
            option.innerText = element.name
            option.value = element.uuid
            selectCompany.appendChild(option)
        })

        formCreate.addEventListener("submit", async (e) => {
            e.preventDefault()

            await createDepartmentAdmin({
                name: inputNameDeparment.value,
                description: inputDescriptionDepartment.value,
                company_uuid: selectCompany.value
            })

            setTimeout(() => {
                window.location.reload()
            }, 1500)

            divBackground.classList.remove("flex")
            divBackground.classList.add("flex-none")
        })

        buttonClose.addEventListener("click", () => {
            divBackground.classList.remove("flex")
            divBackground.classList.add("flex-none")
        })

        divBackground.addEventListener("click", (e) => {
            if(e.target.classList.contains("edit-user-info-background")) {
                divBackground.classList.remove("flex")
                divBackground.classList.add("flex-none")
            }
        })
    })
}

const editUserAdmin = (userID) => {

    const body = document.querySelector("body")
    const divBackground = document.createElement("div")
    const formEditUser = document.createElement("form")
    const buttonClose = document.createElement("button")
    const editUserText = document.createElement("h2")
    const divSelect1 = document.createElement("div")
    const selectKindOfWork = document.createElement("select")
    const optionKindOfWork = document.createElement("option")
    const optionKindOfWorkHomeOffice = document.createElement("option")
    const optionKindOfWorkPresential = document.createElement("option")
    const optionKindOfWorkHybrid = document.createElement("option")
    const divSelect2 = document.createElement("div")
    const selectProfessionalLevel = document.createElement("select")
    const optionProfessionalLevel = document.createElement("option")
    const optionProfessionalLevelInternship = document.createElement("option")
    const optionProfessionalLevelJunior = document.createElement("option")
    const optionProfessionalLevelFull = document.createElement("option")
    const optionProfessionalLevelSenior = document.createElement("option")
    const buttonEditUser = document.createElement("button")
    const arrowImage1 = document.createElement("img")
    const arrowImage2 = document.createElement("img")

    divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
    formEditUser.classList.add("form-edit-user-admin", "flex", "flex-column")
    buttonClose.classList.add("button-close-modal-admin")
    editUserText.classList.add("modals-title-admin")
    divSelect1.classList.add("div-select-edit-user-admin")
    arrowImage1.classList.add("arrow-select-admin")
    arrowImage2.classList.add("arrow-select-admin")
    selectKindOfWork.id = "select-user-kind-of-work"
    divSelect2.classList.add("div-select-edit-user-admin")
    selectProfessionalLevel.id = "select-user-professional-level"
    buttonEditUser.classList.add("button-site-2-full")

    buttonClose.innerText = "X"
    buttonClose.type = "button"
    editUserText.innerText = "Editar Usuário"
    arrowImage1.src = "../../src/assets/img/arrow-2.svg"
    arrowImage1.alt = "Seta para baixo"
    arrowImage2.src = "../../src/assets/img/arrow-2.svg"
    arrowImage2.alt = "Seta para baixo"
    optionKindOfWork.innerText = "Selecionar modalidade de trabalho"
    optionKindOfWorkHomeOffice.innerText = "Home Office"
    optionKindOfWorkHomeOffice.value = "home office"
    optionKindOfWorkPresential.innerText = "Presencial"
    optionKindOfWorkPresential.value = "presencial"
    optionKindOfWorkHybrid.innerText = "Híbrido"
    optionKindOfWorkHybrid.value = "hibrido"
    optionProfessionalLevel.innerText = "Selecionar nível profissional"
    optionProfessionalLevelInternship.innerText = "Estágio"
    optionProfessionalLevelInternship.value = "estágio"
    optionProfessionalLevelJunior.innerText = "Júnior"
    optionProfessionalLevelJunior.value = "júnior"
    optionProfessionalLevelFull.innerText = "Pleno"
    optionProfessionalLevelFull.value = "pleno"
    optionProfessionalLevelSenior.innerText = "Sênior"
    optionProfessionalLevelSenior.value = "sênior"
    buttonEditUser.innerText = "Editar"
    buttonEditUser.type = "submit"

    body.appendChild(divBackground)
    divBackground.appendChild(formEditUser)
    formEditUser.append(buttonClose, editUserText, divSelect1, divSelect2, buttonEditUser)
    divSelect1.append(selectKindOfWork, arrowImage1)
    selectKindOfWork.append(optionKindOfWork, optionKindOfWorkHomeOffice, optionKindOfWorkPresential, optionKindOfWorkHybrid)
    divSelect2.append(selectProfessionalLevel, arrowImage2)
    selectProfessionalLevel.append(optionProfessionalLevel, optionProfessionalLevelInternship, optionProfessionalLevelJunior, optionProfessionalLevelFull, optionProfessionalLevelSenior)

    formEditUser.addEventListener("submit", async (e) => {
        e.preventDefault()

        await editUserInfoAdmin(userID, {
            kind_of_work: selectKindOfWork.value,
            professional_level: selectProfessionalLevel.value
        })

        await renderUsersRegistered()

        divBackground.classList.remove("flex")
        divBackground.classList.add("flex-none")
    })

    buttonClose.addEventListener("click", () => {
        divBackground.classList.remove("flex")
        divBackground.classList.add("flex-none")
    })

    divBackground.addEventListener("click", (e) => {
        if(e.target.classList.contains("edit-user-info-background")) {
            divBackground.classList.remove("flex")
            divBackground.classList.add("flex-none")
        }
    })
}

const deleteUserAdmin = (userID, username) => {
    
    const body = document.querySelector("body")
    const divBackground = document.createElement("div")
    const divDeleteUser = document.createElement("div")
    const buttonClose = document.createElement("button")
    const modalTitle = document.createElement("h2")
    const buttonDelete = document.createElement("button")

    divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
    divDeleteUser.classList.add("div-delete-user-admin", "flex", "flex-column")
    buttonClose.classList.add("button-close-modal-admin")
    modalTitle.classList.add("modals-title-admin")
    buttonDelete.classList.add("button-site-3-full")

    buttonClose.innerText = "X"
    buttonClose.type = "button"
    modalTitle.innerText = `Realmente deseja remover o usuário ${username}?`
    buttonDelete.innerText = "Deletar"
    buttonDelete.type = "button"

    body.appendChild(divBackground)
    divBackground.appendChild(divDeleteUser)
    divDeleteUser.append(buttonClose, modalTitle, buttonDelete)

    buttonDelete.addEventListener("click", async () => {
        await deleteUserFromSite(userID)

        await renderUsersRegistered()

        divBackground.classList.remove("flex")
        divBackground.classList.add("flex-none")
    })

    buttonClose.addEventListener("click", () => {
        divBackground.classList.remove("flex")
        divBackground.classList.add("flex-none")
    })

    divBackground.addEventListener("click", (e) => {
        if(e.target.classList.contains("edit-user-info-background")) {
            divBackground.classList.remove("flex")
            divBackground.classList.add("flex-none")
        }
    })

}

export { openLoginRegister, openHomeLogin, openHomeRegister, editUserInfoModal, createDepartment, editUserAdmin, deleteUserAdmin }