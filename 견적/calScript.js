// 처음 질문   
   // "예" 버튼 클릭 시 A 코드 실행
document.getElementById('yesButton').addEventListener('click', function() {
	// 질문을 숨기고 A 코드를 보여줍니다.
	document.getElementById('sizeQuestion').classList.remove('show');
	document.getElementById('aCodeSection').style.display = 'block';


	// fade-in 애니메이션 적용
	setTimeout(() => {
		document.getElementById('aCodeSection').style.opacity = '1';
	}, 10);
	document.getElementById('question-container').style.display = 'none';

});

// "아니오" 버튼 클릭 시 B 코드 실행 (예시)
document.getElementById('noButton').addEventListener('click', function() {
	alert('아니오를 선택하셨습니다.'); // B 코드에 맞는 작업을 여기에 추가
});









document.addEventListener('DOMContentLoaded', () => {

	const glassBtn = document.getElementById('glassBtn');
	const handleBtn = document.getElementById('handleBtn');
	
	const glassImage = document.getElementById('glassImage');
	const handleImage = document.getElementById('handleImage');
	
	// 유리 선택 가이드 버튼 클릭 시
	glassBtn.addEventListener('click', () => {
	  handleImage.classList.remove('show'); // 다른 이미지 숨김
	  handleImage.classList.add('hidden');
	  
	  glassImage.classList.remove('hidden'); // 유리 이미지 표시
	  setTimeout(() => {
		glassImage.classList.add('show');
	  }, 50);
	});
	
	// 핸들 선택 가이드 버튼 클릭 시
	// handleBtn.addEventListener('click', () => {
	//   glassImage.classList.remove('show'); // 다른 이미지 숨김
	//   glassImage.classList.add('hidden');
	  
	//   handleImage.classList.remove('hidden'); // 핸들 이미지 표시
	//   setTimeout(() => {
	// 	handleImage.classList.add('show');
	//   }, 50);
	// });

			//셀프견적 버튼 클릭 수 카운팅
	// 중복 카운팅 방지 - localStorage 사용
	if (localStorage.getItem('hasCounted') === 'true') 
	{
		return;
	}
	const db = firebase.firestore();
	const countDocRef = db.collection("FoamDB").doc("셀프견적_카운팅");

	countDocRef.get().then((doc) => {
		if (doc.exists) {
			// count가 이미 있으면 +1 증가
			const currentCount = doc.data().count || 0;
			countDocRef.update({
				count: currentCount + 1
			}).then(() => {
				console.log("count가 성공적으로 업데이트되었습니다.");
				// localStorage에 카운팅 완료 표시
				localStorage.setItem('hasCounted', 'true');
			}).catch((error) => {
				console.error("count 업데이트 중 오류 발생: ", error);
			});
		} else {
			// count 문서가 없으면 새로 생성하고 1로 설정
			countDocRef.set({ count: 1 }).then(() => {
				console.log("count가 성공적으로 생성되었습니다.");
				// localStorage에 카운팅 완료 표시
				localStorage.setItem('hasCounted', 'true');
			}).catch((error) => {
				console.error("count 생성 중 오류 발생: ", error);
			});
		}
	}).catch((error) => {
		console.error("count 문서 가져오기 중 오류 발생: ", error);
	});
  });