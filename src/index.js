// Your code here 
let baseurl = 'http://localhost:3000/films'

let allshows

 fetch(baseurl) 
    .then((response) => response.json()) //Converting the response to json object
     .then((response) => { 
            allshows = response
            listallmovies(response)
        })

     .catch((error) => console.error(error))
        
function listallmovies(movies) {
    const allmovies = document.getElementById('films') 

    allmovies.innerHTML = " "
    movies.forEach(film => {
        const allfilms = document.createElement('li')
        allfilms.className = "film item"
        allfilms.textContent = film.title

        allfilms.addEventListener('click', () => {
            listmovies(film)
        })
        
        allmovies.appendChild(allfilms)
    }
    );    
}

function listmovies(movies) {
    document.getElementById('title').textContent = movies.title
        document.getElementById('runtime').textContent = movies.runtime
        document.getElementById('showtime').textContent = movies.showtime
        document.getElementById('film-info').textContent = movies.description
    document.getElementById('poster').src = movies.poster
    let remainingtickets = movies.capacity - movies.tickets_sold 
    document.getElementById('ticket-num').textContent = remainingtickets  

    const buyTicketButton = document.getElementById('buy-ticket')
    buyTicketButton.disabled = remainingtickets === 0
    
    buyTicketButton.onclick = () => {
        buyTicket(movies.id)
    }

}

function buyTicket(filmid) {
    const film = allshows.find(f => f.id === filmid)
    if (!film) return
    
    if (film.tickets_sold < film.capacity) {
        film.tickets_sold += 1

        listmovies(film)
    
    } else {
        const buyTicketButton = document.getElementById('buy-ticket')
        buyTicketButton.disabled = true
    }
    
}
