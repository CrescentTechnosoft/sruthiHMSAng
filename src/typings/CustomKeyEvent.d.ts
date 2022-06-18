interface CustomKeyboardEvent {
    key: string,
    code: string,
    keyCode: number,
    target: ICustomEventTarget
}

interface ICustomEventTarget {
    value: string
}