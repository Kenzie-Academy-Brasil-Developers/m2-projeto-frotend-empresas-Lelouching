import { isLogged } from "../../src/scripts/isLogged.js";
import { userLogout } from "../../src/scripts/logout.js"
import { createDepartment } from "../../src/scripts/modals.js";
import { renderCompaniesAdmin, renderUsersRegistered } from "../../src/scripts/render.js";

isLogged()

const isAdmin = () => {

    const userValidation = JSON.parse(localStorage.getItem("token-user"))
    
    if(!userValidation.is_admin) {
        window.location.assign("../userPage/index.html")
    }
}

isAdmin()
userLogout()
renderCompaniesAdmin()
createDepartment()
renderUsersRegistered()