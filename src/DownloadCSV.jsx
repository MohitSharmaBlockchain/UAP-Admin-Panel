import { parseOriginalDate } from './data'

const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

const exportToCsv = (e, data__from__web) => {
    e.preventDefault()

    // Headers for each column
    let USER__ID
    let head = ''
    let arr = []
    data__from__web.forEach((element) => {
        if (
            element[0] !== 'password' &&
            element[0] !== 'backgroundUrl' &&
            element[0] !== '__v' &&
            element[0] !== 'isVerified' &&
            element[0] !== 'balances' &&
            element[0] !== 'walletBalance' &&
            element[0] !== 'tags' &&
            element[0] !== 'jsonHash' &&
            element[0] !== 'tokenId' &&
            element[0] !== 'cloudinaryUrl'
        ) {
            head += element[0].toUpperCase() + ','
            arr.push(element[0])
        }
        if (element[0] === '_id') {
            USER__ID = element[1]
        }
    })
    // console.log(head)
    let headers = [head]

    // Convert users data to a csv
    // let i = 1
    // let usersCsv = usersNew.reduce((acc, user) => {
    //     if (
    //         user[0] !== 'password' &&
    //         user[0] !== 'backgroundUrl' &&
    //         user[0] !== 'wallets' &&
    //         user[0] !== '__v' &&
    //         user[0] !== 'tags' &&
    //         user[0] !== 'jsonHash' &&
    //         user[0] !== 'cloudinaryUrl'
    //     ) {
    //         console.log(`USER: ${i}:`, user)
    //         const { id, name, surname, age } = user
    //         acc.push([id, name, surname, age].join(','))
    //         // for (let i = 1; i < user.length; i += 2) {
    //         //     acc.push(user[i])
    //         // }
    //         console.log(`USER: ${i}:`, acc)
    //         i++
    //     }
    //     return acc
    // }, [])

    let usersCsv = []

    let body = ''
    data__from__web.forEach((element) => {
        if (
            element[0] !== 'password' &&
            element[0] !== 'backgroundUrl' &&
            element[0] !== '__v' &&
            element[0] !== 'isVerified' &&
            element[0] !== 'balances' &&
            element[0] !== 'walletBalance' &&
            element[0] !== 'tags' &&
            element[0] !== 'jsonHash' &&
            element[0] !== 'tokenId' &&
            element[0] !== 'cloudinaryUrl'
        ) {
            let text = element[1]

            if (element[0] === 'userType') {
                if (text === 1) {
                    text = 'Email'
                } else if (text === 2) {
                    text = 'Wallet'
                } else {
                    text = 'Email and Wallet'
                }
            } else if (element[0] === 'nftStatus') {
                if (text === 1) {
                    text = 'Artist Portfolio'
                } else if (text === 2) {
                    text = 'Sale'
                } else {
                    text = 'Auction'
                }
            } else if (element[0] === 'chain') {
                if (text === 1) {
                    text = 'Polygon'
                } else if (text === 56) {
                    text = 'Binance'
                } else if (text === 137) {
                    text = 'Ethereum'
                }
            } else if (
                element[0] === 'date' ||
                element[0] === 'createdAt' ||
                element[0] === 'updatedAt'
            ) {
                text = parseOriginalDate(element[1])
            } else if (text === true) {
                text = 'YES'
            } else if (text === false) {
                text = 'NO'
            }

            let word__data = ''
            if (typeof text === 'string') {
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === ',' || text[i] === '\n') continue
                    word__data += text[i]
                }
                body += word__data + ','
            } else {
                body += text + ','
            }
            // body +=
            //     (element[1] === true
            //         ? 'YES'
            //         : element[1] === false
            //         ? 'NO'
            //         : element[1] === ''
            //         ? '--'
            //         : element[1]) + ','
        }
    })

    usersCsv.push(body)

    // console.log(usersCsv)
    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `${USER__ID}.csv`,
        fileType: 'text/csv',
    })
}
export default exportToCsv
