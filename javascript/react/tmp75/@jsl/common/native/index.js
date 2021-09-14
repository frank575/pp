import { createClassName } from '../utils/create-class-name'
import { createEnum } from '../utils/create-enum'
import { stepPrice } from '../utils/step-price'
import {
  toSimple,
  toTraditional,
  checkSameChinese,
  checkIncludeText,
} from '../utils/cn-translate'
import mtime from '../utils/mtime'
import { timeout } from '../utils/timer/timeout'
import { interval } from '../utils/timer/interval'
import { aniFrame } from '../utils/timer/ani-frame'

export {
  // utils
  createClassName,
  createEnum,
  stepPrice,
  toSimple,
  toTraditional,
  checkSameChinese,
  checkIncludeText,
  mtime,
  timeout,
  interval,
  aniFrame,
}
