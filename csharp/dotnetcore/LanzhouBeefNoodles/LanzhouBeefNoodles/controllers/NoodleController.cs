using Microsoft.AspNetCore.Mvc;

namespace LanzhouBeefNoodles.controllers;

public class NoodleController : Controller
{
    // GET
    public IList<string> Index()
    {
        return new List<string>(){"牛肉麵", "雞蛋麵"};
    }
}