export interface Input {
    search: string,
    profile: string,
    fees: number,
    test: string
}

export interface Response {
    test: Array<Test>,
    groupTest: Array<Test>,
    data: Input,
    tests: Array<AddedTest>,
    status: boolean,
    message: string
}

export interface Profile {
    id: number,
    profile: string
}

export interface Test {
    id: number,
    test: string
}

export interface AddedTest {
    id: number,
    type: string,
    test: string
}

export interface BtnState {
    isSaving: boolean,
    isUpdating: boolean,
    isDeleting: boolean
}
