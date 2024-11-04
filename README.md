# ILoveMinigame

# 프로젝트 제목 : 미니게임 사이트
## 프로젝트 개요 및 예상결과물
- 개요 : 자바스크립트로 구성된 간단한 미니게임을 3가지 제공하는데, 게임 클리어 시 집계된 점수와 자신의 이름을 서버로 보내 랭킹에 등록할 수 있으며, 랭킹을 열람할 수도 있습니다.
- 예상 결과물 :
  1. 자바스크립트로 구성된 간단한 미니게임 3가지 제공 (카드 짝 맞추기, 농구 게임, 다른 글자 찾기 게임)
  2. 미니게임 클리어 시 유저의 이름을 입력 받아 집계된 점수와 함께 제출 가능
  3. 게임 표시 부분 하단에 랭킹을 표시하는데, 랭킹은 가장 높은 점수를 기준으로 내림차순으로 표시되며, 유저의 이름과 클리어 시간을 함께 표시한다.

## 프로젝트 진행방법 및 절차
### 일정
1. 11.04~11.10(1주): 레이아웃 디자인, git 개발환경 구축
2. 11.11~11.18(1주): 레이아웃을 토대로 index.html 구현
3. 11.19~11.31(2주): 미니게임 3가지 구현
4. 12.02~12.08(1주): 랭킹 등록 시스템, 랭킹 열람 시스템 구현 
   1. 랭킹 등록 시스템: 클리어 시 유저의 이름을 입력 받아 집계된 점수와 함께 제출할 수 있다.
      1. JS로 유저의 이름과 집계된 점수, 클리어 시간을 .csv 또는 .json 포맷으로 저장한다.
   2. 랭킹 열람 시스템: 게임 표시 부분 하단에 랭킹을 표시하는데, 랭킹은 가장 높은 점수를 기준으로 내림차순으로 표시되며, 유저의 이름과 클리어 시간을 함께 표시한다.
      1. JS로 .csv 또는 .json 포맷의 랭킹 데이터를 읽어와 표시한다.
      2. 혹은 ajax로 서버로부터 데이터를 읽어와 표시한다. (직접 파일을 열 수도 있지만, ajax 방식을 활용해보기 위해 github 서버로부터 받아와 파싱)
5. 12.09~12.15(1주): 호스팅 (git), 디버깅

### 기능 상세
1. 미니게임 3가지
   1. 카드 짝 맞추기
        1. 4x4 카드 뒷면에는 같은 그림이 2개씩 있으며, 이를 클릭하여 짝을 맞추는 게임
        2. 클리어 시간을 측정하여 랭킹에 등록
        3. 총 8개의 서로 다른 그림, 카드 뒤집기 애니메이션이 필요
   2. 농구 게임
        1. progress bar의 특정 지점에 커서를 멈추면 골대에 넣는 게임
        2. 클리어 시간을 측정하여 랭킹에 등록
        3. 농구공 이미지, 골대 이미지, progress bar 이미지, 골인 애니메이션 필요
   3. 다른 글자 찾기 게임
        1. 여러가지 복잡한 글자 중 다른 글자를 찾는 게임
        2. 클리어 시간을 측정하여 랭킹에 등록
2. 랭킹 등록 시스템
   1. 클리어 시 콘솔 창을 띄워 유저의 집계된 점수를 보여주고, 이름을 입력받아 폼으로 제출 가능하게 한다.
   2. JS로 유저의 이름과 집계된 점수, 클리어 시간을 .json 포맷으로 저장한다.
3. 랭킹 열람 시스템
   1. 게임 표시 부분 하단에 랭킹을 표시한다.
   2. ajax 방식으로 랭킹 데이터를 받아온다.
   3. 파싱하여 높은 점수부터 내림차순으로 유저의 이름과 클리어 시간을 함께 표기한다.