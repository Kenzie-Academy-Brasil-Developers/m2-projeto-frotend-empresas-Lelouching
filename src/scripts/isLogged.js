const isLogged = () => {
    const token = localStorage.getItem("token-user")

    if(!token) {
        window.location.assign("../../index.html")
    }
}

export { isLogged }