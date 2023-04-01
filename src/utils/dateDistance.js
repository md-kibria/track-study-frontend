import {differenceInDays} from 'date-fns'

const dateDiff = (end) => {
    const dif = differenceInDays(new Date(end), new Date())
    return dif < 0 ? 0 : dif
}

export default dateDiff