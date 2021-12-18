/// <reference path="../../type.d.ts" />
import { createEnum } from '../common/create-enum'
import { declareEnum } from '../common/declare-enum'
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
import { generateId } from '../common/generateId'
import { mergeWords } from '../common/merge-words'
import { findNestedDynamicObj } from '../common/find-nested-dynamic-obj'
import { createClassName } from './create-class-name'
import { copyText } from './copy-text'
import { checkMobile } from './check-mobile'
import { downloadBlob } from './download-blob'
import { insertBefore } from './insert-before'
import { insertAfter } from './insert-after'

export {
	createClassName,
	copyText,
	checkMobile,
	downloadBlob,
	insertBefore,
	insertAfter,
	// common
	createEnum,
	declareEnum,
	stepPrice,
	toSimple,
	toTraditional,
	checkSameChinese,
	checkIncludeText,
	mtime,
	timeout,
	interval,
	aniFrame,
	generateId,
	mergeWords,
	findNestedDynamicObj,
}
