export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

// Union type espelha o enum do C# — só aceita esses dois valores
export type TipoTransacao = "Receita" | "Despesa";

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export interface TotalPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisGerais {
  pessoas: TotalPessoa[];
  totalReceitasGeral: number;
  totalDespesasGeral: number;
  saldoGeral: number;
}