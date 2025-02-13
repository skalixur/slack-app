import { CircleAlert } from "lucide-react"

function WarningAlert({ children }) {
  return (
    <span className='flex items-center gap-2 text-destructive stroke-destructive'>
      <CircleAlert />{children}
    </span>
  )
}

export default WarningAlert
