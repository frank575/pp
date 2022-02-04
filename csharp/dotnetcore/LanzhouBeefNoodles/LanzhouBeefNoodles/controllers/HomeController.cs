using Microsoft.AspNetCore.Mvc;

namespace LanzhouBeefNoodles.controllers;

// .net 路由組成格式
// 網域/{controller}/{action}/{value}

// 使用 [Route()] 來定義特徵路由
// 此為定義 controller
// [Route("Home")]
// public class HomeController : Controller
// {
//     // 此為 action
//     [Route("Index")]
//     // 訪問 home/index
//     public string Index()
//     {
//         return "hello from home";
//     }
//
//     [Route("AboutUs")]
//     // 訪問 home/aboutus
//     public string About()
//     {
//         return "hello from about";
//     }
// }


// 也可以使用 [controller], [action] 的方式通過類名及方法名來訪問api
// [Route("[controller]")]
// public class HomeController : Controller
// {
//     [Route("[action]")]
//     // 訪問 home/index
//     public string Index()
//     {
//         return "hello from home";
//     }
//
//     [Route("[action]")]
//     // 訪問 home/about
//     public string About()
//     {
//         return "hello from about";
//     }
// }


// 同以上
[Route("[controller]/[action]")]
public class HomeController : Controller
{
    // 訪問 home/index
    public string Index()
    {
        return "hello from home";
    }

    // 訪問 home/about
    public string About()
    {
        return "hello from about";
    }
}