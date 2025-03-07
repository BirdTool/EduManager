import { Button } from "./style"

function signUpButton(buttonName: string = "Entrar") {
    return (
        <div>
            <Button>{buttonName}</Button>
        </div>
    )
}

export default signUpButton