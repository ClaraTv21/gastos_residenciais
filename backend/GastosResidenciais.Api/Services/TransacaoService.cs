using GastosResidenciais.Api.Data;
using GastosResidenciais.Api.DTOs;
using GastosResidenciais.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.Services;

/// <summary>
/// Exceção específica para violações de regra de negócio,
/// permitindo diferenciar erro de validação de erro inesperado no controller.
/// </summary>
public class RegraNegocioException : Exception
{
    public RegraNegocioException(string message) : base(message) { }
}

public class TransacaoService
{
    private readonly AppDbContext _context;

    public TransacaoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Transacao> CriarAsync(CriarTransacaoDto dto)
    {
        // Regra: "esse valor [pessoa] precisa existir no cadastro de pessoa"
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId)
            ?? throw new RegraNegocioException("Pessoa informada não existe.");

        // Regra: "caso a pessoa informada seja menor de idade (menor de 18 anos),
        // apenas despesas poderão ser cadastradas"
        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
        {
            throw new RegraNegocioException(
                "Pessoas menores de 18 anos só podem cadastrar despesas.");
        }

        if (dto.Valor <= 0)
        {
            throw new RegraNegocioException("O valor da transação deve ser maior que zero.");
        }

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();
        return transacao;
    }

    public async Task<List<Transacao>> ListarAsync()
    {
        return await _context.Transacoes.Include(t => t.Pessoa).ToListAsync();
    }
}