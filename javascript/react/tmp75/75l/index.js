/// 空文件，請至 common/(native|web) 或 react/(native|web) 來調用
/// declare module 為 75l, 75l-react，要類型檢測請 alias 到對應的模塊名
/// 大概到 v1 後提供中文文檔，模塊會持續更新
/*
TODO
  1. feat: use(Local|Session)Storage 使用 storage listener 監聽緩存變化，並將數據同步至所有 store 裡，並且新增 options(回朔使用者在 storage 更新的數據)
  2. refactor: 將 tmp 的部分 hooks/lib 模塊使用 useCheckInjectReturn 優化性能
  3. fix: useQueryString 路由連結重新進入的話會導致 queryString 被清空
  4. feat: react/native 新增數據獲取緩存鉤子(名稱暫定為 useFetchState)，使用 async-storage 處理
  5. feat: react/web 新增數據獲取緩存鉤子(名稱暫定為 useFetchState)，使用 use(Local|Session)Storage 處理
  6. feat: use-click-outside
  7. feat: use-waterfall
  8. feat: 內外置 hook
 */
