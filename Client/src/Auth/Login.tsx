import { useState } from 'react';
import { ShufflePhotos, Colorings, GetPhotoCodes } from './Helpers';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { ImageList, ImageListItem } from '@material-ui/core';

import { LoginProps } from './types';

export const Login = (props: LoginProps) => {
    const { LoginApiCall, SetUser, AfterLoginRedirect, SymbolsPath } = props;

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isError, setisError] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const [tutorialText, setTurorialText] = useState(false);
    const [choiseCount, setChoiseCount] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [photoCodes, setPhotoCodes] = useState(GetPhotoCodes(SymbolsPath));

    const tryLogin = async (email: string, password: string) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setErrorCode("Entered email is incorrect");
            setisError(true);
            return;
        }

        const response = await LoginApiCall(email, password);

        if (response !== null) {
            if (response.ok) {
                setisError(false);
                SetUser(await response.text());
                AfterLoginRedirect();
            }
            else {
                clearPassword();
                setisError(true);
                setErrorCode(await response.text());
                setIsShuffled(false);
            }
        }
        else {
            setErrorCode("Login unexpectedly failed, try again");
            setisError(true);
        }
    }

    const onPhotoSelect = (key: string, index: string) => {
        setisError(false);

        if (choiseCount === 5) {
            setErrorCode("You cannot choose more than 5 symbols");
            setisError(true);
            return;
        }

        setpassword(password + key + index);

        doColoring(choiseCount);
        setChoiseCount(choiseCount + 1);
    }

    const doColoring = (choiseIndex: number) => {
        document.getElementById("SnSChoise" + (choiseIndex + 1).toString())?.setAttribute("style", Colorings[choiseIndex].filter);
    }

    const clearPassword = () => {
        setisError(false);
        let i: number;
        for (i = 1; i < choiseCount + 1; i++) {
            document.getElementById("SnSChoise" + i.toString())?.style.removeProperty("filter");
        }
        setChoiseCount(0);
        setpassword("");
    }

    const ShuffleGridOnFirstView = () => {
        if (!isShuffled) {
            setPhotoCodes(ShufflePhotos(photoCodes));
            setIsShuffled(true);
        }
    }

    return (
        <form className="SnSForm LoginForm" noValidate autoComplete="off">
            <Card className="SnSCard LoginCard">
                <CardHeader className="SnSCardHeader LoginCardHeader" title="Login" />
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
                                setemail(e.target.value);
                            }}
                        />
                        <img src={SymbolsPath + "/questionmark.png"} width="25" height="25" onClick={() => { setTurorialText(!tutorialText) }} alt="SnSImage" />
                        {tutorialText && <p style={{ outline: '5px dotted green' }}>
                            <h2>Help</h2>
                            To login - enter your password into a randomly generated grid, that means selecting your symbols despite their
                            position on the grid and selecting your squares despite the symbol that is displayed. After entering your
                            password, click Login.
                        </p>}
                    </div>
                    <div>
                        <img id="SnSChoise1" className="SnSChoise" height="50" src={SymbolsPath + "/sns.png"} alt="SnS" />
                        <img id="SnSChoise2" className="SnSChoise" height="50" src={SymbolsPath + "/sns.png"} alt="SnS" />
                        <img id="SnSChoise3" className="SnSChoise" height="50" src={SymbolsPath + "/sns.png"} alt="SnS" />
                        <img id="SnSChoise4" className="SnSChoise" height="50" src={SymbolsPath + "/sns.png"} alt="SnS" />
                        <img id="SnSChoise5" className="SnSChoise" height="50" src={SymbolsPath + "/sns.png"} alt="SnS" />
                    </div>
                    <div>
                        <ImageList rowHeight={window.innerHeight * 0.15} cols={7}>
                            {ShuffleGridOnFirstView()}
                            {photoCodes.map((x) => (
                                <ImageListItem key={x.index}>
                                    <img className={x.index} src={x.value} alt="SnSImage" onClick={() => onPhotoSelect(x.key, x.index)} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="SnSButton LoginButton"
                            onClick={() => {
                                clearPassword();
                            }}
                            disabled={false}>
                            Clear password
                        </Button>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className="SnSButton LoginButton"
                        onClick={() => {
                            tryLogin(email, password);
                        }}
                        disabled={choiseCount < 5}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default Login;