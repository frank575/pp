export type ISimpleTree = {
  el: string,
  children: ISimpleTree[]
}
export const createSimpleTree = (): ISimpleTree => ({
  el: 'a',
  children: [
    {
      el: 'b',
      children: [
        {
          el: 'd',
          children: [],
        },
        {
          el: 'e',
          children: [],
        },
      ],
    },
    {
      el: 'c',
      children: [
        {
          el: 'f',
          children: [],
        },
        {
          el: 'g',
          children: [],
        },
      ],
    },
  ],
})
export type ISimpleBinaryTree = {
  el: number
  right: ISimpleBinaryTree | null
  left: ISimpleBinaryTree | null
}
export const createSimpleBinaryTree = (): ISimpleBinaryTree => ({
  el: 1,
  left: {
    el: 2,
    left: {
      el: 3,
      left: null,
      right: null
    },
    right: {
      el: 4,
      left: {
        el: 5,
        left: null,
        right: null,
      },
      right: null,
    },
  },
  right: {
    el: 6,
    left: null,
    right: {
      el: 7,
      left: null,
      right: null,
    }
  }
})
