const userLogout = () => {

    const buttonLogout = document.querySelector("#button-logout")

    buttonLogout.addEventListener("click", () => {
        localStorage.clear()
        window.location.assign("../../index.html")
    })
}

export { userLogout }