export default class Topic {
    id: number;
    title: string;
    // results is an optional key that holds the number of results that match the user's query.
    results?: string;
}