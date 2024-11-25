address = "https://open.api.nexon.com/mabinogi/v1/auction/list"
API_KEY = "test_3aea5b595556584ab54c0245a7e2a9eabac8e93dac17f6ee655c7eee8787f8cdefe8d04e6d233bd35cf2fabdeb93fb0d"

items = []

function getDataByCategory(category, cursor = null, paging = 0) {
    url = address + "?auction_item_category=" + category

    if (cursor != null){
        url += "&cursor=" + cursor
    }
    console.log(url)

    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-nxopen-api-key", API_KEY)
        },
        success: function (res) {
            items.push(res['auction_item'])
            if (paging < 2){
                paging++
                getDataByCategory(category, res['next_cursor'], paging)
            }
        }
    })

    // const blob = new Blob([JSON.stringify(items)], {type: 'application/json'});
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement
    // a.href = url
    // a.download = 'items.json'
    // a.click()
    //
    // URL.revokeObjectURL(url)
}

function getDataByName(name, cursor = null){
    url = address + "?item_name=" + name
    if (cursor != null){
        url += "&cursor=" + cursor
    }
    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-nxopen-api-key", API_KEY)
        },
        success: function (res) {
            console.log(res)
        }
    })
}

function changeTheme(){
    let theme = document.getElementById('navigator-theme-text')
    let themeText = theme.innerText

    if (themeText == '밝은 모드로'){
        theme.innerText = '다크 모드로'
    }
    else{
        theme.innerText = '밝은 모드로'
    }
}

function getSampleItems(){
    fetch('data/items.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            drawTable(data)
        })
    return []
}

function parsePrice(price){
    let priceStr = price.toString()
    let priceLen = priceStr.length
    let parsedPrice = ""
    let cnt = 0
    for (let i=priceLen-1; i>=0; i--){
        parsedPrice = priceStr[i] + parsedPrice
        cnt++
        if (cnt % 3 == 0 && i != 0){
            parsedPrice = "," + parsedPrice
        }
    }
    return parsedPrice
}

function getItemDetailInfo(items){
    let itemInfos = []
    items.forEach(i => {
        i.forEach(item => {
            itemInfos.push({
                "item_name": item['item_name'],
                "item_display_name": item['item_display_name'],
                "item_count": item['item_count'],
                "auction_price_per_unit": item['auction_price_per_unit'],
                "date_auction_expire": item['date_auction_expire'],
                "item_option": item['item_option']
            })
        })
    })
    return itemInfos
}
function drawTable(items, paging = 0){
    NUMBER_OF_ITEMS = 50

    let itemInfos = getItemDetailInfo(items)
    let table = document.getElementById('item-list')
    let tbody = document.createElement('tbody')
    table.appendChild(tbody)

    for (let i=0; i<NUMBER_OF_ITEMS; i++){
        let tr = document.createElement('tr')
        tbody.appendChild(tr)

        let td = document.createElement('td')
        td.classList.add('item-list-no')
        td.innerText = NUMBER_OF_ITEMS*paging+i+1
        tr.appendChild(td)
        td = document.createElement('td')
        td.classList.add('item-list-name')
        td.innerText = itemInfos[NUMBER_OF_ITEMS*paging+i]['item_name']
        tr.appendChild(td)
        td = document.createElement('td')
        td.classList.add('item-list-price')
        td.innerText = parsePrice(itemInfos[NUMBER_OF_ITEMS*paging+i]['auction_price_per_unit'])
        // drawDetail(td)
        tr.appendChild(td)
    }
}

// TODO: draw paging
function drawPaging(items){

}

function drawDetail(td, item){
    td.addEventListner('hover', function(){
        console.log('hover')
    })
}

$(document).ready(function () {
    $('#navigator-theme').click(function(){
        changeTheme()
    })

    getSampleItems()
})