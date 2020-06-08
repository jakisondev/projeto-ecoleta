function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response =>
            response.json()
        )
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
        .catch(err => {
            alert(err)
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
        .then(response =>
            response.json()
        )
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
        .catch(err => {
            alert(err)
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de Coleta
// Pegar todos os LIs
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })


    // se já estiver selecionando, tirar da seleção
    if (alreadySelected >= 0) {

        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems

    } else {

        // se não estiver selecionando, adicionar a seleção
        //adcionar a selecao
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}