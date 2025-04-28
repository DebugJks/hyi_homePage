// 모든 ".question" 클래스를 가진 요소를 선택
const questions = document.querySelectorAll(".question");

// 각 질문에 대해 반복
questions.forEach(function (question) {
  // 현재 질문의 버튼을 선택
  const btn = question.querySelector(".question-btn");

  // 버튼에 클릭 이벤트 리스너 추가
  btn.addEventListener("click", function () {
    // 다른 모든 질문 항목에 대해 반복
    questions.forEach(function (item) {
      // 현재 질문이 아닌 항목에서 "show-text" 클래스 제거
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    // 현재 질문의 "show-text" 클래스를 토글
    question.classList.toggle("show-text");
  });
});