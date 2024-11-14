export const data=[
    ...generateForMonth(30,11,2024),
    ...generateForMonth(31,10,2024),
]


function generateForMonth(endDay,Month,Year){
    let m=[]
    for(let i=1;i<=endDay;i++){
        let date=`${Year}-${String(Month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        let count=Math.floor(Math.random()*16)
        m.push({date,count})
    }
    return m
}