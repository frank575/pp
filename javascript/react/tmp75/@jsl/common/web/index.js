import { createClassName } from './create-class-name'
import { createEnum } from '../common/create-enum'
import { stepPrice } from '../common/step-price'
import {
	toSimple,
	toTraditional,
	checkSameChinese,
	checkIncludeText,
} from '../common/cn-translate'
import mtime from '../common/mtime'
import { timeout } from '../common/timer/timeout'
import { interval } from '../common/timer/interval'
import { aniFrame } from '../common/timer/ani-frame'
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
	// common
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
