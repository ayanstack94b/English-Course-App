const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayLessons(data.data);
    });
};

const displayLessons = (lessons) => {
  console.log(lessons);
  const levelContainer = document.getElementById("level-container");
  //   levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("button");
    btnDiv.innerHTML = `

    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>

    `;

    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
