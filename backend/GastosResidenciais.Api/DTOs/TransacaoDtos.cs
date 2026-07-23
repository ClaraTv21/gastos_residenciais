using GastosResidenciais.Api.Models;

namespace GastosResidenciais.Api.DTOs;

public record CriarTransacaoDto(string Descricao, decimal Valor, TipoTransacao Tipo, int PessoaId);

public record TransacaoResumoDto(int Id, string Descricao, decimal Valor, TipoTransacao Tipo, int PessoaId);