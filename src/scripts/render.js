import { deleteUserAdmin, editUserAdmin } from "./modals.js";
import { getSectors, getCompanies, loggedUserInfo, coworkersList, getAllCompanies, getDeparmentsCompany, usersOutOfWork, hireUser, allUsers, dimissUser, editDepartmentDescription, deleteDeparmentAdmin, getAllDepartments, getDepartmentsUserLogged, getAllCompaniesHome } from "./requests.js";

const renderSector = async () => {

    const sector = await getSectors()

    const select = document.querySelector("#choose-sector")
    
    sector.map((data) => {
        const option = document.createElement("option")
        const button = document.createElement("button")
        option.innerText = data.description
        option.value = data.description
        option.classList.add("teste")
        
        select.appendChild(option)
    })
    
    select.addEventListener("change", (event) => {
        if(event.target.value == "") {
            renderAllCompaniesHome()
        } else{
            getCompanies(event.target.value)
        }
    })
}

const renderAllCompaniesHome = async () => {

    const companies = await getAllCompaniesHome()

    const ul = document.querySelector(".sectors-list")

    ul.innerHTML = ""
    
    companies.map((element) => {
        let li = document.createElement("li")
        let companieName = document.createElement("h3")
        let divHourSector = document.createElement("div")
        let openHour = document.createElement("span")
        let sector = document.createElement("span")

        li.classList.add("sector-list", "flex", "flex-column", "justify-between")
        companieName.classList.add("companie-name-home")
        divHourSector.classList.add("div-hour-sector", "flex", "flex-column")
        openHour.classList.add("open-hour-home")
        sector.classList.add("sector-home")

        companieName.innerText = element.name
        openHour.innerText = `${element.opening_hours} horas`
        sector.innerText = element.sectors.description

        ul.appendChild(li)
        li.append(companieName, divHourSector)
        divHourSector.append(openHour, sector)
    })
}

const renderCompanies = (data) => {
    
    const ul = document.querySelector(".sectors-list")

    ul.innerHTML = ""
    
    data.map((element) => {
        let li = document.createElement("li")
        let companieName = document.createElement("h3")
        let divHourSector = document.createElement("div")
        let openHour = document.createElement("span")
        let sector = document.createElement("span")

        li.classList.add("sector-list", "flex", "flex-column", "justify-between")
        companieName.classList.add("companie-name-home")
        divHourSector.classList.add("div-hour-sector", "flex", "flex-column")
        openHour.classList.add("open-hour-home")
        sector.classList.add("sector-home")

        companieName.innerText = element.name
        openHour.innerText = `${element.opening_hours} horas`
        sector.innerText = element.sectors.description

        ul.appendChild(li)
        li.append(companieName, divHourSector)
        divHourSector.append(openHour, sector)
    })
}

const renderUserInfo = async () => {

    const userInfo = await loggedUserInfo()

    const username = document.querySelector(".user-name")
    const userEmail = document.querySelector(".user-email")
    const userProfessionalLevel = document.querySelector(".user-professional-level")
    const userKindOfWork = document.querySelector(".user-kind-of-work")

    username.innerText = userInfo.username
    userEmail.innerText = userInfo.email

    if(userInfo.professional_level == null) {
        userProfessionalLevel.innerText = ""
    } else {
        const arrayProfessionalLevel = Array.from(userInfo.professional_level)
        let professionalLevelText = ""
        arrayProfessionalLevel.forEach(element => {
            const index = arrayProfessionalLevel.indexOf(element)
            if(index == 0) {
                professionalLevelText += element.toUpperCase()
            } else {
                professionalLevelText += element
            }
        });
        userProfessionalLevel.innerText = professionalLevelText
    }

    if(userInfo.kind_of_work == null) {
        userKindOfWork.innerText = ""
    } else {
        const arrayKindOfWork = Array.from(userInfo.kind_of_work)
        let kindOfWorkText = ""
        arrayKindOfWork.forEach(element => {
            const index = arrayKindOfWork.indexOf(element)
            if(index == 0) {
                kindOfWorkText += element.toUpperCase()
            } else {
                kindOfWorkText += element
            }
        });
        userKindOfWork.innerText = kindOfWorkText
    }

    if(userInfo.department_uuid == null) {
        const divNotHired = document.querySelector(".not-hired")

        divNotHired.classList.remove("flex-none")
        divNotHired.classList.add("flex")
    } else {
        const divHired = document.querySelector(".hired")

        divHired.classList.remove("flex-none")
        divHired.classList.add("flex")
        
        const companyDepartmentName = document.querySelector(".company-department-name")
        const ul = document.querySelector(".people-list-company")

        const departmentsUserLogged = await getDepartmentsUserLogged()
        const findDepartmentUser = departmentsUserLogged.departments.find((department) => {
            if(department.uuid == userInfo.department_uuid) {
                return department
            }
        })

        companyDepartmentName.innerText = `${departmentsUserLogged.name} - ${findDepartmentUser.name}`

        const departmentCoworkers = await coworkersList()

        departmentCoworkers[0].users.forEach(coworker => {
            const li = document.createElement("li")
            const coworkerName = document.createElement("h4")
            const coworkerProfessionalLevel = document.createElement("span")

            li.classList.add("person-list-company", "flex", "flex-column")
            coworkerName.classList.add("coworker-name")
            coworkerProfessionalLevel.classList.add("coworker-professional-level")

            coworkerName.innerText = coworker.username

            let professionalLevelText = ""

            if(coworker.professional_level == null) {
                coworkerProfessionalLevel.innerText = ""
            } else {
                const arrayProfessionalLevel = Array.from(coworker.professional_level)
                let professionalLevelText = ""
                arrayProfessionalLevel.forEach(element => {
                    const index = arrayProfessionalLevel.indexOf(element)
                    if(index == 0) {
                        professionalLevelText += element.toUpperCase()
                    } else {
                        professionalLevelText += element
                    }
                });
                coworkerProfessionalLevel.innerText = professionalLevelText
            }

            ul.appendChild(li)
            li.append(coworkerName, coworkerProfessionalLevel)
        });
    }
}

const renderCompaniesAdmin = async () => {

    const companies = await getAllCompanies()

    const body = document.querySelector("body")
    const select = document.querySelector("#choose-company")
    const ul = document.querySelector(".companies-list-admin")

    ul.innerHTML = ""

    companies.map((element) => {
        const option = document.createElement("option")
        option.value = element.uuid
        option.innerText = element.name
        select.appendChild(option)
    })

    renderAllDepartmentsAdmin()

    select.addEventListener("change", async (e) => {   
        ul.innerHTML = ""

        let departments = ""

        if(e.target.value == "select") {
            departments = await getAllDepartments()
        } else {
            departments = await getDeparmentsCompany(e.target.value)
        }

        departments.map((deparment) => {
            const li = document.createElement("li")
            const deparmentName = document.createElement("h4")
            const deparmentDescription = document.createElement("span")
            const companyName = document.createElement("span")
            const divOptions = document.createElement("div")
            const viewDepartment = document.createElement("img")
            const editDepartment = document.createElement("img")
            const deleteDeparment = document.createElement("img")

            deparmentName.innerText = deparment.name
            deparmentDescription.innerText = deparment.description
            companyName.innerText = deparment.companies.name
            viewDepartment.src = "../../src/assets/img/eye-view.svg"
            viewDepartment.alt = "Ver mais"
            editDepartment.src = "../../src/assets/img/pencil-black-edit.svg"
            editDepartment.alt = "Editar departamento"
            deleteDeparment.src = "../../src/assets/img/trash-delete.svg"
            deleteDeparment.alt = "Deletar departamento"

            li.classList.add("company-list-admin", "flex", "flex-column")
            deparmentName.classList.add("department-name-admin")
            deparmentDescription.classList.add("deparment-description-admin")
            companyName.classList.add("company-name-admin")
            divOptions.classList.add("div-options-admin","flex", "justify-center", "align-i-center")
            viewDepartment.classList.add("options-department-admin")
            editDepartment.classList.add("options-department-admin")
            deleteDeparment.classList.add("options-department-admin")
            ul.appendChild(li)
            li.append(deparmentName, deparmentDescription, companyName, divOptions)
            divOptions.append(viewDepartment, editDepartment, deleteDeparment)

            viewDepartment.addEventListener("click", async () => {
                const divBackground = document.createElement("div")
                const formViewDepartment = document.createElement("form")
                const buttonClose = document.createElement("button")
                const deparmentName = document.createElement("h2")
                const divForm = document.createElement("div")
                const divTexts = document.createElement("div")
                const deparmentDescription = document.createElement("span")
                const companyName = document.createElement("span")
                const divInputButton = document.createElement("div")
                const imageArrowUser = document.createElement("img")
                const select = document.createElement("select")
                const optionChooseUser = document.createElement("option")
                const buttonHire = document.createElement("button")
                const ul = document.createElement("ul")

                divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
                formViewDepartment.classList.add("form-view-department")
                buttonClose.classList.add("button-close-modal-admin")
                deparmentName.classList.add("modals-title-admin")
                divForm.classList.add("flex", "justify-between")
                divTexts.classList.add("div-texts-admin" ,"flex", "flex-column")
                deparmentDescription.classList.add("deparment-description-modal-admin")
                companyName.classList.add("company-name-modal-admin")
                divInputButton.classList.add("div-input-button-admin" ,"flex", "flex-column", "align-i-end")
                imageArrowUser.classList.add("image-arrow-user-select-modal-admin")
                select.id = "select-user-admin"
                select.name = "select-user-admin"
                buttonHire.classList.add("button-site-3")
                ul.classList.add("users-deparment-list", "flex", "align-i-center")

                buttonClose.innerText = "X"
                buttonClose.type = "button"
                deparmentName.innerText = deparment.name
                deparmentDescription.innerText = deparment.description
                companyName.innerText = deparment.companies.name
                imageArrowUser.src = "../../src/assets/img/arrow-2.svg"
                imageArrowUser.alt = "Seta para baixo"
                optionChooseUser.innerText = "Selecionar usuário"
                optionChooseUser.value = "choose-user"
                buttonHire.innerText = "Contratar"
                buttonHire.type = "submit"

                body.appendChild(divBackground)
                divBackground.appendChild(formViewDepartment)
                formViewDepartment.append(buttonClose, deparmentName, divForm, ul)
                divForm.append(divTexts, divInputButton)
                divTexts.append(deparmentDescription, companyName)
                divInputButton.append(select, buttonHire, imageArrowUser)
                select.appendChild(optionChooseUser)

                const usersNoWorking = await usersOutOfWork()

                usersNoWorking.map((element) => {
                    const option = document.createElement("option")
                    option.innerText = element.username
                    option.value = element.uuid
                    select.appendChild(option)
                })

                const users = await allUsers()

                users.map((user => {
                    if(user.department_uuid == deparment.uuid) {
                        const li = document.createElement("li")
                        const username = document.createElement("h4")
                        const professionalLevel = document.createElement("span")
                        const companyName = document.createElement("span")
                        const divButton = document.createElement("div")
                        const buttonDimiss = document.createElement("button")

                        li.classList.add("user-deparment-list", "flex", "flex-column")
                        username.classList.add("username-department-modal-admin")
                        professionalLevel.classList.add("professiona-level-modal-admin")
                        companyName.classList.add("company-name-modal-admin")
                        divButton.classList.add("flex", "justify-center")
                        buttonDimiss.classList.add("button-site-4")

                        username.innerText = user.username
                        if(user.professional_level == null) {
                            professionalLevel.innerText = ""
                        } else {
                            const arrayProfessionalLevel = Array.from(user.professional_level)
                            let professionalLevelText = ""
                            arrayProfessionalLevel.forEach(element => {
                                const index = arrayProfessionalLevel.indexOf(element)
                                if(index == 0) {
                                    professionalLevelText += element.toUpperCase()
                                } else {
                                    professionalLevelText += element
                                }
                            });
                            professionalLevel.innerText = professionalLevelText
                        }
                        companyName.innerText = deparment.companies.name
                        buttonDimiss.innerText = "Desligar"
                        buttonDimiss.type = "button"

                        ul.appendChild(li)
                        li.append(username, professionalLevel, companyName, divButton)
                        divButton.appendChild(buttonDimiss)

                        buttonDimiss.addEventListener("click", () => {
                            dimissUser(user.uuid)

                            divBackground.classList.remove("flex")
                            divBackground.classList.add("flex-none")
                        })
                    }
                }))

                formViewDepartment.addEventListener("submit", (e) => {
                    e.preventDefault()

                    hireUser({
                        user_uuid: select.value,
                        department_uuid: deparment.uuid
                    })

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

            editDepartment.addEventListener("click", () => {
                const divBackground = document.createElement("div")
                const formEditDepartment = document.createElement("form")
                const buttonClose = document.createElement("button")
                const editDepartmentName = document.createElement("h2")
                const textAreaDepartmentDescription = document.createElement("textarea")
                const buttonSaveChanges = document.createElement("button")

                divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
                formEditDepartment.classList.add("form-edit-department", "flex", "flex-column")
                buttonClose.classList.add("button-close-modal-admin")
                editDepartmentName.classList.add("modals-title-admin")
                textAreaDepartmentDescription.id = "textarea-modal-admin"
                buttonSaveChanges.classList.add("button-site-2-full")

                buttonClose.type = "button"
                buttonClose.innerText = "X"
                editDepartmentName.innerText = "Editar Departamento"
                textAreaDepartmentDescription.placeholder = "Descrição nova do departamento"
                textAreaDepartmentDescription.value = deparment.description
                buttonSaveChanges.type = "submit"
                buttonSaveChanges.innerText = "Salvar alterações"

                body.appendChild(divBackground)
                divBackground.appendChild(formEditDepartment)
                formEditDepartment.append(buttonClose, editDepartmentName, textAreaDepartmentDescription, buttonSaveChanges)

                formEditDepartment.addEventListener("submit", async (e) => {
                    e.preventDefault()

                    await editDepartmentDescription(deparment.uuid, {
                        description: textAreaDepartmentDescription.value
                    })

                    window.location.reload()

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

            deleteDeparment.addEventListener("click", () => {
                const divBackground = document.createElement("div")
                const divDeleteDepartment = document.createElement("div")
                const buttonClose = document.createElement("button")
                const deleteDepartmentText = document.createElement("h2")
                const buttonConfirm = document.createElement("button")

                divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
                divDeleteDepartment.classList.add("div-delete-department", "flex", "flex-column")
                buttonClose.classList.add("button-close-modal-admin")
                deleteDepartmentText.classList.add("modals-title-admin")
                buttonConfirm.classList.add("button-site-3-full")

                buttonClose.type = "button"
                buttonClose.innerText = "X"
                deleteDepartmentText.innerText = `Realmente deseja deletar o Departamento ${deparment.name} e demitir seus funcionários?`
                buttonConfirm.innerText = "Confirmar"
                buttonConfirm.type = "button"

                body.appendChild(divBackground)
                divBackground.appendChild(divDeleteDepartment)
                divDeleteDepartment.append(buttonClose, deleteDepartmentText, buttonConfirm)

                buttonConfirm.addEventListener("click", async () => {
                    await deleteDeparmentAdmin(deparment.uuid)

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
        })
        }

    )
}

const renderAllDepartmentsAdmin = async () => {

    const body = document.querySelector("body")

    const ul = document.querySelector(".companies-list-admin")

    let departments = await getAllDepartments()

    departments.map((deparment) => {
        const li = document.createElement("li")
        const deparmentName = document.createElement("h4")
        const deparmentDescription = document.createElement("span")
        const companyName = document.createElement("span")
        const divOptions = document.createElement("div")
        const viewDepartment = document.createElement("img")
        const editDepartment = document.createElement("img")
        const deleteDeparment = document.createElement("img")

        deparmentName.innerText = deparment.name
        deparmentDescription.innerText = deparment.description
        companyName.innerText = deparment.companies.name
        viewDepartment.src = "../../src/assets/img/eye-view.svg"
        viewDepartment.alt = "Ver mais"
        editDepartment.src = "../../src/assets/img/pencil-black-edit.svg"
        editDepartment.alt = "Editar departamento"
        deleteDeparment.src = "../../src/assets/img/trash-delete.svg"
        deleteDeparment.alt = "Deletar departamento"

        li.classList.add("company-list-admin", "flex", "flex-column")
        deparmentName.classList.add("department-name-admin")
        deparmentDescription.classList.add("deparment-description-admin")
        companyName.classList.add("company-name-admin")
        divOptions.classList.add("div-options-admin","flex", "justify-center", "align-i-center")
        viewDepartment.classList.add("options-department-admin")
        editDepartment.classList.add("options-department-admin")
        deleteDeparment.classList.add("options-department-admin")
        ul.appendChild(li)
        li.append(deparmentName, deparmentDescription, companyName, divOptions)
        divOptions.append(viewDepartment, editDepartment, deleteDeparment)

        viewDepartment.addEventListener("click", async () => {
            const divBackground = document.createElement("div")
            const formViewDepartment = document.createElement("form")
            const buttonClose = document.createElement("button")
            const deparmentName = document.createElement("h2")
            const divForm = document.createElement("div")
            const divTexts = document.createElement("div")
            const deparmentDescription = document.createElement("span")
            const companyName = document.createElement("span")
            const divInputButton = document.createElement("div")
            const imageArrowUser = document.createElement("img")
            const select = document.createElement("select")
            const optionChooseUser = document.createElement("option")
            const buttonHire = document.createElement("button")
            const ul = document.createElement("ul")

            divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
            formViewDepartment.classList.add("form-view-department")
            buttonClose.classList.add("button-close-modal-admin")
            deparmentName.classList.add("modals-title-admin")
            divForm.classList.add("flex", "justify-between")
            divTexts.classList.add("div-texts-admin" ,"flex", "flex-column")
            deparmentDescription.classList.add("deparment-description-modal-admin")
            companyName.classList.add("company-name-modal-admin")
            divInputButton.classList.add("div-input-button-admin" ,"flex", "flex-column", "align-i-end")
            imageArrowUser.classList.add("image-arrow-user-select-modal-admin")
            select.id = "select-user-admin"
            select.name = "select-user-admin"
            buttonHire.classList.add("button-site-3")
            ul.classList.add("users-deparment-list", "flex", "align-i-center")

            buttonClose.innerText = "X"
            buttonClose.type = "button"
            deparmentName.innerText = deparment.name
            deparmentDescription.innerText = deparment.description
            companyName.innerText = deparment.companies.name
            imageArrowUser.src = "../../src/assets/img/arrow-2.svg"
            imageArrowUser.alt = "Seta para baixo"
            optionChooseUser.innerText = "Selecionar usuário"
            optionChooseUser.value = "choose-user"
            buttonHire.innerText = "Contratar"
            buttonHire.type = "submit"

            body.appendChild(divBackground)
            divBackground.appendChild(formViewDepartment)
            formViewDepartment.append(buttonClose, deparmentName, divForm, ul)
            divForm.append(divTexts, divInputButton)
            divTexts.append(deparmentDescription, companyName)
            divInputButton.append(select, buttonHire, imageArrowUser)
            select.appendChild(optionChooseUser)

            const usersNoWorking = await usersOutOfWork()

            usersNoWorking.map((element) => {
                const option = document.createElement("option")
                option.innerText = element.username
                option.value = element.uuid
                select.appendChild(option)
            })

            const users = await allUsers()

            users.map((user => {
                if(user.department_uuid == deparment.uuid) {
                    const li = document.createElement("li")
                    const username = document.createElement("h4")
                    const professionalLevel = document.createElement("span")
                    const companyName = document.createElement("span")
                    const divButton = document.createElement("div")
                    const buttonDimiss = document.createElement("button")

                    li.classList.add("user-deparment-list", "flex", "flex-column")
                    username.classList.add("username-department-modal-admin")
                    professionalLevel.classList.add("professiona-level-modal-admin")
                    companyName.classList.add("company-name-modal-admin")
                    divButton.classList.add("flex", "justify-center")
                    buttonDimiss.classList.add("button-site-4")

                    username.innerText = user.username
                    if(user.professional_level == null) {
                        professionalLevel.innerText = ""
                    } else {
                        const arrayProfessionalLevel = Array.from(user.professional_level)
                        let professionalLevelText = ""
                        arrayProfessionalLevel.forEach(element => {
                            const index = arrayProfessionalLevel.indexOf(element)
                            if(index == 0) {
                                professionalLevelText += element.toUpperCase()
                            } else {
                                professionalLevelText += element
                            }
                        });
                        professionalLevel.innerText = professionalLevelText
                    }
                    companyName.innerText = deparment.companies.name
                    buttonDimiss.innerText = "Desligar"
                    buttonDimiss.type = "button"

                    ul.appendChild(li)
                    li.append(username, professionalLevel, companyName, divButton)
                    divButton.appendChild(buttonDimiss)

                    buttonDimiss.addEventListener("click", () => {
                        dimissUser(user.uuid)

                        divBackground.classList.remove("flex")
                        divBackground.classList.add("flex-none")
                    })
                }
            }))

            formViewDepartment.addEventListener("submit", (e) => {
                e.preventDefault()

                hireUser({
                    user_uuid: select.value,
                    department_uuid: deparment.uuid
                })

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

        editDepartment.addEventListener("click", () => {
            const divBackground = document.createElement("div")
            const formEditDepartment = document.createElement("form")
            const buttonClose = document.createElement("button")
            const editDepartmentName = document.createElement("h2")
            const textAreaDepartmentDescription = document.createElement("textarea")
            const buttonSaveChanges = document.createElement("button")

            divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
            formEditDepartment.classList.add("form-edit-department", "flex", "flex-column")
            buttonClose.classList.add("button-close-modal-admin")
            editDepartmentName.classList.add("modals-title-admin")
            textAreaDepartmentDescription.id = "textarea-modal-admin"
            buttonSaveChanges.classList.add("button-site-2-full")

            buttonClose.type = "button"
            buttonClose.innerText = "X"
            editDepartmentName.innerText = "Editar Departamento"
            textAreaDepartmentDescription.placeholder = "Descrição nova do departamento"
            textAreaDepartmentDescription.value = deparment.description
            buttonSaveChanges.type = "submit"
            buttonSaveChanges.innerText = "Salvar alterações"

            body.appendChild(divBackground)
            divBackground.appendChild(formEditDepartment)
            formEditDepartment.append(buttonClose, editDepartmentName, textAreaDepartmentDescription, buttonSaveChanges)

            formEditDepartment.addEventListener("submit", async (e) => {
                e.preventDefault()

                await editDepartmentDescription(deparment.uuid, {
                    description: textAreaDepartmentDescription.value
                })

                window.location.reload()

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

        deleteDeparment.addEventListener("click", () => {
            const divBackground = document.createElement("div")
            const divDeleteDepartment = document.createElement("div")
            const buttonClose = document.createElement("button")
            const deleteDepartmentText = document.createElement("h2")
            const buttonConfirm = document.createElement("button")

            divBackground.classList.add("edit-user-info-background", "flex", "justify-center", "align-i-center")
            divDeleteDepartment.classList.add("div-delete-department", "flex", "flex-column")
            buttonClose.classList.add("button-close-modal-admin")
            deleteDepartmentText.classList.add("modals-title-admin")
            buttonConfirm.classList.add("button-site-3-full")

            buttonClose.type = "button"
            buttonClose.innerText = "X"
            deleteDepartmentText.innerText = `Realmente deseja deletar o Departamento ${deparment.name} e demitir seus funcionários?`
            buttonConfirm.innerText = "Confirmar"
            buttonConfirm.type = "button"

            body.appendChild(divBackground)
            divBackground.appendChild(divDeleteDepartment)
            divDeleteDepartment.append(buttonClose, deleteDepartmentText, buttonConfirm)

            buttonConfirm.addEventListener("click", async () => {
                await deleteDeparmentAdmin(deparment.uuid)

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
    })
}

const renderUsersRegistered = async () => {

    const ul = document.querySelector(".users-registered-list-admin")
    
    const users = await allUsers()
    const departments = await getAllDepartments()

    ul.innerHTML = ""

    users.map(async (user) => {

        if(user.is_admin) {
            return false
        }

        const li = document.createElement("li")
        const username = document.createElement("h4")
        const userLevel = document.createElement("span")
        const userCompany = document.createElement("span")
        const divOptions = document.createElement("div")
        const deleteUser = document.createElement("img")
        const editUser = document.createElement("img")

        editUser.src = "../../src/assets/img/pencil-brand-edit.svg"
        editUser.alt = "Editar usuário"
        deleteUser.src = "../../src/assets/img/trash-delete.svg"
        deleteUser.alt = "Deletar usuário"

        li.classList.add("user-registered-list-admin", "flex", "flex-column", "justify-between")
        username.classList.add("user-registered-name")
        userLevel.classList.add("user-registered-level")
        userCompany.classList.add("user-registered-company")
        divOptions.classList.add("div-options-admin","flex", "justify-center", "align-i-center")
        editUser.classList.add("options-department-admin")
        deleteUser.classList.add("options-department-admin")

        username.innerText = user.username

        if(user.professional_level == null) {
            userLevel.innerText = ""
        } else {
            const arrayProfessionalLevel = Array.from(user.professional_level)
            let professionalLevelText = ""
            arrayProfessionalLevel.forEach(element => {
                const index = arrayProfessionalLevel.indexOf(element)
                if(index == 0) {
                    professionalLevelText += element.toUpperCase()
                } else {
                    professionalLevelText += element
                }
            });
            userLevel.innerText = professionalLevelText
        }

        if(user.department_uuid == null) {
            userCompany.innerText = ""
        } else {
            departments.map((element2 => {
                if(element2.uuid == user.department_uuid) {
                    userCompany.innerText = element2.companies.name
                }
            }))
        }

        ul.appendChild(li)
        li.append(username, userLevel, userCompany, divOptions)
        divOptions.append(editUser, deleteUser)

        editUser.addEventListener("click", () => {
            editUserAdmin(user.uuid)
        })

        deleteUser.addEventListener("click", () => {
            deleteUserAdmin(user.uuid, user.username)
        })
    })
}

export { renderSector, renderCompanies, renderAllCompaniesHome, renderUserInfo, renderCompaniesAdmin, renderUsersRegistered }