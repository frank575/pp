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
