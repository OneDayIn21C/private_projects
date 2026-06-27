# 최인범 ♡ 김보현 모바일 청첩장

2026년 9월 12일 (토) 오후 5시 40분 · 월드컵 컨벤션

흰색 + 초록 톤의 자연스럽고 고풍스러운 분위기의 모바일 청첩장입니다.

## 📁 구성

```
wedding-invitation/
├─ index.html      # 청첩장 페이지
├─ styles.css      # 디자인/스타일
├─ script.js       # 달력, D-day, 갤러리, 공유 등 기능
└─ images/         # ← 여기에 사진을 넣어주세요
```

## 📸 사진 넣는 법

`images/` 폴더에 아래 파일명으로 사진을 저장하면 자동으로 표시됩니다.
(파일명은 정확히 지켜주세요. 사진이 없어도 페이지는 정상 동작합니다.)

| 파일명 | 위치 |
| --- | --- |
| `images/main.jpg` | 표지 (메인) |
| `images/featured.jpg` | 인사말 다음 대표 컷 (최애) |
| `images/interlude-1.jpg` | 중간 큰 사진 |
| `images/footer.jpg` | 마지막 배경 |
| `images/gallery-1.jpg` ~ `gallery-9.jpg` | 갤러리 9장 |

> 갤러리 사진 개수를 바꾸려면 `script.js`의 `GALLERY_COUNT` 값을 수정하세요.

## ✏️ 꼭 수정해야 할 내용

- **계좌번호**: `index.html`의 `마음 전하실 곳` 섹션에서 `○○은행 000-0000-000000` 부분을 실제 계좌로 교체
- **주소/지도**: `오시는 길` 섹션의 주소가 실제 예식장과 맞는지 확인 (현재: 서울 마포구 월드컵로 240, 서울월드컵경기장 내)

## 🔍 미리보기

폴더 안에서 아래 명령으로 로컬 서버를 띄워 확인할 수 있습니다.

```bash
cd wedding-invitation
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

`index.html`을 더블클릭해 바로 열어도 됩니다.

## 🌐 무료 배포 (GitHub Pages)

저장소 Settings → Pages 에서 브랜치를 지정하면
`https://<사용자명>.github.io/<저장소>/wedding-invitation/` 주소로 공유할 수 있습니다.
