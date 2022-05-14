import { ForgotPwCall } from './APICalls';

import ForgotPw from '../Auth/ForgotPw';

export const ForgotPwPage = (props: any) => {
    return (
        <ForgotPw ForgotPwApiCall={ForgotPwCall} />
    )
}

export default ForgotPwPage;