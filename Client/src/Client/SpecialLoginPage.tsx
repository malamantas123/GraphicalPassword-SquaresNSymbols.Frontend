import { useState } from 'react';
import { SpecialLoginCall } from './APICalls';
import { Switch, NavLink } from 'react-router-dom';

import PublicRoute from '../Utils/PublicRoute';
import forgotPage from './ForgotPwPage';

import './SquaresSymbols.scss';
import SpecialLogin from '../Auth/SpecialLogin';
import { setUserSession } from '../Utils/Common';

const queryString = require('query-string');

export const SpecialLoginPage = (props: any) => {

    const [email] = useState(queryString.parse(props.location.search).email);

    return (
        <div>
            <SpecialLogin SpecialLoginApiCall={SpecialLoginCall} SetUser={setUserSession} AfterSpecialLoginRedirect={() => { props.history.push('/dashboard') }} Email={email} SymbolsPath={(process.env.PUBLIC_URL + "/s")} />
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

export default SpecialLoginPage;