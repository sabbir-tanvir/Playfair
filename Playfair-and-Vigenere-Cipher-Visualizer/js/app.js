const title = document.getElementById("title")
const algo_select = document.getElementById("algo_select")
const playfair = document.getElementById("playfair")
const vigenere = document.getElementById("vigenere")

const valid_alogo = {
    PLAYFAIR : "PLAYFAIR",
    VIGENERE : "VIGENERE"
}

function on_algo_select(event){
    const value = event.target.value;
    if (value === valid_alogo.PLAYFAIR){
        title.innerText="Playfair Cipher"
        playfair.classList.add("d-block")
        vigenere.classList.add("d-none")
        playfair.classList.remove("d-none")
    }
    else if(value === valid_alogo.VIGENERE){
        title.innerText="Vigenere Cipher"
        vigenere.classList.add("d-block")
        playfair.classList.add("d-none")
        vigenere.classList.remove("d-none")
    }
    else{
        alert("Invalid Selection")
    }
}

algo_select.addEventListener("change", on_algo_select)