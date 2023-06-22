## Available Scripts

In the project directory, you can run:

### `npm start`

Live Ticker program
You need to consume a web service using web sockets, and present it in the form of charts
real-time.

<img width="1020" alt="Screenshot 2023-06-22 at 08 52 16" src="https://github.com/EgorKazachenko/order-book-bitfinex/assets/23015635/1558f629-bbca-4e3d-be56-e73df11f0f94">

Task:
Orderbook holds the information of all the buy and sale price details of a trade with its
corresponding price, amount and quantity.

https://trading.bitfinex.com/t?demo=true

Recreate the order book widget present in the above url by using,
1. React.js components.
2. SCSS for styling the charts.
3. Redux / Redux saga for data management.
4. Please use redux state mangement to solve this problem.
5. Use the right data structure for storing and retrieving data easily and fast.

Api details:

Web service url : wss://api-pub.bitfinex.com/ws/2
Verbs:
{
  "event": "subscribe",
  "channel": "book",
  "symbol": "tBTCUSD"
}

Once you subscribe to the web socket, onMessage callback will start receiving
Acknowledgement, and then stream of data.
Data is composed of the items displayed on the order book.
Maintain the store in such a way that, even if we refresh the page, the trades of old data is
retained.

For more details visit,
https://docs.bitfinex.com/docs/ws-general
