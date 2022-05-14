export type ForgotPwProps = {
    ForgotPwApiCall: (email: string) => Promise<Response | null>;
}

export type LoginProps = {
    LoginApiCall: (email: string, password: string) => Promise<Response | null>;
    SetUser: (user: any) => void;
    AfterLoginRedirect: any;
    SymbolsPath: string;
}

export type RegisterProps = {
    RegisterApiCall: (username: string, email: string, password: string) => Promise<Response | null>;
    AfterRegisterRedirect: any;
    SymbolsPath: string;
}

export type ResetPwProps = {
    ResetApiCall: (email: string, password: string) => Promise<Response | null>;
    AfterResetRedirect: any;
    SymbolsPath: string;
    Email: string;
}

export type SpecialLoginProps = {
    SpecialLoginApiCall: (email: string, password: string) => Promise<Response | null>;
    SetUser: (user: any) => void;
    AfterSpecialLoginRedirect: any;
    SymbolsPath: string;
    Email: string;
}