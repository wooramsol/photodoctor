# 포토닥터 (photodoctor.kr) — 아임웹 → GitHub Pages(무료 호스팅) + 가비아(도메인) 이전 가이드

작성일 2026-09-21. 이 폴더(`photodoctor-site`)가 새 사이트 전체이자 Git 저장소입니다.

```
photodoctor-site/
├─ index.html        홈 (아임웹 /main)
├─ portfolio.html    포트폴리오 (아임웹 /26)
├─ guide.html        작업안내 (아임웹 /qna)
├─ main/ 26/ qna/    아임웹 옛 주소로 들어온 방문자를 새 페이지로 자동 이동시키는 스텁
├─ 404.html          없는 주소로 들어왔을 때
├─ css/style.css     아임웹 디자인 토큰(브랜드색 #7407ff, 헤더 #001e37, Pretendard, 최대폭 1280) 그대로 이식
├─ js/main.js        모바일 메뉴 · 갤러리 더보기 · 라이트박스 · FAQ 아코디언 · 채널톡 버튼
├─ img/              아임웹 CDN에서 내려받은 원본 이미지 (hero, 로고, 갤러리 28쌍, 파트너 로고 15개)
├─ CNAME             GitHub Pages 커스텀 도메인 (photodoctor.kr)
├─ .nojekyll         GitHub Pages가 파일을 그대로 서빙하도록
├─ robots.txt / sitemap.xml
└─ README-배포가이드.md (이 문서)
```

외부 의존성은 채널톡 플러그인(`cdn.channel.io`, 기존 키 `752e9006-…`)과 Pretendard 폰트(jsDelivr) 둘뿐입니다. 아임웹 코드는 남아 있지 않습니다.

---

## 전체 순서

**GitHub 저장소 만들고 push → GitHub Pages 켜기 → `xxx.github.io` 주소로 확인 → 도메인 기관이전(아임웹 → 가비아) → 가비아 DNS 설정 → Pages에 커스텀 도메인 + HTTPS → 검색엔진 등록 → 아임웹 해지**

아임웹 해지는 맨 마지막입니다. 도메인은 **만료 최소 3~4주 전**에 이전을 시작하세요. 만료 임박이면 아임웹에서 1년 먼저 연장 후 이전해도 남은 기간은 그대로 붙습니다.

## 1단계 — GitHub 저장소 + push

이 폴더에는 이미 `git init`과 첫 커밋이 되어 있습니다. 터미널에서 (GitHub 인증은 DocFix 올릴 때 쓰던 그대로 됩니다):

```bash
cd ~/Desktop/photodoctor-site
git remote add origin https://github.com/wooramsol/photodoctor.git   # 저장소 이름은 자유
git push -u origin main
```

저장소는 github.com → New repository → 이름 `photodoctor`, **Public** (무료 계정에서 Pages는 Public 저장소만 됩니다), README/.gitignore는 추가하지 않고 만듭니다.

## 2단계 — GitHub Pages 켜기

저장소 → **Settings → Pages** → Build and deployment: Source **Deploy from a branch**, Branch **main** / **(root)** → Save. 1~2분 뒤 `https://wooramsol.github.io/photodoctor/` 에서 확인할 수 있습니다.

> 이 임시 주소에서는 `/css/…` 같은 절대경로가 `/photodoctor/css/…`를 찾지 못해 **스타일이 깨져 보입니다. 정상입니다.** 커스텀 도메인(photodoctor.kr)을 붙이면 루트에서 서빙되어 바로 해결됩니다. 임시 주소에서도 제대로 보고 싶으면 저장소 이름을 `wooramsol.github.io`로 만들면 됩니다(그러면 `https://wooramsol.github.io/`가 루트).

## 3단계 — 도메인 기관이전 (아임웹 → 가비아)

photodoctor.kr은 **.kr 국내 도메인**이라 인증코드(EPP) 대신 현재 등록기관의 승인으로 진행됩니다.

1. **아임웹** 관리자 → 도메인 관리(또는 1:1 문의)에서 "기관이전 승인/잠금 해제" 요청. 등록자 정보(이름·이메일)가 본인으로 되어 있는지 확인 — 승인 메일이 그 주소로 갑니다.
2. **가비아** domain.gabia.com → 기관이전 → `photodoctor.kr` 입력 → 등록자 정보를 아임웹 등록 정보와 동일하게 작성 → 이전 비용 결제(보통 1년 연장 포함, 기존 잔여기간에 더해짐).
3. 등록자 이메일로 오는 이전 동의 메일 승인. 아임웹 승인까지 끝나면 며칠~2주 내 My가비아에 도메인이 나타납니다.
4. 막히면 가비아 고객센터(1544-4370)에 "kr 도메인 기관이전 진행 상황" 문의.

## 4단계 — 가비아 DNS 설정 (GitHub Pages 연결)

My가비아 → 도메인 → **DNS 관리(DNS 설정)** 에서 아래 레코드를 넣습니다. 아임웹이 남겨둔 레코드가 있으면 지우세요.

| 타입 | 호스트 | 값 | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | wooramsol.github.io | 600 |

네임서버는 가비아 기본(ns.gabia.co.kr / ns1.gabia.co.kr / ns.gabia.net)이면 됩니다. 반영은 보통 수십 분, 최대 48시간.

## 5단계 — Pages 커스텀 도메인 + HTTPS

저장소 → Settings → Pages → **Custom domain**에 `photodoctor.kr` 입력 → Save. (폴더의 `CNAME` 파일과 같은 값이라 자동으로 맞춰집니다.) DNS check가 초록색이 되면 **Enforce HTTPS** 체크. 인증서는 GitHub가 자동 발급(수 분~1시간).

`https://photodoctor.kr`, `https://www.photodoctor.kr`(→ 자동으로 비www로 이동) 둘 다 확인하고, 옛 주소 `photodoctor.kr/main`, `/26`, `/qna`가 새 페이지로 넘어가는지도 확인합니다.

## 6단계 — 검색엔진 등록

1. **네이버 서치어드바이저** (searchadvisor.naver.com) → 사이트 등록 → HTML 태그 소유확인. 발급된 `<meta name="naver-site-verification" …>`를 세 HTML(`index/portfolio/guide.html`)의 `<head>` 주석 자리에 넣고 push → 확인 → 사이트맵 제출 `https://photodoctor.kr/sitemap.xml` → 수집 요청.
2. **구글 서치콘솔** → 메타 태그 소유확인 → sitemap.xml 제출.

이미 들어 있는 SEO: 페이지별 title/description, canonical, OG(카톡 미리보기), 구조화 데이터(홈 ProfessionalService, 포트폴리오 CollectionPage, 작업안내 FAQPage), 이미지 alt, lazy-loading, sitemap/robots, 옛 주소 자동 이동(canonical 포함).

## 7단계 — 아임웹 해지

새 도메인에서 사이트·채널톡·https가 정상이고 검색엔진 등록까지 끝났으면 아임웹을 해지합니다. 채널톡은 별도 계정이라 그대로 유지됩니다.

---

## 나중에 내용을 고칠 때

파일을 수정하고 `git add -A && git commit -m "문구 수정" && git push` 하면 1~2분 안에 반영됩니다.

- 갤러리 추가: `img/gallery/29-full.jpg`(원본)와 `29-thumb.jpg`(가로 700px)를 넣고 `index.html`·`portfolio.html` 갤러리 목록에 `<figure class="gallery__item" data-full="/img/gallery/29-full.jpg"><img src="/img/gallery/29-thumb.jpg" alt="…" loading="lazy"></figure>` 추가.
- 실적 숫자(2430+, 114+ 등): `index.html`의 `.stats` 블록.
- 채널톡 키: 세 HTML 하단 `ChannelIO('boot', …)`.
- 네이버 광고 전환 추적: 세 HTML 하단의 주석 처리된 "네이버 프리미엄 로그분석" 블록에 ID를 넣고 주석 해제. (`네이버-검색광고-기획안.md` 참고)
