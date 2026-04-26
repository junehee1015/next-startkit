import React from 'react'

const VSCodeBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-4 overflow-hidden rounded-md border border-[#3E3E42] bg-[#1E1E1E] shadow-lg">
    <div className="flex items-center gap-2 border-b border-[#3E3E42] bg-[#2D2D2D] px-4 py-2 text-xs font-mono text-[#CCCCCC]">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ED6A5E]"></span>
        <span className="h-3 w-3 rounded-full bg-[#F4BF4F]"></span>
        <span className="h-3 w-3 rounded-full bg-[#61C554]"></span>
      </div>
      <span className="ml-2">{title}</span>
    </div>
    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#D4D4D4] sm:text-sm">
      <code>{children}</code>
    </pre>
  </div>
)

const kw = 'text-[#C586C0]' // keyword (import, export, from, return, async, await, if, interface)
const bl = 'text-[#569CD6]' // blue (const, function, =>, true, false, HTML tags)
const fn = 'text-[#DCDCAA]' // function (calls and declarations)
const st = 'text-[#CE9178]' // string
const ty = 'text-[#4EC9B0]' // type/interface, React Components
const cm = 'text-[#6A9955]' // comment
const vr = 'text-[#9CDCFE]' // variable, object properties, jsx attributes
const op = 'text-[#D4D4D4]' // operators, brackets

export function GuideApi() {
  return (
    <div className="max-w-5xl space-y-12 pb-32">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">API & 비즈니스 로직 아키텍처</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          본 스타트킷은 <strong>관심사의 분리</strong>와 <strong>Next.js 하이브리드 전략</strong>을 극대화한 아키텍처를 따릅니다.
          <br />
          통신(API Layer), 비즈니스 로직(Custom Hook), 렌더링(UI Component)을 완벽하게 분리하여 유지보수성과 재사용성을 높입니다.
        </p>
      </div>

      {/* --- STEP 0 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">STEP 0</span>
          <h3 className="text-xl font-bold text-gray-800">인증 및 보안 (Server Actions)</h3>
        </div>
        <p className="text-sm text-gray-600">
          본 아키텍처에서 <strong>Server Action은 일반적인 비즈니스 로직(등록/수정/삭제)에 사용하지 않습니다.</strong>
          <br />
          클라이언트(JS)가 접근할 수 없는{' '}
          <strong>
            <code>HttpOnly</code> 쿠키를 굽거나 삭제해야 하는 로그인/로그아웃 로직
          </strong>
          과 같이 서버의 권한이 필요한 곳에만 제한적으로 사용합니다.
        </p>
        <VSCodeBlock title="src/features/auth/api/actions.ts">
          <span className={st}>'use server'</span>
          {'\n\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>cookies</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'next/headers'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>actionClient</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/safe-action'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>loginSchema</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../model'</span>
          {'\n\n'}
          <span className={cm}>// 로그인 (HttpOnly 쿠키 발급 전용)</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>loginAction</span> <span className={op}>=</span> <span className={vr}>actionClient</span>
          {'\n'}
          {'  '}
          <span className={op}>.</span>
          <span className={fn}>inputSchema</span>
          <span className={op}>(</span>
          <span className={vr}>loginSchema</span>
          <span className={op}>)</span>
          {'\n'}
          {'  '}
          <span className={op}>.</span>
          <span className={fn}>action</span>
          <span className={op}>(</span>
          <span className={kw}>async</span> <span className={op}>({'{'} </span>
          <span className={vr}>parsedInput</span>
          <span className={op}> {'}'})</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'    '}
          <span className={bl}>const</span> <span className={op}>{'{'} </span>
          <span className={vr}>email</span>
          <span className={op}>, </span>
          <span className={vr}>password</span>
          <span className={op}> {'}'}</span> <span className={op}>=</span> <span className={vr}>parsedInput</span>
          {'\n\n'}
          {'    '}
          <span className={cm}>// 외부 백엔드 API 호출을 통한 인증 처리 로직 (목업 예시)</span>
          {'\n'}
          {'    '}
          <span className={bl}>const</span> <span className={vr}>accessToken</span> <span className={op}>=</span> <span className={st}>'mock-access-token'</span>
          {'\n'}
          {'    '}
          <span className={bl}>const</span> <span className={vr}>mockUser</span> <span className={op}>= {'{'} </span>
          <span className={vr}>id</span>
          <span className={op}>: </span>
          <span className={vr}>1</span>
          <span className={op}>, </span>
          <span className={vr}>email</span>
          <span className={op}> {'}'}</span>
          {'\n\n'}
          {'    '}
          <span className={cm}>// HttpOnly 쿠키 설정</span>
          {'\n'}
          {'    '}
          <span className={bl}>const</span> <span className={vr}>cookieStore</span> <span className={op}>=</span> <span className={kw}>await</span> <span className={fn}>cookies</span>
          <span className={op}>()</span>
          {'\n'}
          {'    '}
          <span className={vr}>cookieStore</span>
          <span className={op}>.</span>
          <span className={fn}>set</span>
          <span className={op}>(</span>
          <span className={st}>'accessToken'</span>
          <span className={op}>,</span> <span className={vr}>accessToken</span>
          <span className={op}>, {'{\n'}</span>
          {'      '}
          <span className={vr}>httpOnly</span>
          <span className={op}>: </span>
          <span className={bl}>true</span>
          <span className={op}>,</span>
          {'\n'}
          {'      '}
          <span className={vr}>secure</span>
          <span className={op}>: </span>
          <span className={vr}>process</span>
          <span className={op}>.</span>
          <span className={vr}>env</span>
          <span className={op}>.</span>
          <span className={vr}>NODE_ENV</span> <span className={op}>===</span> <span className={st}>'production'</span>
          <span className={op}>,</span>
          {'\n'}
          {'      '}
          <span className={vr}>sameSite</span>
          <span className={op}>: </span>
          <span className={st}>'lax'</span>
          <span className={op}>,</span>
          {'\n'}
          {'      '}
          <span className={vr}>path</span>
          <span className={op}>: </span>
          <span className={st}>'/'</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'})</span>
          {'\n\n'}
          {'    '}
          <span className={kw}>return</span> <span className={op}>{'{'} </span>
          <span className={vr}>user</span>
          <span className={op}>: </span>
          <span className={vr}>mockUser</span>
          <span className={op}> {'}'}</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'})</span>
          {'\n\n'}
          <span className={cm}>// 로그아웃 (HttpOnly 쿠키 삭제)</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>logoutAction</span> <span className={op}>=</span> <span className={vr}>actionClient</span>
          <span className={op}>.</span>
          <span className={fn}>action</span>
          <span className={op}>(</span>
          <span className={kw}>async</span> <span className={op}>()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={bl}>const</span> <span className={vr}>cookieStore</span> <span className={op}>=</span> <span className={kw}>await</span> <span className={fn}>cookies</span>
          <span className={op}>()</span>
          {'\n'}
          {'  '}
          <span className={vr}>cookieStore</span>
          <span className={op}>.</span>
          <span className={fn}>delete</span>
          <span className={op}>(</span>
          <span className={st}>'accessToken'</span>
          <span className={op}>)</span>
          {'\n'}
          {'  '}
          <span className={vr}>cookieStore</span>
          <span className={op}>.</span>
          <span className={fn}>delete</span>
          <span className={op}>(</span>
          <span className={st}>'refreshToken'</span>
          <span className={op}>)</span>
          {'\n'}
          {'  '}
          <span className={vr}>cookieStore</span>
          <span className={op}>.</span>
          <span className={fn}>delete</span>
          <span className={op}>(</span>
          <span className={st}>'user'</span>
          <span className={op}>)</span>
          {'\n'}
          <span className={op}>{'}'})</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 1 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 1</span>
          <h3 className="text-xl font-bold text-gray-800">서버 데이터 페칭 (초기 렌더링 & SEO)</h3>
        </div>
        <p className="text-sm text-gray-600">
          검색엔진 최적화(SEO)와 빠른 초기 로딩이 필요한 <strong>최초 조회(GET) API</strong>는 Server Component 환경에서 <code>serverApi</code>로 직접 호출합니다.
        </p>
        <VSCodeBlock title="src/features/post/api/server.ts">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>serverApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/server-api'</span>
          {'\n\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={vr}>postsKeys</span> <span className={op}>= {'{'}</span>
          {'\n'}
          {'  '}
          <span className={vr}>list</span>
          <span className={op}>:</span> <span className={st}>'posts'</span>
          <span className={op}>,</span>
          {'\n'}
          <span className={op}>{'}'}</span>
          {'\n\n'}
          <span className={cm}>// 게시글 목록 조회 (SSR 전용 순수 함수)</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>getPosts</span> <span className={op}>=</span> <span className={kw}>async</span> <span className={op}>(</span>
          <span className={vr}>page</span> <span className={op}>=</span> <span className={vr}>1</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return await</span> <span className={vr}>serverApi</span>
          <span className={op}>.</span>
          <span className={fn}>get</span>
          <span className={op}>(</span>
          <span className={st}>'posts'</span>
          <span className={op}>, {'{'}</span>
          {'\n'}
          {'    '}
          <span className={vr}>searchParams</span>
          <span className={op}>: {'{'}</span> <span className={vr}>page</span> <span className={op}>{'}'},</span>
          {'\n'}
          {'    '}
          <span className={vr}>next</span>
          <span className={op}>: {'{'}</span> <span className={vr}>tags</span>
          <span className={op}>: [</span>
          <span className={vr}>postsKeys</span>
          <span className={op}>.</span>
          <span className={vr}>list</span>
          <span className={op}>],</span> <span className={vr}>revalidate</span>
          <span className={op}>:</span> <span className={vr}>3600</span> <span className={op}>{'}'}</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'}).</span>
          <span className={fn}>json</span>
          <span className={op}>&lt;</span>
          <span className={ty}>Post</span>
          <span className={op}>[]&gt;()</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 2 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-1 text-sm font-bold text-amber-700">STEP 2</span>
          <h3 className="text-xl font-bold text-gray-800">클라이언트 데이터 패칭 (Client API)</h3>
        </div>
        <p className="text-sm text-gray-600">
          <code>api/client.ts</code>에 순수 함수로 분리하여 코드 응집도와 재사용성을 극대화합니다.
        </p>
        <VSCodeBlock title="src/features/post/api/client.ts">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>clientApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/client-api'</span>
          {'\n\n'}
          <span className={cm}>// 게시글 생성 API (Client용 순수 함수)</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>createPostApi</span> <span className={op}>=</span> <span className={kw}>async</span> <span className={op}>(</span>
          <span className={vr}>data</span>
          <span className={op}>: {'{'} </span>
          <span className={vr}>title</span>
          <span className={op}>: </span>
          <span className={fn}>string</span>
          <span className={op}>, </span>
          <span className={vr}>content</span>
          <span className={op}>: </span>
          <span className={fn}>string</span>
          <span className={op}> {'}'})</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return await</span> <span className={vr}>clientApi</span>
          <span className={op}>.</span>
          <span className={fn}>post</span>
          <span className={op}>(</span>
          <span className={st}>'posts'</span>
          <span className={op}>, {'{'} </span>
          <span className={vr}>json</span>
          <span className={op}>: </span>
          <span className={vr}>data</span>
          <span className={op}> {'}'}).</span>
          <span className={fn}>json</span>
          <span className={op}>()</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 3 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-teal-100 px-2 py-1 text-sm font-bold text-teal-700">STEP 3</span>
          <h3 className="text-xl font-bold text-gray-800">클라이언트 비즈니스 로직 (TanStack Query)</h3>
        </div>
        <p className="text-sm text-gray-600">
          분리된 API 함수를 <code>TanStack Query</code>의 <code>mutationFn</code>에 주입합니다. 훅은 오직 로딩 제어, 에러 토스트 띄우기, 캐시 무효화 등 <strong>서버 상태 관리</strong>에만 집중합니다.
        </p>
        <VSCodeBlock title="src/features/post/model/hooks/use-post.ts">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useMutation</span>
          <span className={op}>, </span>
          <span className={vr}>useQueryClient</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@tanstack/react-query'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>toast</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'sonner'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>createPostApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../../api/client'</span>
          {'\n\n'}
          <span className={cm}>// Query Key Co-location (키를 구조화하여 한 곳에서 관리)</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={vr}>postKeys</span> <span className={op}>= {'{\n'}</span>
          {'  '}
          <span className={vr}>all</span>
          <span className={op}>: [</span>
          <span className={st}>'posts'</span>
          <span className={op}>]</span> <span className={kw}>as const</span>
          <span className={op}>,</span>
          {'\n'}
          {'  '}
          <span className={vr}>lists</span>
          <span className={op}>: ()</span> <span className={bl}>=&gt;</span> <span className={op}>[...</span>
          <span className={vr}>postKeys</span>
          <span className={op}>.</span>
          <span className={vr}>all</span>
          <span className={op}>, </span>
          <span className={st}>'list'</span>
          <span className={op}>]</span> <span className={kw}>as const</span>
          <span className={op}>,</span>
          {'\n'}
          <span className={op}>{'}\n\n'}</span>
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>useCreatePost</span> <span className={op}>=</span> <span className={op}>()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={bl}>const</span> <span className={vr}>queryClient</span> <span className={op}>=</span> <span className={fn}>useQueryClient</span>
          <span className={op}>()</span>
          {'\n\n'}
          {'  '}
          <span className={kw}>return</span> <span className={fn}>useMutation</span>
          <span className={op}>({'{\n'}</span>
          {'    '}
          <span className={vr}>mutationFn</span>
          <span className={op}>: </span>
          <span className={vr}>createPostApi</span>
          <span className={op}>, </span>
          {'\n'}
          {'    '}
          <span className={fn}>onSuccess</span>
          <span className={op}>: ()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'      '}
          <span className={vr}>queryClient</span>
          <span className={op}>.</span>
          <span className={fn}>invalidateQueries</span>
          <span className={op}>({'{'} </span>
          <span className={vr}>queryKey</span>
          <span className={op}>: </span>
          <span className={vr}>postKeys</span>
          <span className={op}>.</span>
          <span className={fn}>lists</span>
          <span className={op}>()</span> <span className={op}>{'}'})</span>
          {'\n'}
          {'      '}
          <span className={vr}>toast</span>
          <span className={op}>.</span>
          <span className={fn}>success</span>
          <span className={op}>(</span>
          <span className={st}>'게시글이 성공적으로 등록되었습니다!'</span>
          <span className={op}>)</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'},</span>
          {'\n'}
          {'    '}
          <span className={fn}>onError</span>
          <span className={op}>: (</span>
          <span className={vr}>error</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'      '}
          <span className={vr}>toast</span>
          <span className={op}>.</span>
          <span className={fn}>error</span>
          <span className={op}>(</span>
          <span className={st}>'작성 실패: '</span> <span className={op}>+</span> <span className={vr}>error</span>
          <span className={op}>.</span>
          <span className={vr}>message</span>
          <span className={op}>)</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'}</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'})</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 4 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-sky-100 px-2 py-1 text-sm font-bold text-sky-700">STEP 4</span>
          <h3 className="text-xl font-bold text-gray-800">UI 렌더링 및 컴포넌트 조합</h3>
        </div>
        <p className="text-sm text-gray-600">
          GET(조회)은 <strong>서버 컴포넌트</strong>가 SEO 최적화를 담당하고, POST(작성) 폼은 <strong>클라이언트 컴포넌트</strong>가 훅을 호출하여 제어합니다.
          <br />
          화면이 멈추지 않도록 API 조회를 자식 서버 컴포넌트로 격리하고 <code>&lt;Suspense&gt;</code>를 활용합니다.
        </p>

        {/* 1. Page Component (Shell) */}
        <VSCodeBlock title="src/app/post/page.tsx (Server Component Shell)">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={ty}>Suspense</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'react'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={ty}>PostList</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/features/post/ui/post-list'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={ty}>PostForm</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/features/post/ui/post-form'</span>
          {'\n\n'}
          <span className={kw}>export default function</span> <span className={fn}>PostPage</span>
          <span className={op}>() {'{\n'}</span>
          {'  '}
          <span className={kw}>return</span> <span className={op}>({' \n'}</span>
          {'    '}
          <span className={op}>&lt;</span>
          <span className={bl}>div</span> <span className={vr}>className</span>
          <span className={op}>=</span>
          <span className={st}>"space-y-8"</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;</span>
          <span className={bl}>h1</span>
          <span className={op}>&gt;</span>자유게시판<span className={op}>&lt;/</span>
          <span className={bl}>h1</span>
          <span className={op}>&gt;</span>
          <span className={cm}> {/* [GET] 리스트 조회 부분만 격리하여 로딩 처리 */}</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;</span>
          <span className={ty}>Suspense</span> <span className={vr}>fallback</span>
          <span className={op}>={'{'}&lt;</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;</span>목록을 불러오는 중...<span className={op}>&lt;/</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;{'}'}&gt;</span>
          {'\n'}
          {'        '}
          <span className={op}>&lt;</span>
          <span className={ty}>PostList</span> <span className={op}>/&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;/</span>
          <span className={ty}>Suspense</span>
          <span className={op}>&gt;</span>
          {'\n'}
          <span className={cm}> {/* [POST] 글 작성 폼은 클라이언트 컴포넌트로 위임 */}</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;</span>
          <span className={ty}>PostForm</span> <span className={op}>/&gt;</span>
          {'\n'}
          {'    '}
          <span className={op}>&lt;/</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'  '}
          <span className={op}>)</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>

        {/* 2. Data Fetching Component (Server) */}
        <VSCodeBlock title="src/features/post/ui/post-list.tsx (Server Component)">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>getPosts</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../api/server'</span>
          {'\n\n'}
          <span className={kw}>export async function</span> <span className={fn}>PostList</span>
          <span className={op}>() {'{\n'}</span>
          {'  '}
          <span className={bl}>const</span> <span className={vr}>posts</span> <span className={op}>=</span> <span className={kw}>await</span> <span className={fn}>getPosts</span>
          <span className={op}>(</span>
          <span className={vr}>1</span>
          <span className={op}>)</span>
          {'\n\n'}
          {'  '}
          <span className={kw}>return</span> <span className={op}>({' \n'}</span>
          {'    '}
          <span className={op}>&lt;</span>
          <span className={bl}>ul</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>{'{'}</span>
          <span className={vr}>posts</span>
          <span className={op}>.</span>
          <span className={fn}>map</span>
          <span className={op}>((</span>
          <span className={vr}>post</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={op}>(</span>
          {'\n'}
          {'        '}
          <span className={op}>&lt;</span>
          <span className={bl}>li</span> <span className={vr}>key</span>
          <span className={op}>={'{'}</span>
          <span className={vr}>post</span>
          <span className={op}>.</span>
          <span className={vr}>id</span>
          <span className={op}>
            {'}'}&gt;{'{'}
          </span>
          <span className={vr}>post</span>
          <span className={op}>.</span>
          <span className={vr}>title</span>
          <span className={op}>{'}'}&lt;/</span>
          <span className={bl}>li</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>)){'}'}</span>
          {'\n'}
          {'    '}
          <span className={op}>&lt;/</span>
          <span className={bl}>ul</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'  '}
          <span className={op}>)</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>

        {/* 3. Action Component (Client) */}
        <VSCodeBlock title="src/features/post/ui/post-form.tsx (Client Component)">
          <span className={st}>'use client'</span>
          {'\n\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useRouter</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'next/navigation'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useCreatePost</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../model/hooks/use-post'</span>
          {'\n\n'}
          <span className={kw}>export function</span> <span className={fn}>PostForm</span>
          <span className={op}>() {'{\n'}</span>
          {'  '}
          <span className={bl}>const</span> <span className={vr}>router</span> <span className={op}>=</span> <span className={fn}>useRouter</span>
          <span className={op}>()</span>
          {'\n'}
          {'  '}
          <span className={cm}>// TanStack Query의 mutate와 isPending을 꺼내 씁니다.</span>
          {'\n'}
          {'  '}
          <span className={bl}>const</span> <span className={op}>{'{'} </span>
          <span className={vr}>mutate</span>
          <span className={op}>, </span>
          <span className={vr}>isPending</span>
          <span className={op}> {'}'}</span> <span className={op}>=</span> <span className={fn}>useCreatePost</span>
          <span className={op}>()</span>
          {'\n\n'}
          {'  '}
          <span className={bl}>const</span> <span className={fn}>handleSubmit</span> <span className={op}>=</span> <span className={op}>()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'    '}
          <span className={vr}>mutate</span>
          <span className={op}>({'{'} </span>
          <span className={vr}>title</span>
          <span className={op}>: </span>
          <span className={st}>'새 글'</span>
          <span className={op}>, </span>
          <span className={vr}>content</span>
          <span className={op}>: </span>
          <span className={st}>'내용입니다'</span>
          <span className={op}>
            {' '}
            {'}'}, {'{\n'}
          </span>
          {'      '}
          <span className={fn}>onSuccess</span>
          <span className={op}>: (</span>
          <span className={vr}>data</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'        '}
          <span className={cm}>// 성공 후 라우팅 이동 등 화면 제어는 여기서 처리</span>
          {'\n'}
          {'        '}
          <span className={vr}>router</span>
          <span className={op}>.</span>
          <span className={fn}>push</span>
          <span className={op}>(</span>
          <span className={st}>`/post/</span>
          <span className={bl}>${'{'}</span>
          <span className={vr}>data</span>
          <span className={op}>.</span>
          <span className={vr}>id</span>
          <span className={op}>{'}'}</span>
          <span className={st}>`</span>
          <span className={op}>)</span>
          {'\n'}
          {'      '}
          <span className={op}>{'}\n'}</span>
          {'    '}
          <span className={op}>{'}'})</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'}</span>
          {'\n\n'}
          {'  '}
          <span className={kw}>return</span> <span className={op}>({' \n'}</span>
          {'    '}
          <span className={op}>&lt;</span>
          <span className={bl}>button</span>
          {'\n'}
          {'      '}
          <span className={vr}>onClick</span>
          <span className={op}>={'{'}</span>
          <span className={fn}>handleSubmit</span>
          <span className={op}>{'}'}</span>
          {'\n'}
          {'      '}
          <span className={vr}>disabled</span>
          <span className={op}>={'{'}</span>
          <span className={vr}>isPending</span>
          <span className={op}>{'}'}</span>
          {'\n'}
          {'    '}
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>{'{'}</span>
          <span className={vr}>isPending</span> <span className={op}>?</span> <span className={st}>'게시 중...'</span> <span className={op}>:</span> <span className={st}>'게시글 작성'</span>
          <span className={op}>{'}'}</span>
          {'\n'}
          {'    '}
          <span className={op}>&lt;/</span>
          <span className={bl}>button</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'  '}
          <span className={op}>)</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 5 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-rose-100 px-2 py-1 text-sm font-bold text-rose-700">STEP 5</span>
          <h3 className="text-xl font-bold text-gray-800">페이지네이션 전략 (하이브리드 페칭)</h3>
        </div>
        <p className="text-sm text-gray-600">
          <strong>예시 1: 단순 페이지네이션(SEO 최적화)</strong>은 <code>?page=2</code> 처럼 URL을 변경하여 서버 컴포넌트로 다시 그려냅니다. <br />
          <strong>예시 2: '더보기 버튼'이나 '무한 스크롤'</strong>처럼 화면 이동 없이 데이터를 이어 붙일 때는 CSR 환경에서 <code>useInfiniteQuery</code>를 사용합니다.
        </p>

        {/* 예시 1: SEO 최적화 (URL 기반) */}
        <VSCodeBlock title="예시 1) src/app/post/page.tsx (SEO 최적화 서버 컴포넌트)">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={ty}>Link</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'next/link'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>getPosts</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/features/post/api/server'</span>
          {'\n\n'}
          <span className={cm}>// URL의 searchParams를 읽어 서버에서 데이터를 페칭합니다.</span>
          {'\n'}
          <span className={kw}>export default async function</span> <span className={fn}>PostPage</span>
          <span className={op}>({'{'} </span>
          <span className={vr}>searchParams</span>
          <span className={op}> {'}: {'} </span>
          <span className={vr}>searchParams</span>
          <span className={op}>: {'{'} </span>
          <span className={vr}>page</span>
          <span className={op}>?: </span>
          <span className={fn}>string</span> <span className={op}>{'}'}</span> <span className={op}>)</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={bl}>const</span> <span className={vr}>currentPage</span> <span className={op}>=</span> <span className={ty}>Number</span>
          <span className={op}>(</span>
          <span className={vr}>searchParams</span>
          <span className={op}>.</span>
          <span className={vr}>page</span>
          <span className={op}>) ||</span> <span className={vr}>1</span>
          {'\n'}
          {'  '}
          <span className={bl}>const</span> <span className={vr}>posts</span> <span className={op}>=</span> <span className={kw}>await</span> <span className={fn}>getPosts</span>
          <span className={op}>(</span>
          <span className={vr}>currentPage</span>
          <span className={op}>)</span>
          {'\n\n'}
          {'  '}
          <span className={kw}>return</span> <span className={op}>({' \n'}</span>
          {'    '}
          <span className={op}>&lt;</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={cm}>{' {/* 리스트 렌더링 로직 생략... */}'}</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;</span>
          <span className={bl}>div</span> <span className={vr}>className</span>
          <span className={op}>=</span>
          <span className={st}>"flex gap-4 mt-4"</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'        '}
          <span className={cm}>{' {/* Link 태그로 URL 파라미터를 변경하여 서버 컴포넌트 리렌더링 유도 */}'}</span>
          {'\n'}
          {'        '}
          <span className={op}>&lt;</span>
          <span className={ty}>Link</span> <span className={vr}>href</span>
          <span className={op}>=</span>
          <span className={st}>{`\`/post?page=\${currentPage - 1}\``}</span>
          <span className={op}>&gt;</span>이전<span className={op}>&lt;/</span>
          <span className={ty}>Link</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'        '}
          <span className={op}>&lt;</span>
          <span className={ty}>Link</span> <span className={vr}>href</span>
          <span className={op}>=</span>
          <span className={st}>{`\`/post?page=\${currentPage + 1}\``}</span>
          <span className={op}>&gt;</span>다음<span className={op}>&lt;/</span>
          <span className={ty}>Link</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>&lt;/</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'    '}
          <span className={op}>&lt;/</span>
          <span className={bl}>div</span>
          <span className={op}>&gt;</span>
          {'\n'}
          {'  '}
          <span className={op}>)</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>

        {/* 예시 2: 무한 스크롤 (CSR) */}
        <VSCodeBlock title="예시 2) src/features/post/model/hooks/use-infinite-posts.ts (무한 스크롤 CSR)">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useInfiniteQuery</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@tanstack/react-query'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>clientApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/client-api'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>postKeys</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'./use-post'</span>
          {'\n\n'}
          <span className={cm}>// API 통신 함수 분리 (api/client.ts에 작성 권장)</span>
          {'\n'}
          <span className={kw}>const</span> <span className={fn}>fetchPostsPage</span> <span className={op}>=</span> <span className={kw}>async</span> <span className={op}>({'{'}</span> <span className={vr}>pageParam</span> <span className={op}>{'}'})</span> <span className={bl}>=&gt;</span>{' '}
          <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return await</span> <span className={vr}>clientApi</span>
          <span className={op}>.</span>
          <span className={fn}>get</span>
          <span className={op}>(</span>
          <span className={st}>'posts'</span>
          <span className={op}>, {'{'} </span>
          <span className={vr}>searchParams</span>
          <span className={op}>: {'{'} </span>
          <span className={vr}>page</span>
          <span className={op}>: </span>
          <span className={vr}>pageParam</span> <span className={op}>{'}'}</span> <span className={op}>{'}'}).</span>
          <span className={fn}>json</span>
          <span className={op}>()</span>
          {'\n'}
          <span className={op}>{'}'}</span>
          {'\n\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>useInfinitePosts</span> <span className={op}>=</span> <span className={op}>()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return</span> <span className={fn}>useInfiniteQuery</span>
          <span className={op}>({'{\n'}</span>
          {'    '}
          <span className={cm}>// Co-location 패턴 권장: lists 키에 'infinite' 배열 추가</span>
          {'\n'}
          {'    '}
          <span className={vr}>queryKey</span>
          <span className={op}>: [...</span>
          <span className={vr}>postKeys</span>
          <span className={op}>.</span>
          <span className={fn}>lists</span>
          <span className={op}>(),</span> <span className={st}>'infinite'</span>
          <span className={op}>],</span>
          {'\n'}
          {'    '}
          <span className={vr}>initialPageParam</span>
          <span className={op}>:</span> <span className={vr}>1</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={vr}>queryFn</span>
          <span className={op}>:</span> <span className={fn}>fetchPostsPage</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={vr}>getNextPageParam</span>
          <span className={op}>: (</span>
          <span className={vr}>lastPage</span>
          <span className={op}>,</span> <span className={vr}>allPages</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span>
          {'\n'}
          {'      '}
          <span className={vr}>lastPage</span>
          <span className={op}>.</span>
          <span className={vr}>length</span> <span className={op}>===</span> <span className={vr}>10</span> <span className={op}>?</span> <span className={vr}>allPages</span>
          <span className={op}>.</span>
          <span className={vr}>length</span> <span className={op}>+</span> <span className={vr}>1</span> <span className={op}>:</span> <span className={vr}>undefined</span>
          <span className={op}>,</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'})</span>
          {'\n'}
          <span className={op}>{'}'}</span>
        </VSCodeBlock>
      </section>
    </div>
  )
}
