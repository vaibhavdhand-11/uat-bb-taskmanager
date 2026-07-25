/** UnifyApps brand logo mark + wordmark. */
function UnifyAppsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#4B35C8" />
        <path
          d="M11 9v7.2a5 5 0 0 0 10 0V9"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="16" cy="22.5" r="1.6" fill="#A78BFA" />
      </svg>
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
        Unify<span className="text-[#4B35C8]">Apps</span>
      </span>
    </div>
  )
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
        <a href="/" aria-label="UnifyApps home" className="flex items-center">
          <UnifyAppsLogo />
        </a>
      </div>
    </header>
  )
}
