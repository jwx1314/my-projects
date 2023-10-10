import { dayjs } from 'element-plus'

export const timeFormat = (time) => {
  return dayjs(time).format('YYYY年MM月DD日')
}
