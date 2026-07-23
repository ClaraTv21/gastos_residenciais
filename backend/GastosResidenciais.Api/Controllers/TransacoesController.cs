using GastosResidenciais.Api.DTOs;
using GastosResidenciais.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service;

    public TransacoesController(TransacaoService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Criar(CriarTransacaoDto dto)
    {
        try
        {
            var transacao = await _service.CriarAsync(dto);
            return Created(string.Empty, new TransacaoResumoDto(
                transacao.Id, transacao.Descricao, transacao.Valor, transacao.Tipo, transacao.PessoaId));
        }
        catch (RegraNegocioException ex)
        {
            // Erro de regra de negócio → 400 com mensagem clara para o front exibir
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var transacoes = await _service.ListarAsync();
        var dtos = transacoes.Select(t =>
            new TransacaoResumoDto(t.Id, t.Descricao, t.Valor, t.Tipo, t.PessoaId));
        return Ok(dtos);
    }
}