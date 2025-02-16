import { TypographyH1 } from './ui/typography'

function AccountForm({ children }) {
  return (
    <main className='max-w-full min-h-[100vh] grid place-items-center'>
      {children}
    </main>
  )
}

export function AccountFormCard({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className='text-center bg-card shadow-xl flex flex-col gap-5 p-8 w-full h-full justify-center items-center sm:border rounded-2xl sm:max-w-lg sm:max-h-4/5'
    >
      {children}
    </form>
  )
}

export function AccountFormInputContainer({ children }) {
  return (
    <div className='text-left flex flex-col gap-3 min-w-full'>{children}</div>
  )
}

export function AccountFormHeading({ children }) {
  return <TypographyH1 className='text-center'>{children}</TypographyH1>
}

export default AccountForm
