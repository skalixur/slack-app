export default function handleAPIError(error) {
  console.error(error)
  const result = {
    ok: false,
  }
  if (error.response) {
    result.errors = error.response?.data?.errors
  }
  return result
}
