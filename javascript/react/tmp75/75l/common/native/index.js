/// <reference path="../../type.d.ts" />
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
import { generateId } from '../common/generateId'
import { findNestedDynamicObj } from '../common/find-nested-dynamic-obj'

export {
	// common
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
	generateId,
	findNestedDynamicObj
}
