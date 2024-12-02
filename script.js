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

            if(item == null) break;

            let tr = document.createElement('tr')
            tbody.appendChild(tr)

            let td = document.createElement('td')
            td.classList.add('item-list-no')
            td.innerText = itemIndex + 1;
            tr.appendChild(td)

            td = document.createElement('td')
            td.classList.add('item-list-name')

            let btn = document.createElement('button');
            btn.innerText = item['item_display_name']

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
            })
            tooltip.appendChild(detail_item_name)

            let item_option = item['item_option'];
            if(item_option != null){
                // 툴팁 - 아이템 속성
                let isPropertyAvailable = false
                let detail_item_option
                let legend

                let detail_item_option_content

                for (let i=0; i<item_option.length; i++) {
                    if(!isPropertyAvailable){
                        detail_item_option = document.createElement('fieldset')
                        legend = document.createElement('span')
                        legend.classList.add('item-option-legend')
                        legend.innerText = "아이템 속성"
                        detail_item_option.appendChild(legend)

                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        item_option = item['item_option'];

                        isPropertyAvailable = true
                    }
                    if (item_option[i]['option_type'] == '공격'){
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "공격 " + item_option[i]['option_value'] + "~" + item_option[i]['option_value2'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                    if (item_option[i]['option_type'] == '부상률'){
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "부상률 " + item_option[i]['option_value'] + "~" + item_option[i]['option_value2'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                    if (item_option[i]['option_type'] == '크리티컬'){
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "크리티컬 " + item_option[i]['option_value'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                    if (item_option[i]['option_type'] == '밸런스'){
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "밸런스 " + item_option[i]['option_value'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                    if (item_option[i]['option_type'] == '내구력') {
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "내구력 " + item_option[i]['option_value'] + "/" + item_option[i]['option_value2'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                    if (item_option[i]['option_type'] == '숙련') {
                        detail_item_option_content = document.createElement('div')
                        detail_item_option_content.classList.add('item-option-content')
                        detail_item_option_content.innerText = "숙련 " + item_option[i]['option_value'];
                        detail_item_option.appendChild(detail_item_option_content)
                    }
                }

                tooltip.appendChild(detail_item_option)

                // 툴팁 - 인챈트
                let isEnchantAvailable = false
                let item_option_enchant_container
                let item_option_enchant_prefix
                let item_option_enchant_suffix
                let item_option_enchant_prefix_ex
                let item_option_enchant_suffix_ex

                for(let i=0; i<item_option.length; i++) {
                    if (item_option[i]['option_type'] == '인챈트') {
                        if (!isEnchantAvailable) {
                            detail_item_option = document.createElement('fieldset')
                            legend = document.createElement('span')
                            legend.classList.add('item-option-legend')
                            legend.innerText = "인챈트"
                            detail_item_option.appendChild(legend)

                            detail_item_option_content = document.createElement('div')
                            detail_item_option_content.classList.add('item-option-content')
                            item_option = item['item_option'];

                            isEnchantAvailable = true
                        }
                        if (item_option[i]['option_sub_type'] == '접두') {
                            item_option_enchant_container = document.createElement('div')
                            item_option_enchant_prefix = document.createElement('div')
                            item_option_enchant_prefix_ex = document.createElement('div')

                            item_option_enchant_prefix.innerText = "[접두] " + item_option[i]['option_value']

                            // parse enchant ex
                            let enchant_ex = item_option[i]['option_desc'].split(',')
                            let item_option_enchant_ex_str
                            for (let j=0; j<enchant_ex.length; j++){
                                item_option_enchant_ex_str = document.createElement('div')
                                item_option_enchant_ex_str.innerText = enchant_ex[j]
                                let $item_option_enchant_ex_str = $(item_option_enchant_ex_str)
                                $item_option_enchant_ex_str.css('color', '#888')
                                item_option_enchant_prefix_ex.appendChild(item_option_enchant_ex_str)
                            }

                            // item_option_enchant_prefix_ex.innerText = item_option[i]['option_desc']

                            item_option_enchant_container.appendChild(item_option_enchant_prefix)
                            item_option_enchant_container.appendChild(item_option_enchant_prefix_ex)
                        }
                        if (item_option[i]['option_sub_type'] == '접미') {
                            item_option_enchant_container = document.createElement('div')
                            item_option_enchant_suffix = document.createElement('div')
                            item_option_enchant_suffix_ex = document.createElement('div')

                            item_option_enchant_suffix.innerText = "[접미] " + item_option[i]['option_value']

                            // parse enchant ex
                            let enchant_ex = item_option[i]['option_desc'].split(',')
                            let item_option_enchant_ex_str
                            for (let j=0; j<enchant_ex.length; j++){
                                item_option_enchant_ex_str = document.createElement('div')
                                item_option_enchant_ex_str.innerText = enchant_ex[j]
                                let $item_option_enchant_ex_str = $(item_option_enchant_ex_str)
                                $item_option_enchant_ex_str.css('color', '#888')
                                item_option_enchant_suffix_ex.appendChild(item_option_enchant_ex_str)
                            }

                            // item_option_enchant_suffix_ex.innerText = item_option[i]['option_desc']

                            item_option_enchant_container.appendChild(item_option_enchant_suffix)
                            item_option_enchant_container.appendChild(item_option_enchant_suffix_ex)

                            let $item_option_enchant_container = $(item_option_enchant_container)
                        }
                        detail_item_option.appendChild(item_option_enchant_container)
                        tooltip.appendChild(detail_item_option)
                    }
                }

                //툴팁 - 개조
                let isUpgradeAvailable = false
                let item_option_upgrade_container
                let item_option_upgrade_normal
                let item_option_upgrade_jewel
                let item_option_upgrade_art
                let item_option_upgrade_special
                let item_option_upgrade_ex
                let item_option_upgrade_ex_str

                for(let i=0; i<item_option.length; i++) {
                    if (item_option[i]['option_type'].includes('개조')) {
                        if (!isUpgradeAvailable) {
                            detail_item_option = document.createElement('fieldset')
                            legend = document.createElement('span')
                            legend.classList.add('item-option-legend')
                            legend.innerText = "개조"
                            detail_item_option.appendChild(legend)

                            detail_item_option_content = document.createElement('div')
                            detail_item_option_content.classList.add('item-option-content')
                            item_option = item['item_option'];

                            isUpgradeAvailable = true
                        }

                        item_option_upgrade_container = document.createElement('div')
                        item_option_upgrade_normal = document.createElement('div')
                        item_option_upgrade_jewel = document.createElement('div')
                        item_option_upgrade_art = document.createElement('div')
                        item_option_upgrade_special = document.createElement('div')
                        item_option_upgrade_ex = document.createElement('div')

                        if (item_option[i]['option_type'] == '일반 개조') {
                            item_option_upgrade_normal.innerText = "일반 개조 " + item_option[i]['option_value'] + "/" + item_option[i]['option_value2']
                            item_option_upgrade_container.appendChild(item_option_upgrade_normal)
                        }
                        if (item_option[i]['option_type'] == '보석 개조') {
                            item_option_upgrade_jewel.innerText = "보석 개조 " + item_option[i]['option_value']
                            item_option_upgrade_container.appendChild(item_option_upgrade_jewel)
                        }
                        if (item_option[i]['option_type'] == '장인 개조') {
                            item_option_upgrade_art.innerText = "장인 개조"

                            // parse upgrade ex

                            if(item_option[i]['option_value'] != null) {
                                let str = item_option[i]['option_value'].split(',')
                                let item_option_upgrade_ex_str
                                for (let j=0; j<str.length; j++){
                                    item_option_upgrade_ex_str = document.createElement('div')
                                    item_option_upgrade_ex_str.innerText = str[j]
                                    let $item_option_upgrade_ex_str = $(item_option_upgrade_ex_str)
                                    $item_option_upgrade_ex_str.css('color', '#888')
                                    item_option_upgrade_ex.appendChild(item_option_upgrade_ex_str)
                                }
                            }

                            item_option_upgrade_container.appendChild(item_option_upgrade_art)
                            item_option_upgrade_container.appendChild(item_option_upgrade_ex)
                        }
                        if (item_option[i]['option_type'] == '특별 개조') {
                            item_option_upgrade_special.innerText = "특별 개조 " + item_option[i]['option_sub_type'] + item_option[i]['option_value']
                            item_option_upgrade_container.appendChild(item_option_upgrade_special)
                        }
                        detail_item_option.appendChild(item_option_upgrade_container)
                        tooltip.appendChild(detail_item_option)
                    }
                }


                //툴팁 - 세공

                //툴팁 - 에르그
                
                //툴팁 - 세트효과

                // 툴팁 - 아이템 염색
                let isColorAvailable = false
                let item_option_color_container
                let item_option_color
                let item_option_color_preview

                for(let i=0; i<item_option.length; i++){
                    if(item_option[i]['option_type'] == '아이템 색상'){
                        if(!isColorAvailable){
                            detail_item_option = document.createElement('fieldset')
                            legend = document.createElement('span')
                            legend.classList.add('item-option-legend')
                            legend.innerText = "아이템 염색"
                            detail_item_option.appendChild(legend)

                            detail_item_option_content = document.createElement('div')
                            detail_item_option_content.classList.add('item-option-content')
                            item_option = item['item_option'];

                            isColorAvailable = true
                        }

                        item_option_color_container = document.createElement('div')
                        item_option_color = document.createElement('span')
                        item_option_color_preview = document.createElement('span')

                        let $item_option_color_container = $(item_option_color_container)
                        let $item_option_color = $(item_option_color)
                        let $item_option_color_preview = $(item_option_color_preview)
                        let rgb

                        if(item_option[i]['option_value'] != null){
                            item_option_color.innerText = item_option[i]['option_sub_type'] + ": " + item_option[i]['option_value'];
                            item_option_color_preview.innerText ='　';
                            rgb = item_option[i]['option_value'].split(',')
                        } else if(item_option[i]['option_desc'] == "(반짝)"){
                            item_option_color.innerText = item_option[i]['option_sub_type'] + ": (반짝)"
                            rgb = "반짝"
                        }

                        $item_option_color.css({
                            padding: '2px',
                            borderRadius: '5px',
                            color: '#fff'
                        })
                        $item_option_color_preview.css({
                            width: '10px',
                            marginRight: '5px',
                            backgroundColor: (rgb == "반짝" ? null : 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')')
                        })
                        item_option_color_container.appendChild(item_option_color_preview)
                        item_option_color_container.appendChild(item_option_color)
                        detail_item_option_content.appendChild(item_option_color_container)

                    }
                }
                detail_item_option.appendChild(detail_item_option_content)
                tooltip.appendChild(detail_item_option)
            }

            $tooltip.css({
                width: '300px',
                position: 'absolute',
                backgroundColor: 'rgb(51, 51, 51)',
                color: '#fff',
                borderRadius: '5px',
                display: 'none',
                fontSize: '14px',
                fontFamily: 'MabinogiClassicR',
                padding: '7px',
                textAlign: 'left',
                lineHeight: '1.3',
            });

            td.append(tooltip);

            // TODO: 툴팁 길이가 화면 길이보다 길 경우 위치 처리
            btn.addEventListener('mouseenter', function(e) {
                tooltip.style.display = 'block';
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY + 10 + 'px';
            });
            btn.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });
            btn.addEventListener('mousemove', function(e) {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY + 10 + 'px';
            });
            btn.addEventListener('wheel', function(e) {
                tooltip.style.display='block';
            });

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
                // span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #9b3e42';
            } else if(item['auction_price_per_unit'] >= 10000){
                span.style.color = '#94c1dd';
                // span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #69889C';
            }

            td.appendChild(span)
            span = document.createElement('span')
            span.innerText = "전체: "+parsePrice(item['auction_price_per_unit'] * item['item_count'])
            span.classList.add('item-list-price-total')
            if(item['auction_price_per_unit'] * item['item_count'] >= 100000000) {
                span.style.color = '#e88d90';
                // span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #9b3e42';
            } else if(item['auction_price_per_unit'] * item['item_count'] >= 10000){
                span.style.color = '#94c1dd';
                // span.style.fontWeight = 'bold';
                span.style.textShadow = '0 0 5px #69889C';
            }
            td.style.width='250px'
            td.appendChild(span)

            span.style.display = 'block'

            tr.appendChild(td)
        }
    }
}


items = []
function getDataByCategory(category, address, apikey, cursor = null, paging = 0) {
    url = address + "?auction_item_category=" + category

    if (cursor != null) {
        url += "&cursor=" + cursor
    }
    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-nxopen-api-key", apikey)
        },
        success: function (res) {
            items.push(res['auction_item']);
            if (paging < 2 && res['next_cursor'] != null) {
                paging++
                getDataByCategory(category, address, apikey, res['next_cursor'], paging)
            }else{
                let infos = getItemDetailInfo();

                console.log(infos)

                let pagination = new Pagination(infos, 20);
                pagination.renderPagination(1);
                pagination.drawTable(1);


                return infos
            }
        }
    });
}

function getDataByName(name, address, apikey, cursor = null, paging=0){
    let url = address + "?item_name=" + name

    if (cursor != null){
        url += "&cursor=" + cursor
    }
    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-nxopen-api-key", apikey)
        },
        success: function (res) {
            items.push(res['auction_item']);
            if (paging < 2 && res['next_cursor'] != null) {
                paging++
                getDataByName(name, address, apikey, res['next_cursor'], paging)
            }else{
                let infos = getItemDetailInfo();

                console.log(infos)

                let pagination = new Pagination(infos, 20);
                pagination.renderPagination(1);
                pagination.drawTable(1);


                return infos
            }
        }
    });
}


async function getSampleData(){
    try{
        const response = await fetch('data/items2.json');

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

function getItemDetailInfo() {
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

$(document).ready(function () {
    const address = "https://open.api.nexon.com/mabinogi/v1/auction/list";
    const apikey = "test_3aea5b595556584ab54c0245a7e2a9ea6147d1642ba5988c6308cf189a253d7cefe8d04e6d233bd35cf2fabdeb93fb0d";

    // getSampleData()
    //     .then(data => {
    //         infos = getItemDetailInfo(data)
    //
    //         itemsPerPage = 20;
    //         let paging = new Pagination(infos, itemsPerPage);
    //         paging.renderPagination(1)
    //         paging.drawTable(1)
    //
    //     }).catch(error => {
    //     console.error("Error fetching JSON:", error);
    //     })

    getDataByName('나이트브링어 워로드', address, apikey)

});