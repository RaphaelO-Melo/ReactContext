import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
    return(
        <CarrinhoContext.Provider
         value={{carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho, setValorTotalCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export const useCarrinhoContext = () => {
    
    const {carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorTotalCarrinho, setValorTotalCarrinho} = useContext(CarrinhoContext);
    const {formaPagamento} = usePagamentoContext();
    const {setSaldo} = useContext(UsuarioContext);

    function mudarQuantidade(id, quantidade){
      return carrinho.map(itemCarrinho => {
        if(itemCarrinho.id === id){
          itemCarrinho.quantidade += quantidade;
        }
        return itemCarrinho;
      })
    }

    function adicionarProduto(novoProduto){

      const temProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id);
      
      if(!temProduto){
        novoProduto.quantidade = 1;
        return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto]);
      }
  
      setCarrinho(mudarQuantidade(novoProduto.id, 1));
      
    }

    function removerProduto(id){

      const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id);

      if(produto){
        const ehUltimo = produto.quantidade === 1;
  
        if(ehUltimo){
          return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id));
        }
  
        setCarrinho(mudarQuantidade(id, -1))
      }

    }

    function efetuarCompra(){

      setCarrinho([]);
      setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho);

    }

    useEffect(() => {

      const { novaQuantidadeProdutos, novoTotalProdutos } = carrinho.reduce((contador, produto) => ({
        novaQuantidadeProdutos: contador.novaQuantidadeProdutos + produto.quantidade,
        novoTotalProdutos: contador.novoTotalProdutos + (produto.valor * produto.quantidade) 
      }), {novaQuantidadeProdutos: 0, novoTotalProdutos: 0 });

      setQuantidadeProdutos(novaQuantidadeProdutos);
      setValorTotalCarrinho(novoTotalProdutos * formaPagamento.juros);

    }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento]);

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        quantidadeProdutos,
        valorTotalCarrinho,
        efetuarCompra
    }

}