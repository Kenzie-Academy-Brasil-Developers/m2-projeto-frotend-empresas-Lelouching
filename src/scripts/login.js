import { loginUser } from "./requests.js"

const getValueFormLogin = () => {

    const formLogin = document.querySelector(".form-login")

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault()

        const inputs = [...document.querySelectorAll(".input-login")]

        const email = inputs[0].value
        const password = inputs[1].value

        loginUser({
            email,
            password
        })
    })
}

export { getValueFormLogin }