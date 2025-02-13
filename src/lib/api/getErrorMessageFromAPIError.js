export default function getErrorMessageFromAPIError(apiResponse) {
  const separator = ',\n'
  let message = 'Something went wrong!'
  if (!apiResponse.ok) {
    if (apiResponse.errors.full_messages) {
      message = apiResponse.errors.full_messages.join(separator)
    }
    if (apiResponse.errors && !apiResponse.errors.full_messages) {
      message = apiResponse.errors.join(separator)
    }
  }
  return message
}
