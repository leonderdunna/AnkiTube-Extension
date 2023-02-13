window.addEventListener("load", start)
window.addEventListener("popstate", start)

let vidId = null;

function setVidId() {
    let newVidId
    if (location.href.includes("lecture=") && location.href.includes("watch"))
        newVidId = location.href.match(/lecture=([^&]*)/)[1]
    else
        newVidId = null
    if (newVidId !== vidId) {
        if (document.querySelector(".anki-" + vidId))
            document.querySelector(".anki-" + vidId).remove()
        vidId = newVidId
        console.log(vidId, "ANKI")
    }
}

async function start() {
    let init = setInterval(() => {
        if (!document.querySelector("main"))
            console.log("trying again")
        else {
            setVidId()
            if(vidId == null)
                clearInterval(init)
            else {
                console.log("found")
                if (!document.querySelector(".anki-main"))
                    document.querySelector("main").append(getMainPanel("Bootstrap Academy", vidId))
                document.querySelector("div.relative div.relative").style.overflow = "scroll"
                clearInterval(init)
            }
        }
    }, 0)
}

// HAB KEIN EVENT WENN VIDEO CHANGED
// TODO vernünftige lösung für das problem

let currentUrl = location.href
setInterval(() => {
    if (currentUrl !== location.href) {
        start().then(() => {
            console.log("neugeladen")
        })
        currentUrl = location.href
    }
}, 500)