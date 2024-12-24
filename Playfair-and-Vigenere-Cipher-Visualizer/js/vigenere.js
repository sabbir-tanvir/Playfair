const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function checkAndModify(input) {
    input = input.toUpperCase().replace(/\s+/g, '');
    if (!/^[A-Z]+$/.test(input)) {
        alert("Only letters A-Z allowed. No digits or special symbols are allowed.");
        return null;
    }
    return input;
}
//This function can generate multiple table and colors 
function generateStepByStepTables(data, isEncrypt) {
    const containerId = isEncrypt ? 'tableContainer' : 'decryptionTableContainer';
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const headers = isEncrypt ? 
        ['Plain Text', 'Plain Value', 'Key Text', 'Key Values', 'Cipher Values', 'Cipher Text'] :
        ['Cipher Text', 'Cipher Value', 'Key Text', 'Key Values', 'Plain Values', 'Plain Text'];
    const colors = ['#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50'];

    for (let step = 1; step <= headers.length; step++) {
        let title = document.createElement('h2');
        title.textContent = headers[step - 1] + " Table";
        container.appendChild(title);

        let table = document.createElement('table');
        table.id = `table${step}`;
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';

        let header = table.insertRow();
        for (let i = 0; i < step; i++) {
            let cell = header.insertCell();
            cell.innerText = headers[i];
            cell.style.border = '1px solid green';
            if (i === step - 1) { cell.style.backgroundColor = colors[step - 1]; }
        }
        data.forEach(item => {
            let row = table.insertRow();
            let cells = [item.char, alphabet.indexOf(item.char), item.keyChar, alphabet.indexOf(item.keyChar), item.newIndex, item.newChar];
            for (let i = 0; i < step; i++) {
                let cell = row.insertCell();
                cell.innerText = cells[i];
                cell.style.border = '1px solid green';
                if (i === step - 1) { cell.style.backgroundColor = colors[step - 1]; }
            }
        });
        container.appendChild(table);
        if (step < headers.length) {
            let hr = document.createElement('hr');
            container.appendChild(hr);
        }
    }
    
}




function processVigenere(text, keyword, isEncrypt) {
    text = checkAndModify(text);
    keyword = checkAndModify(keyword);
    if (!text || !keyword) {
        return;
    }
    let resultText = '';
    let data = [];
    for (let i = 0, len = text.length; i < len; i++) {
        const char = text[i];
        const keyChar = keyword[i % keyword.length];
        const charIndex = alphabet.indexOf(char);
        const keyIndex = alphabet.indexOf(keyChar);
        const newIndex = isEncrypt ? (charIndex + keyIndex) % 26 : (charIndex - keyIndex + 26) % 26;
        const newChar = alphabet[newIndex];
        data.push({ char, keyChar, newChar, newIndex });
        resultText += newChar;
    }
    generateStepByStepTables(data, isEncrypt);
    const displayArea = isEncrypt ? 'encrypted_text_display_area' : 'decrypted_text_display_area';
    document.getElementById(displayArea).value = resultText;
    
    const copyInputBox = isEncrypt ? 'encrypted_text_display_area' : 'decrypted_text_display_area';
    document.getElementById(copyInputBox).innerHTML = '<br><h2><b><>Final Text Value:</b></h2> <input type="text" id="VigenereCipherTextField" name="cipherText" class="form-control" value="' + resultText + '" readonly>';
    
}
// This is the copyclipboard function. it can copyed final output.
function copyToClipboard(isEncrypt) {
    const textAreaId = isEncrypt ? 'encrypted_text_display_area' : 'decrypted_text_display_area';
    const textToCopy = document.getElementById(textAreaId).value;
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert("Text successfully copied to clipboard");
    }, function(err) {
        alert("Failed to copy text: " + err);
    });
}

// This is Encryption Display function
function vigenereEncryptAndDisplay() {
    const text = document.getElementById('plaintext_input').value;
    const keyword = document.getElementById('encryption_key').value;
    processVigenere(text, keyword, true);
}
// This is Decryption Display function
function vigenereDecryptAndDisplay() {
    const text = document.getElementById('cipher_text_input').value;
    const keyword = document.getElementById('decryption_key').value;
    processVigenere(text, keyword, false);
}
//This is the reset function.it can clear history.
function resetOutput() {
    location.reload();
}
