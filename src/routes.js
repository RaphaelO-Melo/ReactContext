import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UsuarioProvider } from 'common/context/Usuario';

export default function Router () {

    return (
        <BrowserRouter>
            <Switch>
                <UsuarioProvider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/feira">
                        <Feira />
                    </Route>
                </UsuarioProvider>
                <Route path="/carrinho">
                    <Carrinho />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}