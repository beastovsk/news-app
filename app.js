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
        topHeadlines(country = '', cb) {
            http.get(`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`, cb)
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
    newsService().topHeadlines('ru', onGetResponse)
}

const onGetResponse = (res) => {
    console.log(res)
    renderNews(res.articles)
}

// Render news
const renderNews = (news) => {
    const newsContainer = document.querySelector('.row')
    let fragment = ''
    news.forEach((item) => {
        const el = newsTemplate(item)
        fragment += el
    })
    newsContainer.insertAdjacentHTML('afterbegin', fragment)
}

// News item template function

const newsTemplate = ({ content, description, urlToImage, url }) => {
    return `
        <div class="card mb-3 mt-3">
            <img src="${urlToImage}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${description || null}</h5>
                <p class="card-text">${content || null}</</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <a href="${url}" class="btn btn-primary">Article link</a>
            </div>
        </div>
    `

}