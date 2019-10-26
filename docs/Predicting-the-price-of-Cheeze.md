Overview:

## Join Discord <http://invite.augur.net/> special channel #cheeze-hack-a-thon

# Connect using Augur.js
Augur API docs: <https://docs.augur.net/#getting-started-with-augur-js> 
 * Glitch: <https://military-meteoroid.glitch.me>
 * Augur as a protocol <https://www.augur.net/>
 * Practice on Rinkeby

# Augur.js more details in glitch and docs
```
  const Augur = require('augur.js');
  const augur = new Augur();

  const augurNode = "wss://dev.augur.net/augur-node";
  const ethereumNode = {
    "http": "https://cloudflare-eth.com/",
    "ws": "",
    "pollingIntervalMilliseconds": 10000,
    "blockRetention": 100,
    "connectionTimeout": 60000
  }
  const useWeb3Transport = true; // needed for meta mask signing
  augur.connect({ ethereumNode, augurNode, useWeb3Transport }, function (err, connectionInfo) {
    ...
  });

```

## Key points
Augur API docs: <https://docs.augur.net/#create-market-functions> 
 * YesNo, Categorical and Scalar markets
 * YesNo market Outcomes
   - 0 is No
   - 1 is Yes
 * Categorical markets
   - max 8 outcomes
 * Scalar markets
   - behave like bounded futures markets

## Orders
 * only limit orders are supported (need quantity and price)
 * price time priority matching algo

```
  const orderTypes = ["buy", "sell"];
  augur.trading.getOrders({ marketId: marketId, outcome: outcomeId }, function (err, orderBook) {
  ...
  });
```


 
 
