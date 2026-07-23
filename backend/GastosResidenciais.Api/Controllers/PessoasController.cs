using GastosResidenciais.Api.Data;
using GastosResidenciais.Api.DTOs;
using GastosResidenciais.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoasController(AppDbContext context) => _context = context;

    // POST /api/pessoas — criação
    [HttpPost]
    public async Task<ActionResult<PessoaResumoDto>> Criar(CriarPessoaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome))
            return BadRequest("Nome é obrigatório.");
        if (dto.Idade < 0)
            return BadRequest("Idade inválida.");

        var pessoa = new Pessoa { Nome = dto.Nome, Idade = dto.Idade };
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Listar), new { id = pessoa.Id },
            new PessoaResumoDto(pessoa.Id, pessoa.Nome, pessoa.Idade));
    }

    // GET /api/pessoas — listagem
    [HttpGet]
    public async Task<ActionResult<List<PessoaResumoDto>>> Listar()
    {
        var pessoas = await _context.Pessoas
            .Select(p => new PessoaResumoDto(p.Id, p.Nome, p.Idade))
            .ToListAsync();
        return Ok(pessoas);
    }

    // DELETE /api/pessoas/5 — deleção (com cascade automático via EF Core)
    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa is null) return NotFound();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync(); // dispara o cascade delete configurado no DbContext
        return NoContent();
    }
}