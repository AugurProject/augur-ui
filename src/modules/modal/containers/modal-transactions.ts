import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Transactions } from "modules/modal/transactions";
import { augur } from "services/augurjs";

import { closeModal } from "modules/modal/actions/close-modal";

const exampleTransactions = [
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription: "Another Ethereum Hard Fork this year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.05",
    quantity: "4.86",
    total: "0.243",
    transactionHash:
      "0x798c48477cb1e9763aa64b3b15859a5157283ca426698bd708ca43596ae4e73e",
    timestamp: 1537823391
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription: "Another Ethereum Hard Fork this year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "2.43",
    total: "0.243",
    transactionHash:
      "0xf2007be2c8872781ca3b034a8307521f82649022dd740ec2d8440384a85aab41",
    timestamp: 1537823406
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will Ethereum trade at $2000 or higher at any time before the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.9",
    quantity: "0.001",
    total: "0.0009",
    transactionHash:
      "0x33a1324388f91d67b9275a0051cad549922cf0dcb9c5bcce5bb29883c60e1925",
    timestamp: 1538438294
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.00001355",
    total: "0.000542",
    transactionHash:
      "0x4ccea651b69bd161868e2f0c13d4a6c95b537dbcac4337363b5f2bf744147c2d",
    timestamp: 1549997512
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.000000014",
    total: "0.00000056",
    transactionHash:
      "0x5f3b54a816a931a249e2882b2b3478c8d40ef7af62bd490f12eec1fff939e7d1",
    timestamp: 1549997917
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.00001",
    total: "0.0004",
    transactionHash:
      "0xea9f80f826ec1ffa1a9d8ba92eb5b8d17b80ee438b0a71a124a761ff87655457",
    timestamp: 1550000182
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.00001",
    total: "0.0004",
    transactionHash:
      "0x6ca0972b6cb98a86e219383eb578cdd12ae1502b68c0063d1f1e123cde54e7d5",
    timestamp: 1550000392
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.0001",
    total: "0.004",
    transactionHash:
      "0x99b9304d2a2c18a1e88597985e3b12cfb1527c8f4e7fb47fb0be9c98eecb9b0f",
    timestamp: 1550000497
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.0001",
    total: "0.004",
    transactionHash:
      "0xb5f0935c1a6cba26ed40d0cc76678ea0d3d0d109a143e765988314c46d618db2",
    timestamp: 1550001262
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.0001",
    total: "0.004",
    transactionHash:
      "0x175a29fa5c7c2a12a3779df31f0597ea1441d66a9a2d557cc4998bec00412678",
    timestamp: 1550001262
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Donald Trump: FiveThirtyEight Approval Rating on March 31, 2019 {33.80% ... 49.20%}, Scalar",
    outcome: 1,
    outcomeDescription: "Percent",
    price: "40",
    quantity: "0.0001",
    total: "0.004",
    transactionHash:
      "0xcfc63e3e0a33fa522e61c54eb4d40a0b35b2cc24a503ba6605adcbf057bce1dd",
    timestamp: 1550001397
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the ex-president of Argentina, CFK, go to jail before the end of the year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "0.1",
    total: "0.01",
    transactionHash:
      "0xd16a8669ccc880f09619720b1745c8dd7d529965a3413abb68ab10c93fefdbd2",
    timestamp: 1550015992
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01094257010536",
    total: "0.006565542063216",
    transactionHash:
      "0xf239f9f5d9180807a07ce352b2275cf953ec87649970caa16c6e3a140c587c69",
    timestamp: 1551402412
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01229195860068",
    total: "0.007375175160408",
    transactionHash:
      "0x2e519b7671c8ef6f671c8643320ecd98736d896ff5bf7e72a8c41fe6b7353a78",
    timestamp: 1551402577
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.02458391720136",
    total: "0.014750350320816",
    transactionHash:
      "0xb6e8caa3c02f8f6d3a51d1856bf96bce1ab93a6d2fe45e4d738793f1bc545f15",
    timestamp: 1551402607
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01226662741345",
    total: "0.00735997644807",
    transactionHash:
      "0x02814c5ebf1366ca109ac7b543b510b1eaae0d0a4712be773ded874c0583cd21",
    timestamp: 1551414832
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01245361030162",
    total: "0.007472166180972",
    transactionHash:
      "0x9b53fb8baf7acab7bf30a927967ae1c5a47b7e77a17b03b4226f0e15d5ae52c7",
    timestamp: 1551582247
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01272167519018",
    total: "0.007633005114108",
    transactionHash:
      "0x4b06daaea26c2f4a345c3a1de9b8ad54e8d8675bdd565d755c89b05834ea40b6",
    timestamp: 1551660264
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01281656926074",
    total: "0.007689941556444",
    transactionHash:
      "0x14e61f51b296a98e772f54ebc98522b6407bbc859ff1eb926b998166344f605f",
    timestamp: 1551660399
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.0128234720833",
    total: "0.00769408324998",
    transactionHash:
      "0x53c82a3901e8196b6ee25df125e4da5c3ae8c068a808515883f3c1aa7fe59322",
    timestamp: 1551660489
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01278118609406",
    total: "0.007668711656436",
    transactionHash:
      "0xc70722d052d17d25e21fcefd59aad48866da88edb9221f5b4d8b502a1ed18203",
    timestamp: 1551660924
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.0127870697151",
    total: "0.00767224182906",
    transactionHash:
      "0xedd9c5662853a1b20b3661cd293a5892e123d20c170ceb4104970f0b60fa931e",
    timestamp: 1551665290
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01301278086992",
    total: "0.007807668521952",
    transactionHash:
      "0xcafa2bf6db44ecb3a9a5dc77b9559f3aa5f2a7fedd9f90ece6905aca9e7df343",
    timestamp: 1551667315
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01424833553534",
    total: "0.008549001321204",
    transactionHash:
      "0x9cbd06f14231a9f75548c1ba7d36bc0dd6839d9e5c82236a31763f5122e6aa02",
    timestamp: 1551669355
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01201980864464",
    total: "0.007211885186784",
    transactionHash:
      "0xff86c79b1b1008b7a77a01c5e0354859636ff4f8c866a627b5b25d5a96f36bb5",
    timestamp: 1551927043
  },
  {
    action: "SELL",
    coin: "ETH",
    details: "Sell order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.01214948729163",
    total: "0.007289692374978",
    transactionHash:
      "0x73911bf67d951fff1eff614132eb8ee6ee711058f77468975300a53b1b6bd53c",
    timestamp: 1552938657
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "fdfd",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x79a260e977c107a89d242f06579c3ca9accd4f4543d67735af0846728b360934",
    timestamp: 1533058492
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "Test YesNo Market 9/12/2018",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0xb8846d24f90b7463d458947b31219d5fa8e5bdcf0ab5d65f8e6507b1d0b21f48",
    timestamp: 1536792020
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "Test market ",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x1219f2d20d46dc196f6eeaf51a34042279498cbd33e5c010af27147e4719d3e1",
    timestamp: 1536792890
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "asdf",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x38d1336252fd9feda2db2f41bee44fdf1cfd87d8e5d5b467050493c8ef4fe865",
    timestamp: 1536793235
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.02",
    marketDescription: "aa test",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x1b847e93eefb39d8ffc33cb5a635eb37cbe31f765ec6a7d7872231b803a0ca48",
    timestamp: 1538614482
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.02",
    marketDescription: "bb test",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x4296faf84937eacca2975cfcccd90b209a8d87c542e1d8f6a502f95271992e1a",
    timestamp: 1538688754
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.027658847436695979",
    marketDescription: "dds",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x73365f3bff0de9c2c1998a97d077c6915619e2144885e254589a63796d6340bc",
    timestamp: 1540934161
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.027658847436695979",
    marketDescription: "gfgf",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0xc163776c30e0db2035fee54bac3e68cbe18134120645dc2d882a12a318e4511b",
    timestamp: 1540934356
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "test cat market 12-3",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x8d827515df6e9c0625ccd2838b48602c50fff620d25d0038dcc24ba7406d76e5",
    timestamp: 1543881562
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "cat test",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x9973ccb52a7a0698818f25756d07d5499553853293c54256a9698e41c8f7e524",
    timestamp: 1544045028
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "s",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x1dce100ec7b8320b440d544c650ed9e02045afcd09c04d52806d3b8faeb23d9d",
    timestamp: 1544745072
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "f",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x6fe4c03ddc798af87151fb4e3fe42642439a815a0840013d277ed982cc41d1c3",
    timestamp: 1544745792
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "c",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0xfe794052116d9afb900f878b589a99477723c4dd8e7d235be71941de52a1eb09",
    timestamp: 1544748072
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "f",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0xb183841d76fe65f0fa85cbb0d100944d03acefee5be543a44aabc645ccac289d",
    timestamp: 1544817653
  },
  {
    action: "MARKET_CREATION",
    coin: "ETH",
    details: "ETH validity bond for market creation",
    fee: "0.01",
    marketDescription: "question",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x8dc82488593aef709342058a8f161da8ecd133f197f746951c597440dedabe57",
    timestamp: 1552325633
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "When will earth stop booking",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0xdae50daa8335fe2bd128d0f30ac1431cd67db6053b84c34c7a6209ba941ef0d0",
    timestamp: 1533753278
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "fdfd",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0xad8f1a11e4a2a56fdd9be39e20b5dfa94d45e4a22577c4d42fc1c6abcece3104",
    timestamp: 1533753278
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Test",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xe39122dbf9e3fb0569b3f1b8fecd3ca0f355e11896e90a1c8b73b929d551e193",
    timestamp: 1542657962
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "s",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0x63cf067d5037faa70bace7b0f8750c9847d39a16951f26adc7fcd9d4841b331d",
    timestamp: 1544813207
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "when will earth stop rotating",
    outcome: 0,
    outcomeDescription: "2019",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xa2531800c92f03f261c69d840ca025af4754ade9bb192967fa8ec2fb0e3295c8",
    timestamp: 1547414327
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Test hello",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0x962cec359ce7d8e2489770fc9522559f87231151e181980398e8122162432556",
    timestamp: 1547414357
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "testing test mctester",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xf733156fdd0c2eedc19297c38ab83c9a9eeafc95c1039f47903f82e5f414a326",
    timestamp: 1547414387
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "GAS-WETH-08/31/18",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xbe54b9ce86c6c7adf669781d790768fd3551d03c6245f3c67fdad10fbb9d0443",
    timestamp: 1547414402
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "asdf",
    outcome: 950000,
    outcomeDescription: "dollars",
    price: "0",
    quantity: "4.16790997540509259",
    total: "0",
    transactionHash:
      "0x5ec033df132c1b2738ec46e276d921d9a2655476bf0413618d4fb4909493a60f",
    timestamp: 1549063873
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "1-24 test scalar",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0x2861f444847c4153b70b9a5b37d0c687500a84bd3518996945e689d6e618ada4",
    timestamp: 1549064488
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "What kind of test market is this?",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xfbb8ad3384606bc58c26df097bd6c6017331708041bb74e74cd6601b7db7d041",
    timestamp: 1549064563
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "who is going to win the NBA, warriors or cavs?",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0x493192eb096a3d4a3ea616af6435b21a054f4db2346b67ec55ea37458442c76e",
    timestamp: 1549064743
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription:
      "will Augur reach a 400million market cap before the end of august 2018?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0xc5fc927d18d8d2df81363eabe89139fdfb0a2715d18cfe7b7f68683e0ec3f964",
    timestamp: 1549065073
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Fee test",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0xe4bc1fef6e03f8785d860b3b082d0f29acec3b929a959bdc9c4f95db5d537a69",
    timestamp: 1549068853
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Will the office door open before 8:30",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0x4c865c78fd0af205091ce4b7713ada780247eb3221d0126451b1c92b6ace8fe4",
    timestamp: 1549069093
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Fee test",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0xfc0b5f521c9adee3f758a7fdebb553bcd8f08d5f933de047c637cd53259ddde7",
    timestamp: 1549069618
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Test with fee",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0x335cff720f009b69d874e1b6310ac9b22702cf848d415c95bdff80cc00f61b24",
    timestamp: 1549069933
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Who will win 2018 US Open",
    outcome: 0,
    outcomeDescription: "Roger Federer",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xc7c0b1f794b891f1bd9b8c8457a791aafb802c926263fe3e5c1e76b9f8c5d8d2",
    timestamp: 1549070143
  },
  {
    action: "INITIAL_REPORT",
    coin: "REP",
    details: "REP staked in initial reports",
    fee: "0",
    marketDescription: "Test with fee # 2",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "3.49680582682291667",
    total: "0",
    transactionHash:
      "0x81646ac80f45959d071580644e8648ad9db10ff4b166802d2ec7b3c42dee7372",
    timestamp: 1549071268
  },
  {
    action: "DISPUTE",
    coin: "REP",
    details: "REP staked in dispute crowdsourcers",
    fee: "0",
    marketDescription:
      "High temperature (in degrees Fahrenheit) on Mon Jul 23 2018 at the San Francisco International Airport, as reported by Weather Underground",
    outcome: 1050,
    outcomeDescription: "degrees Fahrenheit",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0x0fceb6b67eb7b3bdcab57ff9736391e507212893ac65deca1547ecd2cb65d7a4",
    timestamp: 1533753293
  },
  {
    action: "DISPUTE",
    coin: "REP",
    details: "REP staked in dispute crowdsourcers",
    fee: "0",
    marketDescription: "Will I win the lottery today?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xb0b61f181e388363b44b97e8aa3fb1903da39aed61c3508d29e2a4b2c0f87ca4",
    timestamp: 1545067530
  },
  {
    action: "DISPUTE",
    coin: "REP",
    details: "REP staked in dispute crowdsourcers",
    fee: "0",
    marketDescription: "Cat test 3b",
    outcome: null,
    outcomeDescription: "Invalid",
    price: "0",
    quantity: "6.99361165364583334",
    total: "0",
    transactionHash:
      "0xf750ebb0d039c623385f8227f7a6cbe49f5efbc5485ac0e38b5a7b0e389726d8",
    timestamp: 1545168558
  },
  {
    action: "DISPUTE",
    coin: "REP",
    details: "REP staked in dispute crowdsourcers",
    fee: "0",
    marketDescription: "test 2 cat 3 1-25",
    outcome: 2,
    outcomeDescription: "C",
    price: "0",
    quantity: "0.02",
    total: "0",
    transactionHash:
      "0xab1875c52bcdc9a5b840922f71ee62c04346cf703103d78f20d1aa907fde5588",
    timestamp: 1549069798
  },
  {
    action: "COMPLETE_SETS",
    coin: "ETH",
    details: "Sell complete sets",
    fee: "10.819416656562",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: null,
    outcomeDescription: null,
    price: "10000",
    quantity: "0.10819416656562",
    total: "1071.122248999638",
    transactionHash:
      "0x44fac022d2df1c4d962865ca5a772e569bb5ee4b37fa14fd3d7f7a3b6060f003",
    timestamp: 1552415783
  },
  {
    action: "CLAIM_WINNING_CROWDSOURCERS",
    coin: "ETH",
    details: "Claimed reporting fees from crowdsourcers",
    fee: "0",
    marketDescription:
      "High temperature (in degrees Fahrenheit) on Mon Jul 23 2018 at the San Francisco International Airport, as reported by Weather Underground",
    outcome: 1050,
    outcomeDescription: "degrees Fahrenheit",
    price: "0",
    quantity: "0",
    total: "0.00383088778253136",
    transactionHash:
      "0x47c3402801014001a55fd220980aebe2b5a4c9fbae3c483a7937f84e4a9b8ac7",
    timestamp: 1540933921
  },
  {
    action: "CLAIM_WINNING_CROWDSOURCERS",
    coin: "REP",
    details: "Claimed REP fees from crowdsourcers",
    fee: "0",
    marketDescription:
      "High temperature (in degrees Fahrenheit) on Mon Jul 23 2018 at the San Francisco International Airport, as reported by Weather Underground",
    outcome: 1050,
    outcomeDescription: "degrees Fahrenheit",
    price: "0",
    quantity: "0",
    total: "10.49041748046875001",
    transactionHash:
      "0x47c3402801014001a55fd220980aebe2b5a4c9fbae3c483a7937f84e4a9b8ac7",
    timestamp: 1540933921
  },
  {
    action: "CLAIM_WINNING_CROWDSOURCERS",
    coin: "ETH",
    details: "Claimed reporting fees from crowdsourcers",
    fee: "0",
    marketDescription: "Will I win the lottery today?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0",
    quantity: "0",
    total: "0.00227539323682458",
    transactionHash:
      "0xf5b65f8a190f3130342ee53f6f282f10be0f88725552f1ecb83b8aacffcc5173",
    timestamp: 1548954658
  },
  {
    action: "CLAIM_WINNING_CROWDSOURCERS",
    coin: "REP",
    details: "Claimed REP fees from crowdsourcers",
    fee: "0",
    marketDescription: "Will I win the lottery today?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0",
    quantity: "0",
    total: "10.49041748046875001",
    transactionHash:
      "0xf5b65f8a190f3130342ee53f6f282f10be0f88725552f1ecb83b8aacffcc5173",
    timestamp: 1548954658
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0",
    marketDescription: "test cat",
    outcome: 2,
    outcomeDescription: "A",
    price: "0.3",
    quantity: "0.00001",
    total: "0",
    transactionHash:
      "0xdb7e4621433db6f808d820e5e149b5f724d5a2a5880fcfa8cab75a3832ca07d8",
    timestamp: 1542312820
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0",
    marketDescription: "test cat",
    outcome: 2,
    outcomeDescription: "D",
    price: "0.25",
    quantity: "0.00001",
    total: "0",
    transactionHash:
      "0xdb7e4621433db6f808d820e5e149b5f724d5a2a5880fcfa8cab75a3832ca07d8",
    timestamp: 1542312820
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.00001",
    marketDescription: "test cat",
    outcome: 2,
    outcomeDescription: "C",
    price: "0.25",
    quantity: "0.00001",
    total: "0.09999",
    transactionHash:
      "0xdb7e4621433db6f808d820e5e149b5f724d5a2a5880fcfa8cab75a3832ca07d8",
    timestamp: 1542312820
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.00000996099",
    marketDescription: "test scalar 8-1",
    outcome: 1,
    outcomeDescription: "Invalid",
    price: "0.0009",
    quantity: "0.000000996099",
    total: "0.09959993901",
    transactionHash:
      "0x73ba19dabbc33fdc75270ea3ac342631dae10167ca28b98a694e6576b9b4707d",
    timestamp: 1542312820
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.000002",
    marketDescription: "Will Srilanka win T20 against Pak?",
    outcome: 0,
    outcomeDescription: "Srilanka",
    price: "0.1",
    quantity: "0.000002",
    total: "0.019998",
    transactionHash:
      "0x53f8ba2a6aa5cde45d6da49c84719fe4904ccad67b516d1befd63daa2e0b292c",
    timestamp: 1543506602
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0",
    marketDescription: "Will Donald Trump be impeached by December 25th, 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.00016",
    total: "1.58384",
    transactionHash:
      "0x7b9d06111d7b335eca601215b32648de399fa88b76cd319c4bd1f80a84c4c72d",
    timestamp: 1548954568
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.01616",
    marketDescription: "Will Donald Trump be impeached by December 25th, 2018?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0.6",
    quantity: "0.00016",
    total: "1.58384",
    transactionHash:
      "0x7b9d06111d7b335eca601215b32648de399fa88b76cd319c4bd1f80a84c4c72d",
    timestamp: 1548954568
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.00001",
    marketDescription: "シェアとコンプリートセットの確認3",
    outcome: 0,
    outcomeDescription: "選択肢１",
    price: "0.5",
    quantity: "0.00001",
    total: "0.09999",
    transactionHash:
      "0x39cd354c4df22dc746bff05f14b75aa579c1e6d2ecd76dd2618acd6fe58eccb0",
    timestamp: 1548954613
  },
  {
    action: "CLAIM_TRADING_PROCEEDS",
    coin: "ETH",
    details: "Claimed trading proceeds",
    fee: "0.73629",
    marketDescription: "Another Ethereum Hard Fork this year?",
    outcome: 0,
    outcomeDescription: "No",
    price: "0.5",
    quantity: "0.00729",
    total: "72.16371",
    transactionHash:
      "0x4c9f41a72b991f9eb037ccfb5c4630633b3609754129fc5f6a5b5f745fcb0d71",
    timestamp: 1552415813
  },
  {
    action: "CLAIM_PARTICIPATION_TOKENS",
    coin: "ETH",
    details: "Claimed reporting fees from participation tokens",
    fee: "0",
    marketDescription: "",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x4dca5c28121a158bc65cf64ee7827eae8c2049076ff769796f10bd670eba032a",
    timestamp: 1540933906
  },
  {
    action: "CLAIM_PARTICIPATION_TOKENS",
    coin: "ETH",
    details: "Claimed reporting fees from participation tokens",
    fee: "0",
    marketDescription: "",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0.00718656453799553",
    transactionHash:
      "0x57d322e6fdeca2bc1199c435afa8d2e76384be8080b21c44ad5a328d2c3a4ab9",
    timestamp: 1540933906
  },
  {
    action: "CLAIM_PARTICIPATION_TOKENS",
    coin: "ETH",
    details: "Claimed reporting fees from participation tokens",
    fee: "0",
    marketDescription: "",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "0.0878453371974648",
    transactionHash:
      "0xb410a7d09e74b4ccd996a45f438f6127f9823d21a581e9f97d996252e7b02bb1",
    timestamp: 1548131818
  },
  {
    action: "CLAIM_PARTICIPATION_TOKENS",
    coin: "ETH",
    details: "Claimed reporting fees from participation tokens",
    fee: "0",
    marketDescription: "",
    outcome: null,
    outcomeDescription: null,
    price: "0",
    quantity: "0",
    total: "7.2902664880325495",
    transactionHash:
      "0xd63efc342fa7352ed72c15ce012b628f693bb163738d88f8b1a0eed2aa3c5017",
    timestamp: 1548131998
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "fdfd",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x9565f5b5a26c3d44d27b746353d320c142ef873989f777b13bf46e9519bc45c3",
    timestamp: 1533058972
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "fdfd",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x84de045b0bc13163efd7396af71e8c93fd062c86c345095491abb417b0fa23e2",
    timestamp: 1533080497
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "test test test 7-27",
    outcome: 1,
    outcomeDescription: "titanites",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x4635767fce6cf3c553e4906e88daac0b4ed6b8d41d387777363dd459f4ca2745",
    timestamp: 1533081367
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "test scalar 8-1",
    outcome: 1,
    outcomeDescription: "usd",
    price: "0.001",
    quantity: "0.00000201",
    total: "0",
    transactionHash:
      "0x5c377e80ea5c50e3888372197c06b790047460e9966c99648ba72124d62ebafa",
    timestamp: 1533162757
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "test test test 7-27",
    outcome: 1,
    outcomeDescription: "titanites",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xc7a4622d8d0c0be1abc6ced46551cd1a2624d631ea51654ae760348212afe16f",
    timestamp: 1533187837
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will the ex-president of Argentina, CFK, go to jail before the end of the year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.59",
    quantity: "0.5",
    total: "0",
    transactionHash:
      "0xd7607ef39189d03fcfdd334afd7365aaae76335d984a35631d72b23e1f02287f",
    timestamp: 1538592976
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will the ex-president of Argentina, CFK, go to jail before the end of the year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.5",
    total: "0",
    transactionHash:
      "0x0a3d938e4fbf89bbf86674790383f225d99fc34e923a743172d8bb0f80385f90",
    timestamp: 1538592976
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will California secede from the United States before January 1, 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.191",
    quantity: "0.1",
    total: "0",
    transactionHash:
      "0xf97c8fba12dc13f4050dbacca090071bd6ad92dce398cf2d8e4b0537e691cc07",
    timestamp: 1542656402
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.05",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x22d4abe06bebbb722e4833e74d90db2884df584ee3e02d8079c5633516dabccd",
    timestamp: 1542656447
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      '"A Star is Born" movie released October 5, 2018 , directed by Bradley Cooper will gross 150 million USD its first week after released?',
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "0.1",
    total: "0",
    transactionHash:
      "0x95638ea7bc824d5a3eab02c0cba93b8720ee6357ec3f3dbd28cdcf41dda5f76b",
    timestamp: 1542658307
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Scaler test",
    outcome: 1,
    outcomeDescription: "Pizzas",
    price: "109",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xb6a33bcb7685284cb727276d2dd41700cd6e944865a9174a6d4eeb7905f02d66",
    timestamp: 1542666527
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "fdfd",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x2c8dab8da13aa00c8269d1fa6045198f558bf7ecfb06ad5220b78ab507518c78",
    timestamp: 1542666662
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Scaler test",
    outcome: 1,
    outcomeDescription: "Pizzas",
    price: "11",
    quantity: "0.4",
    total: "0",
    transactionHash:
      "0x6c68b5daa940bf4b7277416f0933e6c914619b1734d2a9c0903fcdcf1952a692",
    timestamp: 1542666662
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.6",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x190bee702569646bc53a720371ed1a925f03f1df75c818dde4eb44755fd1fa25",
    timestamp: 1546890468
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.6",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xf6ecd5ab00ff22219f947d03ca1e23e2fa14ef529b9282a279f231c188a9e2d9",
    timestamp: 1547066230
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.00001",
    total: "0",
    transactionHash:
      "0x57b89bc47567d313ed1220bb831d3635dd292943dbb7c43a279ef631d19012e4",
    timestamp: 1547601599
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x68a56515bfa5df75c44ba0b9fb7ab4e335addf4344c95a8f39e75a98f916d7f4",
    timestamp: 1548442273
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Which city will have the lowest median single-family home price in 2018?",
    outcome: 0,
    outcomeDescription: "London",
    price: "0.2",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xbe63a4d838e74607863279f61e50feeaf70f8d4553bc8290e018a79ab71dd8f9",
    timestamp: 1548954718
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.6",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xab5943847ea4871f83ac80d415ffaee63a633e3581d9dd19d8b885c29978d9a0",
    timestamp: 1548954763
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.5",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x45bebc01d706e7668b70c3ff19a6f2a5569afdd9ea11780cea86bb7fcffa8037",
    timestamp: 1548954778
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.4",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xd55cf49e115088f97352479f7f597187e71d47f79574e964caf890db79cb6cf2",
    timestamp: 1548954883
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.3",
    quantity: "2",
    total: "0",
    transactionHash:
      "0x1db659ba878a18e7960224faf984c45227a9210566fb0216e2ef2497d896efd2",
    timestamp: 1548954898
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.3",
    quantity: "1.999",
    total: "0",
    transactionHash:
      "0x522785017cea801cf2c52b44d83d59d17a75e4ee9b709aec1c43e9578b81a87c",
    timestamp: 1548954898
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.2",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xbb0e93270ecc4856c8c7e2cf097b6ef7e9101a50924498df2a4aeb3951534169",
    timestamp: 1548954913
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.5",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xe4742c80a5ecb55e66c05c92789bfcee250cf136d1df70d90a374c0d966e2b11",
    timestamp: 1548954958
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.4",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x802d8c66654a1b74d058ce95945ca5a83753202ac132cfbc8143119821cc508d",
    timestamp: 1548954973
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.4",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x201e9b0c08a9cf95832b35baeb913c255702721a947727f1b7dc3c79424d1369",
    timestamp: 1548955348
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.3",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x3f1aabd4542d8e64349a48500bc700c510e19b861ab02c25ce235d285eb79e3e",
    timestamp: 1548955363
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.3",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x78397d1346bf8db7baee565ca9f20f5739f79bcd3b5a87fc4c2a9a479dee182f",
    timestamp: 1548955378
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.2",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xedf05f94efde02bc5736a194c7e244ff1a24b02fc786a7f3966466ff8a8a1e32",
    timestamp: 1548955393
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 2,
    outcomeDescription: "3",
    price: "0.2",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x33d97ef514bc192d861968022ccfaa8948f51d9d71beb0687c1d9949e0bd10a5",
    timestamp: 1548955453
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "test test test 7-27",
    outcome: 1,
    outcomeDescription: "titanites",
    price: "0.005",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xddc75a329dc819a2d1de8fc881eeecc39362033ff3272a664a74a2d1b51da5e5",
    timestamp: 1548959398
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Which city will have the lowest median single-family home price in 2018?",
    outcome: 0,
    outcomeDescription: "London",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x8c609440302f513e49b1cb0443c3338af957e07cc38912aa68e4089ea8094d83",
    timestamp: 1548959398
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "1.012345",
    total: "0",
    transactionHash:
      "0x26b8195be2dcfbdd3e43aa5dc53661e55af974ceef7c0c20a3862afc2fbe774a",
    timestamp: 1548959398
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x2bf9c40bccb7a473253ff3284c08e088da71984554142c15696502e1ca6231e7",
    timestamp: 1548959398
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.2",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xe0b6edf582e94d79c687782a14fedaa3c5a87de6ecad332ff3e9ba37fcd79066",
    timestamp: 1548959398
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 1,
    outcomeDescription: "2",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x177dcca9a531084081b2eb0f5840e69ae18599f338039936df6aae0ce1e64f31",
    timestamp: 1548959413
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 2,
    outcomeDescription: "3",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x85a45bec5192ac67b50ace25c156890ca0fa1a4e51f0e1c79b52a3cdd83da0c4",
    timestamp: 1548959413
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "0.1",
    total: "0",
    transactionHash:
      "0xc4bb4c85ef78ef1f593cfd280d40529514bc273f9a1633282fd937d901916ac0",
    timestamp: 1550006137
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Who will win French League?",
    outcome: 0,
    outcomeDescription: "PSG",
    price: "0.25",
    quantity: "0.0001",
    total: "0",
    transactionHash:
      "0x3d8557a19333743caef44f760667f579c848b128bf6acd7568d972456fad0a76",
    timestamp: 1550086432
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x55596f128fd2bde48e45466fa215ecf0e3ade2b1e1c671d821c26b3e3850a277",
    timestamp: 1551479782
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.1",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x06e490f1990a51249b43f049f5f95a2ee558b2d990846adef6eb277731e70037",
    timestamp: 1551479782
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.0001",
    quantity: "0.1",
    total: "0",
    transactionHash:
      "0xf03b2d835b5002b1a19c76deb6d6fae98fc15d9b121aee56cb4c76ba615bb5f2",
    timestamp: 1551479797
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Who will win French League?",
    outcome: 0,
    outcomeDescription: "PSG",
    price: "0.25",
    quantity: "0.0001",
    total: "0",
    transactionHash:
      "0x9b36162769cdfef4b940e35776e0847087bc4ed36b6ed3f991350929a0b9bb4b",
    timestamp: 1552415798
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.0022",
    quantity: "0",
    total: "0",
    transactionHash:
      "0x173d8c7a46d4dca53fb13058908b511d9d04a8d239a45755c2ab6e1cdfec5d04",
    timestamp: 1552423013
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.0048",
    quantity: "0",
    total: "0",
    transactionHash:
      "0xb0c42d313ebb9920b4d76fa6c7dcfad9ed047cf9b5a23aad2f0d2169049d4f5a",
    timestamp: 1552423013
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.001",
    quantity: "1",
    total: "0",
    transactionHash:
      "0xe2b53a9fb15a5678d7f979e8aa23b0140e34d08a7435e9f35b276be77be64c3c",
    timestamp: 1552423013
  },
  {
    action: "CANCEL",
    coin: "ETH",
    details: "Canceled order",
    fee: "0",
    marketDescription: "test 3-12",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.25",
    quantity: "1",
    total: "0",
    transactionHash:
      "0x18ce3c9f3d1d889b52dfe1f8c961e04157beadea609d1eeb72433606d4ac2891",
    timestamp: 1552528156
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "test scalar 8-1",
    outcome: 1,
    outcomeDescription: "usd",
    price: "0.0001",
    quantity: "0.000000001",
    total: "0.0000000099999",
    transactionHash:
      "0x3dd4a0b3bb108f906c51000ff7933ee7fa129c1ff7ca1ee561acd0afab1891c8",
    timestamp: 1533168382
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "test scalar 8-1",
    outcome: 1,
    outcomeDescription: "usd",
    price: "0.1",
    quantity: "0.00001",
    total: "0.000099",
    transactionHash:
      "0x8f6e96d6cf2af8da13e1375005c941c3cf22de536f13c5951a2e87ac23e06bf4",
    timestamp: 1533242812
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "test scalar 8-1",
    outcome: 1,
    outcomeDescription: "usd",
    price: "-1",
    quantity: "0.001",
    total: "0.011",
    transactionHash:
      "0xeb2433eb56610851e6766091686ff8aaa96fa4fb0ee5a49de63f0dd7d55f4733",
    timestamp: 1533242977
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will SpaceX successfully complete a manned flight beyond Earth orbit by the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.006",
    quantity: "1",
    total: "0.994",
    transactionHash:
      "0x1c87842bffc8567ec6eaa51905c2897b9d281dba04211754f3759b621252a475",
    timestamp: 1533243037
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will SpaceX successfully complete a manned flight beyond Earth orbit by the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.005",
    quantity: "0.001",
    total: "0.000995",
    transactionHash:
      "0xbf0d94b530accf9e0a45b0586befd767200028f6244693896ca4d4d934866df8",
    timestamp: 1535367805
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will Ethereum trade at $2000 or higher at any time before the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.002",
    quantity: "1",
    total: "0.998",
    transactionHash:
      "0x0e7fc986e9aff5174770fe08952959b3f407e7b8226d9d663615211018a21d51",
    timestamp: 1535480212
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will Ethereum trade at $2000 or higher at any time before the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.9011",
    total: "0.45055",
    transactionHash:
      "0xc3355ecf07c090e66f225769ab7a443836e273d6b4a3d3520cee50a5a1fd780d",
    timestamp: 1538020613
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the ex-president of Argentina, CFK, go to jail before the end of the year?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.5",
    total: "0.25",
    transactionHash:
      "0xcd86e95faa89e8d3c1ed354960614bad1be0231a91a3376ba76a242e89d23df2",
    timestamp: 1538347125
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Category 1",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.5",
    quantity: "0.01",
    total: "0.005",
    transactionHash:
      "0x684a5842fb5a01dc5a825be52455981c4efe85b22d94e420f7e4738440cf34cd",
    timestamp: 1538694694
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will SpaceX successfully complete a manned flight beyond Earth orbit by the end of 2018?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.0001",
    quantity: "0.0001",
    total: "0.00009999",
    transactionHash:
      "0x135369a015427e70297cda5bf98ee717fe48dfbf3c9db1decd0a373cded79873",
    timestamp: 1539096703
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will California secede from the United States before January 1, 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.18",
    quantity: "1",
    total: "0.82",
    transactionHash:
      "0xa2b900bf195cd21e73ec347d27485df37bc5446f25440ac7866dc51083b04d01",
    timestamp: 1542176494
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "cat test",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.3",
    quantity: "0.001",
    total: "0.0007",
    transactionHash:
      "0x2e7de6ea2d8eec312f1d9cde2f7f27aaa4ddaa321d9816356e16a1ba1df0ae3d",
    timestamp: 1546971363
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.00001",
    total: "0.000005",
    transactionHash:
      "0x002e67105606cc875650562e995b1465d8f2a2b25facc7495e9e018e739e26d9",
    timestamp: 1547631063
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will antibiotics be outlawed for agricultural use in China by the end of 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.78",
    quantity: "0.0001",
    total: "0.000022",
    transactionHash:
      "0xdb51b78f2d3db3fe3a3ab576d7dc62a3029ca31fc67182d069f66277ffcad34c",
    timestamp: 1550012917
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Compound have $50M AUM by 12 Mar. 2019",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.9",
    quantity: "0.0001",
    total: "0.00001",
    transactionHash:
      "0x6f4db01171956a6eb16264078c08d5390c1b7165df76c51c9081849da61c45c4",
    timestamp: 1550015662
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Compound have $50M AUM by 12 Mar. 2019",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.9",
    quantity: "1",
    total: "0.1",
    transactionHash:
      "0x6f4db01171956a6eb16264078c08d5390c1b7165df76c51c9081849da61c45c4",
    timestamp: 1550015662
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Srilanka win T20 against Pak?",
    outcome: 0,
    outcomeDescription: "Srilanka",
    price: "0.1",
    quantity: "0.4",
    total: "0.36",
    transactionHash:
      "0x13ed3b2699fd0ab1fe7f1249d6a70b09c4351c97c7dae374a3e108427f07d7fe",
    timestamp: 1550077447
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will Real Madrid beat FC Barcelona in semifinals of La Copa del Rey?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.001",
    quantity: "0.001",
    total: "0.000999",
    transactionHash:
      "0x5b531cf8de5532a2ec9d35542da18ab10895afbb50947061153b0a7d184adb90",
    timestamp: 1550080312
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.04862630683199",
    total: "0.024313153415995",
    transactionHash:
      "0xf7070a8d3fe5fea7a36805a22a14db66fa1b7c4723051578336ee42e9ee5161b",
    timestamp: 1550997198
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Category 1",
    outcome: 0,
    outcomeDescription: "1",
    price: "0.1",
    quantity: "0.1",
    total: "0.09",
    transactionHash:
      "0x1a25b5e10bf9074b90169f6931dad582e282b83484184958009c943fc1d30ef1",
    timestamp: 1551289383
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "hmm?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.0005",
    quantity: "0.0001",
    total: "0.00009995",
    transactionHash:
      "0x960a8446eac5c7e989862697acc7c1028f04902be45a0f1b4d56f2f196d9c994",
    timestamp: 1551475882
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.01497902935889",
    total: "0.007489514679445",
    transactionHash:
      "0xc9760c1fb6d8e94ec3afc7a75b4c93e5f74cccbe1fdad48863aa7ea8d5ba2a5d",
    timestamp: 1551581797
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.01494433236195",
    total: "0.007472166180975",
    transactionHash:
      "0x5a73bc956e78337e751945173a08d6285b851e2185331302756ba908c2e0ba0a",
    timestamp: 1551582187
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.01493428912783",
    total: "0.007467144563915",
    transactionHash:
      "0xaac46827d2f2aad29c36454f119dee129e4caad77e9c3e325bb4f5e0a4a4a662",
    timestamp: 1551582427
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription:
      "Will the Larsen B ice shelf collapse by the end of November 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.01471020888496",
    total: "0.00735510444248",
    transactionHash:
      "0xe5a00d93e91ac3f7a729e44936a853ce9a05caa5a61a59dd1dda1bfd39e8b417",
    timestamp: 1552272834
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.000024923899",
    total: "0.0000099695596",
    transactionHash:
      "0x15165ea81b8530c12af28f1ca1b8539ed1886d2fa946d0bf93f47fb4281521ec",
    timestamp: 1552303467
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.6",
    quantity: "0.00024899",
    total: "0.000099596",
    transactionHash:
      "0x15165ea81b8530c12af28f1ca1b8539ed1886d2fa946d0bf93f47fb4281521ec",
    timestamp: 1552303467
  },
  {
    action: "BUY",
    coin: "ETH",
    details: "Buy order",
    fee: "0",
    marketDescription: "Will Ethereum trade above $200 the 1st of May 2019?",
    outcome: 1,
    outcomeDescription: "Yes",
    price: "0.5",
    quantity: "0.1",
    total: "0.05",
    transactionHash:
      "0x36cb65bcfe0b234dae33ef8d263a2d859685e9409734fa1392802ae46c517536",
    timestamp: 1552303497
  }
];

const mapStateToProps = (state: any) => ({
  modal: state.modal,
  now: state.blockchain.currentAugurTimestamp,
  account: state.loginAccount.address,
  universe: state.universe.id
});

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal())
});

const mergeProps = (sP: any, dP: any, oP: any) => ({
  title: "Transactions History",
  closeAction: () => dP.closeModal(),
  currentTimestamp: sP.now,
  transactions: exampleTransactions,
  getTransactionsHistory: (
    startTime: number,
    endTime: number,
    coin: string,
    action: string,
    cb: Function
  ) => {
    console.log("calling getAccountTransactionHistory", {
      universe: sP.universe,
      account: sP.account,
      coin,
      action,
      earliestTransactionTime: startTime,
      latestTransactionTime: endTime
    });
    augur.augurNode.submitRequest(
      "getAccountTransactionHistory",
      {
        universe: sP.universe,
        account: sP.account,
        coin,
        action,
        earliestTransactionTime: startTime,
        latestTransactionTime: endTime
      },
      cb
    );
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Transactions)
);
