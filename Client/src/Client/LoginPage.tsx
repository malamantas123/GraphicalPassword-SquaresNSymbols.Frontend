import { LoginCall } from './APICalls';
import { Switch, NavLink } from 'react-router-dom';

import Login from '../Auth/Login';
import PublicRoute from '../Utils/PublicRoute';
import forgotPage from './ForgotPwPage';
import { setUserSession } from '../Utils/Common';

import './SquaresSymbols.scss';

export const LoginPage = (props: any) => {
    return (
        <div>
            <Login LoginApiCall={LoginCall} SetUser={setUserSession} AfterLoginRedirect={() => { props.history.push('/dashboard') }} SymbolsPath={(process.env.PUBLIC_URL + "/s")} />
            <div className="header">
                <NavLink activeClassName="active" to="/forgot">Forgot password</NavLink>
            </div>
            <div className="content">
                <Switch>
                    <PublicRoute path="/forgot" component={forgotPage} />
                </Switch>
            </div>
        </div>
    )
}

export default LoginPage;