function load() {

    /*
    var patchmodal = document.getElementById("patchModal")
    var patchbtn = document.getElementById("patch")
    var patchspan = document.getElementsByClassName("close")[0]

    patchbtn.onclick = function () {
        patchmodal.style.display = "block"
    }

    patchspan.onclick = function () {
        patchmodal.style.display = "none"
    }

    window.onclick = function (event) {
        if (event.target == patchmodal) {
            patchmodal.style.display = "none";
        }
    }
    */


    var postmodal = document.getElementById("postModal")
    var postbtn = document.getElementById("post")
    var postspan = document.getElementsByClassName("close")[0]


    postbtn.onclick = function () {
        postmodal.style.display = "block"
    }

    postspan.onclick = function () {
        postmodal.style.display = "none"
    }

    window.onclick = function (event) {
        if (event.target == postmodal) {
            postmodal.style.display = "none";
        }
    }

}