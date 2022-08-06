const api = require('./api');
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);

console.log('Iniciando monitoramento!');
setInterval(async () => {

    let buy = 0, sell = 0;

    console.log('Mercado');
    const mercado = await api.depth('BNBBUSD');
    console.log(mercado.bids.length ? `Compra (Maior bids): ${mercado.bids[0][0]}` : 'Sem Compras'); //Maior preço de compras
    console.log(mercado.asks.length ? `Venda (Menor asks): ${mercado.asks[0][0]}` : 'Sem Vendas'); //Menor preço de vendas

    mercado.bids ? buy = parseInt(mercado.bids[0][0]) : buy = 0;
    mercado.asks ? sell = parseInt(mercado.asks[0][0]) : asks = 0;

    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*');
    console.log(sell);
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*');


    //--COMPRAR  
    if (sell < 400.40) {

        console.log('Consultar carteira - Bom de comprar');
        const carteira = await api.accountInfo();
        const coins = carteira.balances;
        //--const coins = carteira.balances.filter(b => b.asset === 'BUSD' || b.asset === 'BNBBUSD');
        // console.log('----------------Resultado da carteira----------------');
        // console.log(coins);
        // console.log('-----------------------------------------------------');


        ////--POSICIONANDO COMPRA
        console.log('Verificando se tenho grana...');
        const totalCoin = parseInt(coins.find(c => c.asset === 'BUSD').free);
        console.log(`Total Coin:  ${totalCoin}}`);

        if (sell <= totalCoin) {
            // //--Ordem de compra: console.log(await api.newOrder(symbol, 1)) //situação geral da operação
            // const buyOrder = await api.newOrder(symbol, 1)
            // console.log(`orderId: ${buyOrder.orderId}`)
            // console.log(`status: ${buyOrder.status}`)


            ////--POSICIONANDO VENDA
            // console.log('Posicionando venda futura!!!');
            // const price = parseInt(sell * profitability);
            // console.log(`Vendendo por ${price} (${profitability})`)
            // const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'MARKET');
            // console.log(`orderId: ${sellOrder.orderId}`)
            // console.log(`status: ${sellOrder.status}`)
        }

        console.log('----------------Resultado da carteira----------------');
        console.log(coins);
        console.log('-----------------------------------------------------');

        //--VENDER
    } else if (buy > 1000) {
        console.log('Bom para vender');

        //--AGUARDANDO MERCADO
    } else {
        console.log('Aguardando mercado');
    }

}, process.env.CRAWLER_INTERVAL);
