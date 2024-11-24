address = "https://open.api.nexon.com/mabinogi/v1/auction/list"
API_KEY = "test_3aea5b595556584ab54c0245a7e2a9eabac8e93dac17f6ee655c7eee8787f8cdefe8d04e6d233bd35cf2fabdeb93fb0d"

function getDataByCategory(category, cursor = null) {
    url = address + "?auction_item_category=" + category
    if (cursor != null){
        url += "&cursor" + cursor
    }

    $.ajax({
        method: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-nxopen-api-key", API_KEY)
        },
        success: function (res) {
                for (let i = 0; i < res['auction_item'].length; i++){
                    console.log(res['auction_item'][i]['date_auction_expire'])
                }
        }
    })
}

function getDataByName(name, cursor = null){
    url = address + "?item_name=" + name
    if (cursor != null){
        url += "&cursor" + cursor
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

getDataByName('동물 캐릭터 분양 메달')