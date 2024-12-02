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

            document.getElementById('paging').innerHTML = ""
            this.renderPagination(selectedPage)
            this.drawTable(selectedPage)

        });

        const parent = document.getElementById('paging').parentElement;
        const paging = document.getElementById('paging');
        const parentWidth = parent.offsetWidth;
        const pagingWidth = paging.offsetWidth;
        paging.style.marginLeft = `${(parentWidth - pagingWidth-50) / 2}px`;
    }

    drawTable(n){
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
        th.innerText = '시간'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerText = '수량'
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

            let btn = document.createElement('button');
            btn.innerText = item['item_name']

            // 툴팁
            const tooltip = document.createElement('div');
            let $tooltip = $(tooltip);

            // 툴팁 - 이름
            const detail_item_name = document.createElement('div')
            detail_item_name.innerText = item['item_display_name']
            let $detail_item_name = $(detail_item_name)
            $detail_item_name.css({
                textAlign: 'center',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                display: 'block',
                marginBottom: '5px'
            })
            tooltip.appendChild(detail_item_name)

            // 툴팁 - 아이템 속성
            const detail_item_option = document.createElement('fieldset')
            const legend = document.createElement('legend')
            legend.innerText = "아이템 속성"
            detail_item_option.appendChild(legend)

            let $detail_item_option = $(detail_item_option)
            $detail_item_option.css({
                display: 'block',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #fff'
            })


            let item_option = item['item_option'];
            for (let i=0; i<item_option.length; i++) {
                if (item_option[i]['option_type'] == '내구력') {
                    detail_item_option.innerText = "내구력 " + item_option[i]['option_value'] + "/" + item_option[i]['option_value2'];
                }
            }
            tooltip.appendChild(detail_item_option)

            $tooltip.css({
                width: '300px',
                position: 'absolute',
                backgroundColor: '#222',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                display: 'none',
                fontSize: '14px',
                fontFamily: 'MabinogiClassicR'
            });

            td.append(tooltip);

            btn.addEventListener('mouseenter', function(e) {
                tooltip.style.display = 'block';
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY + 10 + 'px';
            });
            btn.addEventListener('mouseleave', function() {
                tooltip.style.backgroundColor = '#333';
                tooltip.style.color = '#fff';
                tooltip.style.display = 'none';
            });
            btn.addEventListener('mousemove', function(e) {
                tooltip.style.padding = '5px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.top = e.pageY + 10 + 'px';
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.display = 'block';
                document.body.appendChild(tooltip);
            });
            // btn.addEventListener('mouseenter', function(e) {
            //     console.log('hover')
            //     tooltip.style.top = e.pageY + 10 + 'px';
            // });

            td.appendChild(btn)
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-time')
            td.innerText = parseTime(item['date_auction_expire'])
            td.style.width='120px'
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-count')
            td.innerText = item['item_count']
            td.style.width='30px'
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-price')
            let span = document.createElement('span')
            span.innerText = "개당: "+parsePrice(item['auction_price_per_unit'])
            span.classList.add('item-list-price-per-unit')

            if(item['auction_price_per_unit'] >= 100000000){
                span.style.color = '#e88d90';
                span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #9b3e42';
            } else if(item['auction_price_per_unit'] >= 10000){
                span.style.color = '#94c1dd';
                span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #69889C';
            }

            td.appendChild(span)
            span = document.createElement('span')
            span.innerText = "전체: "+parsePrice(item['auction_price_per_unit'] * item['item_count'])
            span.classList.add('item-list-price-total')
            if(item['auction_price_per_unit'] * item['item_count'] >= 100000000) {
                span.style.color = '#e88d90';
                span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #9b3e42';
            } else if(item['auction_price_per_unit'] * item['item_count'] >= 10000){
                span.style.color = '#94c1dd';
                span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #69889C';
            }
            td.style.width='250px'
            td.appendChild(span)

            span.style.display = 'block'

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

function parsePrice(price) {
    let priceStr = price.toString();
    let priceLen = priceStr.length;

    if (priceLen <= 4) {
        return priceStr +" Gold";
    }

    let parsedPrice = "";
    let units = ["", "만", "억"];
    let unitIndex = 0;

    if (priceLen <= 4){ units = [""]; }
    else if (priceLen <= 8){ units = ["만", ""];}
    else if (priceLen <= 12){ units = ["억", "만", ""];}

    while (priceLen > 0) {
        let chunkSize = priceLen % 4 === 0 ? 4 : priceLen % 4;
        let chunk = priceStr.slice(0, chunkSize);
        priceStr = priceStr.slice(chunkSize);
        priceLen -= chunkSize;

        if (chunk !== "0000") {
            chunk = chunk.replace(/^0+/, "");
            parsedPrice = parsedPrice + "" + chunk + units[unitIndex];
        }
        unitIndex++;
    }

    return parsedPrice + " Gold";
}

function parseTime(time){
    let date = new Date;
    let timeDate = new Date(time);
    let diff = timeDate - date
    if(diff < 0) return "만료"
    let diffSec = diff / 1000;
    let diffMin = diffSec / 60;
    let diffHour = Math.ceil(diffMin / 60);

    return diffHour+' 시간'
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

function drawDetilaedInfo(items){

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