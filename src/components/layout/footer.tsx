export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-white px-6 py-4 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {currentYear} My Company Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            이용약관
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  )
}
