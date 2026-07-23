import { useState, useEffect } from "react";
import { pessoaService } from "../services/pessoaService";
import { Pessoa } from "../types";

/**
 * Componente responsável pelo cadastro de pessoas:
 * criação, listagem e deleção (requisito do enunciado).
 */
export function CadastroPessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [erro, setErro] = useState<string | null>(null);

  const carregarPessoas = async () => {
    const dados = await pessoaService.listar();
    setPessoas(dados);
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!nome.trim()) {
      setErro("Nome é obrigatório.");
      return;
    }
    try {
      await pessoaService.criar(nome, idade);
      setNome("");
      setIdade(0);
      await carregarPessoas(); // recarrega a lista para refletir a nova pessoa
    } catch {
      setErro("Erro ao cadastrar pessoa.");
    }
  };

  const handleDeletar = async (id: number) => {
    // Ao deletar, o backend já cuida do cascade delete das transações
    await pessoaService.deletar(id);
    await carregarPessoas();
  };

  return (
    <section>
      <h2>Cadastro de Pessoas</h2>
      <form onSubmit={handleCriar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={e => setIdade(Number(e.target.value))}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {pessoas.map(p => (
          <li key={p.id}>
            {p.nome} ({p.idade} anos)
            <button onClick={() => handleDeletar(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </section>
  );
}