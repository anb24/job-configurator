//массив должностей:
const api = 'https://raw.githubusercontent.com/aleksandrzhmak/test_task/main/json_file.json';

//поиск этементов:
const content = document.querySelector('.content');
const searchInput = content.querySelector('.search__input');
const searchOptions = content.querySelector('.search__options');
const list = content.querySelector('.list');
const addBtn = content.querySelector('.search__button');

//получает и сохраняет элементы массива:
const jobList = [];
fetch(api)
    .then(res => res.json())
    .then(data => {
        // console.log('data >>> ', data);
        data.forEach(function (job){
            jobList.push(job);
        });
        // console.log(jobList);
    });

//фильтрует массив (совпадает ли input с данными массива):
function getOptions(word, jobList) {
    return jobList.filter(job => {
        const regex = new RegExp(word, 'gi');
        return job.name.match(regex);
    })
}

//отображает отфильтрованые данные под полем ввода и передаёт в input:
function displayOptions() {
    // console.log('this.value >> ', this.value);
    const options = (this.value, jobList);
    const html = options
        .map(job => {
            const regex = new RegExp(this.value, 'gi');
            const jobName = job.name.replace(regex,
                `<span class="search__hl">${this.value}</span>`
            )
            return `<li class="search__options_value"><span>${jobName}</span></li>`;
        })
        .slice(0, 10)
        .join('');
    searchOptions.innerHTML = this.value ? html : null;
    searchOptions.classList.add('search__options_show');



    const jobElement = content.querySelector('.search__options_value');
    // console.log(jobElement);

    function addElement(evt) {
        evt.preventDefault();
        const data = {
            id: jobElement.id,
            name: jobElement.name
        }
        const newCard = createCard(data);
        list.prepend(newCard);
    }

    jobElement.addEventListener('click', addElement);



    // const jobElement = content.querySelector('.search__options_value');
    // const cardTitle = content.querySelector('.element__title');
    //
    // function addElementInInput(evt) {
    //     evt.preventDefault();
    //     const data = {
    //         id: jobElement.id,
    //         name: jobElement.name
    //     }
    //     const input = document.querySelector('.search__input');
    //     input.innerHTML = jobElement.value;
    //     console.log(data.name);
    // }
    //
    // function addElement(evt) {
    //     evt.preventDefault();
    //     const data = {
    //         id: jobElement.id,
    //         name: jobElement.name
    //     }
    //     const newCard = createCard(data);
    //     list.prepend(newCard);
    //     // evt.currentTarget.reset();
    // }
    //
    // jobElement.addEventListener('click', addElementInInput);
    // addBtn.addEventListener('click', addElement);



}



//создаёт карточку:
function createCard(data) {
    const cardTemplate = document.querySelector('#list-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = card.querySelector('.element__title');
    cardTitle.textContent = data.name;
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    return card;
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
searchInput.addEventListener('change', displayOptions);
searchInput.addEventListener('keyup', displayOptions);
