# 마케팅 포트폴리오 웹사이트

한국어 정적 웹사이트입니다. 빌드 도구나 프레임워크 없이 HTML, CSS, JavaScript만 사용합니다.

## 구조

```
index.html                     메인 (프로젝트 목록, 기술 역량, 연락처)
projects/commerce-growth.html  01 원석 액세서리 브랜드 (기업연계, 회사명 비공개)
projects/fuel-cost.html        02 실질 주유 비용 분석 (개인)
projects/instacart-retention.html  03 Instacart 재구매 전략
projects/credit-policy.html    04 신용 승인 정책
assets/css/style.css           디자인 토큰과 전체 스타일
assets/js/main.js              헤더 경계선, 짧은 페이드인, 목차 표시
```

## 로컬에서 보기

`index.html`을 브라우저로 열면 됩니다. 한글 글꼴(Pretendard)은 jsDelivr CDN에서 불러오므로 인터넷 연결이 없으면 시스템 글꼴로 표시됩니다.

## 수정할 곳

- 이름: 모든 HTML 파일의 `<title>`, 상단 로고, 하단
- 연락처: `index.html`의 Contact
- 색상·여백: `assets/css/style.css` 맨 위 `:root`

## 배포 (GitHub Pages)

`bbo10/bbo10.github.io` 저장소의 `main` 브랜치 루트에서 https://bbo10.github.io/ 로 배포합니다.
