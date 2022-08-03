import { Container } from './styles';
import { memo, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { CarrinhoContext } from 'common/context/Carrinho';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

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

  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton color="secondary">
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => adicionarProduto({nome, foto, id, valor})}>
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)