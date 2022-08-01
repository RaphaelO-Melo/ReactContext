import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';

import { UsuarioContext } from 'common/context/Usuario';

function Login() {
  return (
    <Container>
      <UsuarioContext.Consumer>
        {({nome, setNome, saldo, setSaldo}) => (
          <>
            <Titulo>
              Insira o seu nome
            </Titulo>
            <InputContainer>
              <InputLabel>
                Nome
              </InputLabel>
              <Input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Saldo
              </InputLabel>
              <Input
                value={saldo}
                onChange={(event) => setSaldo(event.target.value)}
                type="number"
                startAdornment={
                <InputAdornment position="start">
                  R$
                </InputAdornment>
              }
            />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
            >
              Avançar
            </Button>
          </>
        )}
      </UsuarioContext.Consumer>
    </Container>
  )
};

export default Login;