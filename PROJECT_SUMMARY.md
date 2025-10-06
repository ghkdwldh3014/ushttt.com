# UTTT Web - Project Summary

## 프로젝트 개요

**UTTT Web**은 Ultimate Tic Tac Toe와 그 변형 게임들(STTT, HTTT)을 위한 종합 웹 플랫폼입니다. 레이팅 시스템, 토너먼트, 도전과제, 구독 시스템 등 다양한 기능을 포함한 완전한 게임 생태계를 제공합니다.

## 구현된 주요 기능

### 🎮 게임 시스템
- **UTTT (Ultimate Tic Tac Toe)**: 틱택토 안의 틱택토
- **STTT (Super Tic Tac Toe)**: 3단계 중첩 보드
- **HTTT (Hyper Tic Tac Toe)**: 4단계 중첩 보드
- 실시간 게임 타이머
- 이동 검증 및 승리 조건 확인
- 인터랙티브 게임 보드 UI

### ⏱️ 시간 제어
6가지 시간 설정:
- Light (빛)
- Hyper Bullet (하이퍼불렛)
- Bullet (불렛)
- Blitz (블리츠)
- Rapid (래피드)
- Ordinary (오디너리)

각 모드별로 다른 시간 범위 적용

### 🎯 변형 모드
- **Tag Team**: 매 턴마다 팀원 교체
- **Countdown Chaos**: 카운트다운 0이 되면 랜덤 배치
- **Time Thief**: 상대 시간 25% 도둑 (18개/162개 특수 칸)
- **Dice Roll**: 주사위로 플레이 가능 영역 결정
- **Swap Mode**: 5턴마다 X/O 역할 교체

### 🏆 레이팅 & 티어 시스템
14개 티어 등급:
- Black → Gray → White → Brown → Purple → Blue → Light Blue
- Green → Light Green → Yellow → Orange → Pink → Red → Master

첫 달성 보너스: 100 ~ 204,800 포인트

### 🎪 토너먼트
- 자동 스케줄링 (5분마다 ~ 월간)
- 모드/시간 제어별 토너먼트
- 최대 1024명 참가
- 티어 제한 토너먼트 지원

### 🎯 도전과제
- **일일 도전과제**: 4개 (각 100pt, 전체 완료 +200pt)
- **주간 도전과제**: 5개 (각 300pt, 전체 완료 +500pt)
- **월간 도전과제**: 5개 (각 700pt, 전체 완료 +1000pt)
- **영구 업적**: 다양한 달성 목표

### 💰 경제 시스템
**포인트 획득**:
- 게임 승리: 상대 레이팅 / 10
- 일일 로그인: 50pt
- 퍼즐 해결: 25pt
- 도전과제 완료: 100~700pt

**포인트 사용**:
- 클럽 생성: 50,000pt
- 커스텀 아바타: 1,000~5,000pt
- 추가 분석: 200pt
- 토너먼트 입장료: 500~2,000pt

### 💎 구독 시스템
**4개 티어**:
1. **Free** ($0/월)
2. **Ultimate Supporter** ($5/월)
3. **Super Supporter** ($10/월)
4. **Hyper Supporter** ($30/월)

각 티어별 차별화된 혜택 제공

### 🌟 VIP 프로그램
- **Bronze VIP** (3,500 마일리지)
- **Silver VIP** (10,500 마일리지) - 10% 자동 할인
- **Gold VIP** (28,000 마일리지) - 20% 자동 할인

## 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

### 구조
```
src/
├── app/              # 페이지 (8개)
├── components/       # 컴포넌트 (10개)
├── lib/              # 유틸리티 (3개)
└── types/            # 타입 정의 (4개)
```

### 통계
- **총 파일**: 26개 TypeScript 파일
- **페이지**: 8개
- **컴포넌트**: 10개
- **타입 정의**: 4개 파일
- **게임 로직**: 완전 구현

## 페이지 구조

1. **Home** (`/`) - 플레이 가능한 UTTT 게임
2. **Play** (`/play`) - 게임 모드 선택
3. **Tournaments** (`/tournaments`) - 토너먼트 목록
4. **Challenges** (`/challenges`) - 도전과제 & 업적
5. **Shop** (`/shop`) - 포인트 상점
6. **Subscription** (`/subscription`) - 구독 플랜
7. **Leaderboard** (`/leaderboard`) - 순위표
8. **Profile** (`/profile`) - 사용자 프로필

## 컴포넌트 아키텍처

### Board Components
- `UTTTBoard` - Ultimate TTT 보드
- `SmallBoard` - 3x3 기본 보드

### Game Components
- `GameTimer` - 실시간 타이머
- `GameInfo` - 게임 정보 패널

### Profile Components
- `TierBadge` - 티어 배지
- `SubscriptionBadge` - 구독 배지

### Navigation
- `Header` - 네비게이션 헤더
- `MainLayout` - 메인 레이아웃

## 주요 기능 구현

### 게임 로직
✅ 완전히 구현됨
- 보드 생성 및 초기화
- 이동 검증
- 승리 조건 체크
- 다음 유효 보드 결정
- Elo 레이팅 계산

### 변형 모드 로직
✅ 완전히 구현됨
- Tag Team 팀 교체
- Countdown Chaos 감소 계산
- Time Thief 위치 생성 및 시간 도둑
- Dice Roll 주사위 굴리기
- Swap Mode 플레이어 교체

### UI/UX
✅ 현대적이고 반응형
- 다크 모드 디자인
- 그라디언트 효과
- 호버 애니메이션
- 반응형 그리드 레이아웃
- 모바일 친화적

## 설정 및 실행

### 설치
```bash
npm install
```

### 개발 서버
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm start
```

## 기본 사용자

**Oganesson118**
- 구독: Hyper Supporter
- 포인트: 100,000,000
- VIP: Gold
- 역할: 운영자

## 향후 구현 필요 사항

### 백엔드
- [ ] 데이터베이스 연동
- [ ] 인증 시스템
- [ ] 실시간 멀티플레이어
- [ ] WebSocket 통합

### 게임 기능
- [ ] STTT/HTTT 보드 컴포넌트
- [ ] AI 상대
- [ ] 게임 분석 (uttt.ai 연동)
- [ ] 리플레이 시스템

### 소셜 기능
- [ ] 친구 시스템
- [ ] 채팅
- [ ] 클럽/팀
- [ ] 관전 모드

### 결제
- [ ] Stripe 연동
- [ ] 구독 관리
- [ ] 포인트 구매

## 문서

프로젝트에는 다음 문서가 포함되어 있습니다:

1. **README.md** - 프로젝트 개요 및 사용법
2. **FEATURES.md** - 기능 상세 목록
3. **ARCHITECTURE.md** - 시스템 아키텍처
4. **DEPLOYMENT.md** - 배포 가이드
5. **CONTRIBUTING.md** - 기여 가이드
6. **PROJECT_SUMMARY.md** - 이 문서

## 프로젝트 상태

**현재 단계**: MVP 프론트엔드 완성 ✅

**다음 단계**:
1. 데이터베이스 스키마 설계
2. 백엔드 API 구현
3. 인증 시스템 구축
4. 실시간 멀티플레이어 구현
5. 결제 시스템 통합

## 라이선스

© 2025 UTTT Web. All rights reserved.

Created by Oganesson118

---

**프로젝트 생성일**: 2025-10-06
**마지막 업데이트**: 2025-10-06
**버전**: 1.0.0
**상태**: 개발 중 (프론트엔드 완성)
