# Keyable Korea - 기술 문서 (Technical Documentation)

> 이 문서는 프로젝트의 아키텍처, 코드 스타일, 설계 결정, 기술적 특징을 상세히 설명합니다.
> 기술 면접 대비용으로도 활용할 수 있습니다.

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [아키텍처 패턴](#3-아키텍처-패턴)
4. [디렉토리 구조](#4-디렉토리-구조)
5. [핵심 기능 구현](#5-핵심-기능-구현)
6. [코드 스타일 및 컨벤션](#6-코드-스타일-및-컨벤션)
7. [상태 관리](#7-상태-관리)
8. [인증 시스템](#8-인증-시스템)
9. [국제화 (i18n)](#9-국제화-i18n)
10. [데이터베이스 설계](#10-데이터베이스-설계)
11. [API 설계](#11-api-설계)
12. [보안 고려사항](#12-보안-고려사항)
13. [성능 최적화](#13-성능-최적화)
14. [접근성 (a11y)](#14-접근성-a11y)
15. [SEO 전략](#15-seo-전략)
16. [컴포넌트 설계 패턴](#16-컴포넌트-설계-패턴)
17. [에러 핸들링](#17-에러-핸들링)
18. [테스트 전략](#18-테스트-전략)
19. [배포 및 CI/CD](#19-배포-및-cicd)
20. [기술 면접 Q&A](#20-기술-면접-qa)

---

## 1. 프로젝트 개요

### 프로젝트 설명
한국 인바운드 여행 및 의료 관광 서비스를 제공하는 B2C 웹사이트입니다.
인도네시아 및 영어권 사용자를 타겟으로 합니다.

### 핵심 목표
- **다국어 지원**: 영어/인도네시아어 완벽 지원
- **SEO 최적화**: 검색 엔진 및 AI 크롤러 최적화
- **사용자 경험**: 모바일 우선 반응형 디자인
- **관리자 시스템**: CMS 스타일 어드민 대시보드
- **접근성**: WCAG 2.1 AA 준수

### 주요 기능
1. 서비스 소개 페이지 (Private Tour, Medical Tourism, Guide, Vehicle)
2. 문의 폼 시스템 (이메일 알림)
3. 공지사항/FAQ 관리
4. 어드민 대시보드
5. WhatsApp 통합 (인도네시아 시장 필수)

---

## 2. 기술 스택

### Frontend
```yaml
Framework: Next.js 16.1.0 (App Router)
React: 19.2.3 (최신 RC)
Language: TypeScript 5
Styling: Tailwind CSS 4
Icons: Lucide React
```

### Backend
```yaml
Runtime: Next.js API Routes (Edge Runtime Ready)
Database: Supabase (PostgreSQL)
Email: Nodemailer
Validation: Zod
```

### 인프라
```yaml
Hosting: Vercel
Database: Supabase
Analytics: Google Analytics 4
Domain: 커스텀 도메인 (SSL 자동)
```

### 개발 도구
```yaml
Package Manager: npm
Linting: ESLint 9
Type Checking: TypeScript strict mode
Code Formatting: (권장) Prettier
```

### 왜 이 스택을 선택했는가?

| 기술 | 선택 이유 |
|------|----------|
| Next.js 16 | App Router의 서버 컴포넌트, 자동 코드 스플리팅, ISR 지원 |
| Supabase | PostgreSQL + Row Level Security + 실시간 구독 + 무료 티어 |
| Tailwind CSS 4 | Utility-first, JIT 컴파일러, 일관된 디자인 시스템 |
| Zod | Runtime 타입 검증, TypeScript 통합, 에러 메시지 커스텀 |
| Lucide | Tree-shakeable 아이콘, React 네이티브 지원 |

---

## 3. 아키텍처 패턴

### 3.1 App Router Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # 동적 로케일 라우팅
│   │   ├── layout.tsx       # 로케일별 레이아웃
│   │   ├── page.tsx         # 홈페이지
│   │   ├── services/        # 서비스 페이지들
│   │   ├── about/           # 소개 페이지
│   │   ├── faq/             # FAQ
│   │   ├── inquiry/         # 문의 폼
│   │   └── notices/         # 공지사항
│   ├── admin/               # 어드민 영역 (별도 레이아웃)
│   ├── api/                 # API Routes
│   └── layout.tsx           # 루트 레이아웃
├── components/              # 재사용 컴포넌트
├── lib/                     # 유틸리티 및 설정
└── types/                   # TypeScript 타입 정의
```

### 3.2 Rendering Strategy

```typescript
// 정적 생성 (SSG) - 대부분의 페이지
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 서버 컴포넌트 기본값 - 데이터 페칭
export default async function Page({ params }: Props) {
  const dict = await getDictionary(locale);
  return <Component dict={dict} />;
}

// 클라이언트 컴포넌트 - 인터랙션 필요시
'use client';
export function InteractiveComponent() { ... }
```

### 3.3 Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  API Route  │────▶│  Supabase   │
│  Component  │◀────│   Handler   │◀────│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│   State     │     │  Validation │
│  Management │     │    (Zod)    │
└─────────────┘     └─────────────┘
```

### 3.4 Layer Architecture

```
Presentation Layer (Components)
        ↓
Application Layer (API Routes, Hooks)
        ↓
Domain Layer (Business Logic, Types)
        ↓
Infrastructure Layer (Database, External APIs)
```

---

## 4. 디렉토리 구조

```
keyable/
├── public/                    # 정적 자산
│   ├── images/               # 이미지 파일
│   ├── llms.txt              # LLM 크롤러용
│   └── manifest.json         # PWA 매니페스트
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # 다국어 라우팅
│   │   ├── admin/            # 어드민 페이지
│   │   ├── api/              # API 엔드포인트
│   │   ├── robots.txt/       # SEO
│   │   ├── sitemap.xml/      # SEO
│   │   └── llms.txt/         # LLM 최적화
│   │
│   ├── components/
│   │   ├── admin/            # 어드민 전용 컴포넌트
│   │   ├── analytics/        # 분석 도구
│   │   ├── forms/            # 폼 컴포넌트
│   │   ├── layout/           # 레이아웃 (Header, Footer)
│   │   ├── seo/              # SEO 스키마
│   │   └── ui/               # 기본 UI 컴포넌트
│   │
│   ├── lib/
│   │   ├── i18n/             # 국제화 시스템
│   │   │   ├── config.ts     # 로케일 설정
│   │   │   ├── getDictionary.ts
│   │   │   └── dictionaries/ # 번역 JSON
│   │   ├── types/            # 데이터베이스 타입
│   │   ├── auth.ts           # 인증 로직
│   │   ├── constants.ts      # 상수 정의
│   │   ├── db.ts             # 데이터베이스 클라이언트
│   │   └── utils.ts          # 유틸리티 함수
│   │
│   ├── middleware.ts         # 미들웨어 (인증, i18n)
│   └── types/                # 공통 타입 정의
│
├── supabase/
│   └── migrations/           # DB 마이그레이션
│
├── docs/                     # 문서
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 5. 핵심 기능 구현

### 5.1 다이나믹 라우팅 with i18n

```typescript
// src/app/[locale]/layout.tsx
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 잘못된 로케일 처리
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
```

### 5.2 미들웨어 (인증 + 리다이렉트)

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Admin 인증 체크
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // 세션 토큰 만료 검증
    // ...
  }

  // 2. 로케일 리다이렉트
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = detectLocale(request) || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
```

### 5.3 데이터베이스 레이어 (Repository Pattern)

```typescript
// src/lib/db.ts
// Client-side vs Server-side 분리
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getServerSupabase = () => {
  return createClient(supabaseUrl, supabaseServiceKey); // RLS 바이패스
};

// CRUD 함수들 (Repository Pattern)
export async function createInquiry(data: InquiryInsert): Promise<Inquiry | null> {
  const db = getServerSupabase();
  const { data: inquiry, error } = await db
    .from('inquiries')
    .insert(data as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return null;
  }
  return inquiry as Inquiry;
}
```

### 5.4 폼 핸들링

```typescript
// 클라이언트 컴포넌트에서 폼 제출
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    // ...
  };

  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed');
    router.push(`/${locale}/inquiry/complete`);
  } catch (err) {
    setError('Failed to submit');
  } finally {
    setIsSubmitting(false);
  }
}
```

---

## 6. 코드 스타일 및 컨벤션

### 6.1 TypeScript 컨벤션

```typescript
// ✅ 인터페이스 정의 - 명확한 타입명
interface InquiryFormProps {
  locale: string;
  dict: Dictionary;
  defaultService?: string;  // Optional은 마지막에
}

// ✅ 타입 유틸리티 활용
type InquiryInsert = Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;
type InquiryUpdate = Partial<Omit<Inquiry, 'id' | 'created_at'>>;

// ✅ Union 타입으로 가능한 값 제한
type ServiceType = 'private_tour' | 'medical_tourism' | 'guide_service' | 'vehicle_rental';
type InquiryStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';
```

### 6.2 컴포넌트 컨벤션

```typescript
// ✅ Props 인터페이스 명명: ComponentNameProps
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

// ✅ forwardRef 사용 (DOM 접근 필요시)
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';  // DevTools 디버깅용
```

### 6.3 파일 명명 규칙

```
components/
├── ui/
│   ├── button.tsx          # kebab-case (UI 컴포넌트)
│   ├── input.tsx
│   └── card.tsx
├── forms/
│   └── InquiryForm.tsx     # PascalCase (복합 컴포넌트)
└── layout/
    ├── Header.tsx
    └── Footer.tsx

lib/
├── utils.ts                # 유틸리티
├── constants.ts            # 상수
└── db.ts                   # 데이터베이스
```

### 6.4 Import 순서

```typescript
// 1. React/Next.js 내장
import { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. 외부 라이브러리
import { cva, type VariantProps } from 'class-variance-authority';

// 3. 내부 절대 경로 (@/)
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// 4. 타입 임포트
import type { Dictionary } from '@/lib/i18n/getDictionary';
```

---

## 7. 상태 관리

### 7.1 상태 관리 전략

이 프로젝트는 **서버 중심 아키텍처**를 채택하여 클라이언트 상태를 최소화합니다.

```
┌─────────────────────────────────────────────────────────────┐
│                    상태 관리 계층 구조                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Server State (Supabase)                                    │
│  └── inquiries, notices, faq, admin_users                   │
│      └── API Routes에서 직접 쿼리                            │
│                                                              │
│  URL State (Next.js Router)                                 │
│  └── locale, page params, search params                     │
│                                                              │
│  Form State (React useState)                                │
│  └── isSubmitting, error, formData                          │
│                                                              │
│  UI State (React useState)                                  │
│  └── isMenuOpen, isLangOpen, isModalOpen                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 왜 Redux/Zustand를 사용하지 않았나?

| 고려사항 | 결정 |
|---------|------|
| 데이터 복잡성 | 낮음 - 대부분 서버에서 직접 페칭 |
| 클라이언트 상태 | 최소 - 폼, UI 상태만 필요 |
| 데이터 동기화 | Supabase RLS + API Routes로 충분 |
| 번들 크기 | 작게 유지 목표 |
| SSR 호환성 | 서버 컴포넌트 활용 극대화 |

---

## 8. 인증 시스템

### 8.1 세션 기반 인증 (어드민)

```typescript
// 토큰 생성
function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const token = Buffer.from(
    `${timestamp}:${random}:${process.env.ADMIN_API_KEY}`
  ).toString('base64');
  return token;
}

// 토큰 검증
function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, , apiKey] = decoded.split(':');

    // 만료 체크 (24시간)
    if (Date.now() - parseInt(timestamp) > SESSION_EXPIRY) {
      return false;
    }

    // API 키 검증
    return apiKey === process.env.ADMIN_API_KEY;
  } catch {
    return false;
  }
}
```

### 8.2 쿠키 보안 설정

```typescript
cookieStore.set(ADMIN_SESSION_COOKIE, token, {
  httpOnly: true,     // JavaScript 접근 차단
  secure: process.env.NODE_ENV === 'production',  // HTTPS만
  sameSite: 'lax',    // CSRF 방지
  maxAge: 86400,      // 24시간
  path: '/admin',     // 어드민 경로만
});
```

### 8.3 인증 흐름

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│ Verify      │────▶│  Set        │
│   Page      │     │ Password    │     │  Cookie     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │ Middleware  │
                    │ Intercept   │
                    └──────┬──────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     ▼                     ▼                     ▼
┌─────────┐         ┌─────────┐         ┌─────────────┐
│ Valid   │         │ Expired │         │ No Cookie   │
│ Session │         │ Session │         │             │
└────┬────┘         └────┬────┘         └──────┬──────┘
     │                   │                     │
     ▼                   ▼                     ▼
┌─────────┐         ┌─────────┐         ┌─────────────┐
│ Allow   │         │ Clear & │         │ Redirect    │
│ Access  │         │ Redirect│         │ to Login    │
└─────────┘         └─────────┘         └─────────────┘
```

---

## 9. 국제화 (i18n)

### 9.1 구현 방식

외부 라이브러리 없이 **순수 Next.js + JSON**으로 구현했습니다.

```typescript
// src/lib/i18n/config.ts
export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// src/lib/i18n/getDictionary.ts
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  id: () => import('./dictionaries/id.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
```

### 9.2 번역 구조

```json
// dictionaries/en.json
{
  "nav": {
    "home": "Home",
    "services": "Services"
  },
  "hero": {
    "title": "Your Trusted Partner...",
    "cta": "Request a Free Consultation"
  },
  "services": {
    "privateTour": {
      "title": "Private Tours",
      "description": "Customized itineraries..."
    }
  },
  "servicesPage": {
    "features": {
      "privateTour": [
        "Customized itineraries",
        "Professional guides"
      ]
    }
  }
}
```

### 9.3 사용 패턴

```typescript
// 서버 컴포넌트에서
export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <h1>{dict.hero.title}</h1>;
}

// 클라이언트 컴포넌트로 전달
<InquiryForm locale={locale} dict={dict} />
```

### 9.4 왜 next-intl을 사용하지 않았나?

| 비교 | 자체 구현 | next-intl |
|-----|----------|-----------|
| 번들 크기 | 0KB (JSON만) | ~15KB |
| 복잡도 | 낮음 | 중간 |
| 유연성 | 높음 | 중간 |
| 기능 | 기본 번역 | 풍부함 |
| 적합성 | 소규모 프로젝트 | 대규모 |

**결론**: 2개 언어, 간단한 번역만 필요하므로 자체 구현이 효율적

---

## 10. 데이터베이스 설계

### 10.1 ERD (Entity Relationship Diagram)

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│    inquiries    │      │     notices     │      │       faq       │
├─────────────────┤      ├─────────────────┤      ├─────────────────┤
│ id (PK)         │      │ id (PK)         │      │ id (PK)         │
│ created_at      │      │ created_at      │      │ created_at      │
│ updated_at      │      │ updated_at      │      │ updated_at      │
│ name            │      │ title_en        │      │ question_en     │
│ email           │      │ title_id        │      │ question_id     │
│ phone           │      │ content_en      │      │ answer_en       │
│ service_type    │      │ content_id      │      │ answer_id       │
│ travel_date     │      │ category        │      │ category        │
│ group_size      │      │ is_published    │      │ order_index     │
│ message         │      │ published_at    │      │ is_published    │
│ status          │      │ views           │      └─────────────────┘
│ admin_notes     │      │ slug            │
│ locale          │      └─────────────────┘
└─────────────────┘

┌─────────────────┐
│   admin_users   │
├─────────────────┤
│ id (PK)         │
│ created_at      │
│ email           │
│ role            │
│ last_login      │
└─────────────────┘
```

### 10.2 타입 정의

```typescript
// Enum 타입들
type ServiceType = 'private_tour' | 'medical_tourism' | 'guide_service' | 'vehicle_rental' | 'other';
type InquiryStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';
type NoticeCategory = 'announcement' | 'update' | 'promotion' | 'travel_info';
type FAQCategory = 'general' | 'booking' | 'payment' | 'tour' | 'medical' | 'visa';

// Insert/Update 타입 자동 생성
type InquiryInsert = Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;
type InquiryUpdate = Partial<Omit<Inquiry, 'id' | 'created_at'>>;
```

### 10.3 Row Level Security (RLS)

```sql
-- inquiries 테이블: 익명 사용자는 INSERT만 가능
CREATE POLICY "Users can insert inquiries" ON inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- notices 테이블: 발행된 것만 읽기 가능
CREATE POLICY "Public can view published notices" ON notices
  FOR SELECT TO anon
  USING (is_published = true);
```

---

## 11. API 설계

### 11.1 RESTful 엔드포인트

```
Public APIs:
POST   /api/inquiry              # 문의 생성
GET    /api/faq                  # FAQ 목록 (캐시 1시간)
GET    /api/notices              # 공지사항 목록
GET    /api/notices/[slug]       # 공지사항 상세

Admin APIs:
POST   /api/admin/auth/login     # 로그인
POST   /api/admin/auth/logout    # 로그아웃
GET    /api/admin/auth/check     # 세션 확인

GET    /api/admin/dashboard      # 대시보드 통계
GET    /api/admin/inquiries      # 문의 목록
PATCH  /api/admin/inquiries/[id] # 문의 수정
DELETE /api/admin/inquiries/[id] # 문의 삭제

GET    /api/admin/notices        # 공지 목록
POST   /api/admin/notices        # 공지 생성
PATCH  /api/admin/notices/[id]   # 공지 수정
DELETE /api/admin/notices/[id]   # 공지 삭제

(FAQ도 동일 패턴)
```

### 11.2 API Route 패턴

```typescript
// src/app/api/admin/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getInquiries } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // 1. 인증 확인
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. 쿼리 파라미터 파싱
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status') as Inquiry['status'] | null;
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  // 3. 데이터 조회
  const { data, count } = await getInquiries({
    status: status || undefined,
    limit,
    offset,
  });

  // 4. 응답 반환
  return NextResponse.json({ data, count });
}
```

### 11.3 응답 캐싱

```typescript
// 공개 API는 캐시 적용
export async function GET() {
  const data = await getFAQs({ published: true });

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

## 12. 보안 고려사항

### 12.1 적용된 보안 조치

| 영역 | 조치 |
|-----|------|
| XSS 방지 | React 자동 이스케이프, dangerouslySetInnerHTML 최소 사용 |
| CSRF 방지 | SameSite 쿠키, Origin 헤더 검증 |
| SQL Injection | Supabase 파라미터화 쿼리 |
| 세션 보안 | HttpOnly, Secure, 24시간 만료 |
| 환경 변수 | .env 파일, Vercel 환경 변수 |
| RLS | Supabase Row Level Security |

### 12.2 쿠키 보안 설정

```typescript
cookieStore.set(ADMIN_SESSION_COOKIE, token, {
  httpOnly: true,     // XSS 방지
  secure: true,       // HTTPS 필수
  sameSite: 'lax',    // CSRF 방지
  maxAge: 86400,      // 만료 시간
  path: '/admin',     // 경로 제한
});
```

### 12.3 입력 검증 (Zod)

```typescript
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  service_type: z.enum(['private_tour', 'medical_tourism', ...]),
  message: z.string().min(10).max(5000),
});

// API에서 사용
const result = inquirySchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: result.error }, { status: 400 });
}
```

---

## 13. 성능 최적화

### 13.1 적용된 최적화

| 기법 | 설명 |
|-----|------|
| 정적 생성 (SSG) | generateStaticParams로 빌드 시 HTML 생성 |
| 이미지 최적화 | Next.js Image 컴포넌트 (WebP, Lazy Load) |
| 코드 스플리팅 | 동적 import로 자동 청크 분리 |
| 폰트 최적화 | next/font (Google Fonts 서브셋) |
| 캐싱 | API 응답 캐시 (s-maxage) |
| Turbopack | 빌드 시간 단축 |

### 13.2 빌드 출력 분석

```
Route (app)                       Revalidate
┌ ○ /                             Static
├ ● /[locale]                     SSG
├ ● /[locale]/about               SSG
├ ● /[locale]/faq                 SSG
├ ƒ /[locale]/inquiry             Dynamic (form)
├ ● /[locale]/services            SSG
├ ○ /api/faq                      1h cache
└ ƒ /api/inquiry                  Dynamic

○  (Static)   정적 HTML
●  (SSG)      빌드 시 생성 (generateStaticParams)
ƒ  (Dynamic)  요청 시 렌더링
```

### 13.3 Core Web Vitals 목표

```yaml
LCP: < 2.5s   # Largest Contentful Paint
FID: < 100ms  # First Input Delay
CLS: < 0.1    # Cumulative Layout Shift
```

---

## 14. 접근성 (a11y)

### 14.1 WCAG 2.1 AA 준수 항목

| 항목 | 구현 |
|-----|------|
| 키보드 네비게이션 | focus:ring, tabindex 적용 |
| 스크린 리더 | ARIA 레이블, 시맨틱 HTML |
| 터치 타겟 | 최소 48x48px (Google 가이드라인) |
| 색상 대비 | Tailwind 기본 팔레트 사용 |
| 대체 텍스트 | 모든 이미지에 alt 속성 |
| 폼 접근성 | label 연결, 에러 메시지 |

### 14.2 구현 예시

```tsx
// 버튼 접근성
<button
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
  className="min-h-[44px] min-w-[44px] focus:ring-2"
>
  <Menu aria-hidden="true" />
</button>

// 네비게이션 접근성
<nav aria-label="Main navigation">
  {navItems.map((item) => (
    <Link
      className="focus:ring-2 focus:ring-offset-2"
    >
      {item.label}
    </Link>
  ))}
</nav>

// 섹션 접근성
<section aria-labelledby="services-heading">
  <h2 id="services-heading">{dict.services.title}</h2>
</section>
```

---

## 15. SEO 전략

### 15.1 메타데이터

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: {
      template: `%s | Keyable Korea`,
      default: 'Korea Travel & Medical Tourism',
    },
    description: '...',
    keywords: ['Korea travel', 'medical tourism', ...],
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}
```

### 15.2 구조화된 데이터 (Schema.org)

```typescript
// LocalBusinessSchema
const schema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE_CONFIG.name,
  url: `https://${SITE_CONFIG.domain}`,
  telephone: SITE_CONFIG.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Seoul' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: 'Private Tours' } },
    ],
  },
};

// FAQSchema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};
```

### 15.3 LLM 크롤러 최적화

```
public/llms.txt        # 기본 정보 (AI 크롤러용)
public/llms-full.txt   # 상세 정보
```

### 15.4 robots.txt & sitemap.xml

```typescript
// 동적 생성
export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Sitemap: https://keyablekorea.com/sitemap.xml
`;
  return new Response(robotsTxt, { headers: { 'Content-Type': 'text/plain' } });
}
```

---

## 16. 컴포넌트 설계 패턴

### 16.1 Compound Component Pattern

```tsx
// Card 컴포넌트
<Card hover className="group">
  <CardContent className="p-6">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardContent>
</Card>
```

### 16.2 Variant Pattern (CVA)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white',
        secondary: 'bg-gray-100 text-gray-900',
        outline: 'border-2 border-gray-200',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### 16.3 Render Props / Children Pattern

```tsx
// 유연한 컨텐츠 주입
<Card>
  {children}
</Card>

<Button isLoading={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

---

## 17. 에러 핸들링

### 17.1 API 에러 처리

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 유효성 검증
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      );
    }

    // 비즈니스 로직
    const data = await createResource(result.data);
    if (!data) {
      return NextResponse.json(
        { error: 'Failed to create resource' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 17.2 클라이언트 에러 처리

```tsx
const [error, setError] = useState<string | null>(null);

try {
  await submitForm();
} catch (err) {
  setError('Failed to submit. Please try again.');
}

// 에러 표시
{error && (
  <div className="rounded-lg bg-red-50 p-4 text-red-600" role="alert">
    {error}
  </div>
)}
```

### 17.3 404 페이지

```tsx
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p>Page not found</p>
        <Link href="/">Go home</Link>
      </div>
    </div>
  );
}
```

---

## 18. 테스트 전략

### 18.1 권장 테스트 구조 (현재 미구현)

```
tests/
├── unit/                # 유틸리티, 헬퍼 함수
│   └── utils.test.ts
├── integration/         # API Routes
│   └── api/
├── e2e/                 # Playwright E2E
│   ├── home.spec.ts
│   └── inquiry.spec.ts
└── components/          # 컴포넌트 테스트
    └── Button.test.tsx
```

### 18.2 테스트 도구 권장

```yaml
Unit: Vitest
Components: React Testing Library
E2E: Playwright
```

---

## 19. 배포 및 CI/CD

### 19.1 Vercel 배포

```yaml
# vercel.json (필요시)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 19.2 환경 변수

```env
# .env (Vercel 자동 인식)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SMTP_USER=
ADMIN_PASSWORD=
```

### 19.3 Git 워크플로우

```
main 브랜치
  └── Vercel 자동 배포 (Production)

feature/* 브랜치
  └── PR 생성 시 Preview 배포
```

---

## 20. 기술 면접 Q&A

### Q1: Next.js App Router를 선택한 이유는?

**A**:
- **서버 컴포넌트**: 클라이언트 번들 크기 감소, 데이터 페칭 간소화
- **레이아웃 시스템**: 중첩 레이아웃으로 코드 재사용 극대화
- **스트리밍**: 점진적 렌더링으로 사용자 경험 향상
- **정적 생성**: generateStaticParams로 빌드 시 HTML 생성
- **미들웨어**: Edge Runtime에서 인증, 리다이렉트 처리

### Q2: 상태 관리 라이브러리를 사용하지 않은 이유는?

**A**:
서버 중심 아키텍처를 채택하여:
- 대부분의 데이터는 서버 컴포넌트에서 직접 페칭
- URL 상태로 페이지 상태 관리 (locale, params)
- 폼/UI 상태만 React useState로 충분
- Supabase가 데이터 동기화 담당

추가 라이브러리는 번들 크기 증가와 복잡성만 더함

### Q3: 왜 자체 i18n을 구현했나요?

**A**:
- 2개 언어만 지원하면 됨
- 동적 번역 키, 복수형 처리 등 불필요
- 0KB 번들 오버헤드 (JSON 파일만 사용)
- 서버 컴포넌트에서 직접 import 가능
- 필요 시 확장 가능한 구조

### Q4: Supabase를 선택한 이유는?

**A**:
- **PostgreSQL**: 관계형 DB의 강력함
- **Row Level Security**: 데이터베이스 레벨 보안
- **실시간 구독**: 필요시 실시간 기능 추가 가능
- **무료 티어**: 스타트업 친화적
- **TypeScript 지원**: 타입 자동 생성

### Q5: 세션 기반 인증을 JWT 대신 선택한 이유는?

**A**:
- **간단한 요구사항**: 어드민 1인만 사용
- **서버 사이드 검증**: 미들웨어에서 쉽게 체크
- **즉시 무효화**: 쿠키 삭제로 로그아웃 즉시 반영
- **보안**: HttpOnly, Secure, SameSite 쿠키 보호

프로덕션에서는 JWT + Refresh Token 또는 NextAuth 권장

### Q6: 컴포넌트 설계 원칙은?

**A**:
1. **합성(Composition) 우선**: props보다 children 활용
2. **관심사 분리**: UI 로직 ↔ 비즈니스 로직
3. **단일 책임**: 하나의 컴포넌트는 하나의 역할
4. **재사용성**: variants, props로 유연하게
5. **접근성 내장**: ARIA 속성 기본 포함

### Q7: 성능 최적화 어떻게 했나요?

**A**:
1. **SSG**: 대부분 페이지 정적 생성
2. **이미지 최적화**: Next.js Image 자동 WebP 변환
3. **코드 스플리팅**: 동적 import로 자동 청크 분리
4. **폰트 최적화**: next/font로 FOUT 방지
5. **API 캐싱**: s-maxage로 CDN 캐시

### Q8: 접근성(a11y) 어떻게 고려했나요?

**A**:
1. **시맨틱 HTML**: nav, main, section, article 사용
2. **ARIA 레이블**: 버튼, 메뉴, 섹션에 적용
3. **키보드 네비게이션**: focus 스타일, tabindex
4. **터치 타겟**: 최소 48px (모바일)
5. **색상 대비**: WCAG AA 준수

### Q9: SEO 전략은?

**A**:
1. **메타데이터**: title, description, OpenGraph
2. **구조화 데이터**: LocalBusiness, FAQ Schema
3. **sitemap.xml**: 동적 생성
4. **다국어 SEO**: hreflang 대체 태그
5. **LLM 최적화**: llms.txt 제공

### Q10: 이 프로젝트에서 가장 어려웠던 점과 해결 방법은?

**A**:
**문제**: Supabase TypeScript 타입과 Next.js 15의 제네릭 호환성 이슈

```typescript
// 에러: No overload matches this call
await db.from('inquiries').insert(data)
```

**해결**:
```typescript
// 타입 캐스팅으로 해결
await db.from('inquiries').insert(data as Record<string, unknown>)
```

**교훈**: 라이브러리 버전 업데이트 시 타입 호환성 주의 필요

---

## 부록: 프로젝트 통계

```yaml
코드 라인 수: ~5,000 LOC
파일 수: ~60개
컴포넌트 수: ~20개
API Routes: ~15개
번역 키: ~100개
```

## 기술 스택 버전

```yaml
Next.js: 16.1.0
React: 19.2.3
TypeScript: 5.x
Tailwind CSS: 4.x
Supabase: 2.89.0
```

---

*이 문서는 2024년 12월 기준으로 작성되었습니다.*
