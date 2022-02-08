export const parseOriginalDate = (date) => {
    const parsedDate = new Date(date).toString().split(' ')
    return `${parsedDate[1]} ${parsedDate[2]}, ${parsedDate[3]}`
}
