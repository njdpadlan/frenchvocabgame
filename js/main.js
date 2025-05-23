let frenchword = document.querySelector(".french-word"); // or '#french-word' if id
let submitBtn = document.querySelector("#submit-btn");
let guessWord = document.querySelector("#user-input");
let resultMessage = document.querySelector("#result-message");
let correctAnswer = ""; 

const getFrenchWords = () => {
  fetch('js/words.json')
    .then(response => response.json())
    .then(words => {
      const array = Object.keys(words);
      const randomWord = array[Math.floor(Math.random() * array.length)];

      // Display the French word
      frenchword.innerHTML = randomWord;
      correctAnswer = words[randomWord];

    })
    .catch(error => {
      console.error("Error loading words.json:", error);
    });
}

getFrenchWords();

submitBtn.addEventListener("click", () => {
    if (guessWord.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        resultMessage.textContent = "✅ Correct!";
        resultMessage.style.color = "green";

        // Load a new word after 2 seconds.
        setTimeout(() => {
            getFrenchWords();        
            resultMessage.textContent = ""; 
        }, 2000);
    } else {
        resultMessage.textContent = `❌ Wrong. The correct answer is...  ${correctAnswer}`;
        resultMessage.style.color = "red";
    }

    // Clear and focus the input field
    guessWord.value = "";
    guessWord.focus();
});


guessWord.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitBtn.click();
  }
});

