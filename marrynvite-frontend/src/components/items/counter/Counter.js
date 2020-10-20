import React, {useEffect, useRef, useState} from 'react'
import classes from './Counter.module.css'
import CounterItem from './counterItem/CounterItem'

function getYears(millisecs) {
    return Math.floor(millisecs/1000/60/60/24/365);
}

function getMonths(millisecs) {
    let difference = millisecs - getYears(millisecs)*365*24*60*60*1000;
    return Math.floor(difference/1000/60/60/24/31);
}

function getDays(millisecs) {
    let difference = millisecs - getMonths(millisecs)*30*24*60*60*1000 - getYears(millisecs)*365*24*60*60*1000;;
    return Math.floor(difference/1000/60/60/24);
}

function getHours(millisecs) {
    let difference = millisecs - getDays(millisecs)*24*60*60*1000 - getMonths(millisecs)*30*24*60*60*1000 - getYears(millisecs)*365*24*60*60*1000;;
    return Math.floor(difference/1000/60/60);
}

function getMinutes(millisecs) {
    let difference = millisecs - getHours(millisecs)*60*60*1000 - getDays(millisecs)*24*60*60*1000 - getMonths(millisecs)*30*24*60*60*1000 - getYears(millisecs)*365*24*60*60*1000;;
    return Math.floor(difference/1000/60);
}

function getSeconds(millisecs) {
    let difference = millisecs - getMinutes(millisecs)*60*1000 - getHours(millisecs)*60*60*1000 - getDays(millisecs)*24*60*60*1000 - getMonths(millisecs)*30*24*60*60*1000 - getYears(millisecs)*365*24*60*60*1000;;
    return Math.floor(difference/1000);
}

function getText(milliseconds) {
    let years = getYears(milliseconds);
    let months = getMonths(milliseconds);
    let days = getDays(milliseconds);
    let hours = getHours(milliseconds);
    let minutes = getMinutes(milliseconds);
    let seconds = getSeconds(milliseconds);

    return (<div className={classes.CounterItems}>
                <CounterItem number={years} stringPeriod={getProperYearString(years)} />
                <CounterItem number={months} stringPeriod={getProperMonthString(months)} />
                <CounterItem number={days} stringPeriod={getProperDayString(days)} />
                <CounterItem number={hours} stringPeriod={getProperHourString(hours)} />
                <CounterItem number={minutes} stringPeriod={getProperMinuteString(minutes)} />
                <CounterItem number={seconds} stringPeriod={getProperSecondString(seconds)} />
            </div>)
    // return `${years > 0 ? years + getProperYearString(years) +',' : ''} ${months > 0 ? months + getProperMonthString(months) + ',' : ''} ${ days > 0 ? days + getProperDayString(days) + ',' : ''} ${hours > 0 ? hours + getProperHourString(hours) + ',' : ''} ${minutes > 0 ? minutes + getProperMinuteString(minutes) + ',': ''} ${seconds + getProperSecondString(seconds)}`  
}

function getProperYearString(years) {
    switch(years) {
        case 1: return 'rok'
        case 2: return 'lata'
        default: return 'lat'
    }
}

function getProperMonthString(months) {
    return months > 1 ? 'miesięcy' : 'miesiąc'
}

function getProperDayString(days) {
    return days > 1 ? 'dni' : 'dzień'
}

function getProperHourString(hours) {
    return hours > 1 ? 'godzin' : 'godzina'
}

function getProperMinuteString(minutes) {
    switch(minutes) {
        case 2: return 'minuty'
        case 1: return 'minuta'
        default: return 'minut'
    }
}

function getProperSecondString(seconds) {
    switch(seconds) {
        case 1: return 'sekunda'
        case 2: return 'sekundy'
        default: return 'sekund'
    }
}



const Counter = (props) => {
    const weddingTime = new Date(2022,6,2,14,0);
    const nowRef = useRef(new Date());
    const diffRef = useRef(weddingTime - new Date());
    const [result, setResult] = useState(getText(weddingTime - new Date()));
    useEffect(() => {
        const timer = setInterval(() => {
            nowRef.current = new Date();
            diffRef.current = weddingTime - nowRef.current;
            setResult(getText(diffRef.current));
        }, 1000);
        return () => clearInterval(timer)
    }, [result])

    return(
        <div className={classes.Counter}>
            <p>Do wspólnej zabawy pozostało: </p>
            {result}
        </div>
    )
}

export default Counter;