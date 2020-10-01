export const localSort = (list: any[], sortBy:string, ascending: boolean = true) => {
    return list.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return ascending ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
            return ascending ? 1 : -1;
        }
        return 0;
    })
}