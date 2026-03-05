const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      displayLessons(data.data);
    });
};

const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //   console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `

  <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation} )</h2>
                </div>
            </div>
            <div id="details-container" class="">
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p class="">${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p class="">${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonyms</h2>
                    <div className="">
                    ${createElement(word.synonyms)}
                    </div>
                </div>

`;
  document.getElementById("word_modal").showModal();
};

const displayLessons = (lessons) => {
  //   console.log(lessons);
  const levelContainer = document.getElementById("level-container");
  //   levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `

    <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>

    `;

    levelContainer.appendChild(btnDiv);
  }
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div class="text-center bg-base-400 col-span-full rounded-xl py-10 space-y-6 bangla">
     <img class="mx-auto" src="./assets/alert-error.png"></img>
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
     `;
    return;
  }

  words.forEach((word) => {
    // console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center space-y-4 py-5 px-3">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "not available"}</h2>
            <p class="font-semibold">Meaning / pronunciation</p>
            <div class="font-medium bangla text-2xl">${word.meaning ? word.meaning : "not available"} / ${word.pronunciation ? word.pronunciation : "not available"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>


`;
    wordContainer.appendChild(card);
  });
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});
