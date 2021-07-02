

export function epochToDate(epochInSeconds:number) {
    const epochInMilliseconds:number = epochInSeconds*1000 + (new Date().getTimezoneOffset() * -1); //for timeZone
    return new Date(epochInMilliseconds);
}
