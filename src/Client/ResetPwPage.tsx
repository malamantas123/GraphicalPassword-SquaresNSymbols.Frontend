import { useState } from 'react';
import { ResetPwCall } from './APICalls';

import ResetPw from '../Auth/ResetPw';
const queryString = require('query-string');

export const ResetPwPage = (props: any) => {
    window.addEventListener("resize", function () {
        return window.innerHeight;
    });

    const [email] = useState(queryString.parse(props.location.search).email);

    return (
        <ResetPw ResetApiCall={ResetPwCall} AfterResetRedirect={() => { props.history.push('/login') }} Email={email} SymbolsPath={(process.env.PUBLIC_URL + "/s")} />
    )
}

export default ResetPwPage;