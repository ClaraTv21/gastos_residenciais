namespace GastosResidenciais.Api.Models;

/// <summary>
/// Tipo da transação: só existem duas opções possíveis pelo enunciado.
/// Usar enum evita erros de digitação e valores inválidos (ex: "despes").
/// </summary>
public enum TipoTransacao
{
    Receita,
    Despesa
}

/// <summary>
/// Representa uma transação financeira vinculada a uma pessoa.
/// </summary>
public class Transacao
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}