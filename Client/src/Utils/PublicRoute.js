import { Route, Redirect } from 'react-router-dom';
import { getUser } from './Common';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !getUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
        />
    )
}

export default PublicRoute;