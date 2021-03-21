// 缓存过期天数
export const EXPIRES_IN = '7d'
export const SECRET: string = process.env.SECRET || ''

// 加盐加密
export const SALT: number = Number(process.env.SALT) || 3

export const DEFAULT_AVATAR_URL =
  'https://cdn.jellow.site/Fgn1UHf-fRRRYe22hJPVy03hPzYJ.jpeg?imageMogr2/auto-orient/heic-exif/1/format/jpeg/thumbnail/1000x1000%3E'

export const INTERACT = {}

export const INTERACT_MAP = {}

export const ICON_POPOVER_DATA = {
  valueCount: { src: '/value-icon.svg', count: 0, text: '有价值' },
  againstCount: { src: '/against.svg', count: 0, text: '反对' },
  interestCount: { src: '/interesting-icon.svg', count: 0, text: '神脑洞' },
  hateCount: { src: '/not-friendly.svg', count: 0, text: '不友好' },
  thinkCount: { src: '/thank-icon.svg', count: 0, text: '感谢' },
}

export const getInteract: any = (data) => {
  return Object.entries(data)
    .filter(([key, value]) => key.indexOf('Count') > -1 && value > 0)
    .map(([key, value]) => {
      return {
        src: ICON_POPOVER_DATA[key].src,
        count: value,
      }
    })
}

export const CODE = {
  SUCCESS: 1000,
  TOKEN_ERROR: 4001,
  PASSWORD_FAIL_ERROR: 4002,
  USER_NOT_EXIT_ERROR: 4003,
}
