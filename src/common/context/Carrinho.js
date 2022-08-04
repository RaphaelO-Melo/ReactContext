import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    return(
        <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export const useCarrinhoContext = () => {
    
    const {carrinho, setCarrinho} = useContext(CarrinhoContext);
    
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

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto
    }

}