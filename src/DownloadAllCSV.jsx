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
    let head = ''
    let arr = []
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
    }
    let headers = [head]

    let usersCsv = data__from__web.reduce((acc, user) => {
        let row = ''
        for (let i in arr) {
            let search = false
            for (let key in user) {
                if (key === arr[i]) {
                    search = true
                    break
                }
            }
            if (search) {
                let text = user[arr[i]]
                let word__data = ''
                if (typeof text === 'string') {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === ',' || text[i] === '\n') continue
                        word__data += text[i]
                    }
                    row += word__data + ','
                } else {
                    row += text + ','
                }

                // console.log(word__data)
            } else {
                // console.log(user['_id'])
                row += ','
            }
        }
        acc.push(row)
        return acc
    }, [])

    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `data.csv`,
        fileType: 'text/csv',
    })
}
export default exportToCsv
