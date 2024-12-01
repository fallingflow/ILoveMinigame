let NUMBER_OF_ITEMS = 50

class Ajax {
    constructor(address, apiKey){
        this.address = address;
        this.apiKey = apiKey;
    }

    getDataByCategory(category, cursor = null, paging = 0){}
    getDataByName(name, cursor = null){}
    getSampleData(){}

    getItemDetailInfo(items){}

    parsePrice(price){}

}
class Pagination {
    constructor(data, itemsPerPage){
        this.data = data;
        this.totalCount = data.length;

        this.itemsPerPage = itemsPerPage;
        this.totalPage = Math.ceil(data.length / itemsPerPage);
        this.pageGroupNum = 10

    }

    renderPagination(currentPage){
        if(this. totalCount <= 20) return;

        let pageGroup = Math.ceil(currentPage / this.pageGroupNum);

        let end = pageGroup * this.pageGroupNum;
        if (end > this.totalPage) end = this.totalPage;
        let start = end - (this.pageGroupNum - 1) <= 0 ? 1 : end - (this.pageGroupNum - 1);

        const fragmentPage = document.createDocumentFragment();

        let prev = start - 1;
        let next = end + 1;

        if (prev > 0){
            let allpreli = document.createElement('li');
            allpreli.insertAdjacentHTML("beforeend", `<a href="#" id="allprev">&lt;&lt;</a>`);

            let preli = document.createElement('li');
            preli.insertAdjacentHTML("beforeend", `<a href="#" id="prev">&lt;</a>`);

            fragmentPage.appendChild(allpreli);
            fragmentPage.appendChild(preli);
        }
        for (let i = start; i <= end; i++){
            const li = document.createElement('li');
            if (i == currentPage){
                li.insertAdjacentHTML("beforeend", `<a href="#" id="page-${i}" style="padding:2px 5px; background-color: #f09319; color:#fff;">${i}</a>`);
            }
            else{
                li.insertAdjacentHTML("beforeend", `<a href="#" id="page-${i} style="padding:5px;">${i}</a>`);
            }
            fragmentPage.appendChild(li)

        }
        if(end < this.totalPage){
            let allendli = document.createElement('li');
            allendli.insertAdjacentHTML("beforeend", `<a href="#" id="allnext">&gt;&gt;</a>`);

            let endli = document.createElement('li');
            endli.insertAdjacentHTML("beforeend", `<a href="#" id="next">&gt;</a>`);

            fragmentPage.appendChild(endli);
            fragmentPage.appendChild(allendli);
        }
        document.getElementById('paging').appendChild(fragmentPage);

        $('#paging a').click((e)=> {
            e.preventDefault();
            let $clickedItem = $(e.currentTarget);
            let $id = $clickedItem.attr('id');
            let selectedPage

            if ($id == 'prev') {
                selectedPage = prev
            } else if ($id == 'next') {
                selectedPage = next
            } else if ($id == 'allprev') {
                selectedPage = 1;
            } else if ($id == 'allnext') {
                selectedPage = this.totalPage;
            } else {
                selectedPage = parseInt($clickedItem.text());
            }

            console.log(selectedPage)
            document.getElementById('paging').innerHTML = ""
            this.renderPagination(selectedPage)
            this.drawTable(selectedPage)

        });

        const parent = document.getElementById('paging').parentElement;
        const paging = document.getElementById('paging');
        const parentWidth = parent.offsetWidth;
        const pagingWidth = paging.offsetWidth;
        console.log(parentWidth, pagingWidth)
        paging.style.marginLeft = `${(parentWidth - pagingWidth-50) / 2}px`;
    }

    drawTable(n){
        console.log(this.data)
        let table = document.getElementById('item-list')
        table.innerHTML = ""

        let thead = document.createElement('thead')
        table.appendChild(thead)

        let tr = document.createElement('tr')
        thead.appendChild(tr)

        let th = document.createElement('th')
        th.innerText = '번호'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerText = '아이템명'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerText = '가격'
        tr.appendChild(th)

        let tbody = document.createElement('tbody')
        table.appendChild(tbody)

        for (let i=0; i<this.itemsPerPage; i++){
            let itemIndex = this.itemsPerPage * (n-1) + i
            let item = this.data[itemIndex];

            let tr = document.createElement('tr')
            tbody.appendChild(tr)

            let td = document.createElement('td')
            td.classList.add('item-list-no')
            td.innerText = itemIndex + 1;
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-name')
            td.innerText = item['item_name']
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-price')
            td.innerText = parsePrice(item['auction_price_per_unit'])
            // drawDetail(td)
            tr.appendChild(td)
        }
    }
}

function getDataByCategory(category, cursor = null, paging = 0) {
    let url = address + "?auction_item_category=" + category

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
    let url = address + "?item_name=" + name
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

async function getSampleData(){
    try{
        const response = await fetch('data/items.json');

        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const dataArray = Array.isArray(jsonData) ? jsonData : Object.values(jsonData);
        return dataArray
    } catch (error){
        console.error("Error fetching JSON:", error);
        throw [];
    }
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

// TODO: draw paging
function drawPaging(items){

}

// function drawDetail(td, item){
//     td.addEventListner('hover', function(){
//         console.log('hover')
//     })
// }

$(document).ready(function () {
    let ajax = new Ajax(
        "https://open.api.nexon.com/mabinogi/v1/auction/list",
        "test_3aea5b595556584ab54c0245a7e2a9eabac8e93dac17f6ee655c7eee8787f8cdefe8d04e6d233bd35cf2fabdeb93fb0d"
    )

    let infos
    getSampleData()
        .then(data => {
            infos = getItemDetailInfo(data)

            itemsPerPage = 20;
            let paging = new Pagination(infos, itemsPerPage);
            paging.renderPagination(1)
            paging.drawTable(1)

        }).catch(error => {
        console.error("Error fetching JSON:", error);
        })
    })