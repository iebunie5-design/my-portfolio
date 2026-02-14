# 아이디어큐브 포트폴리오 개발 지침서

## 프로젝트 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | my-portfolio |
| 개발자 | 아이디어큐브개발자 |
| 라이브 URL | https://my-portfolio-kyfo.vercel.app |
| GitHub | https://github.com/iebunie5-design/my-portfolio |
| 로컬 경로 | C:\Users\iebun\my-portfolio |

---

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v3 |
| 애니메이션 | Framer Motion |
| 폼 전송 | Web3Forms |
| 배포 | Vercel (GitHub 자동 배포) |

---

## 구현된 기능 목록

- [x] ENFP 미니멀 포트폴리오 디자인
- [x] 한/영 전환 (네비게이션 EN/한 버튼)
- [x] 다크모드 (🌙/☀️ 버튼)
- [x] 스크롤 애니메이션 (Framer Motion)
- [x] 히어로 타이핑 효과
- [x] 프로필 사진 (Hero 섹션 우측)
- [x] 아이디어큐브 로고 (네비게이션 + 푸터)
- [x] 강의 경력 섹션 (인텔 AI 앱 크리에이터 / 학원)
- [x] 수강 문의 폼 (Web3Forms → Gmail 수신)
- [x] 수강 문의하기 CTA 버튼 (Hero)
- [x] 카카오톡 상담 버튼
- [x] 네이버 블로그 링크
- [x] 학원 주소
- [x] GitHub 자동 배포 (push → Vercel 자동 반영)

---

## 파일 구조

```
my-portfolio/
├── public/
│   ├── profile.png          # 프로필 사진
│   └── logo.png             # 아이디어큐브 로고
├── src/
│   └── app/
│       ├── layout.tsx       # HTML 레이아웃
│       ├── page.tsx         # 메인 페이지 (모든 섹션)
│       └── globals.css      # 전역 스타일
├── mocks/
│   └── profile.json         # ★ 내용 수정 시 이 파일만 변경
├── DEVELOPMENT_GUIDE.md     # 이 파일
└── CLAUDE.md                # Claude Code 설정
```

---

## 내용 수정 방법

### 텍스트/정보 변경 → `mocks/profile.json`

```json
{
  "name": "아이디어큐브개발자",        // 이름
  "title": { "ko": "...", "en": "..." }, // 직함
  "tagline": { "ko": "...", "en": "..." }, // 한 줄 소개
  "about": { "ko": "...", "en": "..." },  // 소개글
  "skills": [...],                        // 기술 스택 & 레벨
  "teaching": [...],                      // 강의 경력
  "projects": [...],                      // 프로젝트
  "contact": {
    "email": "iebunie5@gmail.com",
    "kakao": "https://pf.kakao.com/_HsxohX/friend",
    "blog": "https://blog.naver.com/ideacube5",
    "address": "충남 천안시 서북구 불당25로 142 골든프라자 5층 504-1호"
  }
}
```

### 이미지 교체

- 프로필 사진: `public/profile.png` 파일 교체
- 로고: `public/logo.png` 파일 교체

---

## 배포 방법

### 수정 후 반영 (3단계)

```bash
# 1. 프로젝트 폴더 이동
cd C:\Users\iebun\my-portfolio

# 2. 변경사항 저장
git add .
git commit -m "수정 내용 설명"

# 3. 배포 (push하면 Vercel 자동 배포)
git push
```

→ 1~2분 후 https://my-portfolio-kyfo.vercel.app 자동 반영

---

## 개발 서버 실행 (로컬 확인)

```bash
cd C:\Users\iebun\my-portfolio
npm run dev
```

→ http://localhost:3000 에서 확인
→ 이미 3000 포트 사용 중이면 http://localhost:3001

---

## Claude Code로 다시 개발하는 방법

### 1. Claude Code 실행

```bash
cd C:\Users\iebun\my-portfolio
claude
```

### 2. 요청 예시

```
"프로젝트 수정하고 싶어"
→ Claude가 파일을 읽고 현재 상태 파악 후 작업

"수강생 후기 섹션 추가해줘"
"색상을 파란색 계열로 바꿔줘"
"모바일에서 메뉴가 이상해, 고쳐줘"
```

### 3. 수정 완료 후 배포

```bash
git add .
git commit -m "변경 내용"
git push
```

---

## 주요 계정 정보

| 서비스 | 주소 |
|--------|------|
| Vercel | vercel.com (GitHub 계정으로 로그인) |
| GitHub | github.com/iebunie5-design |
| Web3Forms | web3forms.com (폼 전송 서비스) |
| 카카오 채널 | https://pf.kakao.com/_HsxohX/friend |
| 네이버 블로그 | https://blog.naver.com/ideacube5 |

---

## 다음에 추가하면 좋을 기능

| 기능 | 설명 |
|------|------|
| 수강생 후기 섹션 | 실제 후기로 신뢰도 상승 |
| 수강 과정 상세 | 과정별 기간, 대상, 커리큘럼 소개 |
| 수강생 통계 | "수료생 OO명", "만족도 OO%" |
| 수업 사진 갤러리 | 실제 수업 현장 사진 |
| 커스텀 도메인 | ideacube.co.kr 등 직접 도메인 연결 |
