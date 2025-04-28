document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('yesButton').addEventListener('click', function() {
        // 질문을 담고 있는 컨테이너 숨기기
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            questionContainer.style.display = 'none';
        } else {
            console.error("question-container가 존재하지 않습니다.");
        }
    });
});
