import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { ForgotPwProps } from './types';

export const ForgotPw = (props: ForgotPwProps) => {
    const { ForgotPwApiCall } = props;

    const [email, setEmail] = useState("");
    const [isError, setisError] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    
    const resetPasswordEvent = async (email: string) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setErrorCode("Entered email is incorrect");
            setisError(true);
            return;
        }

        var response = await ForgotPwApiCall(email);

        setisError(true);
        if (response !== null && response.ok)
            setErrorCode("Email with password reset link has been sent to you");
        else {
            if (response === null)
                setErrorCode("Unexpected error occured during password reset email sending");
            else if (response.status === 404)
                setErrorCode("User with specified email was not found");
        }
    }

    return (
        <form className="SnSForm ForgotPwForm" noValidate autoComplete="off">
            <Card className="SnSCard ForgotPwCard">
                <CardHeader className="SnSCardHeader ForgotPwCardHeader" title="Forgot password" />
                <CardContent>
                    <div>
                        {isError && <Alert severity="error">{errorCode}</Alert>}
                    </div>
                    <div>
                        <TextField
                            error={isError}
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className="SnSButton ForgotPwButton"
                        onClick={() => {
                            resetPasswordEvent(email);
                        }}
                        disabled={false}>
                        Send password reset email
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default ForgotPw;