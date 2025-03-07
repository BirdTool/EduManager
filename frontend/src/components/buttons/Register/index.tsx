import { Button } from "./style"

function registerButton(buttonName: string = "Registrar-se") {
    return (
        <div>
            <Button>{buttonName}</Button>
        </div>
    )
}

export default registerButton