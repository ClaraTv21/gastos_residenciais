import api from "./api";
import { Pessoa } from "../types";

export const pessoaService = {
  listar: () => api.get<Pessoa[]>("/pessoas").then(r => r.data),
  criar: (nome: string, idade: number) =>
    api.post<Pessoa>("/pessoas", { nome, idade }).then(r => r.data),
  deletar: (id: number) => api.delete(`/pessoas/${id}`),
};