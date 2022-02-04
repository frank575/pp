var builder = WebApplication.CreateBuilder(args);

// 綁定 controllers
builder.Services.AddControllers();
var app = builder.Build();

// 傳統路由
// app.MapDefaultControllerRoute();

// 特徵路由 Attributes routes
app.MapControllers();

// app.MapGet("/", () => "Hello World!");
// app.MapGet("/test", () => "Hello from test!");

app.Run();