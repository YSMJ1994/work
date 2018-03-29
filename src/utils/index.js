export function parseTime(time, regx) {
    if(!time) {
        return ''
    }
    try{
        let date = new Date(time)
        return date.toLocaleString()
    }catch (e) {
        return ''
    }
}