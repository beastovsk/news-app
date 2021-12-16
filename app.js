const httpExample = {
    get(url, cb) {
        try {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.addEventListener('load', () => {
                if ((Math.round(Math.floor(xhr.status) / 100)) != 2) {
                    console.log(`Error. Status of request is ${xhr.status}`)
                }

                const response = xhr.responseText
                cb(JSON.parse(response))
            })

            xhr.addEventListener('error', () => {
                console.log('err')
            })
            xhr.send()
        } catch (error) {
            console.log('err')
        }
    },
    post(url, body, headers, cb) {
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
}


const http = httpExample

const newsService = (() => {
    const apiKey = '2b0e071f6ad840fabd5f4049217e76f5'
    const apiUrl = 'https://newsapi.org/v2'

    return {
        topHeadlines(country = 'ru', cb) {
            http.get(`${apiUrl}/top-headlines?country=${country}&apiKey=${apiKey}`, cb)
        },
        everything(query, cb) {
            http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadNews()
})


// Load news
const loadNews = () => {
    newsService().topHeadlines('us', onGetResponse)
}

const onGetResponse = (res) => {
    console.log(res)
    renderNews(res.articles)
}

// Render news
const renderNews = (news) => {
    const newsContainer = document.querySelector('.row')
    news.forEach((item) => {
        const el = newsTemplate(item)
    })
}

// News item template function

const newsTemplate = (news) => {
    console.log(news)
}