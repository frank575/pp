type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  ...0[]
]

type Next = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  ...10[]
]

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
        : never
    }[keyof T]
    : ''

type Leaves<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
    : ''

type Cons<H, T> = T extends readonly any[] ?
  ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
  : never;

type PathArray<T, D extends number = 5> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: [K] | (Paths<T[K], Prev[D]> extends infer P ?
    P extends [] ? never : Cons<K, P> : never
    ) }[keyof T]
  : [];

type LeaveArray<T, D extends number = 5> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: Cons<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : [];

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

type DeepValue<T extends object, KS extends (string | number)[], KSL extends number = KS['length'], D extends number = 0> = KSL extends 0
  ? undefined
  : KSL extends Next[D]
    ? KS[D] extends keyof T
      ? T[KS[D]]
      : string | number
    : DeepValue<T, KS>

type ValueOf<T> = T[keyof T];

declare module "@jsl" {
  import {Moment} from "moment";



  export function findNestedDynamicObj<T extends object, K extends Join<Paths<T>, ''>, KS extends Split<K, '.'>>(
    obj: T, key: K
  ): DeepValue<T, KS>



  export function stepPrice(price: string | number, step: number): string



  export function generateId(length?: number): string



  type EnumValue = boolean | string | number
  type CreateEnumObject = {
    [key: string]: EnumValue | EnumValue[]
  }
  type EnumValues<T> = ValueOf<{
    [K in keyof T]: T[K]
  }>
  type KeyValueEnumObject<T> = {
    [K in keyof T]: T[K] extends object
      ? T[K] extends any[]
        ? T[K][1]
        : T[K]
      : T[K]
  }
  export function createEnum<T extends CreateEnumObject, T2 extends KeyValueEnumObject<T>>(obj: T): T2 & {
    t: (val: EnumValues<T2>) => EnumValue
    key: (val: EnumValues<T2>) => string
    keys: keyof T2
    map: (callback: (value: EnumValue, key: string, index: number) => void) => void | keyof T2
    reduce: <T>(callback: (previousValue: T, value: EnumValue, key: string, index: number) => void, initialValue: T) => T
  }



  export namespace mtime {
    export function today(): [Moment, Moment]
    export function yesterday(): [Moment, Moment]
    export function thisWeek(): [Moment, Moment]
    export function pastWeek(): [Moment, Moment]
    export function thisMonth(): [Moment, Moment]
    export function pastMonth(): [Moment, Moment]
  }



  export function toSimple(text: string): string
  export function toTraditional(text: string): string
  export function checkSameChinese(text1: string, text2: string): boolean
  export function checkIncludeText(text1: string, keyword: string): boolean



  export function interval(): {
    start: (callback: () => void, delay?: number) => void
    stop: () => void
  }
  export function timeout(): {
    start: (callback: () => void, delay?: number) => void
    startSync: (callback: Promise<void>, delay?: number) => void
    stop: () => void
  }
  export function aniFrame(): {
    start: (callback: () => void) => void
    stop: () => void
  }
}
