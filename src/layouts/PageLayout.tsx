interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <div className="h-full overflow-auto py-24 px-16">{children}</div>
)

export default PageLayout
