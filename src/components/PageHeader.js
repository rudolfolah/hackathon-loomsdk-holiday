import "./PageHeader.css";

export function PageHeader({ children }) {
  return (
    <header className={"PageHeader--header"}>
      {children}
    </header>
  )
}
