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
                    alert('Please select contry or use the query')
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
const newsContainer = document.querySelector('.row')

const select = document.querySelector('.form-select')
const inputQuery = document.querySelector('.form-control')

const btn = document.querySelector('.btn')

const newsService = (() => {
    const apiKey = '2b0e071f6ad840fabd5f4049217e76f5'
    const apiUrl = 'https://newsapi.org/v2'

    return {
        topHeadlines(country = '', cb) {
            http.get(`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`, cb)
        },
        everything(query, cb) {
            if (query) {
                http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    loadQueries()
    loadCountryNews()

    // for (item of newsContainer.children) {
    //     newsContainer.removeChild(item)
    // }
})

const loadCountryNews = () => {
    if (inputQuery.value == '') {
        let country = ''
        btn.addEventListener('click', () => {
            country = select.value
            loadNews()
        })


        // Load news
        const loadNews = () => {
            newsService().topHeadlines(country, onGetResponse)
        }
    }
}

const loadQueries = () => {
    let query = ''
    btn.addEventListener('click', () => {
        query = inputQuery.value
        loadQuery()
    })

    const loadQuery = () => {
        newsService().everything(query, onGetResponse)
    }


}

const onGetResponse = (res) => {
    renderNews(res.articles)
}

// Render news
const renderNews = (news) => {
    if (news) {
        let fragment = ''
        news.forEach((item) => {
            if (item) {
                const el = newsTemplate(item)
                fragment += el
            }
        })
        newsContainer.insertAdjacentHTML('afterbegin', fragment)
    }
}

// News item template function

const newsTemplate = ({ title, description, urlToImage, url, publishedAt}) => {
    return `
        <div class="card mb-3 mt-3">
            <img src="${urlToImage}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title || null}</h5>
                <p class="card-text">${description || null}</</p>
                <p class="card-text"><small class="text-muted">${publishedAt}</small></p>
                <a href="${url || null}" class="btn btn-primary">Article link</a>
            </div>
        </div>
    `
}