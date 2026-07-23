using GastosResidenciais.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Conexão com SQLite — arquivo físico "gastos.db" garante persistência entre execuções
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gastos.db"));

// CORS liberado para o front local (ajuste a porta do seu React se necessário)
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Aplica migrations automaticamente ao iniciar (garante que o banco sempre exista e esteja atualizado)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

builder.Services.AddScoped<TransacaoService>();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("FrontendPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();