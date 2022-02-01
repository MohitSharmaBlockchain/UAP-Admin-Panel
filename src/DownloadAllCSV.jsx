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
    // data__from__web.forEach((element) => {
    for (const key in data__from__web[0]) {
        if (
            key !== 'password' &&
            key !== 'backgroundUrl' &&
            key !== 'wallets' &&
            key !== '__v' &&
            key !== 'tags' &&
            key !== 'jsonHash' &&
            key !== 'cloudinaryUrl'
        ) {
            head += key.toUpperCase() + ','
            arr.push(key)
        }
        // if (key === '_id') {
        //     USER__ID = element[key]
        //     console.log('Element ID: ' + element[key])
        // }
    }
    // })
    // console.log(head)
    // console.log(arr)
    let headers = [head]

    // Convert users data to a csv
    // let i = 1
    let usersCsv = data__from__web.reduce((acc, user) => {
        let row = ''
        for (let key in user) {
            for (let i in arr)
                if (key === arr[i]) {
                    row += user[key] + ','
                    // console.log(`USER: ${i}:`, user)
                    // const { id, name, surname, age } = user
                    // acc.push([id, name, surname, age].join(','))
                    // console.log(`USER: ${i}:`, acc)
                    // i++
                    console.log('CHECK')
                    break
                }
            // console.log(row)
        }
        acc.push(row)
        return acc
    }, [])

    console.log(usersCsv)

    // let usersCsv = []

    // let body = ''
    // data__from__web.forEach((element) => {
    //     if (
    //         element[0] !== 'password' &&
    //         element[0] !== 'backgroundUrl' &&
    //         element[0] !== '__v' &&
    //         element[0] !== 'tags' &&
    //         element[0] !== 'jsonHash' &&
    //         element[0] !== 'cloudinaryUrl'
    //     ) {
    //         body +=
    //             (element[1] === true
    //                 ? 'YES'
    //                 : element[1] === false
    //                 ? 'NO'
    //                 : element[1] === ''
    //                 ? '--'
    //                 : element[1]) + ','
    //     }
    // })

    // usersCsv.push(body)

    // console.log(usersCsv)
    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `data.csv`,
        fileType: 'text/csv',
    })
}
export default exportToCsv
