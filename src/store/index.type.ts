export interface AppState {
    list: string[];
}

export interface AppActions {
    setList: (id: string) => void;
}
