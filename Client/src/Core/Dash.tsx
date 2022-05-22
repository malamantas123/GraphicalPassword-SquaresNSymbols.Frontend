import { removeUserSession, getUser } from '../Utils/Common';

export const Dash = (props: any) => {

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div>
            Welcome {getUser()}!
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default Dash;