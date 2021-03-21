import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // load on demand
import relativeTime from 'dayjs/plugin/relativeTime' // load on demand

dayjs.locale('zh-cn') // use Spanish locale globally
dayjs.extend(relativeTime)

/**
 * 获取相对于当前时间的表现形式
 */
export function timeFromNow(time) {
  const format = 'YYYY-MM-DD HH:mm:ss'
  const formatDate = 'YYYY-MM-DD'
  const formatTime = 'HH:mm:ss'
  let timeStr = dayjs(time).format(format)
  if (dayjs(time).format(formatDate) === dayjs().format(formatDate)) {
    const fromNowStr = dayjs(time).fromNow(true)
    if (fromNowStr.indexOf('小时') > 0 && parseInt(fromNowStr) > 5) {
      timeStr = '今天 '
      // + dayjs(time).format(formatTime)
    } else {
      timeStr = fromNowStr + '前'
    }
  }
  return timeStr
}
