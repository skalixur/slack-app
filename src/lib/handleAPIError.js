export default function handleAPIError(error) {
  console.log(error)
  const result = {
    ok: false,
  }
  if (error.response) {
    result.errors = error.response?.data?.errors
  }
  if (error.data) {
    result.errors = error?.data?.errors
  }
  return result
}
