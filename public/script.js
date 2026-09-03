const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");

askButton.addEventListener("click", async () => {
    const question = questionInput.value.trim();
    if (!question) {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "Thinking... 🤔";
    askButton.disabled = true;

    try {

        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            answer.textContent =
                data.error || "Something went wrong.";
            return;
        }

        answer.textContent = data.answer;

    } catch (error) {
        console.error("Frontend Error:", error);
        answer.textContent =
            "Unable to connect to the server.";
    } finally {
        askButton.disabled = false;
    }
});