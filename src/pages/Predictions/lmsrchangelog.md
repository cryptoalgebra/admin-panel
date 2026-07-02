# Changelog: `main` → `feature/singleton`

## Architecture change: per-market contracts → singleton manager

**Old (`main`):** Each market was a separate `BinaryLMSRMarket` contract deployed via `BinaryLMSRMarketFactory`. Each market had its own address.

**New (`feature/singleton`):** A single `BinaryLMSRMarketManager` contract stores **all** markets. Markets are identified by sequential `uint256 marketId` (0-based).

|            | Old (`ILMSRMarket`)                       | New (`IBinaryLMSRMarketManager`)          |
| ---------- | ----------------------------------------- | ----------------------------------------- |
| Deploy     | Factory deploys a new contract per market | Owner calls `createMarket()` on singleton |
| Market ID  | contract `address`                        | `uint256 marketId`                        |
| Collateral | ERC20 only                                | ERC20 **or native ETH** (`address(0)`)    |

---

## Function signature changes (all functions now take `marketId` as first param)

### Market creation

| Old                                          | New                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Factory.createMarket(…)` → deploys contract | `createMarket(CreateMarketParams) → uint256 marketId`                                  |
| —                                            | **NEW** `createAndSeed(CreateMarketParams, uint256 amount) payable → uint256 marketId` |
| —                                            | **NEW** `batchCreateAndSeed(CreateMarketParams[], uint256[]) payable → uint256[]`      |

**`CreateMarketParams` struct (new):**

```solidity
struct CreateMarketParams {
    address collateralToken;   // address(0) = native ETH
    address pool;              // NEW: associated pool address (emitted in event, not stored)
    string  question;
    string  customConfig;      // NEW: arbitrary config string (emitted in event, not stored)
    uint256 tradingDeadline;
    uint256 plannedResolutionTimestamp; // NEW: emitted in event, not stored
    uint256 b;
    uint256 feeBps;
    address protocol;
}
```

### Reading market state

| Old                 | New                                       | Notes                            |
| ------------------- | ----------------------------------------- | -------------------------------- |
| `collateralToken()` | `getMarket(marketId).collateralToken`     | Bundled into `MarketView`        |
| `protocol()`        | `getMarket(marketId).protocol`            |                                  |
| `question()`        | `getMarket(marketId).question`            |                                  |
| `tradingDeadline()` | `getMarket(marketId).tradingDeadline`     |                                  |
| `b()`               | `getMarket(marketId).b`                   |                                  |
| `feeBps()`          | `getMarket(marketId).feeBps`              |                                  |
| `seeded()`          | `getMarket(marketId).seeded`              |                                  |
| `outcome()`         | `getMarket(marketId).outcome`             |                                  |
| `qYes()`            | `getMarket(marketId).qYes`                |                                  |
| `qNo()`             | `getMarket(marketId).qNo`                 |                                  |
| `accruedFees()`     | `getMarket(marketId).accruedFees`         |                                  |
| —                   | `getMarket(marketId).accountedCollateral` | **NEW** field                    |
| —                   | `marketCount()`                           | **NEW**: total number of markets |

**`MarketView` struct (new):**

```solidity
struct MarketView {
    address collateralToken;
    address protocol;
    string  question;
    uint256 tradingDeadline;
    uint256 b;
    uint256 feeBps;
    bool    seeded;
    Outcome outcome;
    uint256 qYes;
    uint256 qNo;
    uint256 accruedFees;
    uint256 accountedCollateral; // NEW
}
```

### Trading — signatures

| Old                                                     | New                                                               |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| `buyYes(shares, maxTotalCost) → totalCost`              | `buyYes(marketId, shares, maxTotalCost) payable → totalCost`      |
| `buyNo(shares, maxTotalCost) → totalCost`               | `buyNo(marketId, shares, maxTotalCost) payable → totalCost`       |
| `sellYes(shares, minPayout) → payout`                   | `sellYes(marketId, shares, minPayout) → payout`                   |
| `sellNo(shares, minPayout) → payout`                    | `sellNo(marketId, shares, minPayout) → payout`                    |
| `previewBuyYes(paymentUpTo) → (shares, totalCost, fee)` | `previewBuyYes(marketId, paymentUpTo) → (shares, totalCost, fee)` |
| `previewBuyNo(paymentUpTo) → (shares, totalCost, fee)`  | `previewBuyNo(marketId, paymentUpTo) → (shares, totalCost, fee)`  |

> **Note:** `buyYes` and `buyNo` are now `payable` to support native ETH collateral.

### Balances

| Old                            | New                                      |
| ------------------------------ | ---------------------------------------- |
| `yesBalance(trader) → uint256` | `yesBalance(marketId, trader) → uint256` |
| `noBalance(trader) → uint256`  | `noBalance(marketId, trader) → uint256`  |

### Seeding

| Old            | New                              |
| -------------- | -------------------------------- |
| `seed(amount)` | `seed(marketId, amount) payable` |

### Resolution & Redemption

| Old                                          | New                                                           |
| -------------------------------------------- | ------------------------------------------------------------- |
| `resolve(winningOutcome, leftoverRecipient)` | `resolve(marketId, winningOutcome, leftoverRecipient)`        |
| —                                            | **NEW** `batchResolve(marketIds[], outcomes[], recipients[])` |
| `redeem()`                                   | `redeem(marketId)`                                            |

### Fee withdrawal

| Old                        | New                                                       |
| -------------------------- | --------------------------------------------------------- |
| `withdrawFees(to, amount)` | `withdrawFees(marketId, to, amount)`                      |
| —                          | **NEW** `batchWithdrawFees(marketIds[], to[], amounts[])` |

### Price queries

| Old                    | New                            |
| ---------------------- | ------------------------------ |
| `priceYes() → uint256` | `priceYes(marketId) → uint256` |
| `priceNo() → uint256`  | `priceNo(marketId) → uint256`  |
| `maxLoss() → uint256`  | `maxLoss(marketId) → uint256`  |

---

## Events — all now include `marketId`

| Old                                         | New                                                                                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| —                                           | **NEW** `MarketCreated(marketId, creator, protocol, pool, collateralToken, question, customConfig, tradingDeadline, plannedResolutionTimestamp, b, feeBps)` |
| `Seeded(amount)`                            | `Seeded(marketId, amount)`                                                                                                                                  |
| `BoughtYes(trader, shares, totalCost, fee)` | `BoughtYes(marketId, trader, shares, totalCost, fee)`                                                                                                       |
| `BoughtNo(trader, shares, totalCost, fee)`  | `BoughtNo(marketId, trader, shares, totalCost, fee)`                                                                                                        |
| `SoldYes(trader, shares, payout, fee)`      | `SoldYes(marketId, trader, shares, payout, fee)`                                                                                                            |
| `SoldNo(trader, shares, payout, fee)`       | `SoldNo(marketId, trader, shares, payout, fee)`                                                                                                             |
| `Resolved(outcome)`                         | `Resolved(marketId, outcome)`                                                                                                                               |
| `Redeemed(trader, payout)`                  | `Redeemed(marketId, trader, payout)`                                                                                                                        |
| `FeesWithdrawn(to, amount)`                 | `FeesWithdrawn(marketId, to, amount)`                                                                                                                       |
| `LeftoverWithdrawn(to, amount)`             | `LeftoverWithdrawn(marketId, to, amount)`                                                                                                                   |

---

## Errors — new additions

| Error                      | Description                                 |
| -------------------------- | ------------------------------------------- |
| `MarketIndexOutOfBounds()` | `marketId` >= market count                  |
| `InvalidNativeValue()`     | `msg.value` mismatch for native ETH markets |
| `NativeTransferFailed()`   | Native ETH send failed                      |
| `ArrayLengthMismatch()`    | Batch call arrays have different lengths    |

**Removed:** `ZeroCollateralToken` (native ETH now valid), `TransferFailed` (replaced by `NativeTransferFailed` + SafeERC20)

---

## Access control

| Role                      | Permissions                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| **Owner** (deployer)      | `createMarket`, `createAndSeed`, `batchCreateAndSeed`                  |
| **Protocol** (per-market) | `seed`, `resolve`, `batchResolve`, `withdrawFees`, `batchWithdrawFees` |
| **Anyone**                | `buyYes`, `buyNo`, `sellYes`, `sellNo`, `redeem`, all view functions   |

---

## Native ETH collateral support

When `collateralToken = address(0)`, the market uses native ETH. Buyers send ETH via `msg.value`. All `buy*` and `seed` functions are `payable`. Payouts and fee withdrawals are sent via low-level `call`.

---

## Migration notes for integrators

1. **Contract address:** Replace per-market addresses with single manager address + `marketId`
2. **ABI:** Switch from `ILMSRMarket` to `IBinaryLMSRMarketManager`
3. **State queries:** Replace individual getters with `getMarket(marketId)` returning `MarketView`
4. **Event indexing:** Filter events by `marketId` (first indexed param) instead of contract address
5. **Approvals:** ERC20 `approve()` goes to the manager contract, not individual markets
6. **Factory removed:** No more `BinaryLMSRMarketFactory` — use `createMarket()` / `createAndSeed()` on the manager
