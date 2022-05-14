import { RegisterCall } from './APICalls';
import Register from '../Auth/Register';
import './SquaresSymbols.scss';

export const RegisterPage = (props: any) => {
    window.addEventListener("resize", function () {
        return window.innerHeight;
    });

    return (
        <Register RegisterApiCall={RegisterCall} AfterRegisterRedirect={() => { props.history.push('/login') }} SymbolsPath={(process.env.PUBLIC_URL + "/s")} />
    )
}

export default RegisterPage;