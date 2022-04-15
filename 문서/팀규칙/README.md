# 팀 규칙

### 팀 규칙

- 프로젝트 집중시간
  - 9 to 6
- 회의시간
  - 팀장회의 후
- 브렌치 전략
  - develop 브랜치를 생성 후 FE, BE 필요에 따라 브랜치 생성 후 Merge
  - ex) feat/FE/(pagename)/(기능 - 광범위 할때는 생략 가능)
  - ex) feat/BE/(pagename)/(기능 - 광범위 할때는 생략 가능)
  - ex) feat/FE/main/navbar
- Merge rule
  - FE, BE 각 파트별로 코드리뷰 후 Merge
- naming rule - 커밋 메시지
  - ex) feat: (FE/BE) (pagename) (기능 추가/조회/수정/삭제)
  - ex) feat: FE main navbar 추가
  - pagename
    - main (메인 페이지)
    - sendbox (보낸 보관함)
    - write_period (기간 작성 페이지)
    - write (작성 페이지)
    - write_detail (작성상세 페이지)
    - write_wrap (포장지 선택)
    - anniversary (기념일선택&패스워드)
    - present (받는사람 페이지)
    - present_detail (받는 사람 상세 페이지)
- FE 어필 포인트
  - 개발자
    - JavaScript를 활용해서 배경, 스티커, 텍스트 입력, 이미지 업로드 등 다양한 방법으로 어드벤트 스페셜데이 편집 기능 구현.
  - 사용자
    - 기간 선택, 고정 디자인과 직접 업로드한 사진들로 다양한 커스터마이징 제공.
- BE 어필 포인트
  - 개발자
    - 사용자의 편지 비밀번호를 암호화 후 저장하고, 발신자가 url을 전송할 때 난수값을 추가하여 전달하도록 하여 보안성을 강화
  - 사용자
    - 발신자가 편지를 전달할 때 비밀번호를 설정할 수 있어, 안전한 전송이 가능



## **conventional commits**

- “태그: 제목”의 형태이며, : 뒤에만 space

feat : 새로운 기능 추가 
fix : 버그 수정 
docs : 문서 수정 
design : CSS 등 사용자 UI 디자인 변경 
chore : 그 외 자잘한 작업 
test : 테스트 코드 
build : 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨) 
ci : CI관련 설정 
style : 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등) 
refactor : 성능 개선 
rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 하는 경우 
remove : 파일을 삭제하는 작업만 수행한 경우 
comment : 필요한 주석 추가 및 변경 

- branch

master : 제품으로 출시될 수 있는 브랜치
develop : 다음 출시 버전을 개발하는 브랜치
feature : 기능을 개발하는 브랜치
release : 이번 출시 버전을 준비하는 브랜치
hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치
