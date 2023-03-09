//массив должностей:
const api = 'https://raw.githubusercontent.com/aleksandrzhmak/test_task/main/json_file.json';

//получает и сохраняет элементы массива:
const jobList = [];
fetch(api)
    .then(res => res.json())
    .then(data => {
        // console.log('data >>> ', data);
        data.forEach(function (job){
            jobList.push(job);
        });
        // console.log('jobList >>> ', jobList);
    });

//поиск этементов:
const content = document.querySelector('.content');
const searchInput = content.querySelector('.search__input');
const searchOptions = content.querySelector('.search__options');
const list = content.querySelector('.list');
const addBtn = content.querySelector('.search__button');

//фильтрует массив (совпадает ли input с данными массива):
function getOptions(word, jobList) {
    return jobList.filter(job => {
        const regex = new RegExp(word, 'gi');
        return job.name.match(regex);
    })
}

// отображает отфильтрованые данные под полем ввода и передаёт в input:
function displayOptions() {
    //console.log('this.value >>> ', this.value);
    const options = getOptions(this.value, jobList);
    // console.log('options >>> ', options);
    const html = options
        .map(job => {
            const regex = new RegExp(this.value, 'gi');
            const jobName = job.name.replace(regex,
                `<span class="search__hl">${this.value}</span>`
            )
            return `<li id="${job.id}"class="search__options_value"><span>${jobName}</span></li>`;
        })
        .slice(0, 8)
        .join('');
    searchOptions.innerHTML = this.value ? html : null;
    searchOptions.classList.add('search__options_show');



//с этим кодом нужно разбираться:
    const jobElement = content.querySelector('.search__options_value');
    
    function addElementInInput() {
        const jobEl = content.querySelector('.search__options_value');
        let data = {
            id: jobEl.id,
            name: jobEl.textContent,
        }
        console.log('data >>> ', data);
        const newInput = createInputVal(data);
        return newInput
    }
    function createInputVal(data) {
        console.log('data.name >>> ', data.name);
        searchInput.value = data.name;
        console.log('searchInputе >>> ', searchInput);
    }
 
    
    
    jobElement.addEventListener('click', addElementInInput);
    

}

//создаёт карточку:
function createCard(data) {
    const cardTemplate = document.querySelector('#list-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = card.querySelector('.element__title');
    cardTitle.textContent = data;
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    return card;
}

function addElementInCard(evt) {
    evt.preventDefault();
    const data = searchInput.value;
    console.log('data >>> ', data);
    const newCard = createCard(data);
    list.prepend(newCard);
    searchOptions.innerHTML = null;
    searchInput.value = '';
}

//удаляет карточку:
function deleteCard(evt) {
    evt.preventDefault();
    const target = evt.target;
    const selectedCard = evt.currentTarget.closest('.element');
    if (target.classList.contains('element__delete')) {
        selectedCard.remove();
    }
}

//обработчики событий:
addBtn.addEventListener('click', addElementInCard);
searchInput.addEventListener('change', displayOptions);
searchInput.addEventListener('keyup', displayOptions);
