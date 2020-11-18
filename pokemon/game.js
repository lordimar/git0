const refery1_click_button = document.getElementById('restart-btn1');    
const refery_click_button = document.getElementById('restart-btn');

const player_1_click_button = document.getElementById('character-btn-kick');
const player_2_click_button = document.getElementById('enemy-btn-kick');

const refery1 = {
    element: document.getElementById('refery1'),
    name: 'Refery1',
    winner_name1: document.getElementById('winner_name1'),
}

const refery = {
    element: document.getElementById('refery'),
    name: 'Refery',
    winner_name: document.getElementById('winner_name'),
}


const player_1 = {
    name: 'Pikachu',
    max_health: 100,
    current_health: 100,
    health: document.getElementById('health-character'),
    progress_bar: document.getElementById('progressbar-character')
}

const player_2 = {
    name: 'Charmander',
    max_health: 200,
    current_health: 200,
    health: document.getElementById('health-enemy'),
    progress_bar: document.getElementById('progressbar-enemy')
}

refery_click_button.addEventListener('click', () => {
    location.reload();
})
refery1_click_button.addEventListener('click', () => {
    location.reload();
})
    

player_1_click_button.addEventListener('click', () => {
    changeScore(random(15), player_1)
})

player_2_click_button.addEventListener('click', () => {
    changeScore(random(15), player_2)
})

const init = () => {
    refery1.element.style.display = 'none';
    refery.element.style.display = 'none';
  
   
    renderPlayer(player_1)
    renderPlayer(player_2)
    random(15)
}

const renderPlayer = person => {
    renderScore(person)
    renderProgressbar(person)
}

const renderScore = person => {
    person.health.innerText = person.current_health + ' / ' + person.max_health
}

const renderProgressbar = person => {
    person.progress_bar.style.width = person.current_health + '%'
}

const changeScore = (count, person) => {
    if (person.current_health < count) {
        person.current_health = 0
        refery1.element.style.display = 'block';
        refery.element.style.display = 'block';
         
        if (person.name == 'Pikachu' ) pika= 'Лузер', Charma =  'Переможець'   ;
        else pika= 'Переможець', Charma = 'Лузер';
        
        refery1.winner_name1.innerHTML = pika;
        refery.winner_name.innerHTML = Charma ;
        
      
        player_1_click_button.setAttribute("disabled", true);
        player_2_click_button.setAttribute("disabled", true);
    } else {
        person.current_health -= count
    }
    renderPlayer(person)
}

const random = num => {
    return Math.ceil(Math.random() * num)
}

init()