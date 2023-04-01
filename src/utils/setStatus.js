import {differenceInDays, formatDistance, isAfter, toDate} from 'date-fns'

const setStatus = (completed, startDate, endDate) => {
    // console.log(isAfter(new Date(startDate), new Date(endDate)))
    if(completed === 100) {
        return {
            msg: 'Completed',
            color: 'green'
        };
    } else if(isAfter(new Date(), new Date(endDate)) && completed !== 100) {
        return {
            msg: 'Time out',
            color: 'red'
        }
    } else if(!isAfter(new Date(), new Date(startDate))) {
        return {
            msg: 'Comming',
            color: 'blue'
        }
    } else if(isAfter(new Date(), new Date(startDate)) && !isAfter(new Date(), new Date(endDate))) {
        return {
            msg: 'Running',
            color: 'green'
        }
    } else {
        return {
            msg: 'Error',
            color: 'red'
        }
    }
}

export default setStatus