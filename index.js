//index.js
const api = require('./api');
const symbol = process.env.SYMBOL;
const profitability = process.env.PROFITABILITY;

console.log('Iniciando monitoramento!');
setInterval(async () => {

    let buy = 0, sell = 0;

    console.log('Mercado');
    const mercado = await api.depth('BNBBUSD');
    console.log(mercado.bids.length ? `Compra (Maior bids): ${mercado.bids[0][0]}` : 'Sem Compras'); //Maior preço de compras
    console.log(mercado.asks.length ? `Venda (Menor asks): ${mercado.asks[0][0]}` : 'Sem Vendas'); //Menor preço de vendas

    mercado.bids ? buy = parseInt(mercado.bids[0][0]) : buy = 0;
    mercado.asks ? buy = parseInt(mercado.asks[0][0]) : asks = 0;


    // // COMPRAR  
    // if (sell < 290.40) {

    //     console.log('Consultar carteira - Bom de comprar');
    //     const carteira = await api.accountInfo();
    //     const coins = carteira.balances;
    //     // const coins = carteira.balances.filter(b => b.asset === 'BUSD' || b.asset === 'BNBBUSD');
    //     console.log('--------------------------------------');
    //     console.log(coins);
    //     console.log('--------------------------------------');
       
    //     console.log('Verificando se tenho grana...');
    //     const totalCoin = parseInt(coins.find(c => c.asset === 'BUSD').free);
    //     console.log(`Total Coin:  ${totalCoin}}`);

    //     if (sell <= totalCoin) {
    //         // console.log(await api.newOrder(symbol, 1)) //situação geral da operação

    //         // const buyOrder = await api.newOrder(symbol, 1)
    //         // console.log(`orderId: ${buyOrder.orderId}`)
    //         // console.log(`status: ${buyOrder.status}`)
            
    //         // console.log('Posicionando venda futura!!!');
    //         // const price = parseInt(sell * profitability);


    //         // console.log(`Vendendo por ${price} (${profitability})`)
    //         // const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'LIMIT');
    //         // console.log(`orderId: ${sellOrder.orderId}`)
    //         // console.log(`status: ${sellOrder.status}`)
    //     }

    // // VENDER
    // } else if (buy > 1000) {
    //     console.log('Bom para vender');
    
    // // AGUARDANDO MERCADO
    // } else {
    //     console.log('Aguardando mercado');
    // }


}, process.env.CRAWLER_INTERVAL);













// const api = require('./api');
// const symbol = process.env.SYMBOL;

// setInterval(async () => {

//     let buy = 0, sell = 0;

//     const result = await api.depth('BNBBUSD');

//     if (result.bids) {
//         console.log(`Highest buy (Maior preco de compras): ${result.bids[0][0]}`); //Maior preço de compras
//         const buy = parseInt(result.bids[0][0]);
//     }

//     if (result.asks) {
//         console.log(`Lowest sell (Menor preco de vendas): ${result.asks[0][0]}`); //Menor preço de vendas
//         const sell = parseInt(result.asks[0][0]);
//     }


//     // console.log(await api.accountInfo());


//     // if (sell < 700) {
//     //     //Bom para comprar
//     // } else if (buy > 1000) {
//     //     //Bom para vender
//     // } else {
//     //     //Aguardando mercado
//     // }


// }, process.env.CRAWLER_INTERVAL);

// // bids => O que as pessoas querem pagar = Ordem de compra
// // asks => O que as pessoas querem vender = Ordem de venda
