const searchInput = document.querySelector('.searchInput');
const outputField = document.querySelector('.output-field');
const autodop = document.querySelector('.autodop');
const cardTemplate = document.querySelector('#card');


const debounce = (fn, debounceTime) => {
    let timer;
    return function(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, debounceTime)
    }
  };


const addCard = function(item) {
    const card = cardTemplate.content.cloneNode(true);
    
    card.querySelector('.card-name').textContent = `Name: ${item.name}`;
    card.querySelector('.card-owner').textContent = `Owner: ${item.owner.login}`;
    card.querySelector('.card-stars').textContent = `Stars: ${item.stargazers_count}`;

    card.querySelector('.card-button').addEventListener('click', (event) => {
      event.target.parentNode.remove();
    })
    
    outputField.append(card);
    searchInput.value = '';
    autodop.innerHTML = '';
}


const getRep = async(requst) => {
    return await fetch(`https://api.github.com/search/repositories?q=${requst}`)
    .then((res) => {
        if(res.ok) {
            res.json()
            .then(res => {
                //autodop.innerHTML = ''
                const items = res.items.slice(0, 5);
                
                items.forEach(item => {
                  const choice = document.createElement('div');
                  choice.classList.add('choice');
                  choice.textContent = `${item.name}`;
                  autodop.append(choice);

                  choice.addEventListener('click', () => addCard(item));
                })  
            })
        }
      autodop.innerHTML = ''
    })
}
    




const debounceGetRep = debounce(getRep, 600);

searchInput.addEventListener('input', () => {
  debounceGetRep(searchInput.value);
});
