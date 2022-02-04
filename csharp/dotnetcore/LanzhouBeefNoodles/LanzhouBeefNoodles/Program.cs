var builder = WebApplication.CreateBuilder(args);

// 綁定 controllers
builder.Services.AddControllers();
var app = builder.Build();

// 傳統路由
// app.MapDefaultControllerRoute();

// 特徵路由 Attributes routes
// app.MapControllers();

// 自定義路由
app.MapControllerRoute("default", "{controller=home}/{action=index}/{id?}");

// app.MapGet("/", () => "Hello World!");
// app.MapGet("/test", () => "Hello from test!");

app.Run();