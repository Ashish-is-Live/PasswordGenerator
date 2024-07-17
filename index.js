const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-copyNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");


let password = "";
let passwordLength = 10;
let checkCount = 0;

// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
handleSlider();

// set the indicator
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

// get random number
function getRndInteger(min, max) {
    let x = Math.random();
    return Math.floor(x * (max - min)) + min;


}
function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasLower && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0")
    } else {
        setIndicator("#f00");
    }






}

async function copyContent() {


    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText = "failed"
    };

    // to make copy wala span visible
    copyMsg.classList.remove("active");
    

    setTimeout(() => {
        copyMsg.classList.add("active");
    }, 2000);

}

// adding an event listner to slider

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();


});
// adding an event listner to copy button
copyBtn.addEventListener(("click"), () => {
    if (passwordDisplay.value) {
        copyContent();
    }

});

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach(checkBox => {
        if (checkBox.checked) {
            checkCount++;
        }
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
function generateSymbol() {
    symbols = "+-*$%@#/=?[]{}<>&$()_:;|";
    return symbol = symbols.charAt(getRndInteger(0, symbols.length));
    //  console.log(symbols.length);
    //  console.log(symbol);
}




// adding an event listner to check buttons
Array.from(allCheckBox).forEach(element => {
    element.addEventListener("change", handleCheckBoxChange)


});

generateBtn.addEventListener("click", () => {

    if (checkCount <= 0) return;
    if (passwordLength < checkCount)
        passwordLength = checkCount;

    //  delete the old password
    password = "";
    //  Adding the checked elements function in array
    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    // Adding the checked elements in password
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    // Adding the remaining checked elements
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let rndNumber = getRndInteger(0, funcArr.length);
        console.log(rndNumber)
        password += funcArr[rndNumber]();
    }

    // Adding the password to display
    passwordDisplay.value = password;
    // running clacStrength password function
    calcStrength();


















});










