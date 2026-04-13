import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GuideApi } from '@/features/guide/ui/guide-api'

export const metadata: Metadata = {
  title: '사용자 가이드 | Next Startkit',
  description: 'Next-Startkit의 핵심 기능과 개발 규칙을 확인하는 공간입니다.',
}

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">사용자 가이드</h1>
        <p className="mt-2 text-gray-600">Next-Startkit의 핵심 기능과 개발 규칙을 확인하는 공간입니다.</p>
      </div>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="api">API & 인증 아키텍처</TabsTrigger>
          <TabsTrigger value="common">공통 컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <div className="py-6">
            <GuideApi />
          </div>
        </TabsContent>

        <TabsContent value="common">
          <div className="py-6">{/* <GuideCommon /> */}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
