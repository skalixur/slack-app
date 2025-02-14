import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export function getTimestamp(relativeTime) {
  let result = ''
  const relative = dayjs(new Date(relativeTime))
  const now = dayjs()
  const tomorrow = now.add(1, 'day')
  const yesterday = now.subtract(1, 'day')

  if (relative.isSame(now, 'day')) {
    result += 'Today at '
  } else if (relative.isSame(yesterday, 'day')) {
    result += 'Yesterday at '
  } else {
    result += relative.format('L ')
  }

  result += relative.format('LT')
  return result
}
