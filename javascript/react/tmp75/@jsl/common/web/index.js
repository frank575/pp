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
import { copyText } from './copy-text'
import { checkMobile } from './check-mobile'
import { downloadBlob } from './download-blob'
import { insertBefore } from './insert-before'
import { insertAfter } from './insert-after'

export {
	copyText,
	checkMobile,
	downloadBlob,
	insertBefore,
	insertAfter,
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
