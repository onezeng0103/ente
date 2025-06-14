import { computed, ref } from 'vue'
import dayjs from 'dayjs'

// 时间间隔（秒），这里设置为30秒，可根据需求修改
export const currentTimeSpace = ref({})
export const intervalSeconds = computed(() => currentTimeSpace.value.period)
// 创建响应式变量存储时间范围倒计时字符串
export const timeRangeCountdown = ref('')

function getNearestIntervalMultiple(number) {
  const interval = intervalSeconds.value / 60
  // 计算最接近且小于number的interval的倍数
  return Math.floor(number / interval) * interval
}

export const updateTimeRangeCountdown = () => {
  const now = dayjs()
  const currentMinute = getNearestIntervalMultiple(now.minute())
  let currentSecond = now.second()
  // 计算当前时间所在的起始秒数区间，以30秒为间隔
  const startSecond = Math.floor(currentSecond / intervalSeconds.value) * intervalSeconds.value
  const endSecond = startSecond + intervalSeconds.value
  // 确定起始时间对应的分钟数和秒数
  const startMinute = currentMinute
  const startSecondsInMinute = startSecond % 60
  // 确定结束时间对应的分钟数和秒数，正确处理跨越分钟边界及分钟进位情况
  const endMinute = Math.floor((startSecond + intervalSeconds.value) / 60) + currentMinute
  const endSecondsInMinute = (startSecond + intervalSeconds.value) % 60
  // 格式化倒计时的分钟和秒部分
  const formatTime = (minute, secondsInMinute) => {
    const minutes = minute.toString().padStart(2, '0')
    const seconds = secondsInMinute.toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const startFormatted = formatTime(startMinute, startSecondsInMinute)
  const endFormatted = formatTime(endMinute, endSecondsInMinute)
  // 计算剩余时间，并转换为分钟和秒的格式
  let remainingSeconds = endSecond - currentSecond
  remainingSeconds =
    remainingSeconds > intervalSeconds.value ? intervalSeconds.value : remainingSeconds
  remainingSeconds = remainingSeconds < 0 ? 0 : remainingSeconds
  const remainingMinutes = Math.floor(remainingSeconds / 60)
  const remainingSecondsInMinute = remainingSeconds % 60
  const remainingFormatted = `${remainingMinutes
    .toString()
    .padStart(2, '0')}:${remainingSecondsInMinute.toString().padStart(2, '0')}`
  timeRangeCountdown.value = `${startFormatted}-${endFormatted} / ${remainingFormatted}`
}
