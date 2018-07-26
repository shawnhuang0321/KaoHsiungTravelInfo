

// 宣告全域變數

var app;
var filterData = [];
var zoneData = [];
var allData = [];
var jsonData = [];

// JSON DATA Loading

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function(){

    var jsonData = JSON.parse(xhr.responseText).result.records;
    var len = jsonData.length;

    // for迴圈建立下拉式選單
    function makeZoneList(){
        for(let i=0; i<len; i++){
            let z = zoneData.indexOf(jsonData[i].Zone);
            if( z == -1 ){
                zoneData.push(jsonData[i].Zone);
            }
        }
    }
    makeZoneList();

    

    // Vue.js

    var app = new Vue({

        el: '#app',

        data: {
            zoneList: zoneData,
            allData: jsonData,
            btnData: ['苓雅區', '三民區', '新興區', '美濃區'],
            zoneSelector: '所有景點'
        },

        methods: {
            
        },
        // 利用computed更新內容
        computed: {
            filter: function() {
               var vm = this;
               var filt = [];
               if( vm.zoneSelector == '所有景點' ){
                    //    for( let i=0; i<len; i++ ){
                    //        filt.push(this.allData[i])
                    //    }
                    //    return filt;
                    vm.allData.forEach(function(item) {
                        filt.push(item)
                    })
                    filterData = filt;
                    initMap();
                    return filt;
               }
               else{
                    // for( let i=0; i<len; i++ ){
                    //     if( vm.zoneSelector == this.allData[i].Zone ){
                    //         filt.push(vm.allData[i])
                    //     }
                    // }
                    vm.allData.forEach(function(item) {
                        if( item.Zone == vm.zoneSelector ){
                            filt.push(item)
                        }
                    })
                    filterData = filt;
                    initMap();
                    return filt;
               }
            }
        }
    });



    // Google Map API
    // Map Center
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 22.716052, lng: 120.423959},
        zoom: 11
      });

        // item: {
        //     position: {lat: 123, lng: 123},
        //     title: 'Title'
        // }
        // 更新地點標記
        for( i=0; i<filterData.length; i++){
            var marker = new google.maps.Marker({
                map: map,
                position: { lat: parseFloat(filterData[i].Py), lng: parseFloat(filterData[i].Px) },
                title: filterData[i].Name
            });
        }
    }
    initMap();

}