const apiURL = "http://localhost:7074/api";

export async function RegisterCall(name: string, email: string, password: string) {
    try {
        const response = await fetch(apiURL + "/register", {
            method: 'POST',
            body: JSON.stringify({ Username: name, Email: email, Password: password })
        });

        return response;
    }
    catch (err) {
        return null;
    }
}

export async function LoginCall(email: string, password: string) {
    try {
        const response = await fetch(apiURL + "/login", {
            method: 'POST',
            body: JSON.stringify({Email: email, Password: password})
        });

        return response;
    }
    catch (err) {
        return null;
    }
}

export async function SpecialLoginCall(email: string, password: string) {
    try {
        const response = await fetch(apiURL + "/speciallogin", {
            method: 'POST',
            body: JSON.stringify({ Email: email, Password: password })
        });

        return response;
    }
    catch (err) {
        return null;
    }
}

export async function ResetPwCall(email: string, newPass: string) {
    try {
        const response = await fetch(apiURL + "/updatepassword", {
            method: 'POST',
            body: JSON.stringify({ Email: email, Password: newPass })
        });

        return response;
    }
    catch (err) {
        return null;
    }
}

export async function ForgotPwCall(email: string) {
    try {
        const response = await fetch(apiURL + "/resetemail?email=" + email, {
            method: 'GET',
        });

        return response;
    }
    catch (err) {
        return null;
    }
}