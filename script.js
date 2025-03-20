document.addEventListener("DOMContentLoaded", () => {
    const quoteText = document.querySelector("#quote");
    const authorName = document.querySelector("#author");
    const newQuoteButton = document.querySelector("#new-quote");
    const copyButton = document.querySelector("#copy");
    const twitterButton = document.querySelector("#shareOnX");
    const exportButton = document.querySelector("#export");

    // Load the initial quote
    getQuote();

    newQuoteButton.addEventListener("click", () => {
      getQuote();
    });

    copyButton.addEventListener("click", () => {
      const text = quoteText.textContent + " ~ " + authorName.textContent;
      copyToClipboard(text);
    });

    twitterButton.addEventListener("click", () => {
      shareOnTwitter();
    });

    exportButton.addEventListener("click", () => {
      exportImage();
    });

    function getQuote() {
      fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
        .then(response => response.json())
        .then(data => {
          const quote = data.data.content;
          const author = data.data.author;
          quoteText.textContent = quote;
          authorName.textContent = ("~ " +author);
          setRandomGradient();
        })
        .catch(error => console.error("Error fetching quote:", error));
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(
        () => console.log("Copied to clipboard!", text),
        err => console.error("Could not copy text: ", err)
      );
    }

    function shareOnTwitter() {
      const quote = document.getElementById("quote").innerText;
      const author = document.getElementById("author").innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        quote + "\n" + author
      )}`;
      window.open(twitterUrl, "_blank");
    }

    function setRandomGradient() {
      const gradients = [
        "linear-gradient(135deg, #667eea, #764ba2)",
        "linear-gradient(135deg, #f093fb, #f5576c)",
        "linear-gradient(135deg, #43e97b, #38f9d7)",
        "linear-gradient(135deg, #fa709a, #fee140)",
        "linear-gradient(135deg, #30cfd0, #330867)",
        "linear-gradient(135deg,rgb(106, 142, 198),rgb(86, 160, 194))",
        "linear-gradient(135deg, #e96443, #904e95)"
      ];
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
      document.getElementById("quote-box").style.background = randomGradient;
    }

    function exportImage() {
      const quoteBox = document.getElementById("quote-box");
      html2canvas(quoteBox, { backgroundColor: null }).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "quote.png";
        link.click();
      });
    }
  });