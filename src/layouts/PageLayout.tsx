interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="h-full overflow-auto px-16 py-24">{children}</div>
)

export default PageLayout
