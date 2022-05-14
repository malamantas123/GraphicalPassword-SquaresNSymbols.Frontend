import React, { useState } from 'react';
import { GetPhotoCodes, Colorings } from './Helpers';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { ImageList, ImageListItem } from '@material-ui/core';

import { RegisterProps } from './types';

export const Register = (props: RegisterProps) => {
    const { RegisterApiCall, AfterRegisterRedirect, SymbolsPath } = props;

    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [isError, setisError] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const [tutorialText, setTurorialText] = useState(false);
    const [SnSChoise1, setSnSChoise1] = useState(false);
    const [SnSChoise2, setSnSChoise2] = useState(true);
    const [SnSChoise3, setSnSChoise3] = useState(false);
    const [SnSChoise4, setSnSChoise4] = useState(true);
    const [SnSChoise5, setSnSChoise5] = useState(false);
    const [choiseCount, setChoiseCount] = useState(0);

    const registerEvent = async (name: string, email: string, password: string) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setErrorCode("Entered email is incorrect");
            setisError(true);
            return;
        }

        var extractedPassword = extractPassword(password);

        const response = await RegisterApiCall(name, email, extractedPassword);

        if (response !== null) {
            if (response.ok) {
                setisError(false);
                AfterRegisterRedirect();
            }
            else {
                setisError(true);
                setErrorCode("Email you entered is already taken");
            }
        }
        else {
            setErrorCode("Register unexpectedly failed, try again");
            setisError(true);
        }
    }

    const extractPassword = (password: string) => {
        let i: number;
        let choises: boolean[] = [SnSChoise1, SnSChoise2, SnSChoise3, SnSChoise4, SnSChoise5];
        let extractedPassword: string = "";
        for (i = 1; i < choiseCount + 1; i++) {
            let indexNumBase = (i - 1) * 4;
            if (choises[i - 1]) indexNumBase += 2;
            let passwordExtract = password[indexNumBase] + password[indexNumBase + 1];
            extractedPassword += passwordExtract;
        }

        return extractedPassword;
    }

    const onPhotoSelect = (key: string, index: string) => {
        setisError(false);

        if (choiseCount === 5) {
            setErrorCode("You cannot choose more than 5 symbols");
            setisError(true);
            return;
        }

        var selectedCount = password.split(key).length - 1;
        if (selectedCount === 2) {
            setErrorCode("You cannot select the same square or symbol more than two times");
            setisError(true);
            return;
        }

        setpassword(password + index + key);

        doColoring(choiseCount, index);
        setChoiseCount(choiseCount + 1);
    }

    const doColoring = (choiseIndex: number, photoIndex: string) => {
        document.getElementById("SnSChoise" + (choiseIndex + 1).toString())?.setAttribute("style", Colorings[choiseIndex].filter);

        let colorType: boolean = false;
        if (choiseIndex === 0) colorType = SnSChoise1;
        else if (choiseIndex === 1) colorType = SnSChoise2;
        else if (choiseIndex === 2) colorType = SnSChoise3;
        else if (choiseIndex === 3) colorType = SnSChoise4;
        else if (choiseIndex === 4) colorType = SnSChoise5;

        let element = document.getElementById(colorType ? photoIndex : "B" + photoIndex);
        let oldStyle = element?.getAttribute("style");
        let newStyle = colorType ? Colorings[choiseIndex].filter : ("border: 5px solid " + Colorings[choiseIndex].color);

        element?.setAttribute("style", (newStyle + oldStyle));
    }

    const doColoringByChoise = (choiseIndex: number, photoIndex: string, choise: boolean) => {
        document.getElementById("SnSChoise" + (choiseIndex + 1).toString())?.setAttribute("style", Colorings[choiseIndex].filter);

        let element = document.getElementById(choise ? photoIndex : "B" + photoIndex);
        let oldStyle = element?.getAttribute("style");
        let newStyle = choise ? Colorings[choiseIndex].filter : ("border: 5px solid " + Colorings[choiseIndex].color);

        element?.setAttribute("style", (newStyle + oldStyle));
    }

    const removeSymbolColoring = (symbolIndex: string) => {
        document.getElementById(symbolIndex)?.style.removeProperty("filter");
        document.getElementById("B" + symbolIndex)?.style.removeProperty("border");
    }

    const clearPassword = (password: string) => {
        setisError(false);
        let i: number;
        for (i = 1; i < choiseCount + 1; i++) {
            let indexNumBase = (i - 1) * 4;
            let symbolIndex = password[indexNumBase] + password[indexNumBase + 1];
            removeSymbolColoring(symbolIndex);
            document.getElementById("SnSChoise" + i.toString())?.style.removeProperty("filter");
        }
        setChoiseCount(0);
        setpassword("");
    }

    const InvertSnSChoise = (index: number, SnSChoise: boolean, setSnSChoise: React.Dispatch<React.SetStateAction<boolean>>) => {

        if (((index === 1 ? false : SnSChoise1) ||
            (index === 2 ? false : SnSChoise2) ||
            (index === 3 ? false : SnSChoise3) ||
            (index === 4 ? false : SnSChoise4) ||
            (index === 5 ? false : SnSChoise5)) &&
            ((index === 1 ? false : !SnSChoise1) ||
                (index === 2 ? false : !SnSChoise2) ||
                (index === 3 ? false : !SnSChoise3) ||
                (index === 4 ? false : !SnSChoise4) ||
                (index === 5 ? false : !SnSChoise5))) {
            if (index <= choiseCount) {
                let indexNumBase = (index - 1) * 4;
                let symbolIndex = password[indexNumBase] + password[indexNumBase + 1];
                removeSymbolColoring(symbolIndex);
                doColoringByChoise(index - 1, symbolIndex, !SnSChoise);
            }

            setSnSChoise(!SnSChoise);

            if (errorCode === "At least one of both Squares and Symbols must be chosen") setisError(false);
        }
        else {
            setErrorCode("At least one of both Squares and Symbols must be chosen");
            setisError(true);
        }
    }

    return (
        <form className="SnSForm RegisterForm" noValidate autoComplete="off">
            <Card className="SnSCard RegisterCard">
                <CardHeader className="SnSCardHeader RegisterCardHeader" title="Registration" />
                <CardContent >
                    <div>
                        {isError && <Alert severity="error">{errorCode}</Alert>}
                    </div>
                    <div>
                        <TextField
                            error={isError}
                            fullWidth
                            id="email"
                            type="Email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            error={isError}
                            fullWidth
                            id="username"
                            type="Username"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={(e) => {
                                setusername(e.target.value);
                            }}
                        />
                    </div>
                    <div >
                        <img src={SymbolsPath + "/questionmark.png"} width="25" height="25" onClick={() => { setTurorialText(!tutorialText) }} alt="SnSImage" />
                        {tutorialText && <p style={{ outline: '5px dotted green' }}>
                            <h2>Help</h2>
                            To register - select how you want your choises to be interpreted: as the symbol you selected or the position
                            of the square on the grid. Then select your symbols and squares and click register. If you want to change the
                            interpretation of your selection while already having selected some, clicking the interpretation buttons will
                            invert that selection. During login, you will have enter your password into a randomly generated grid, that
                            means selecting your symbols despite their position on the grid and selecting your squares despite the symbol
                            that is displayed.
                        </p>}
                    </div>
                    <div>
                        <img id="SnSChoise1" className="SnSChoise" height="50" src={SymbolsPath + (SnSChoise1 ? "/symbol.png" : "/square.png")} alt="SnS" onClick={() => { InvertSnSChoise(1, SnSChoise1, setSnSChoise1) }} />
                        <img id="SnSChoise2" className="SnSChoise" height="50" src={SymbolsPath + (SnSChoise2 ? "/symbol.png" : "/square.png")} alt="SnS" onClick={() => { InvertSnSChoise(2, SnSChoise2, setSnSChoise2) }} />
                        <img id="SnSChoise3" className="SnSChoise" height="50" src={SymbolsPath + (SnSChoise3 ? "/symbol.png" : "/square.png")} alt="SnS" onClick={() => { InvertSnSChoise(3, SnSChoise3, setSnSChoise3) }} />
                        <img id="SnSChoise4" className="SnSChoise" height="50" src={SymbolsPath + (SnSChoise4 ? "/symbol.png" : "/square.png")} alt="SnS" onClick={() => { InvertSnSChoise(4, SnSChoise4, setSnSChoise4) }} />
                        <img id="SnSChoise5" className="SnSChoise" height="50" src={SymbolsPath + (SnSChoise5 ? "/symbol.png" : "/square.png")} alt="SnS" onClick={() => { InvertSnSChoise(5, SnSChoise5, setSnSChoise5) }} />
                    </div>
                    <div>
                        <ImageList rowHeight={window.innerHeight * 0.15} cols={7}>
                            {GetPhotoCodes(SymbolsPath).map((x) => (
                                <ImageListItem key={x.index} id={"B" + x.index}>
                                    <img id={x.index} src={x.value} alt="SnSImage" onClick={() => onPhotoSelect(x.key, x.index)} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="SnSButton RegisterButton"
                            onClick={() => {
                                clearPassword(password);
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
                        className="SnSButton RegisterButton"
                        onClick={() => {
                            registerEvent(username, email, password);
                        }}
                        disabled={choiseCount < 5}>
                        Register
                    </Button>
                </CardActions>
            </Card>
        </form>
    )

}

export default Register;