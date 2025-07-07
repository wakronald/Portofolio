document.addEventListener("DOMContentLoaded", () => {
    const kanjiList = document.getElementById("kanjiList");
    const searchBox = document.getElementById("searchBox");
  
    fetch("./Data/Kanji-N2.Json")
      .then((res) => res.json())
      .then((data) => {
        render(data);
  
        searchBox.addEventListener("input", () => {
          const keyword = searchBox.value.toLowerCase();
          const filtered = data.filter((item) =>
            item.kanji.includes(keyword) ||
            item.arti.toLowerCase().includes(keyword) ||
            (item.romaji && item.romaji.toLowerCase().includes(keyword))
          );
          render(filtered);
        });
      });
  
    function render(data) {
      kanjiList.innerHTML = "";
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "kanji-card";
        div.innerHTML = `
          <h3>${item.kanji}</h3>
          <p>Arti: ${item.arti}</p>
          <p>Romaji: ${item.romaji}</p>
          <p>JLPT: ${item.jlpt}</p>
        `;
        kanjiList.appendChild(div);
      });
    }
  });