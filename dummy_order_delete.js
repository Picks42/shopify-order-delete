var axios = require('axios');

function sleep(ms) {
    console.log('inside')
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getData = async () => {
    var since_id = START_ID;
    var count = 0;
    do {
        var config = {
            method: 'get',
            url: 'https://SHOPIFYURL.myshopify.com/admin/orders.json?limit=2&since_id='+since_id,
            headers: { 
            'X-Shopify-Access-Token': 'TOKEN', 
            'Content-Type': 'application/json'
            }
        };
        
        await axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            console.log(response.data.orders.length);
            if(response.data.orders.length > 0){
                var i=0;
                response.data.orders.forEach(async element => {
                    i++
                    console.log(element.id)
                    since_id=element.id;
                    var configd = {
                        method: 'delete',
                        url: 'https://SHOPIFYURL.myshopify.com/admin/api/2022-10/orders/'+since_id+'.json',
                        headers: { 
                          'X-Shopify-Access-Token': 'TOKEN', 
                          'Content-Type': 'application/json'
                        }
                      };
                      
                      await axios(configd)
                      .then(function (response) {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    // if(i == 4){
                    //     i=0
                    //     console.log('sleeping')
                    await new Promise(resolve => setTimeout(resolve, 500));
                    // }
                });
            }else{
                since_id = ''
            }
            count = count+250
        })
        .catch(function (error) {
            console.log(error);
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(since_id)
    } while (since_id != '');
}

console.log('starting')
getData();

console.log('ending')
