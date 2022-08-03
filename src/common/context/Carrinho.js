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
    
    function adicionarProduto(novoProduto){

        const temProduto = carrinho.some(itemCarrinho => itemCarrinho.id === novoProduto.id);
        
        if(!temProduto){
          novoProduto.quantidade = 1;
          return setCarrinho(carrinhoAnterior => [...carrinhoAnterior, novoProduto]);
        }
    
        setCarrinho(carrinhoAnterior => carrinhoAnterior.map(itemCarrinho => {
          if(itemCarrinho.id === novoProduto.id){
            itemCarrinho.quantidade += 1;
            return itemCarrinho;
          }
        }));
      
    }

    return {
        carrinho,
        setCarrinho,
        adicionarProduto
    }

}