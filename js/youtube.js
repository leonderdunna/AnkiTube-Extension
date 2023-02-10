window.addEventListener('yt-navigate-start', start);
window.addEventListener("load", start)

let vidId = null;

function setVidId() {
    let newVidId = null
    if (location.href.includes("v="))
        newVidId = location.href.match(/v=([^&]*)/)[1]
    if (newVidId !== vidId) {
        if (document.querySelector(".anki-" + vidId))
            document.querySelector(".anki-" + vidId).remove()
        vidId = newVidId
        console.log(vidId, "ANKI")
    }
}

async function start() {
    let init = setInterval( () => {
        if (!document.querySelector("#related.style-scope"))
            console.log("trying again")
        else {
            setVidId()
            console.log("found")
            if (!document.querySelector(".anki-main") && vidId !== null)
                document.querySelector("#related.style-scope").prepend(getMainPanel("YouTube", vidId))
            clearInterval(init)
        }
    }, 0)
}