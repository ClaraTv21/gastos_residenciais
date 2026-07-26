import { useState } from "react";
import { CadastroPessoa } from "./components/CadastroPessoa";
import { CadastroTransacao } from "./components/CadastroTransacao";
import { Totais } from "./components/Totais";
import { ListaTransacoes } from "./components/ListaTransacoes";

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>
      <CadastroPessoa />
      <CadastroTransacao onCriada={() => setReloadKey(k => k + 1)} />
      <ListaTransacoes reloadKey={reloadKey} />
      <Totais reloadKey={reloadKey} />
    </div>
  );
}

export default App;