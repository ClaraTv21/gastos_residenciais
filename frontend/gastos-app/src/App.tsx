import { useState } from "react";
import { CadastroPessoa } from "./components/CadastroPessoa";
import { CadastroTransacao } from "./components/CadastroTransacao";
import { Totais } from "./components/Totais";

function App() {
  // Um contador simples força o recarregamento dos totais sempre
  // que algo novo é cadastrado, sem precisar de gerenciador de estado global
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div>
      <h1>Controle de Gastos Residenciais</h1>
      <CadastroPessoa />
      <CadastroTransacao onCriada={() => setReloadKey(k => k + 1)} />
      <Totais reloadKey={reloadKey} />
    </div>
  );
}

export default App;