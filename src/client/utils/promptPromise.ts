export default function prompt(message: string, defaultValue: string) {
    var wrapper = document.createElement("div")
    wrapper.style.backgroundColor = "rgba(0,0,0,0.8)"
    wrapper.style.position = "fixed"
    wrapper.style.width = "100vw"
    wrapper.style.height = "100vh"
    wrapper.style.zIndex = "999999"
    wrapper.style.top = "0"
    wrapper.style.left = "0"
    wrapper.style.display = "flex"
    wrapper.style.justifyContent = "center"
    wrapper.style.alignItems = "center"
    document.body.appendChild(wrapper)

    var dialog = document.createElement("div")
    dialog.style.backgroundColor = "white"
    dialog.style.padding = "1em"
    wrapper.appendChild(dialog)

    var title = document.createElement("div")
    title.style.padding = "1em"
    title.innerText = message
    dialog.appendChild(title)

    var input = document.createElement("input")
    input.style.minWidth = "15em"
    input.value = defaultValue || ""
    dialog.appendChild(input)

    var button = document.createElement("button")
    button.innerText = "OK"
    dialog.appendChild(button)

    return new Promise((resolve, reject) => {
        button.onclick = () => {
            document.body.removeChild(wrapper)
            resolve(input.value)
        }
    })
}