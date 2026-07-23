namespace GastosResidenciais.Api.DTOs;

public record TotalPessoaDto(int PessoaId, string Nome, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo);

public record TotaisGeraisDto(List<TotalPessoaDto> Pessoas, decimal TotalReceitasGeral, decimal TotalDespesasGeral, decimal SaldoGeral);