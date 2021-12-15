const httpExample = () => {
    return (
        get = (url, cb) => {
            try {
                const xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.addEventListener('load', () => {
                    if ((Math.round(Math.floor(xhr.status) / 100)) != 2) {
                        console.log(`Error. Status of request is ${xhr.status}`)
                    }
    
                    const response = xhr.responseText
                    cb(response)
                })
    
                xhr.addEventListener('error', () => {
                    console.log('err')
                })
                xhr.send()
            } catch (error) {
                console.log('err')
            }
        },
        post = (url, body, headers, cb) => {
            try {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', url)
                xhr.addEventListener('load', () => {
                    if ((Math.round(Math.floor(xhr.status) / 100)) != 2) {
                        console.log(`Error. Status of request is ${xhr.status}`)
                    }
    
                    const response = xhr.responseText
                    cb(response)
                })
                if (Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value)
                }))
    
                xhr.addEventListener('error', () => {
                    console.log('err')
                })
                xhr.send(JSON.stringify(body))
            } catch (error) {
                console.log('err')
            }
        }
    )
}


const http = httpExample()

