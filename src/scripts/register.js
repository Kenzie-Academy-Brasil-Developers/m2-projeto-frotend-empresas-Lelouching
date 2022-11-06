import { registerUser } from "./requests.js"

const getValueFormRegister = () => {

    const formRegister = document.querySelector(".form-register")

    formRegister.addEventListener("submit", (e) => {
        e.preventDefault()
        const inputs = [...document.querySelectorAll(".input-register")]
        const professionalLevel = document.querySelector("#choose-professional-level")

        const username = inputs[0].value
        const email = inputs[1].value
        const password = inputs[2].value
        let professional_level = ""
        if(professionalLevel.value == "") {
            professional_level = null
        } else {
            professional_level = professionalLevel.value
        }

        registerUser({
            username,
            password,
            email,
            professional_level
        })
    })
}

export { getValueFormRegister }