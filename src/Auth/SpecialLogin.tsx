import { useState } from 'react';
import { ShufflePhotos, GetPhotoCodes, Colorings } from './Helpers';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { ImageList, ImageListItem } from '@material-ui/core';
import { SpecialLoginProps } from './types';

export const SpecialLogin = (props: SpecialLoginProps) => {
    const { SpecialLoginApiCall, SetUser, AfterSpecialLoginRedirect, SymbolsPath, Email } = props;

    const [password, setpassword] = useState("");
    const [isButtonDisabled] = useState(false);
    const [isError, setisError] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const [tutorialText, setTurorialText] = useState(false);
    const [choiseCount, setChoiseCount] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [photoCodes, setPhotoCodes] = useState(GetPhotoCodes(SymbolsPath));

    const tryLogin = async (password: string) => {
        const response = await SpecialLoginApiCall(Email, password);

        if (response !== null) {
            if (response.ok) {
                setisError(false);
                SetUser(await response.text());
                AfterSpecialLoginRedirect();
            }
            else {
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
        <form className="SnSForm SpecialLoginForm" noValidate autoComplete="off">
            <Card className="SnSCard SpecialLoginCard">
                <CardHeader className="SnSCardHeader SpecialLoginCardHeader" title="Login" />
                <CardContent>
                    <div>
                        {isError && <Alert severity="error">{errorCode}</Alert>}
                    </div>
                    <div>
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
                            className="SnSButton SpecialLoginButton"
                            onClick={() => {
                                clearPassword();
                            }}
                            disabled={isButtonDisabled}>
                            Clear password
                        </Button>
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className="SnSButton SpecialLoginButton"
                        onClick={() => {
                            tryLogin(password);
                        }}
                        disabled={choiseCount < 5}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default SpecialLogin;