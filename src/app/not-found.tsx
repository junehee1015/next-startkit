import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-zinc-950">
      <FileQuestion className="mx-auto h-16 w-16 text-zinc-400 dark:text-zinc-600" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">요청하신 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없는 상태입니다.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild variant="default">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
