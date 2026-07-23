import api from "./api";
import { Transacao, TipoTransacao } from "../types";

export const transacaoService = {
  listar: () => api.get<Transacao[]>("/transacoes").then(r => r.data),
  criar: (descricao: string, valor: number, tipo: TipoTransacao, pessoaId: number) =>
    api.post<Transacao>("/transacoes", { descricao, valor, tipo, pessoaId }).then(r => r.data),
};