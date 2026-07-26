import { useEffect, useState } from "react";
import { transacaoService } from "../services/transacaoService";
import { pessoaService } from "../services/pessoaService";
import type { Transacao, Pessoa } from "../types";

/**
 * Componente responsável por listar todas as transações cadastradas.
 * Atende ao requisito do enunciado: "cadastro de transações deve
 * conter as funcionalidades básicas de criação e LISTAGEM".
 *
 * reloadKey é usado para recarregar a lista sempre que uma nova
 * transação é criada em outro componente (mesmo padrão usado no Totais).
 */
export function ListaTransacoes({ reloadKey }: { reloadKey: number }) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    // Carrega transações e pessoas juntas, pois a transação só guarda o
    // pessoaId — precisamos das pessoas para exibir o nome na tabela.
    async function carregar() {
      const [transacoesData, pessoasData] = await Promise.all([
        transacaoService.listar(),
        pessoaService.listar(),
      ]);
      setTransacoes(transacoesData);
      setPessoas(pessoasData);
    }
    carregar();
  }, [reloadKey]);

  // Função auxiliar para converter pessoaId em nome legível na tabela
  function nomeDaPessoa(pessoaId: number): string {
    const pessoa = pessoas.find(p => p.id === pessoaId);
    return pessoa ? pessoa.nome : `Pessoa #${pessoaId}`;
  }

  return (
    <section>
      <h2>Transações Cadastradas</h2>
      {transacoes.length === 0 ? (
        <p>Nenhuma transação cadastrada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.id}>
                <td>{nomeDaPessoa(t.pessoaId)}</td>
                <td>{t.descricao}</td>
                <td>{t.valor.toFixed(2)}</td>
                <td>{t.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}