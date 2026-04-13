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
          본 스타트킷은 <strong>관심사의 분리(Separation of Concerns)</strong>와 <strong>Next.js 캐싱 전략</strong>을 극대화한 아키텍처를 따릅니다.
          <br />
          통신(Server Action), 비즈니스 로직(Custom Hook), 렌더링(UI Component)을 완벽하게 분리하여 유지보수성과 재사용성을 높입니다.
        </p>
      </div>

      {/* --- STEP 1 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 1</span>
          <h3 className="text-xl font-bold text-gray-800">서버 통신 & 캐싱 전략 (Server Actions)</h3>
        </div>
        <p className="text-sm text-gray-600">조회(GET) 시 캐시 태그를 부여하여 성능을 최적화하고, 변경(POST) 직후 해당 태그를 무효화(Revalidate)하여 최신 데이터를 보장합니다. 캐시 키는 도메인 폴더 내부에 코로케이션합니다.</p>
        <VSCodeBlock title="src/features/post/api/actions.ts">
          <span className={st}>'use server'</span>
          {'\n\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>actionClient</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/safe-action'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>serverApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/api/server'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>revalidateTag</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'next/cache'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={vr}>z</span> <span className={kw}>from</span> <span className={st}>'zod'</span>
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
          <span className={cm}>// [GET] 게시글 목록 조회</span>
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
          {'\n\n'}
          <span className={cm}>// [POST] 새 게시글 작성 및 캐시 무효화</span>
          {'\n'}
          <span className={bl}>const</span> <span className={vr}>createPostSchema</span> <span className={op}>=</span> <span className={vr}>z</span>
          <span className={op}>.</span>
          <span className={fn}>object</span>
          <span className={op}>({'{'} </span>
          <span className={vr}>title</span>
          <span className={op}>:</span> <span className={vr}>z</span>
          <span className={op}>.</span>
          <span className={fn}>string</span>
          <span className={op}>(),</span> <span className={vr}>content</span>
          <span className={op}>:</span> <span className={vr}>z</span>
          <span className={op}>.</span>
          <span className={fn}>string</span>
          <span className={op}>()</span>
          <span className={op}> {'}'})</span>
          {'\n\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={vr}>createPostAction</span> <span className={op}>=</span> <span className={vr}>actionClient</span>
          {'\n'}
          {'  '}
          <span className={op}>.</span>
          <span className={fn}>schema</span>
          <span className={op}>(</span>
          <span className={vr}>createPostSchema</span>
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
          <span className={bl}>const</span> <span className={vr}>response</span> <span className={op}>=</span> <span className={kw}>await</span> <span className={vr}>serverApi</span>
          <span className={op}>.</span>
          <span className={fn}>post</span>
          <span className={op}>&lt;</span>
          <span className={ty}>Post</span>
          <span className={op}>&gt;(</span>
          <span className={st}>'posts'</span>
          <span className={op}>, {'{'}</span>
          {'\n'}
          {'      '}
          <span className={vr}>json</span>
          <span className={op}>:</span> <span className={vr}>parsedInput</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'})</span>
          {'\n\n'}
          {'    '}
          <span className={fn}>revalidateTag</span>
          <span className={op}>(</span>
          <span className={vr}>postsKeys</span>
          <span className={op}>.</span>
          <span className={vr}>list</span>
          <span className={op}>)</span>
          {'\n\n'}
          {'    '}
          <span className={kw}>return</span> <span className={op}>{'{'} </span>
          <span className={vr}>post</span>
          <span className={op}>:</span> <span className={vr}>response</span>
          <span className={op}> {'}'}</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'})</span>
        </VSCodeBlock>
      </section>

      {/* --- STEP 2 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-teal-100 px-2 py-1 text-sm font-bold text-teal-700">STEP 2</span>
          <h3 className="text-xl font-bold text-gray-800">비즈니스 로직 (Custom Hook)</h3>
        </div>
        <p className="text-sm text-gray-600">
          훅은 공통 처리만 전담합니다. 라우팅 이동처럼 <strong>상황마다 달라지는 UI 흐름은 컴포넌트가 콜백(Callback)으로 전달</strong>하여 훅의 재사용성을 극대화합니다.
        </p>
        <VSCodeBlock title="src/features/post/model/hooks/use-post.ts">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useAction</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'next-safe-action/hooks'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>toast</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'sonner'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>createPostAction</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../api/actions'</span>
          {'\n\n'}
          <span className={kw}>interface</span> <span className={ty}>UseCreatePostProps</span> <span className={op}>{'{'}</span>
          {'\n'}
          {'  '}
          <span className={fn}>onSuccessCallback</span>
          <span className={op}>?: (</span>
          <span className={vr}>data</span>
          <span className={op}>:</span> <span className={ty}>any</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={ty}>void</span>
          {'\n'}
          <span className={op}>{'}'}</span>
          {'\n\n'}
          <span className={cm}>// 콜백(onSuccessCallback)을 옵션으로 받아 제어권을 위임합니다.</span>
          {'\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>useCreatePost</span> <span className={op}>=</span> <span className={op}>({'{'} </span>
          <span className={vr}>onSuccessCallback</span>
          <span className={op}> {'}: '}</span>
          <span className={ty}>UseCreatePostProps</span> <span className={op}>= {'{}'})</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return</span> <span className={fn}>useAction</span>
          <span className={op}>(</span>
          <span className={vr}>createPostAction</span>
          <span className={op}>, {'{\n'}</span>
          {'    '}
          <span className={fn}>onSuccess</span>
          <span className={op}>: ({'{'} </span>
          <span className={vr}>data</span>
          <span className={op}> {'}'})</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'      '}
          <span className={cm}>// 공통 처리: 상태 변경, 토스트 등은 훅에서</span>
          {'\n'}
          {'      '}
          <span className={vr}>toast</span>
          <span className={op}>.</span>
          <span className={fn}>success</span>
          <span className={op}>(</span>
          <span className={st}>'게시글이 성공적으로 등록되었습니다!'</span>
          <span className={op}>)</span>
          {'\n\n'}
          {'      '}
          <span className={cm}>// 개별 제어: 라우팅, 모달 닫기 등은 컴포넌트에게 위임</span>
          {'\n'}
          {'      '}
          <span className={kw}>if</span> <span className={op}>(</span>
          <span className={fn}>onSuccessCallback</span>
          <span className={op}>)</span> <span className={fn}>onSuccessCallback</span>
          <span className={op}>(</span>
          <span className={vr}>data</span>
          <span className={op}>)</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'},</span>
          {'\n'}
          {'    '}
          <span className={fn}>onError</span>
          <span className={op}>: ({'{'} </span>
          <span className={vr}>error</span>
          <span className={op}> {'}'})</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'      '}
          <span className={vr}>toast</span>
          <span className={op}>.</span>
          <span className={fn}>error</span>
          <span className={op}>(</span>
          <span className={st}>'작성 실패: '</span> <span className={op}>+</span> <span className={vr}>error</span>
          <span className={op}>.</span>
          <span className={vr}>serverError</span>
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

      {/* --- STEP 3 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-sky-100 px-2 py-1 text-sm font-bold text-sky-700">STEP 3</span>
          <h3 className="text-xl font-bold text-gray-800">UI 렌더링 및 콜백 주입 (Components)</h3>
        </div>
        <p className="text-sm text-gray-600">
          GET(조회)은 <strong>서버 컴포넌트</strong>가 SEO 최적화를 담당하고, POST(수정/작성) 폼은 <strong>클라이언트 컴포넌트</strong>가 라우팅 콜백을 훅에 주입하여 통제합니다. <br />
          화면이 멈추지 않도록{' '}
          <strong>
            API 조회를 자식 서버 컴포넌트로 분리하고 <code>&lt;Suspense&gt;</code>를 활용
          </strong>
          합니다. POST 폼은 클라이언트 컴포넌트로 분리하여 상호작용을 담당합니다.
        </p>
        <p className="text-sm text-gray-600"></p>
        {/* 1. Page Component (Shell) */}
        <VSCodeBlock title="src/app/post/page.tsx (Server Component)">
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
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'../api/actions'</span>
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
          <span className={bl}>const</span> <span className={op}>{'{'} </span>
          <span className={vr}>execute</span>
          <span className={op}>,</span> <span className={vr}>isExecuting</span>
          <span className={op}> {'}'}</span> <span className={op}>=</span> <span className={fn}>useCreatePost</span>
          <span className={op}>({'{\n'}</span>
          {'    '}
          <span className={fn}>onSuccessCallback</span>
          <span className={op}>: (</span>
          <span className={vr}>data</span>
          <span className={op}>)</span> <span className={bl}>=&gt;</span> <span className={vr}>router</span>
          <span className={op}>.</span>
          <span className={fn}>push</span>
          <span className={op}>(</span>
          <span className={st}>{'`'}/post/</span>
          <span className={bl}>$</span>
          <span className={op}>{'{'}</span>
          <span className={vr}>data</span>
          <span className={op}>?.</span>
          <span className={vr}>post</span>
          <span className={op}>?.</span>
          <span className={vr}>id</span>
          <span className={op}>{'}'}</span>
          <span className={st}>{'`'}</span>
          <span className={op}>)</span>
          {'\n'}
          {'  '}
          <span className={op}>{'}'})</span>
          {'\n\n'}
          {'  '}
          <span className={kw}>return</span> <span className={op}>({' \n'}</span>
          {'    '}
          <span className={op}>&lt;</span>
          <span className={bl}>button</span>
          {'\n'}
          {'      '}
          <span className={vr}>onClick</span>
          <span className={op}>={'{'}()</span> <span className={bl}>=&gt;</span> <span className={fn}>execute</span>
          <span className={op}>({'{'} </span>
          <span className={vr}>title</span>
          <span className={op}>:</span> <span className={st}>'새 글'</span>
          <span className={op}>,</span> <span className={vr}>content</span>
          <span className={op}>:</span> <span className={st}>'내용입니다'</span>{' '}
          <span className={op}>
            {'}'}){'}'}
          </span>
          {'\n'}
          {'      '}
          <span className={vr}>disabled</span>
          <span className={op}>={'{'}</span>
          <span className={vr}>isExecuting</span>
          <span className={op}>{'}'}</span>
          {'\n'}
          {'    '}
          <span className={op}>&gt;</span>
          {'\n'}
          {'      '}
          <span className={op}>{'{'}</span>
          <span className={vr}>isExecuting</span> <span className={op}>?</span> <span className={st}>'게시 중...'</span> <span className={op}>:</span> <span className={st}>'게시글 작성'</span>
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

      {/* --- STEP 4 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-rose-100 px-2 py-1 text-sm font-bold text-rose-700">STEP 4</span>
          <h3 className="text-xl font-bold text-gray-800">예외 케이스 (TanStack Query 기반 무한 스크롤)</h3>
        </div>
        <p className="text-sm text-gray-600">
          단순 페이지네이션(1, 2, 3...)은 URL 변경을 통해 서버 컴포넌트(STEP 3)로 구현하지만, <strong>'더보기 버튼'이나 '무한 스크롤'</strong>처럼 기존 리스트 밑에 동적으로 데이터를 이어 붙여야 할 때만 예외적으로 <code>clientApi</code>와 <code>TanStack Query</code>를 사용합니다.
        </p>
        <VSCodeBlock title="src/features/post/model/hooks/use-infinite-posts.ts">
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>useInfiniteQuery</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@tanstack/react-query'</span>
          {'\n'}
          <span className={kw}>import</span> <span className={op}>{'{'} </span>
          <span className={vr}>clientApi</span>
          <span className={op}> {'}'}</span> <span className={kw}>from</span> <span className={st}>'@/lib/api/client'</span>
          {'\n\n'}
          <span className={kw}>export</span> <span className={bl}>const</span> <span className={fn}>useInfinitePosts</span> <span className={op}>=</span> <span className={op}>()</span> <span className={bl}>=&gt;</span> <span className={op}>{'{\n'}</span>
          {'  '}
          <span className={kw}>return</span> <span className={fn}>useInfiniteQuery</span>
          <span className={op}>({'{\n'}</span>
          {'    '}
          <span className={vr}>queryKey</span>
          <span className={op}>: [</span>
          <span className={st}>'posts'</span>
          <span className={op}>,</span> <span className={st}>'infinite'</span>
          <span className={op}>],</span>
          {'\n'}
          {'    '}
          <span className={vr}>initialPageParam</span>
          <span className={op}>:</span> <span className={vr}>1</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={vr}>queryFn</span>
          <span className={op}>: ({'{'} </span>
          <span className={vr}>pageParam</span>
          <span className={op}> {'}'})</span> <span className={bl}>=&gt;</span> <span className={vr}>clientApi</span>
          <span className={op}>.</span>
          <span className={fn}>get</span>
          <span className={op}>(</span>
          <span className={st}>'posts'</span>
          <span className={op}>, {'{'}</span>
          {'\n'}
          {'      '}
          <span className={vr}>searchParams</span>
          <span className={op}>: {'{'}</span> <span className={vr}>page: pageParam</span> <span className={op}>{'}'},</span>
          {'\n'}
          {'      '}
          <span className={vr}>cache</span>
          <span className={op}>:</span>
          <span className={st}>'no-store'</span>
          <span className={op}>,</span>
          {'\n'}
          {'    '}
          <span className={op}>{'}'}</span>
          <span className={op}>).</span>
          <span className={fn}>json</span>
          <span className={op}>&lt;</span>
          <span className={ty}>Post</span>
          <span className={op}>[]&gt;(),</span>
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
