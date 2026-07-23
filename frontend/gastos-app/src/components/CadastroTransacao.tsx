import { useState, useEffect } from "react";
import { pessoaService } from "../services/pessoaService";
import { transacaoService } from "../services/transacaoService";
import { Pessoa, TipoTransacao } from "../types";

export function CadastroTransacao({ onCriada }: { onCriada?: () => void }) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoTransacao>("Despesa");
  const [pessoaId, setPessoaId] = useState<number | "">("");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    pessoaService.listar().then(setPessoas);
  }, []);

  // Encontra a pessoa selecionada para checar a idade no front também
  // (validação client-side é só UX; a regra "de verdade" está garantida no backend)
  const pessoaSelecionada = pessoas.find(p => p.id === pessoaId);
  const ehMenorDeIdade = pessoaSelecionada && pessoaSelecionada.idade < 18;

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (pessoaId === "") {
      setErro("Selecione uma pessoa.");
      return;
    }

    try {
      await transacaoService.criar(descricao, valor, tipo, Number(pessoaId));
      setDescricao("");
      setValor(0);
      onCriada?.();
    } catch (err: any) {
      // Mostra a mensagem de regra de negócio vinda do backend
      // (ex: "Pessoas menores de 18 anos só podem cadastrar despesas.")
      setErro(err.response?.data?.erro ?? "Erro ao cadastrar transação.");
    }
  };

  return (
    <section>
      <h2>Cadastro de Transações</h2>
      <form onSubmit={handleCriar}>
        <select value={pessoaId} onChange={e => setPessoaId(Number(e.target.value))}>
          <option value="">Selecione a pessoa</option>
          {pessoas.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(Number(e.target.value))}
        />

        <select
          value={tipo}
          onChange={e => setTipo(e.target.value as TipoTransacao)}
          disabled={ehMenorDeIdade} // trava visualmente a opção "Receita" para menores
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita" disabled={ehMenorDeIdade}>Receita</option>
        </select>

        {ehMenorDeIdade && (
          <p style={{ color: "orange" }}>
            Pessoa menor de idade: apenas despesas podem ser cadastradas.
          </p>
        )}

        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </section>
  );
}