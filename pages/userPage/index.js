import { isLogged } from "../../src/scripts/isLogged.js";
import { userLogout } from "../../src/scripts/logout.js"
import { editUserInfoModal } from "../../src/scripts/modals.js";
import { renderUserInfo } from "../../src/scripts/render.js";

isLogged()

const isAdmin = () => {

    const userValidation = JSON.parse(localStorage.getItem("token-user"))
    
    if(userValidation.is_admin) {
        window.location.assign("../adminPage/index.html")
    }
}

isAdmin()
userLogout()
renderUserInfo()
editUserInfoModal()