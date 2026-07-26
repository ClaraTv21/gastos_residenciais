using GastosResidenciais.Api.Data;
using GastosResidenciais.Api.DTOs;
using GastosResidenciais.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<TotaisGeraisDto>> Obter()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var totaisPorPessoa = pessoas.Select(p =>
        {
            var receitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);
            var despesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new TotalPessoaDto(p.Id, p.Nome, receitas, despesas, receitas - despesas);
        }).ToList();

        var totalReceitasGeral = totaisPorPessoa.Sum(t => t.TotalReceitas);
        var totalDespesasGeral = totaisPorPessoa.Sum(t => t.TotalDespesas);

        var resultado = new TotaisGeraisDto(
            totaisPorPessoa,
            totalReceitasGeral,
            totalDespesasGeral,
            totalReceitasGeral - totalDespesasGeral
        );

        return Ok(resultado);
    }
}