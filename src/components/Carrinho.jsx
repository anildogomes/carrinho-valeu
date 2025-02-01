import React, { useState } from "react";
import "../assets/styles.css";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [descontoAtivo, setDescontoAtivo] = useState(0);

  // Adicionar item ao carrinho
  const adicionarItem = (event) => {
    event.preventDefault();
    const nome = event.target.nome.value;
    const quantidade = parseInt(event.target.quantidade.value);
    let preco = parseFloat(event.target.preco.value);

    if (descontoAtivo > 0) {
      preco = preco * (1 - descontoAtivo);
    }

    const itemExistente = carrinho.find((item) => item.nome === nome);
    let novoCarrinho;

    if (itemExistente) {
      novoCarrinho = carrinho.map((item) => {
        if (item.nome === nome) {
          return { ...item, quantidade: item.quantidade + quantidade };
        }
        return item;
      });
    } else {
      novoCarrinho = [...carrinho, { nome, quantidade, preco }];
    }

    setCarrinho(novoCarrinho);
    atualizarTabelaCarrinho(novoCarrinho);
    event.target.reset();
  };

  // Atualizar o total do carrinho
  const atualizarTabelaCarrinho = (novoCarrinho) => {
    const totalCalculado = novoCarrinho.reduce(
      (acc, item) => acc + item.quantidade * item.preco,
      0
    );
    setTotal(totalCalculado);
  };

  // Inserindo desconto
  const aplicarDesconto = (event) => {
    event.preventDefault();
    const codigo = event.target.codigo.value;
    const descontos = {
      DESC10: 0.1,
      DESC20: 0.2,
    };

    // Verifica se o código de desconto é válido
    const desconto = descontos[codigo];
    if (desconto) {
      setDescontoAtivo(desconto);
      const carrinhoComDesconto = aplicarDescontoAoCarrinho(carrinho, desconto);
      setCarrinho(carrinhoComDesconto);
      atualizarTabelaCarrinho(carrinhoComDesconto);
      alert(`Desconto de ${(desconto * 100).toFixed(0)}% aplicado!`);
    } else {
      alert("Código de desconto inválido.");
    }
    event.target.reset();
  };

  const aplicarDescontoAoCarrinho = (carrinhoAtual, desconto) => {
    return carrinhoAtual.map((item) => ({
      ...item,
      preco: item.preco * (1 - desconto),
    }));
  };

  return (
    <div className="container">
      <h1>Valeu Store</h1>
      {/* Total do carrinho */}
      <div className="total">Total: R$ {total.toFixed(2)}</div>

      <form onSubmit={adicionarItem}>
        <input name="nome" type="text" placeholder="Nome do produto" required />
        <input
          name="quantidade"
          type="number"
          placeholder="Quantidade"
          min="1"
          required
        />
        <input
          name="preco"
          type="number"
          placeholder="Preço"
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <form onSubmit={aplicarDesconto}>
        <input name="codigo" type="text" placeholder="Código de desconto" />
        <button type="submit">Aplicar Desconto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Carrinho;
