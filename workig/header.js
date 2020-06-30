window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.pageYOffset < +1);
});

/*window.scrollY 대신..window.pageYOffset 을 사용하자
  당연히 window.scrollX 는 window.pageXOffset*/

//1 변수 지정
//2 슬라이드의 높이 확인하여 부모의 높이로 지정하기
//3 슬라이드가 있으면 가로로 배열하기
//4 슬라이드 이동 함수
//5 버튼기능 업데이트 함수
//6 버튼을 클릭하면 슬라이드 이동시키기

//1 변수지정

var sliderWrapper = document.getElementsByClassName("four"),
  sliderContainer = document.getElementsByClassName("slider_container"),
  slides = document.getElementsByClassName("sl_review"),
  slideCount = slides.length, //슬라이드의 개수 (배열 값으로 인식)
  currentIndex = 0, //사용자가 첫번째를 보고있는지아닌지확인
  topHeight = 0, //슬라이드중 가장 높은 슬라이드를 부모로 지정
  navPrev = document.getElementById("prev"),
  navNext = document.getElementById("next");

console.log(slideCount);

//2 슬라이드의 높이 확인하여 부모의 높이로 지정하기
//일일히 높이 구하지 말고, 반복문 이용해서 최대높이 얻기

function calculateTallestSlide() {
  for (var i = 0; i < slideCount; i++) {
    if (slides[i].offsetHeight > topHeight) {
      topHeight = slides[i].offsetHeight;
    }
  }
  sliderWrapper[0].style.height = topHeight + "px";
  sliderContainer[0].style.height = topHeight + "px";
}

calculateTallestSlide();

// 2번 까지만 하면 리스트 최대높이 오버랩 되는 현상 발생하니까,
// 3 슬라이드가 있으면 가로로 배열하기

for (var i = 0; i < slideCount; i++) {
  slides[i].style.left = i * 100 + "%";
}

// 4 슬라이드 이동 함수
// 보여지는 수에 따라 -> ul 자체를 움직여 버려
// ex) currentIndex =2 === ul.style.left:-200%
// 0 에서 1이 되면 ul.style.left 값을 바꾸는 것
// 몇번째 보여줘 하면 몇번째 보여주는 역할
function goToSlide(idx) {
  sliderContainer[0].style.left = idx * -100 + "%";
  sliderContainer[0].classList.add("animated");
  //└ 클래스 추가 (스크립트에서 css 클래스 추가하는법)
  currentIndex = idx;

  updateNav();
  //막내버튼일 경우 disablede 넣어줘
}

// 6 버튼기능 업데이트 함수
// 버튼 계속 눌러도 끝인줄 알게 하는법
// 첨인지 마지막인지 알게 해주는법
function updateNav() {
  //처음일때
  if (currentIndex == 0) {
    navPrev.classList.add("disabled");
  } else {
    navPrev.classList.remove("disabled");
  }
  //마지막일때
  if (currentIndex == slideCount - 1) {
    navNext.classList.add("disabled");
  } else {
    navNext.classList.remove("disabled");
  }
}

// 5 버튼 클릭하면 슬라이드 이동시키기
navNext.addEventListener("click", function (e) {
  e.preventDefault();
  goToSlide(currentIndex + 1);
});

navPrev.addEventListener("click", function (e) {
  e.preventDefault();
  goToSlide(currentIndex - 1);
});

// 첫번째 슬라이드먼저 보이기
// 이거 없으면 처음페이지에 이전 버튼이 발생함
goToSlide(0);
