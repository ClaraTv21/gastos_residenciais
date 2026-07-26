import { useEffect, useState } from "react";
import { totaisService } from "../services/totaisService";
import type { TotaisGerais } from "../types";

export function Totais({ reloadKey }: { reloadKey: number }) {
  const [totais, setTotais] = useState<TotaisGerais | null>(null);

  useEffect(() => {
    totaisService.obter().then(setTotais);
  }, [reloadKey]);

  if (!totais) return <p>Carregando...</p>;

  return (
    <section>
      <h2>Totais por Pessoa</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th><th>Receitas</th><th>Despesas</th><th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.pessoas.map(p => (
            <tr key={p.pessoaId}>
              <td>{p.nome}</td>
              <td>{p.totalReceitas.toFixed(2)}</td>
              <td>{p.totalDespesas.toFixed(2)}</td>
              <td>{p.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total Geral</strong></td>
            <td>{totais.totalReceitasGeral.toFixed(2)}</td>
            <td>{totais.totalDespesasGeral.toFixed(2)}</td>
            <td>{totais.saldoGeral.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}