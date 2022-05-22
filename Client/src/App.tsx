import './App.css';
import { BrowserRouter, Switch, NavLink } from 'react-router-dom';

import Login from './Client/LoginPage';
import Dash from './Core/Dash';
import Register from './Client/RegisterPage';
import Forgot from './Client/ForgotPwPage';
import SpecialLogin from './Client/SpecialLoginPage';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Reset from './Client/ResetPwPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <div className="header">
                        <NavLink activeClassName="active" to="/login">Login</NavLink>
                        <NavLink activeClassName="active" to="/register">Register</NavLink>
                        <NavLink activeClassName="active" to="/forgot">Forgot password</NavLink>
                        <NavLink activeClassName="active" to="/dashboard">Main page</NavLink>
                    </div>
                    <div className="content">
                        <Switch>
                            <PublicRoute path="/login" component={Login} />
                            <PublicRoute path="/register" component={Register} />
                            <PublicRoute path="/forgot" component={Forgot} />
                            <PublicRoute path="/reset" component={Reset} />
                            <PublicRoute path="/slogin" component={SpecialLogin} />
                            <PrivateRoute path="/dashboard" component={Dash} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;