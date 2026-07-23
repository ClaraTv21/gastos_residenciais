namespace GastosResidenciais.Api.Models;

/// <summary>
/// Representa uma pessoa cadastrada no sistema.
/// Atende ao requisito: "Identificador único, Nome, Idade".
/// </summary>
public class Pessoa
{
    public int Id { get; set; } // gerado automaticamente pelo banco (auto-increment)
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }

    /// <summary>
    /// Navegação para as transações da pessoa.
    /// Usada pelo EF Core para aplicar o delete em cascata
    /// quando a pessoa é removida (regra: "ao deletar pessoa, apagar transações").
    /// </summary>
    public List<Transacao> Transacoes { get; set; } = new();
}