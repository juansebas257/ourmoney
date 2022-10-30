export interface Incoming {
    id: string,
    date: Date,
    value: number,
    category: string,
    description: string,
    account: string,
    recurring: boolean,
    repetitive: boolean,
    repetitions: number
}