using Microsoft.AspNetCore.Mvc;

namespace LanzhouBeefNoodles.controllers;

// 自定義自定義路由
[Route("admin/[controller]/[action]")]
public class UserController : Controller
{
    // 訪問 admin/user/index
    public IList<string> Index()
    {
        return new List<string>(){ "張三", "李四" };
    }
}