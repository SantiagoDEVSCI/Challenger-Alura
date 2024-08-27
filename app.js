document.addEventListener('DOMContentLoaded', function() {  
    const encryptBtn = document.getElementById("encryptBtn");  
    const decryptBtn = document.getElementById("decryptBtn");  
    const copyBtn = document.getElementById("copyBtn");  
    const inputText = document.getElementById("inputText");  
    const outputText = document.getElementById("outputText");  
    const character = document.getElementById("character");  

    const cipherMap = [  
        ["e", "enter"],  
        ["i", "imes"],  
        ["a", "ai"],  
        ["o", "ober"],  
        ["u", "ufat"]  
    ];  

    const transformText = (text, map, encrypt = true) => {  
        for (let [key, value] of map) {  
            const [target, replacement] = encrypt ? [key, value] : [value, key];  
            text = text.split(target).join(replacement);  
        }  
        return text;  
    };  

    const processText = (encrypt) => {  
        const text = inputText.value.trim();  
        if (text === "") {  
            alert("Por favor, ingrese el texto.");  
            return;  
        }  
        // Validar mayúsculas, acentos y caracteres especiales  
        if (/[^a-z\s]/.test(text)) {  
            alert("No son permitidas las mayúsculas, acentos o caracteres especiales.");  
            outputText.value = "";  
            character.classList.remove("hidden");  
            copyBtn.classList.add("hidden");  
            return;  
        }  
        const resultText = transformText(text, cipherMap, encrypt);  
        outputText.value = resultText;  
        inputText.value = "";  // Limpia el campo de entrada solo si el texto es válido  
        character.classList.add("hidden");  
        copyBtn.classList.remove("hidden");  
    };  

    encryptBtn.addEventListener('click', () => processText(true));  
    decryptBtn.addEventListener('click', () => processText(false));  

    copyBtn.addEventListener('click', () => {  
        const resultText = outputText.value;  
        if (resultText.trim() !== "") { // Asegura que haya algo que copiar  
            navigator.clipboard.writeText(resultText).then(() => {  
                alert("Texto copiado al portapapeles");  
                // Mostrar nuevamente el caracter  
                character.classList.remove("hidden");  
                // Limpiar el textarea de salida  
                outputText.value = "";  
                // Ocultar el botón de copiar  
                copyBtn.classList.add("hidden");  
            }).catch(err => {  
                console.error('Error al copiar el texto: ', err);  
            });  
        }  
    });  

    inputText.addEventListener('input', () => {  
        if (inputText.value.trim() === "") {  
            character.classList.remove("hidden");  
            copyBtn.classList.add("hidden");  
            outputText.value = "";  
        }  
    });  
});  