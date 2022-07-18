import Carrinho from 'pages/Carrinho';
import Feira from 'pages/Feira';
import Login from 'pages/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function Router () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/feira">
                    <Feira />
                </Route>
                <Route path="/carrinho">
                    <Carrinho />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}