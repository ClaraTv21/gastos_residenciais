using Microsoft.EntityFrameworkCore;
using GastosResidenciais.Api.Models;

namespace GastosResidenciais.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configura o relacionamento 1:N entre Pessoa e Transacao.
        // DeleteBehavior.Cascade implementa exatamente a regra:
        // "ao deletar uma pessoa, todas as transações dela devem ser apagadas".
        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);

        // Armazena o enum como texto no banco (mais legível que número puro)
        modelBuilder.Entity<Transacao>()
            .Property(t => t.Tipo)
            .HasConversion<string>();
    }
}