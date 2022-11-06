const toastWarn = (message, typeOfMessage) => {
    const body = document.querySelector("body")

    const toastVerify = document.querySelector(".toast-warn")

    if(toastVerify) {
        toastVerify.classList = ""
        toastVerify.classList.add("flex-none")
    }

    const toast = document.createElement("div")
    const messageWarn = document.createElement("span")

    toast.classList.add("toast-warn", `${typeOfMessage}`)
    messageWarn.classList.add("toast-warn-message")

    messageWarn.innerText = message

    body.appendChild(toast)
    toast.appendChild(messageWarn)

    setTimeout(() => {
        toast.classList.add("flex-none")
    }, 4000)
}

export { toastWarn }