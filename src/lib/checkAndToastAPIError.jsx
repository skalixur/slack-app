import { toast } from 'sonner'
import WarningAlert from '../components/WarningAlert'

export default function checkAndToastAPIError(response) {
  if (!response.ok) {
    const errorMessage = getErrorMessageFromAPIError(response)
    toast(<WarningAlert>{errorMessage}</WarningAlert>)
    return false
  }
  return true
}

export function getErrorMessageFromAPIError(apiResponse) {
  const separator = ',\n'
  let message = 'Something went wrong!'
  if (!apiResponse.ok) {
    if (apiResponse.errors.full_messages) {
      message = apiResponse.errors.full_messages.join(separator)
    }
    if (apiResponse.errors && !apiResponse.errors.full_messages) {
      message = apiResponse.errors.join(separator)
    }
  } else {
    console.error(apiResponse)
  }
  return message
}
