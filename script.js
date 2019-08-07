let req = new XMLHttpRequest();
// req 변수 = json사용 생성자 생성
req.open("GET", "json_images.txt");
//get 방식으로 받아옴 , json_images 파일을
req.onreadystatechange = function () {
    //받아올때 상태를 알려줌
    if (this.readyState === 4) {
        //다 받아 왔을때
        let data = JSON.parse(this.response);
        //받아온 데이터를 객체화
        screenSet(data);
        //화면에 동작하는것들 셋팅
    }
}
req.send();



function screenSet(data) {
    for (let i in data) {
        //데이터의 값 모두 식 실행
        let div = document.createElement("div");
        //html에 div 태그 생성
        div.setAttribute("class", "image");
        //div 태그 클래스 지정

        mouseEvent(div);
        //마우스 이벤트 관련 함수
        let img = document.createElement("img");
        //html에 이미지 태그 생성
        img.src = data[i];
        //img의 src에 json으로 받은 데이터의 배열이 하나씩 들어감
        div.appendChild(img);
        //img를 div 자식으로
        document.body.appendChild(div);
        //div를 body 자식으로
    }
}



function mouseEvent(arrayValue) {
    arrayValue.onclick = function () {
        //div 클릭하면 함수 실행
        this.classList.toggle("image-selected");
        // 클래스값이 있으면 제거 ,없으면 추가 //스위치 기능
    }
    arrayValue.onmouseover = function () {
        //마우스가 들어오면
        let element = this;
        //this 값 저장 ,input
        this.timerId = setTimeout(function () {
            //타이머아이디에 값 저장
            element.classList.add("image-magnified");
            //클래스추가 ,1초 이후에
        }, 1000);
    }

    arrayValue.onmouseout = function () {
        clearTimeout(this.timerId);
        //마우스가 밖으로 나가면 타임아웃 취소됨
        this.classList.remove("image-magnified");
        //클래스 취소
    }
}



function SelectAll(btn) {
    //btn = input
    let images = document.getElementsByClassName("image");
    for (let i = 0; i < images.length; i++) {
        if (btn.value == "Unselect All") {
            //버튼 밸류가 선택 취소일때
            images[i].classList.remove("image-selected");
            //배열의 클래스를 지움
        } else {
            //선택된 밸류가 셀렉트일때
            images[i].classList.add("image-selected");
            //배을의 클래스 추가
        }
    }

    //클래스 처리 후에 , 밸류 처리
    if (btn.value == "Unselect All") {
        btn.value = "Select All";
    } else {
        btn.value = "Unselect All";
    }
}


function playSlideShow(btn) {
    let images = document.getElementsByClassName("image");
    //html에서 생성된 이미지 값을 가져옴

    //배열에있는 이미지들의 마우스 기능 중단시킴
    for (let j in images) {
        images[j].onclick = function () {
            event.preventDefault();
        }
        images[j].onmouseover = function () {
            event.preventDefault();
        }
        images[j].onmouseout = function () {
            event.preventDefault();
        }
    }

    let i = 0;
    //인덱스 값
    images[i].classList.add("image-magnified");
    //이미지 0번 인덱스 크기 추가

    let intervalId = setInterval(function () {
        //1초마다 식 실행
        images[i].classList.remove("image-magnified");
        //클래스 제거
        i++;
        if (i < images.length) {
            images[i].classList.add("image-magnified");
        } else {
            //슬라이드쇼 끝나고
            clearInterval(intervalId);
            //매초마다 반복 종료

            //마우스 이벤트 재설정
            for (let j in images) {
                mouseEvent(images[j]);
            }
        }
    }, 1000);


}