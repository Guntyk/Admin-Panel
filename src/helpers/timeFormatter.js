export function timeFormatter(time) {
    let hours = Math.floor(time/60/60)
    let minutes = Math.floor(time/60) - hours * 60
    let seconds =  Math.floor(time) - hours * 60 * 60 - minutes * 60
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    return `${hours}:${minutes}:${seconds}`
}