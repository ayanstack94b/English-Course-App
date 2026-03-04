const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      displayLessons(data.data);
    });
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //   console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayLevelWord(data.data);
    });
};

const displayLessons = (lessons) => {
  //   console.log(lessons);
  const levelContainer = document.getElementById("level-container");
  //   levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `

    <button onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>

    `;

    levelContainer.appendChild(btnDiv);
  }
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    // console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center space-y-4 py-5 px-3">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning / pronunciation</p>
            <div class="font-medium bangla text-2xl">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>


`;
    wordContainer.appendChild(card);
  });
};

loadLessons();
