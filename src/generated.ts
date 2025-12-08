import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraBasePlugin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraBasePluginAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_pool', internalType: 'address', type: 'address' },
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_pluginFactory', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'targetIsTooOld' },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  { type: 'error', inputs: [], name: 'transferFailed' },
  { type: 'error', inputs: [], name: 'volatilityOracleAlreadyInitialized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'baseFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'BaseFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newIncentive',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Incentive',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'priceChangeFactor',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PriceChangeFactor',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ALGEBRA_BASE_PLUGIN_MANAGER',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [
      { name: '', internalType: 'bytes4', type: 'bytes4' },
      { name: '', internalType: 'uint24', type: 'uint24' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [
      { name: '', internalType: 'bytes4', type: 'bytes4' },
      { name: '', internalType: 'uint24', type: 'uint24' },
      { name: '', internalType: 'uint24', type: 'uint24' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'collectPluginFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultPluginConfig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'secondsAgo', internalType: 'uint32', type: 'uint32' }],
    name: 'getSingleTimepoint',
    outputs: [
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secondsAgos', internalType: 'uint32[]', type: 'uint32[]' },
    ],
    name: 'getTimepoints',
    outputs: [
      { name: 'tickCumulatives', internalType: 'int56[]', type: 'int56[]' },
      {
        name: 'volatilityCumulatives',
        internalType: 'uint88[]',
        type: 'uint88[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'handlePluginFee',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'incentive',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targetIncentive', internalType: 'address', type: 'address' },
    ],
    name: 'isIncentiveConnected',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isInitialized',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimepointTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint16', type: 'uint16' },
      { name: 'amount', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'prepayTimepointsStorageSlots',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_baseFee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_feeFactors',
    outputs: [
      { name: 'zeroToOneFeeFactor', internalType: 'uint128', type: 'uint128' },
      { name: 'oneToZeroFeeFactor', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's_priceChangeFactor',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newBaseFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setBaseFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newIncentive', internalType: 'address', type: 'address' },
    ],
    name: 'setIncentive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPriceChangeFactor', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setPriceChangeFactor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'timepointIndex',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'timepoints',
    outputs: [
      { name: 'initialized', internalType: 'bool', type: 'bool' },
      { name: 'blockTimestamp', internalType: 'uint32', type: 'uint32' },
      { name: 'tickCumulative', internalType: 'int56', type: 'int56' },
      { name: 'volatilityCumulative', internalType: 'uint88', type: 'uint88' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'averageTick', internalType: 'int24', type: 'int24' },
      { name: 'windowStartIndex', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraEternalFarming
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const algebraEternalFarmingAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_deployer',
        internalType: 'contract IAlgebraPoolDeployer',
        type: 'address',
      },
      {
        name: '_nonfungiblePositionManager',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'anotherFarmingIsActive' },
  { type: 'error', inputs: [], name: 'claimToZeroAddress' },
  { type: 'error', inputs: [], name: 'emergencyActivated' },
  { type: 'error', inputs: [], name: 'farmDoesNotExist' },
  { type: 'error', inputs: [], name: 'incentiveNotExist' },
  { type: 'error', inputs: [], name: 'incentiveStopped' },
  { type: 'error', inputs: [], name: 'invalidPool' },
  { type: 'error', inputs: [], name: 'invalidTokenAmount' },
  { type: 'error', inputs: [], name: 'minimalPositionWidthTooWide' },
  { type: 'error', inputs: [], name: 'pluginNotConnected' },
  { type: 'error', inputs: [], name: 'poolReentrancyLock' },
  { type: 'error', inputs: [], name: 'positionIsTooNarrow' },
  { type: 'error', inputs: [], name: 'reentrancyLock' },
  { type: 'error', inputs: [], name: 'tokenAlreadyFarmed' },
  { type: 'error', inputs: [], name: 'zeroLiquidity' },
  { type: 'error', inputs: [], name: 'zeroRewardAmount' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newStatus', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'EmergencyWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bonusRewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pool',
        internalType: 'contract IAlgebraPool',
        type: 'address',
        indexed: true,
      },
      {
        name: 'virtualPool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minimalAllowedPositionWidth',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'EternalFarmingCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'rewardAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bonusRewardToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FarmEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
    ],
    name: 'FarmEntered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'farmingCenter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FarmingCenter',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'IncentiveDeactivated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardAmountsDecreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rewardAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardsAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bonusRewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsCollected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rewardRate',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'bonusRewardRate',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'incentiveId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RewardsRatesChanged',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FARMINGS_ADMINISTRATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INCENTIVE_MAKER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'addRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimReward',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimRewardFrom',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'collectRewards',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IAlgebraEternalFarming.IncentiveParams',
        type: 'tuple',
        components: [
          { name: 'reward', internalType: 'uint128', type: 'uint128' },
          { name: 'bonusReward', internalType: 'uint128', type: 'uint128' },
          { name: 'rewardRate', internalType: 'uint128', type: 'uint128' },
          { name: 'bonusRewardRate', internalType: 'uint128', type: 'uint128' },
          {
            name: 'minimalPositionWidth',
            internalType: 'uint24',
            type: 'uint24',
          },
        ],
      },
      { name: 'plugin', internalType: 'address', type: 'address' },
    ],
    name: 'createEternalFarming',
    outputs: [
      { name: 'virtualPool', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'deactivateIncentive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardAmount', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'decreaseRewardsAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enterFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'exitFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingCenter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'farms',
    outputs: [
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
      { name: 'innerRewardGrowth0', internalType: 'uint256', type: 'uint256' },
      { name: 'innerRewardGrowth1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRewardInfo',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'incentives',
    outputs: [
      { name: 'totalReward', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusReward', internalType: 'uint128', type: 'uint128' },
      { name: 'virtualPoolAddress', internalType: 'address', type: 'address' },
      { name: 'minimalPositionWidth', internalType: 'uint24', type: 'uint24' },
      { name: 'deactivated', internalType: 'bool', type: 'bool' },
      { name: 'pluginAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isEmergencyWithdrawActivated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'incentiveId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isIncentiveDeactivated',
    outputs: [{ name: 'res', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonfungiblePositionManager',
    outputs: [
      {
        name: '',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'numOfIncentives',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
    ],
    name: 'rewards',
    outputs: [
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newStatus', internalType: 'bool', type: 'bool' }],
    name: 'setEmergencyWithdrawStatus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_farmingCenter', internalType: 'address', type: 'address' },
    ],
    name: 'setFarmingCenterAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'rewardRate', internalType: 'uint128', type: 'uint128' },
      { name: 'bonusRewardRate', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setRates',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const algebraEternalFarmingAddress = {
  531050204: '0x50FCbF85d23aF7C91f94842FeCd83d16665d27bA',
} as const

/**
 *
 */
export const algebraEternalFarmingConfig = {
  address: algebraEternalFarmingAddress,
  abi: algebraEternalFarmingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const algebraFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_poolDeployer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultCommunityFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'DefaultCommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'DefaultFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'defaultPluginFactoryAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DefaultPluginFactory',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultTickspacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
    ],
    name: 'DefaultTickspacing',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token0',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'pool',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Pool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RenounceOwnershipFinish',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'finishTimestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RenounceOwnershipStart',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RenounceOwnershipStop',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newVaultFactory',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'VaultFactory',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOLS_ADMINISTRATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOL_INIT_CODE_HASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
    ],
    name: 'computePoolAddress',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'createPool',
    outputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultCommunityFee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'defaultConfigurationForPool',
    outputs: [
      { name: 'communityFee', internalType: 'uint16', type: 'uint16' },
      { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
      { name: 'communityVault', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultFee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultPluginFactory',
    outputs: [
      {
        name: '',
        internalType: 'contract IAlgebraPluginFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultTickspacing',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRoleOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'poolByPair',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnershipStartTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newDefaultCommunityFee',
        internalType: 'uint16',
        type: 'uint16',
      },
    ],
    name: 'setDefaultCommunityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newDefaultFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setDefaultFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newDefaultPluginFactory',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setDefaultPluginFactory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newDefaultTickspacing', internalType: 'int24', type: 'int24' },
    ],
    name: 'setDefaultTickspacing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newVaultFactory', internalType: 'address', type: 'address' },
    ],
    name: 'setVaultFactory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startRenounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopRenounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'vaultFactory',
    outputs: [
      {
        name: '',
        internalType: 'contract IAlgebraVaultFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const algebraFactoryAddress = {
  531050204: '0x10253594A832f967994b44f33411940533302ACb',
} as const

/**
 *
 */
export const algebraFactoryConfig = {
  address: algebraFactoryAddress,
  abi: algebraFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraPoolAbi = [
  { type: 'error', inputs: [], name: 'alreadyInitialized' },
  { type: 'error', inputs: [], name: 'arithmeticError' },
  { type: 'error', inputs: [], name: 'bottomTickLowerThanMIN' },
  { type: 'error', inputs: [], name: 'dynamicFeeActive' },
  { type: 'error', inputs: [], name: 'dynamicFeeDisabled' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid0' },
  { type: 'error', inputs: [], name: 'flashInsufficientPaid1' },
  { type: 'error', inputs: [], name: 'insufficientInputAmount' },
  { type: 'error', inputs: [], name: 'invalidAmountRequired' },
  {
    type: 'error',
    inputs: [{ name: 'selector', internalType: 'bytes4', type: 'bytes4' }],
    name: 'invalidHookResponse',
  },
  { type: 'error', inputs: [], name: 'invalidLimitSqrtPrice' },
  { type: 'error', inputs: [], name: 'invalidNewCommunityFee' },
  { type: 'error', inputs: [], name: 'invalidNewTickSpacing' },
  { type: 'error', inputs: [], name: 'liquidityAdd' },
  { type: 'error', inputs: [], name: 'liquidityOverflow' },
  { type: 'error', inputs: [], name: 'liquiditySub' },
  { type: 'error', inputs: [], name: 'locked' },
  { type: 'error', inputs: [], name: 'notAllowed' },
  { type: 'error', inputs: [], name: 'notInitialized' },
  { type: 'error', inputs: [], name: 'onlyFarming' },
  { type: 'error', inputs: [], name: 'pluginIsNotConnected' },
  { type: 'error', inputs: [], name: 'priceOutOfRange' },
  { type: 'error', inputs: [], name: 'tickInvalidLinks' },
  { type: 'error', inputs: [], name: 'tickIsNotInitialized' },
  { type: 'error', inputs: [], name: 'tickIsNotSpaced' },
  { type: 'error', inputs: [], name: 'tickOutOfRange' },
  { type: 'error', inputs: [], name: 'topTickAboveMAX' },
  { type: 'error', inputs: [], name: 'topTickLowerOrEqBottomTick' },
  { type: 'error', inputs: [], name: 'transferFailed' },
  { type: 'error', inputs: [], name: 'zeroAmountRequired' },
  { type: 'error', inputs: [], name: 'zeroLiquidityActual' },
  { type: 'error', inputs: [], name: 'zeroLiquidityDesired' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'amount0',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
    ],
    name: 'Collect',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'communityFeeNew',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'CommunityFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'fee', internalType: 'uint16', type: 'uint16', indexed: false },
    ],
    name: 'Fee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'paid1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Flash',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bottomTick',
        internalType: 'int24',
        type: 'int24',
        indexed: true,
      },
      { name: 'topTick', internalType: 'int24', type: 'int24', indexed: true },
      {
        name: 'liquidityAmount',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Plugin',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginConfig',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'PluginConfig',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newTickSpacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
    ],
    name: 'TickSpacing',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'amount0Requested', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1Requested', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'collect',
    outputs: [
      { name: 'amount0', internalType: 'uint128', type: 'uint128' },
      { name: 'amount1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'communityFeeLastTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'communityVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: 'currentFee', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'flash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCommunityFeePending',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalState',
    outputs: [
      { name: 'price', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'fee', internalType: 'uint16', type: 'uint16' },
      { name: 'pluginConfig', internalType: 'uint8', type: 'uint8' },
      { name: 'communityFee', internalType: 'uint16', type: 'uint16' },
      { name: 'unlocked', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'initialPrice', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidity',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxLiquidityPerTick',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'liquidityDesired', internalType: 'uint128', type: 'uint128' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityActual', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'plugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'positions',
    outputs: [
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      {
        name: 'innerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'innerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'fees0', internalType: 'uint128', type: 'uint128' },
      { name: 'fees1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'prevTickGlobal',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newCommunityFee', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setCommunityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFee', internalType: 'uint16', type: 'uint16' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPluginAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setPlugin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newConfig', internalType: 'uint8', type: 'uint8' }],
    name: 'setPluginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newTickSpacing', internalType: 'int24', type: 'int24' }],
    name: 'setTickSpacing',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountRequired', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'leftoversRecipient', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'amountToSell', internalType: 'int256', type: 'int256' },
      { name: 'limitSqrtPrice', internalType: 'uint160', type: 'uint160' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swapWithPaymentInAdvance',
    outputs: [
      { name: 'amount0', internalType: 'int256', type: 'int256' },
      { name: 'amount1', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tickSpacing',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'int16', type: 'int16' }],
    name: 'tickTable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    name: 'ticks',
    outputs: [
      { name: 'liquidityTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int128', type: 'int128' },
      { name: 'prevTick', internalType: 'int24', type: 'int24' },
      { name: 'nextTick', internalType: 'int24', type: 'int24' },
      {
        name: 'outerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'outerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth0Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalFeeGrowth1Token',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraStubPlugin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const algebraStubPluginAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_factory', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'afterFlashHookDisabled' },
  { type: 'error', inputs: [], name: 'afterInitializeHookDisabled' },
  { type: 'error', inputs: [], name: 'afterPositionHookDisabled' },
  { type: 'error', inputs: [], name: 'afterSwapHookDisabled' },
  { type: 'error', inputs: [], name: 'beforeFlashHookDisabled' },
  { type: 'error', inputs: [], name: 'beforeInitializeHookDisabled' },
  { type: 'error', inputs: [], name: 'beforePositionHookDisabled' },
  { type: 'error', inputs: [], name: 'beforeSwapHookDisabled' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newPluginConfig',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'newPluginConfig',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ALGEBRA_BASE_PLUGIN_MANAGER',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int24', type: 'int24' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeFlash',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'int128', type: 'int128' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'int256', type: 'int256' },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultPluginConfig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pluginConfig',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pluginConfig', internalType: 'uint8', type: 'uint8' }],
    name: 'setNewPluginConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const algebraStubPluginAddress = {
  531050204: '0x955B95b8532fe75DDCf2161f61127Be74A768158',
} as const

/**
 *
 */
export const algebraStubPluginConfig = {
  address: algebraStubPluginAddress,
  abi: algebraStubPluginAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AlgebraVirtualPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const algebraVirtualPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_farmingAddress', internalType: 'address', type: 'address' },
      { name: '_plugin', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'invalidFeeWeights' },
  { type: 'error', inputs: [], name: 'invalidNewMaxRate' },
  { type: 'error', inputs: [], name: 'invalidNewMinRate' },
  { type: 'error', inputs: [], name: 'liquidityAdd' },
  { type: 'error', inputs: [], name: 'liquidityOverflow' },
  { type: 'error', inputs: [], name: 'liquiditySub' },
  { type: 'error', inputs: [], name: 'onlyFarming' },
  { type: 'error', inputs: [], name: 'onlyPlugin' },
  { type: 'error', inputs: [], name: 'tickInvalidLinks' },
  { type: 'error', inputs: [], name: 'tickIsNotInitialized' },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_WEIGHT_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RATE_CHANGE_FREQUENCY',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token0Amount', internalType: 'uint128', type: 'uint128' },
      { name: 'token1Amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'addRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
      { name: 'liquidityDelta', internalType: 'int128', type: 'int128' },
      { name: 'currentTick', internalType: 'int24', type: 'int24' },
    ],
    name: 'applyLiquidityDeltaToPosition',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targetTick', internalType: 'int24', type: 'int24' },
      { name: 'zeroToOne', internalType: 'bool', type: 'bool' },
      { name: 'feeAmount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'crossTo',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentLiquidity',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deactivate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deactivated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token0Amount', internalType: 'uint128', type: 'uint128' },
      { name: 'token1Amount', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'decreaseRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'distributeRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'dynamicRateActivated',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeWeights',
    outputs: [
      { name: 'weight0', internalType: 'uint16', type: 'uint16' },
      { name: 'weight1', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bottomTick', internalType: 'int24', type: 'int24' },
      { name: 'topTick', internalType: 'int24', type: 'int24' },
    ],
    name: 'getInnerRewardsGrowth',
    outputs: [
      { name: 'rewardGrowthInside0', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardGrowthInside1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'globalTick',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'plugin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'prevTimestamp',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rateLimits',
    outputs: [
      { name: 'maxRewardRate0', internalType: 'uint128', type: 'uint128' },
      { name: 'maxRewardRate1', internalType: 'uint128', type: 'uint128' },
      { name: 'minRewardRate0', internalType: 'uint128', type: 'uint128' },
      { name: 'minRewardRate1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRates',
    outputs: [
      { name: 'rate0', internalType: 'uint128', type: 'uint128' },
      { name: 'rate1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardReserves',
    outputs: [
      { name: 'reserve0', internalType: 'uint128', type: 'uint128' },
      { name: 'reserve1', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_maxRate0', internalType: 'uint128', type: 'uint128' },
      { name: '_maxRate1', internalType: 'uint128', type: 'uint128' },
      { name: '_minRate0', internalType: 'uint128', type: 'uint128' },
      { name: '_minRate1', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setDynamicRateLimits',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'rate0', internalType: 'uint128', type: 'uint128' },
      { name: 'rate1', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setRates',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'weight0', internalType: 'uint16', type: 'uint16' },
      { name: 'weight1', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setWeights',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'isActive', internalType: 'bool', type: 'bool' }],
    name: 'switchDynamicRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tickId', internalType: 'int24', type: 'int24' }],
    name: 'ticks',
    outputs: [
      { name: 'liquidityTotal', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int128', type: 'int128' },
      { name: 'prevTick', internalType: 'int24', type: 'int24' },
      { name: 'nextTick', internalType: 'int24', type: 'int24' },
      {
        name: 'outerFeeGrowth0Token',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'outerFeeGrowth1Token',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalRewardGrowth',
    outputs: [
      { name: 'rewardGrowth0', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardGrowth1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FarmingCenter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const farmingCenterAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_eternalFarming',
        internalType: 'contract IAlgebraEternalFarming',
        type: 'address',
      },
      {
        name: '_nonfungiblePositionManager',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
    ],
    name: 'applyLiquidityDelta',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burnPosition',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimReward',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectRewards',
    outputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'bonusReward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'contract IAlgebraPool', type: 'address' },
      { name: 'newVirtualPool', internalType: 'address', type: 'address' },
    ],
    name: 'connectVirtualPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseLiquidity',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deposits',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enterFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eternalFarming',
    outputs: [
      {
        name: '',
        internalType: 'contract IAlgebraEternalFarming',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct IncentiveKey',
        type: 'tuple',
        components: [
          {
            name: 'rewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'bonusRewardToken',
            internalType: 'contract IERC20Minimal',
            type: 'address',
          },
          {
            name: 'pool',
            internalType: 'contract IAlgebraPool',
            type: 'address',
          },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'exitFarming',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'incentiveKeys',
    outputs: [
      {
        name: 'rewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      {
        name: 'bonusRewardToken',
        internalType: 'contract IERC20Minimal',
        type: 'address',
      },
      { name: 'pool', internalType: 'contract IAlgebraPool', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityDelta', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonfungiblePositionManager',
    outputs: [
      {
        name: '',
        internalType: 'contract INonfungiblePositionManager',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'virtualPoolAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const farmingCenterAddress = {
  531050204: '0x658E287E9C820484f5808f687dC4863B552de37D',
} as const

/**
 *
 */
export const farmingCenterConfig = {
  address: farmingCenterAddress,
  abi: farmingCenterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PluginFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const pluginFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_algebraFactory', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDefaultBaseFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'DefaultBaseFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newFarmingAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FarmingAddress',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ALGEBRA_BASE_PLUGIN_FACTORY_ADMINISTRATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'afterCreatePoolHook',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'algebraFactory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeCreatePoolHook',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token0', internalType: 'address', type: 'address' },
      { name: 'token1', internalType: 'address', type: 'address' },
    ],
    name: 'createPluginForExistingPool',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultBaseFee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'farmingAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'poolAddress', internalType: 'address', type: 'address' }],
    name: 'pluginByPool',
    outputs: [
      { name: 'pluginAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newDefaultBaseFee', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'setDefaultBaseFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newFarmingAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setFarmingAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const pluginFactoryAddress = {
  531050204: '0xFe3BEcd788320465ab649015F34F7771220A88b2',
} as const

/**
 *
 */
export const pluginFactoryConfig = {
  address: pluginFactoryAddress,
  abi: pluginFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useReadAlgebraBasePlugin = /*#__PURE__*/ createUseReadContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 */
export const useReadAlgebraBasePluginAlgebraBasePluginManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 */
export const useReadAlgebraBasePluginDefaultPluginConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getPool"`
 */
export const useReadAlgebraBasePluginGetPool =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getSingleTimepoint"`
 */
export const useReadAlgebraBasePluginGetSingleTimepoint =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getSingleTimepoint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getTimepoints"`
 */
export const useReadAlgebraBasePluginGetTimepoints =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getTimepoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"handlePluginFee"`
 */
export const useReadAlgebraBasePluginHandlePluginFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'handlePluginFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"incentive"`
 */
export const useReadAlgebraBasePluginIncentive =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'incentive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isIncentiveConnected"`
 */
export const useReadAlgebraBasePluginIsIncentiveConnected =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isIncentiveConnected',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isInitialized"`
 */
export const useReadAlgebraBasePluginIsInitialized =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isInitialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"lastTimepointTimestamp"`
 */
export const useReadAlgebraBasePluginLastTimepointTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'lastTimepointTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"pool"`
 */
export const useReadAlgebraBasePluginPool = /*#__PURE__*/ createUseReadContract(
  { abi: algebraBasePluginAbi, functionName: 'pool' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_baseFee"`
 */
export const useReadAlgebraBasePluginSBaseFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_baseFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_feeFactors"`
 */
export const useReadAlgebraBasePluginSFeeFactors =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_feeFactors',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_priceChangeFactor"`
 */
export const useReadAlgebraBasePluginSPriceChangeFactor =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_priceChangeFactor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepointIndex"`
 */
export const useReadAlgebraBasePluginTimepointIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepointIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepoints"`
 */
export const useReadAlgebraBasePluginTimepoints =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepoints',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useWriteAlgebraBasePlugin = /*#__PURE__*/ createUseWriteContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const useWriteAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const useWriteAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const useWriteAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const useWriteAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const useWriteAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const useWriteAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const useWriteAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const useWriteAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const useWriteAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteAlgebraBasePluginInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const useWriteAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useWriteAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const useWriteAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const useWriteAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useSimulateAlgebraBasePlugin =
  /*#__PURE__*/ createUseSimulateContract({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const useSimulateAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const useSimulateAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const useSimulateAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const useSimulateAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const useSimulateAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const useSimulateAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const useSimulateAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const useSimulateAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const useSimulateAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateAlgebraBasePluginInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const useSimulateAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const useSimulateAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const useSimulateAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const useSimulateAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const useWatchAlgebraBasePluginEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"BaseFee"`
 */
export const useWatchAlgebraBasePluginBaseFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'BaseFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"Incentive"`
 */
export const useWatchAlgebraBasePluginIncentiveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'Incentive',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"PriceChangeFactor"`
 */
export const useWatchAlgebraBasePluginPriceChangeFactorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'PriceChangeFactor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const useReadAlgebraEternalFarming = /*#__PURE__*/ createUseReadContract(
  { abi: algebraEternalFarmingAbi, address: algebraEternalFarmingAddress },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"FARMINGS_ADMINISTRATOR_ROLE"`
 *
 *
 */
export const useReadAlgebraEternalFarmingFarmingsAdministratorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'FARMINGS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"INCENTIVE_MAKER_ROLE"`
 *
 *
 */
export const useReadAlgebraEternalFarmingIncentiveMakerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'INCENTIVE_MAKER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farmingCenter"`
 *
 *
 */
export const useReadAlgebraEternalFarmingFarmingCenter =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farms"`
 *
 *
 */
export const useReadAlgebraEternalFarmingFarms =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farms',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"getRewardInfo"`
 *
 *
 */
export const useReadAlgebraEternalFarmingGetRewardInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'getRewardInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"incentives"`
 *
 *
 */
export const useReadAlgebraEternalFarmingIncentives =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'incentives',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isEmergencyWithdrawActivated"`
 *
 *
 */
export const useReadAlgebraEternalFarmingIsEmergencyWithdrawActivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isEmergencyWithdrawActivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isIncentiveDeactivated"`
 *
 *
 */
export const useReadAlgebraEternalFarmingIsIncentiveDeactivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isIncentiveDeactivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 *
 *
 */
export const useReadAlgebraEternalFarmingNonfungiblePositionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"numOfIncentives"`
 *
 *
 */
export const useReadAlgebraEternalFarmingNumOfIncentives =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'numOfIncentives',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"rewards"`
 *
 *
 */
export const useReadAlgebraEternalFarmingRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'rewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const useWriteAlgebraEternalFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 *
 *
 */
export const useWriteAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const useSimulateAlgebraEternalFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 *
 *
 */
export const useSimulateAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const useWatchAlgebraEternalFarmingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EmergencyWithdraw"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingEmergencyWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EmergencyWithdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EternalFarmingCreated"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingEternalFarmingCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EternalFarmingCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEnded"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingFarmEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEnded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEntered"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingFarmEnteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEntered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmingCenter"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingFarmingCenterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmingCenter',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"IncentiveDeactivated"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingIncentiveDeactivatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'IncentiveDeactivated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardAmountsDecreased"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingRewardAmountsDecreasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardAmountsDecreased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardClaimed"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingRewardClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsAdded"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingRewardsAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsCollected"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingRewardsCollectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsCollected',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsRatesChanged"`
 *
 *
 */
export const useWatchAlgebraEternalFarmingRewardsRatesChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsRatesChanged',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const useReadAlgebraFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"POOLS_ADMINISTRATOR_ROLE"`
 *
 *
 */
export const useReadAlgebraFactoryPoolsAdministratorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'POOLS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"POOL_INIT_CODE_HASH"`
 *
 *
 */
export const useReadAlgebraFactoryPoolInitCodeHash =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'POOL_INIT_CODE_HASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"computePoolAddress"`
 *
 *
 */
export const useReadAlgebraFactoryComputePoolAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'computePoolAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultCommunityFee"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultCommunityFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultCommunityFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultConfigurationForPool"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultConfigurationForPool =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultConfigurationForPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultFee"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultFee =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultPluginFactory"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultPluginFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultPluginFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultTickspacing"`
 *
 *
 */
export const useReadAlgebraFactoryDefaultTickspacing =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultTickspacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 *
 */
export const useReadAlgebraFactoryGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMember"`
 *
 *
 */
export const useReadAlgebraFactoryGetRoleMember =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMember',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMemberCount"`
 *
 *
 */
export const useReadAlgebraFactoryGetRoleMemberCount =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRole"`
 *
 *
 */
export const useReadAlgebraFactoryHasRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRole',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRoleOrOwner"`
 *
 *
 */
export const useReadAlgebraFactoryHasRoleOrOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRoleOrOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const useReadAlgebraFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"pendingOwner"`
 *
 *
 */
export const useReadAlgebraFactoryPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolByPair"`
 *
 *
 */
export const useReadAlgebraFactoryPoolByPair =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'poolByPair',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolDeployer"`
 *
 *
 */
export const useReadAlgebraFactoryPoolDeployer =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'poolDeployer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnershipStartTimestamp"`
 *
 *
 */
export const useReadAlgebraFactoryRenounceOwnershipStartTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnershipStartTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const useReadAlgebraFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"vaultFactory"`
 *
 *
 */
export const useReadAlgebraFactoryVaultFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'vaultFactory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const useWriteAlgebraFactory = /*#__PURE__*/ createUseWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 *
 */
export const useWriteAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 *
 *
 */
export const useWriteAlgebraFactoryCreatePool =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const useWriteAlgebraFactoryGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useWriteAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const useWriteAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const useWriteAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 *
 *
 */
export const useWriteAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultFee"`
 *
 *
 */
export const useWriteAlgebraFactorySetDefaultFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultPluginFactory"`
 *
 *
 */
export const useWriteAlgebraFactorySetDefaultPluginFactory =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultPluginFactory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultTickspacing"`
 *
 *
 */
export const useWriteAlgebraFactorySetDefaultTickspacing =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultTickspacing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setVaultFactory"`
 *
 *
 */
export const useWriteAlgebraFactorySetVaultFactory =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setVaultFactory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 *
 *
 */
export const useWriteAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 *
 *
 */
export const useWriteAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useWriteAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const useSimulateAlgebraFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 *
 */
export const useSimulateAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 *
 *
 */
export const useSimulateAlgebraFactoryCreatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const useSimulateAlgebraFactoryGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const useSimulateAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const useSimulateAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const useSimulateAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 *
 *
 */
export const useSimulateAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultFee"`
 *
 *
 */
export const useSimulateAlgebraFactorySetDefaultFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultPluginFactory"`
 *
 *
 */
export const useSimulateAlgebraFactorySetDefaultPluginFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultPluginFactory',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultTickspacing"`
 *
 *
 */
export const useSimulateAlgebraFactorySetDefaultTickspacing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultTickspacing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setVaultFactory"`
 *
 *
 */
export const useSimulateAlgebraFactorySetVaultFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setVaultFactory',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 *
 *
 */
export const useSimulateAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 *
 *
 */
export const useSimulateAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const useSimulateAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const useWatchAlgebraFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultCommunityFee"`
 *
 *
 */
export const useWatchAlgebraFactoryDefaultCommunityFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultCommunityFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultFee"`
 *
 *
 */
export const useWatchAlgebraFactoryDefaultFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultPluginFactory"`
 *
 *
 */
export const useWatchAlgebraFactoryDefaultPluginFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultPluginFactory',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultTickspacing"`
 *
 *
 */
export const useWatchAlgebraFactoryDefaultTickspacingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultTickspacing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 *
 */
export const useWatchAlgebraFactoryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const useWatchAlgebraFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"Pool"`
 *
 *
 */
export const useWatchAlgebraFactoryPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'Pool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipFinish"`
 *
 *
 */
export const useWatchAlgebraFactoryRenounceOwnershipFinishEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipFinish',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipStart"`
 *
 *
 */
export const useWatchAlgebraFactoryRenounceOwnershipStartEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipStart',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipStop"`
 *
 *
 */
export const useWatchAlgebraFactoryRenounceOwnershipStopEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipStop',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 *
 */
export const useWatchAlgebraFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 *
 *
 */
export const useWatchAlgebraFactoryRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 *
 */
export const useWatchAlgebraFactoryRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"VaultFactory"`
 *
 *
 */
export const useWatchAlgebraFactoryVaultFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'VaultFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useReadAlgebraPool = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityFeeLastTimestamp"`
 */
export const useReadAlgebraPoolCommunityFeeLastTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityFeeLastTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityVault"`
 */
export const useReadAlgebraPoolCommunityVault =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityVault',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"factory"`
 */
export const useReadAlgebraPoolFactory = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"fee"`
 */
export const useReadAlgebraPoolFee = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'fee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getCommunityFeePending"`
 */
export const useReadAlgebraPoolGetCommunityFeePending =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'getCommunityFeePending',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadAlgebraPoolGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'getReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"globalState"`
 */
export const useReadAlgebraPoolGlobalState =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'globalState',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"liquidity"`
 */
export const useReadAlgebraPoolLiquidity = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'liquidity',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"maxLiquidityPerTick"`
 */
export const useReadAlgebraPoolMaxLiquidityPerTick =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'maxLiquidityPerTick',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"nextTickGlobal"`
 */
export const useReadAlgebraPoolNextTickGlobal =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'nextTickGlobal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const useReadAlgebraPoolPlugin = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'plugin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"positions"`
 */
export const useReadAlgebraPoolPositions = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'positions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"prevTickGlobal"`
 */
export const useReadAlgebraPoolPrevTickGlobal =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'prevTickGlobal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickSpacing"`
 */
export const useReadAlgebraPoolTickSpacing =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'tickSpacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickTable"`
 */
export const useReadAlgebraPoolTickTable = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickTable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const useReadAlgebraPoolTicks = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'ticks',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token0"`
 */
export const useReadAlgebraPoolToken0 = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token1"`
 */
export const useReadAlgebraPoolToken1 = /*#__PURE__*/ createUseReadContract({
  abi: algebraPoolAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth0Token"`
 */
export const useReadAlgebraPoolTotalFeeGrowth0Token =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth0Token',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth1Token"`
 */
export const useReadAlgebraPoolTotalFeeGrowth1Token =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth1Token',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useWriteAlgebraPool = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteAlgebraPoolBurn = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const useWriteAlgebraPoolCollect = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const useWriteAlgebraPoolFlash = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteAlgebraPoolInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAlgebraPoolMint = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const useWriteAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteAlgebraPoolSetFee = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useWriteAlgebraPoolSetPlugin =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useWriteAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useWriteAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteAlgebraPoolSwap = /*#__PURE__*/ createUseWriteContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const useWriteAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useSimulateAlgebraPool = /*#__PURE__*/ createUseSimulateContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateAlgebraPoolBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const useSimulateAlgebraPoolCollect =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'collect',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const useSimulateAlgebraPoolFlash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'flash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateAlgebraPoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAlgebraPoolMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const useSimulateAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateAlgebraPoolSetFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const useSimulateAlgebraPoolSetPlugin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const useSimulateAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const useSimulateAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateAlgebraPoolSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const useSimulateAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const useWatchAlgebraPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: algebraPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchAlgebraPoolBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Burn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Collect"`
 */
export const useWatchAlgebraPoolCollectEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"CommunityFee"`
 */
export const useWatchAlgebraPoolCommunityFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'CommunityFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Fee"`
 */
export const useWatchAlgebraPoolFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Fee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Flash"`
 */
export const useWatchAlgebraPoolFlashEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Flash',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Initialize"`
 */
export const useWatchAlgebraPoolInitializeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchAlgebraPoolMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Plugin"`
 */
export const useWatchAlgebraPoolPluginEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Plugin',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"PluginConfig"`
 */
export const useWatchAlgebraPoolPluginConfigEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'PluginConfig',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchAlgebraPoolSwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Swap',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"TickSpacing"`
 */
export const useWatchAlgebraPoolTickSpacingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'TickSpacing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const useReadAlgebraStubPlugin = /*#__PURE__*/ createUseReadContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 *
 *
 */
export const useReadAlgebraStubPluginAlgebraBasePluginManager =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterFlash"`
 *
 *
 */
export const useReadAlgebraStubPluginAfterFlash =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterInitialize"`
 *
 *
 */
export const useReadAlgebraStubPluginAfterInitialize =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 *
 *
 */
export const useReadAlgebraStubPluginAfterModifyPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterSwap"`
 *
 *
 */
export const useReadAlgebraStubPluginAfterSwap =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeFlash"`
 *
 *
 */
export const useReadAlgebraStubPluginBeforeFlash =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeInitialize"`
 *
 *
 */
export const useReadAlgebraStubPluginBeforeInitialize =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 *
 *
 */
export const useReadAlgebraStubPluginBeforeModifyPosition =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeSwap"`
 *
 *
 */
export const useReadAlgebraStubPluginBeforeSwap =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 *
 *
 */
export const useReadAlgebraStubPluginDefaultPluginConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"pluginConfig"`
 *
 *
 */
export const useReadAlgebraStubPluginPluginConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'pluginConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const useWriteAlgebraStubPlugin = /*#__PURE__*/ createUseWriteContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"setNewPluginConfig"`
 *
 *
 */
export const useWriteAlgebraStubPluginSetNewPluginConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'setNewPluginConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const useSimulateAlgebraStubPlugin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"setNewPluginConfig"`
 *
 *
 */
export const useSimulateAlgebraStubPluginSetNewPluginConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'setNewPluginConfig',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const useWatchAlgebraStubPluginEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `eventName` set to `"newPluginConfig"`
 *
 *
 */
export const useWatchAlgebraStubPluginNewPluginConfigEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    eventName: 'newPluginConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const useReadAlgebraVirtualPool = /*#__PURE__*/ createUseReadContract({
  abi: algebraVirtualPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"FEE_WEIGHT_DENOMINATOR"`
 */
export const useReadAlgebraVirtualPoolFeeWeightDenominator =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'FEE_WEIGHT_DENOMINATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"RATE_CHANGE_FREQUENCY"`
 */
export const useReadAlgebraVirtualPoolRateChangeFrequency =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'RATE_CHANGE_FREQUENCY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"currentLiquidity"`
 */
export const useReadAlgebraVirtualPoolCurrentLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'currentLiquidity',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivated"`
 */
export const useReadAlgebraVirtualPoolDeactivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"dynamicRateActivated"`
 */
export const useReadAlgebraVirtualPoolDynamicRateActivated =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'dynamicRateActivated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"farmingAddress"`
 */
export const useReadAlgebraVirtualPoolFarmingAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'farmingAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"feeWeights"`
 */
export const useReadAlgebraVirtualPoolFeeWeights =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'feeWeights',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"getInnerRewardsGrowth"`
 */
export const useReadAlgebraVirtualPoolGetInnerRewardsGrowth =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'getInnerRewardsGrowth',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"globalTick"`
 */
export const useReadAlgebraVirtualPoolGlobalTick =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'globalTick',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const useReadAlgebraVirtualPoolPlugin =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'plugin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"prevTimestamp"`
 */
export const useReadAlgebraVirtualPoolPrevTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'prevTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rateLimits"`
 */
export const useReadAlgebraVirtualPoolRateLimits =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rateLimits',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rewardRates"`
 */
export const useReadAlgebraVirtualPoolRewardRates =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rewardRates',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rewardReserves"`
 */
export const useReadAlgebraVirtualPoolRewardReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rewardReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const useReadAlgebraVirtualPoolTicks =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'ticks',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"totalRewardGrowth"`
 */
export const useReadAlgebraVirtualPoolTotalRewardGrowth =
  /*#__PURE__*/ createUseReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'totalRewardGrowth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const useWriteAlgebraVirtualPool = /*#__PURE__*/ createUseWriteContract({
  abi: algebraVirtualPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"addRewards"`
 */
export const useWriteAlgebraVirtualPoolAddRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"applyLiquidityDeltaToPosition"`
 */
export const useWriteAlgebraVirtualPoolApplyLiquidityDeltaToPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'applyLiquidityDeltaToPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"crossTo"`
 */
export const useWriteAlgebraVirtualPoolCrossTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'crossTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivate"`
 */
export const useWriteAlgebraVirtualPoolDeactivate =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"decreaseRewards"`
 */
export const useWriteAlgebraVirtualPoolDecreaseRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'decreaseRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"distributeRewards"`
 */
export const useWriteAlgebraVirtualPoolDistributeRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'distributeRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setDynamicRateLimits"`
 */
export const useWriteAlgebraVirtualPoolSetDynamicRateLimits =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setDynamicRateLimits',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setRates"`
 */
export const useWriteAlgebraVirtualPoolSetRates =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setWeights"`
 */
export const useWriteAlgebraVirtualPoolSetWeights =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setWeights',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"switchDynamicRate"`
 */
export const useWriteAlgebraVirtualPoolSwitchDynamicRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'switchDynamicRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const useSimulateAlgebraVirtualPool =
  /*#__PURE__*/ createUseSimulateContract({ abi: algebraVirtualPoolAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"addRewards"`
 */
export const useSimulateAlgebraVirtualPoolAddRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"applyLiquidityDeltaToPosition"`
 */
export const useSimulateAlgebraVirtualPoolApplyLiquidityDeltaToPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'applyLiquidityDeltaToPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"crossTo"`
 */
export const useSimulateAlgebraVirtualPoolCrossTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'crossTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivate"`
 */
export const useSimulateAlgebraVirtualPoolDeactivate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"decreaseRewards"`
 */
export const useSimulateAlgebraVirtualPoolDecreaseRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'decreaseRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"distributeRewards"`
 */
export const useSimulateAlgebraVirtualPoolDistributeRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'distributeRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setDynamicRateLimits"`
 */
export const useSimulateAlgebraVirtualPoolSetDynamicRateLimits =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setDynamicRateLimits',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setRates"`
 */
export const useSimulateAlgebraVirtualPoolSetRates =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setWeights"`
 */
export const useSimulateAlgebraVirtualPoolSetWeights =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setWeights',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"switchDynamicRate"`
 */
export const useSimulateAlgebraVirtualPoolSwitchDynamicRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'switchDynamicRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const useReadFarmingCenter = /*#__PURE__*/ createUseReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"deposits"`
 *
 *
 */
export const useReadFarmingCenterDeposits = /*#__PURE__*/ createUseReadContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'deposits',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"eternalFarming"`
 *
 *
 */
export const useReadFarmingCenterEternalFarming =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'eternalFarming',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"incentiveKeys"`
 *
 *
 */
export const useReadFarmingCenterIncentiveKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'incentiveKeys',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 *
 *
 */
export const useReadFarmingCenterNonfungiblePositionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"virtualPoolAddresses"`
 *
 *
 */
export const useReadFarmingCenterVirtualPoolAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'virtualPoolAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const useWriteFarmingCenter = /*#__PURE__*/ createUseWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 *
 *
 */
export const useWriteFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 *
 *
 */
export const useWriteFarmingCenterBurnPosition =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const useWriteFarmingCenterClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const useWriteFarmingCenterCollectRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 *
 *
 */
export const useWriteFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 *
 *
 */
export const useWriteFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const useWriteFarmingCenterEnterFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const useWriteFarmingCenterExitFarming =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 *
 *
 */
export const useWriteFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 *
 *
 */
export const useWriteFarmingCenterMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const useSimulateFarmingCenter = /*#__PURE__*/ createUseSimulateContract(
  { abi: farmingCenterAbi, address: farmingCenterAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 *
 *
 */
export const useSimulateFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 *
 *
 */
export const useSimulateFarmingCenterBurnPosition =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const useSimulateFarmingCenterClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const useSimulateFarmingCenterCollectRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 *
 *
 */
export const useSimulateFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 *
 *
 */
export const useSimulateFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const useSimulateFarmingCenterEnterFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const useSimulateFarmingCenterExitFarming =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 *
 *
 */
export const useSimulateFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 *
 *
 */
export const useSimulateFarmingCenterMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const useReadPluginFactory = /*#__PURE__*/ createUseReadContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_FACTORY_ADMINISTRATOR"`
 *
 *
 */
export const useReadPluginFactoryAlgebraBasePluginFactoryAdministrator =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'ALGEBRA_BASE_PLUGIN_FACTORY_ADMINISTRATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"afterCreatePoolHook"`
 *
 *
 */
export const useReadPluginFactoryAfterCreatePoolHook =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'afterCreatePoolHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"algebraFactory"`
 *
 *
 */
export const useReadPluginFactoryAlgebraFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'algebraFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"defaultBaseFee"`
 *
 *
 */
export const useReadPluginFactoryDefaultBaseFee =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'defaultBaseFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"farmingAddress"`
 *
 *
 */
export const useReadPluginFactoryFarmingAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'farmingAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"pluginByPool"`
 *
 *
 */
export const useReadPluginFactoryPluginByPool =
  /*#__PURE__*/ createUseReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'pluginByPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const useWritePluginFactory = /*#__PURE__*/ createUseWriteContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 *
 *
 */
export const useWritePluginFactoryBeforeCreatePoolHook =
  /*#__PURE__*/ createUseWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"createPluginForExistingPool"`
 *
 *
 */
export const useWritePluginFactoryCreatePluginForExistingPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'createPluginForExistingPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setDefaultBaseFee"`
 *
 *
 */
export const useWritePluginFactorySetDefaultBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setDefaultBaseFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 *
 *
 */
export const useWritePluginFactorySetFarmingAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const useSimulatePluginFactory = /*#__PURE__*/ createUseSimulateContract(
  { abi: pluginFactoryAbi, address: pluginFactoryAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 *
 *
 */
export const useSimulatePluginFactoryBeforeCreatePoolHook =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"createPluginForExistingPool"`
 *
 *
 */
export const useSimulatePluginFactoryCreatePluginForExistingPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'createPluginForExistingPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setDefaultBaseFee"`
 *
 *
 */
export const useSimulatePluginFactorySetDefaultBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setDefaultBaseFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 *
 *
 */
export const useSimulatePluginFactorySetFarmingAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const useWatchPluginFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__ and `eventName` set to `"DefaultBaseFee"`
 *
 *
 */
export const useWatchPluginFactoryDefaultBaseFeeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    eventName: 'DefaultBaseFee',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__ and `eventName` set to `"FarmingAddress"`
 *
 *
 */
export const useWatchPluginFactoryFarmingAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    eventName: 'FarmingAddress',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const readAlgebraBasePlugin = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 */
export const readAlgebraBasePluginAlgebraBasePluginManager =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 */
export const readAlgebraBasePluginDefaultPluginConfig =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getPool"`
 */
export const readAlgebraBasePluginGetPool = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'getPool',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getSingleTimepoint"`
 */
export const readAlgebraBasePluginGetSingleTimepoint =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getSingleTimepoint',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"getTimepoints"`
 */
export const readAlgebraBasePluginGetTimepoints =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'getTimepoints',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"handlePluginFee"`
 */
export const readAlgebraBasePluginHandlePluginFee =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'handlePluginFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"incentive"`
 */
export const readAlgebraBasePluginIncentive = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'incentive',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isIncentiveConnected"`
 */
export const readAlgebraBasePluginIsIncentiveConnected =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isIncentiveConnected',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"isInitialized"`
 */
export const readAlgebraBasePluginIsInitialized =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'isInitialized',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"lastTimepointTimestamp"`
 */
export const readAlgebraBasePluginLastTimepointTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'lastTimepointTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"pool"`
 */
export const readAlgebraBasePluginPool = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 'pool',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_baseFee"`
 */
export const readAlgebraBasePluginSBaseFee = /*#__PURE__*/ createReadContract({
  abi: algebraBasePluginAbi,
  functionName: 's_baseFee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_feeFactors"`
 */
export const readAlgebraBasePluginSFeeFactors =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_feeFactors',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"s_priceChangeFactor"`
 */
export const readAlgebraBasePluginSPriceChangeFactor =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 's_priceChangeFactor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepointIndex"`
 */
export const readAlgebraBasePluginTimepointIndex =
  /*#__PURE__*/ createReadContract({
    abi: algebraBasePluginAbi,
    functionName: 'timepointIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"timepoints"`
 */
export const readAlgebraBasePluginTimepoints = /*#__PURE__*/ createReadContract(
  { abi: algebraBasePluginAbi, functionName: 'timepoints' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const writeAlgebraBasePlugin = /*#__PURE__*/ createWriteContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const writeAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const writeAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const writeAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const writeAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const writeAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const writeAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const writeAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const writeAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const writeAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const writeAlgebraBasePluginInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const writeAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const writeAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const writeAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const writeAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createWriteContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const simulateAlgebraBasePlugin = /*#__PURE__*/ createSimulateContract({
  abi: algebraBasePluginAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterFlash"`
 */
export const simulateAlgebraBasePluginAfterFlash =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterFlash',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterInitialize"`
 */
export const simulateAlgebraBasePluginAfterInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 */
export const simulateAlgebraBasePluginAfterModifyPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"afterSwap"`
 */
export const simulateAlgebraBasePluginAfterSwap =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'afterSwap',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeFlash"`
 */
export const simulateAlgebraBasePluginBeforeFlash =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeInitialize"`
 */
export const simulateAlgebraBasePluginBeforeInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 */
export const simulateAlgebraBasePluginBeforeModifyPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"beforeSwap"`
 */
export const simulateAlgebraBasePluginBeforeSwap =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'beforeSwap',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"collectPluginFee"`
 */
export const simulateAlgebraBasePluginCollectPluginFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'collectPluginFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateAlgebraBasePluginInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"prepayTimepointsStorageSlots"`
 */
export const simulateAlgebraBasePluginPrepayTimepointsStorageSlots =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'prepayTimepointsStorageSlots',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setBaseFee"`
 */
export const simulateAlgebraBasePluginSetBaseFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setBaseFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setIncentive"`
 */
export const simulateAlgebraBasePluginSetIncentive =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setIncentive',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `functionName` set to `"setPriceChangeFactor"`
 */
export const simulateAlgebraBasePluginSetPriceChangeFactor =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraBasePluginAbi,
    functionName: 'setPriceChangeFactor',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__
 */
export const watchAlgebraBasePluginEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: algebraBasePluginAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"BaseFee"`
 */
export const watchAlgebraBasePluginBaseFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'BaseFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"Incentive"`
 */
export const watchAlgebraBasePluginIncentiveEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'Incentive',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraBasePluginAbi}__ and `eventName` set to `"PriceChangeFactor"`
 */
export const watchAlgebraBasePluginPriceChangeFactorEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraBasePluginAbi,
    eventName: 'PriceChangeFactor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const readAlgebraEternalFarming = /*#__PURE__*/ createReadContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"FARMINGS_ADMINISTRATOR_ROLE"`
 *
 *
 */
export const readAlgebraEternalFarmingFarmingsAdministratorRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'FARMINGS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"INCENTIVE_MAKER_ROLE"`
 *
 *
 */
export const readAlgebraEternalFarmingIncentiveMakerRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'INCENTIVE_MAKER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farmingCenter"`
 *
 *
 */
export const readAlgebraEternalFarmingFarmingCenter =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'farmingCenter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"farms"`
 *
 *
 */
export const readAlgebraEternalFarmingFarms = /*#__PURE__*/ createReadContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
  functionName: 'farms',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"getRewardInfo"`
 *
 *
 */
export const readAlgebraEternalFarmingGetRewardInfo =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'getRewardInfo',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"incentives"`
 *
 *
 */
export const readAlgebraEternalFarmingIncentives =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'incentives',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isEmergencyWithdrawActivated"`
 *
 *
 */
export const readAlgebraEternalFarmingIsEmergencyWithdrawActivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isEmergencyWithdrawActivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"isIncentiveDeactivated"`
 *
 *
 */
export const readAlgebraEternalFarmingIsIncentiveDeactivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'isIncentiveDeactivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 *
 *
 */
export const readAlgebraEternalFarmingNonfungiblePositionManager =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"numOfIncentives"`
 *
 *
 */
export const readAlgebraEternalFarmingNumOfIncentives =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'numOfIncentives',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"rewards"`
 *
 *
 */
export const readAlgebraEternalFarmingRewards =
  /*#__PURE__*/ createReadContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'rewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const writeAlgebraEternalFarming = /*#__PURE__*/ createWriteContract({
  abi: algebraEternalFarmingAbi,
  address: algebraEternalFarmingAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 *
 *
 */
export const writeAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const writeAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 *
 *
 */
export const writeAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const writeAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 *
 *
 */
export const writeAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 *
 *
 */
export const writeAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 *
 *
 */
export const writeAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const writeAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const writeAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 *
 *
 */
export const writeAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 *
 *
 */
export const writeAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 *
 *
 */
export const writeAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createWriteContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const simulateAlgebraEternalFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"addRewards"`
 *
 *
 */
export const simulateAlgebraEternalFarmingAddRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const simulateAlgebraEternalFarmingClaimReward =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"claimRewardFrom"`
 *
 *
 */
export const simulateAlgebraEternalFarmingClaimRewardFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'claimRewardFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const simulateAlgebraEternalFarmingCollectRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"createEternalFarming"`
 *
 *
 */
export const simulateAlgebraEternalFarmingCreateEternalFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'createEternalFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"deactivateIncentive"`
 *
 *
 */
export const simulateAlgebraEternalFarmingDeactivateIncentive =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'deactivateIncentive',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"decreaseRewardsAmount"`
 *
 *
 */
export const simulateAlgebraEternalFarmingDecreaseRewardsAmount =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'decreaseRewardsAmount',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const simulateAlgebraEternalFarmingEnterFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const simulateAlgebraEternalFarmingExitFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setEmergencyWithdrawStatus"`
 *
 *
 */
export const simulateAlgebraEternalFarmingSetEmergencyWithdrawStatus =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setEmergencyWithdrawStatus',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setFarmingCenterAddress"`
 *
 *
 */
export const simulateAlgebraEternalFarmingSetFarmingCenterAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setFarmingCenterAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `functionName` set to `"setRates"`
 *
 *
 */
export const simulateAlgebraEternalFarmingSetRates =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__
 *
 *
 */
export const watchAlgebraEternalFarmingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EmergencyWithdraw"`
 *
 *
 */
export const watchAlgebraEternalFarmingEmergencyWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EmergencyWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"EternalFarmingCreated"`
 *
 *
 */
export const watchAlgebraEternalFarmingEternalFarmingCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'EternalFarmingCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEnded"`
 *
 *
 */
export const watchAlgebraEternalFarmingFarmEndedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEnded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmEntered"`
 *
 *
 */
export const watchAlgebraEternalFarmingFarmEnteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmEntered',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"FarmingCenter"`
 *
 *
 */
export const watchAlgebraEternalFarmingFarmingCenterEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'FarmingCenter',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"IncentiveDeactivated"`
 *
 *
 */
export const watchAlgebraEternalFarmingIncentiveDeactivatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'IncentiveDeactivated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardAmountsDecreased"`
 *
 *
 */
export const watchAlgebraEternalFarmingRewardAmountsDecreasedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardAmountsDecreased',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardClaimed"`
 *
 *
 */
export const watchAlgebraEternalFarmingRewardClaimedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardClaimed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsAdded"`
 *
 *
 */
export const watchAlgebraEternalFarmingRewardsAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsCollected"`
 *
 *
 */
export const watchAlgebraEternalFarmingRewardsCollectedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsCollected',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraEternalFarmingAbi}__ and `eventName` set to `"RewardsRatesChanged"`
 *
 *
 */
export const watchAlgebraEternalFarmingRewardsRatesChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraEternalFarmingAbi,
    address: algebraEternalFarmingAddress,
    eventName: 'RewardsRatesChanged',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const readAlgebraFactory = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 *
 */
export const readAlgebraFactoryDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"POOLS_ADMINISTRATOR_ROLE"`
 *
 *
 */
export const readAlgebraFactoryPoolsAdministratorRole =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'POOLS_ADMINISTRATOR_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"POOL_INIT_CODE_HASH"`
 *
 *
 */
export const readAlgebraFactoryPoolInitCodeHash =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'POOL_INIT_CODE_HASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"computePoolAddress"`
 *
 *
 */
export const readAlgebraFactoryComputePoolAddress =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'computePoolAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultCommunityFee"`
 *
 *
 */
export const readAlgebraFactoryDefaultCommunityFee =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultCommunityFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultConfigurationForPool"`
 *
 *
 */
export const readAlgebraFactoryDefaultConfigurationForPool =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultConfigurationForPool',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultFee"`
 *
 *
 */
export const readAlgebraFactoryDefaultFee = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'defaultFee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultPluginFactory"`
 *
 *
 */
export const readAlgebraFactoryDefaultPluginFactory =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultPluginFactory',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"defaultTickspacing"`
 *
 *
 */
export const readAlgebraFactoryDefaultTickspacing =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'defaultTickspacing',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 *
 */
export const readAlgebraFactoryGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMember"`
 *
 *
 */
export const readAlgebraFactoryGetRoleMember = /*#__PURE__*/ createReadContract(
  {
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMember',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"getRoleMemberCount"`
 *
 *
 */
export const readAlgebraFactoryGetRoleMemberCount =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRole"`
 *
 *
 */
export const readAlgebraFactoryHasRole = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"hasRoleOrOwner"`
 *
 *
 */
export const readAlgebraFactoryHasRoleOrOwner =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'hasRoleOrOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"owner"`
 *
 *
 */
export const readAlgebraFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"pendingOwner"`
 *
 *
 */
export const readAlgebraFactoryPendingOwner = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolByPair"`
 *
 *
 */
export const readAlgebraFactoryPoolByPair = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'poolByPair',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"poolDeployer"`
 *
 *
 */
export const readAlgebraFactoryPoolDeployer = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'poolDeployer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnershipStartTimestamp"`
 *
 *
 */
export const readAlgebraFactoryRenounceOwnershipStartTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnershipStartTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 *
 *
 */
export const readAlgebraFactorySupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"vaultFactory"`
 *
 *
 */
export const readAlgebraFactoryVaultFactory = /*#__PURE__*/ createReadContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'vaultFactory',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const writeAlgebraFactory = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 *
 */
export const writeAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 *
 *
 */
export const writeAlgebraFactoryCreatePool = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'createPool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const writeAlgebraFactoryGrantRole = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const writeAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const writeAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const writeAlgebraFactoryRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 *
 *
 */
export const writeAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultFee"`
 *
 *
 */
export const writeAlgebraFactorySetDefaultFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultPluginFactory"`
 *
 *
 */
export const writeAlgebraFactorySetDefaultPluginFactory =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultPluginFactory',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultTickspacing"`
 *
 *
 */
export const writeAlgebraFactorySetDefaultTickspacing =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultTickspacing',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setVaultFactory"`
 *
 *
 */
export const writeAlgebraFactorySetVaultFactory =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setVaultFactory',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 *
 *
 */
export const writeAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 *
 *
 */
export const writeAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const writeAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const simulateAlgebraFactory = /*#__PURE__*/ createSimulateContract({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 *
 */
export const simulateAlgebraFactoryAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"createPool"`
 *
 *
 */
export const simulateAlgebraFactoryCreatePool =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'createPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"grantRole"`
 *
 *
 */
export const simulateAlgebraFactoryGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 *
 */
export const simulateAlgebraFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"renounceRole"`
 *
 *
 */
export const simulateAlgebraFactoryRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"revokeRole"`
 *
 *
 */
export const simulateAlgebraFactoryRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultCommunityFee"`
 *
 *
 */
export const simulateAlgebraFactorySetDefaultCommunityFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultCommunityFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultFee"`
 *
 *
 */
export const simulateAlgebraFactorySetDefaultFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultPluginFactory"`
 *
 *
 */
export const simulateAlgebraFactorySetDefaultPluginFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultPluginFactory',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setDefaultTickspacing"`
 *
 *
 */
export const simulateAlgebraFactorySetDefaultTickspacing =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setDefaultTickspacing',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"setVaultFactory"`
 *
 *
 */
export const simulateAlgebraFactorySetVaultFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'setVaultFactory',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"startRenounceOwnership"`
 *
 *
 */
export const simulateAlgebraFactoryStartRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'startRenounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"stopRenounceOwnership"`
 *
 *
 */
export const simulateAlgebraFactoryStopRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'stopRenounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 *
 *
 */
export const simulateAlgebraFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__
 *
 *
 */
export const watchAlgebraFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraFactoryAbi,
  address: algebraFactoryAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultCommunityFee"`
 *
 *
 */
export const watchAlgebraFactoryDefaultCommunityFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultCommunityFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultFee"`
 *
 *
 */
export const watchAlgebraFactoryDefaultFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultPluginFactory"`
 *
 *
 */
export const watchAlgebraFactoryDefaultPluginFactoryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultPluginFactory',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"DefaultTickspacing"`
 *
 *
 */
export const watchAlgebraFactoryDefaultTickspacingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'DefaultTickspacing',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 *
 */
export const watchAlgebraFactoryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 *
 */
export const watchAlgebraFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"Pool"`
 *
 *
 */
export const watchAlgebraFactoryPoolEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'Pool',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipFinish"`
 *
 *
 */
export const watchAlgebraFactoryRenounceOwnershipFinishEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipFinish',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipStart"`
 *
 *
 */
export const watchAlgebraFactoryRenounceOwnershipStartEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipStart',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RenounceOwnershipStop"`
 *
 *
 */
export const watchAlgebraFactoryRenounceOwnershipStopEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RenounceOwnershipStop',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 *
 */
export const watchAlgebraFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 *
 *
 */
export const watchAlgebraFactoryRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 *
 */
export const watchAlgebraFactoryRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraFactoryAbi}__ and `eventName` set to `"VaultFactory"`
 *
 *
 */
export const watchAlgebraFactoryVaultFactoryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraFactoryAbi,
    address: algebraFactoryAddress,
    eventName: 'VaultFactory',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const readAlgebraPool = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityFeeLastTimestamp"`
 */
export const readAlgebraPoolCommunityFeeLastTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'communityFeeLastTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"communityVault"`
 */
export const readAlgebraPoolCommunityVault = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'communityVault',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"factory"`
 */
export const readAlgebraPoolFactory = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"fee"`
 */
export const readAlgebraPoolFee = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getCommunityFeePending"`
 */
export const readAlgebraPoolGetCommunityFeePending =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'getCommunityFeePending',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"getReserves"`
 */
export const readAlgebraPoolGetReserves = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'getReserves',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"globalState"`
 */
export const readAlgebraPoolGlobalState = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'globalState',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"liquidity"`
 */
export const readAlgebraPoolLiquidity = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'liquidity',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"maxLiquidityPerTick"`
 */
export const readAlgebraPoolMaxLiquidityPerTick =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'maxLiquidityPerTick',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"nextTickGlobal"`
 */
export const readAlgebraPoolNextTickGlobal = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'nextTickGlobal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const readAlgebraPoolPlugin = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'plugin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"positions"`
 */
export const readAlgebraPoolPositions = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'positions',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"prevTickGlobal"`
 */
export const readAlgebraPoolPrevTickGlobal = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'prevTickGlobal',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickSpacing"`
 */
export const readAlgebraPoolTickSpacing = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickSpacing',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"tickTable"`
 */
export const readAlgebraPoolTickTable = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'tickTable',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const readAlgebraPoolTicks = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'ticks',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token0"`
 */
export const readAlgebraPoolToken0 = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"token1"`
 */
export const readAlgebraPoolToken1 = /*#__PURE__*/ createReadContract({
  abi: algebraPoolAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth0Token"`
 */
export const readAlgebraPoolTotalFeeGrowth0Token =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth0Token',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"totalFeeGrowth1Token"`
 */
export const readAlgebraPoolTotalFeeGrowth1Token =
  /*#__PURE__*/ createReadContract({
    abi: algebraPoolAbi,
    functionName: 'totalFeeGrowth1Token',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const writeAlgebraPool = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const writeAlgebraPoolBurn = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const writeAlgebraPoolCollect = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const writeAlgebraPoolFlash = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const writeAlgebraPoolInitialize = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const writeAlgebraPoolMint = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const writeAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const writeAlgebraPoolSetFee = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const writeAlgebraPoolSetPlugin = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'setPlugin',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const writeAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const writeAlgebraPoolSetTickSpacing = /*#__PURE__*/ createWriteContract(
  { abi: algebraPoolAbi, functionName: 'setTickSpacing' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const writeAlgebraPoolSwap = /*#__PURE__*/ createWriteContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const writeAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createWriteContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const simulateAlgebraPool = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"burn"`
 */
export const simulateAlgebraPoolBurn = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"collect"`
 */
export const simulateAlgebraPoolCollect = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'collect',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"flash"`
 */
export const simulateAlgebraPoolFlash = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'flash',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateAlgebraPoolInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"mint"`
 */
export const simulateAlgebraPoolMint = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setCommunityFee"`
 */
export const simulateAlgebraPoolSetCommunityFee =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setCommunityFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setFee"`
 */
export const simulateAlgebraPoolSetFee = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPlugin"`
 */
export const simulateAlgebraPoolSetPlugin =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPlugin',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setPluginConfig"`
 */
export const simulateAlgebraPoolSetPluginConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setPluginConfig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"setTickSpacing"`
 */
export const simulateAlgebraPoolSetTickSpacing =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'setTickSpacing',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swap"`
 */
export const simulateAlgebraPoolSwap = /*#__PURE__*/ createSimulateContract({
  abi: algebraPoolAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraPoolAbi}__ and `functionName` set to `"swapWithPaymentInAdvance"`
 */
export const simulateAlgebraPoolSwapWithPaymentInAdvance =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraPoolAbi,
    functionName: 'swapWithPaymentInAdvance',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__
 */
export const watchAlgebraPoolEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraPoolAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Burn"`
 */
export const watchAlgebraPoolBurnEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Burn' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Collect"`
 */
export const watchAlgebraPoolCollectEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Collect',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"CommunityFee"`
 */
export const watchAlgebraPoolCommunityFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'CommunityFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Fee"`
 */
export const watchAlgebraPoolFeeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: algebraPoolAbi,
  eventName: 'Fee',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Flash"`
 */
export const watchAlgebraPoolFlashEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Flash',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Initialize"`
 */
export const watchAlgebraPoolInitializeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Mint"`
 */
export const watchAlgebraPoolMintEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Mint' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Plugin"`
 */
export const watchAlgebraPoolPluginEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'Plugin',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"PluginConfig"`
 */
export const watchAlgebraPoolPluginConfigEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'PluginConfig',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"Swap"`
 */
export const watchAlgebraPoolSwapEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: algebraPoolAbi, eventName: 'Swap' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraPoolAbi}__ and `eventName` set to `"TickSpacing"`
 */
export const watchAlgebraPoolTickSpacingEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraPoolAbi,
    eventName: 'TickSpacing',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const readAlgebraStubPlugin = /*#__PURE__*/ createReadContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_MANAGER"`
 *
 *
 */
export const readAlgebraStubPluginAlgebraBasePluginManager =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'ALGEBRA_BASE_PLUGIN_MANAGER',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterFlash"`
 *
 *
 */
export const readAlgebraStubPluginAfterFlash = /*#__PURE__*/ createReadContract(
  {
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterFlash',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterInitialize"`
 *
 *
 */
export const readAlgebraStubPluginAfterInitialize =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterInitialize',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterModifyPosition"`
 *
 *
 */
export const readAlgebraStubPluginAfterModifyPosition =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'afterModifyPosition',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"afterSwap"`
 *
 *
 */
export const readAlgebraStubPluginAfterSwap = /*#__PURE__*/ createReadContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
  functionName: 'afterSwap',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeFlash"`
 *
 *
 */
export const readAlgebraStubPluginBeforeFlash =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeFlash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeInitialize"`
 *
 *
 */
export const readAlgebraStubPluginBeforeInitialize =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeInitialize',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeModifyPosition"`
 *
 *
 */
export const readAlgebraStubPluginBeforeModifyPosition =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeModifyPosition',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"beforeSwap"`
 *
 *
 */
export const readAlgebraStubPluginBeforeSwap = /*#__PURE__*/ createReadContract(
  {
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'beforeSwap',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"defaultPluginConfig"`
 *
 *
 */
export const readAlgebraStubPluginDefaultPluginConfig =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'defaultPluginConfig',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"pluginConfig"`
 *
 *
 */
export const readAlgebraStubPluginPluginConfig =
  /*#__PURE__*/ createReadContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'pluginConfig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const writeAlgebraStubPlugin = /*#__PURE__*/ createWriteContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"setNewPluginConfig"`
 *
 *
 */
export const writeAlgebraStubPluginSetNewPluginConfig =
  /*#__PURE__*/ createWriteContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'setNewPluginConfig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const simulateAlgebraStubPlugin = /*#__PURE__*/ createSimulateContract({
  abi: algebraStubPluginAbi,
  address: algebraStubPluginAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `functionName` set to `"setNewPluginConfig"`
 *
 *
 */
export const simulateAlgebraStubPluginSetNewPluginConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    functionName: 'setNewPluginConfig',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraStubPluginAbi}__
 *
 *
 */
export const watchAlgebraStubPluginEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link algebraStubPluginAbi}__ and `eventName` set to `"newPluginConfig"`
 *
 *
 */
export const watchAlgebraStubPluginNewPluginConfigEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: algebraStubPluginAbi,
    address: algebraStubPluginAddress,
    eventName: 'newPluginConfig',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const readAlgebraVirtualPool = /*#__PURE__*/ createReadContract({
  abi: algebraVirtualPoolAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"FEE_WEIGHT_DENOMINATOR"`
 */
export const readAlgebraVirtualPoolFeeWeightDenominator =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'FEE_WEIGHT_DENOMINATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"RATE_CHANGE_FREQUENCY"`
 */
export const readAlgebraVirtualPoolRateChangeFrequency =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'RATE_CHANGE_FREQUENCY',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"currentLiquidity"`
 */
export const readAlgebraVirtualPoolCurrentLiquidity =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'currentLiquidity',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivated"`
 */
export const readAlgebraVirtualPoolDeactivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"dynamicRateActivated"`
 */
export const readAlgebraVirtualPoolDynamicRateActivated =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'dynamicRateActivated',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"farmingAddress"`
 */
export const readAlgebraVirtualPoolFarmingAddress =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'farmingAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"feeWeights"`
 */
export const readAlgebraVirtualPoolFeeWeights =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'feeWeights',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"getInnerRewardsGrowth"`
 */
export const readAlgebraVirtualPoolGetInnerRewardsGrowth =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'getInnerRewardsGrowth',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"globalTick"`
 */
export const readAlgebraVirtualPoolGlobalTick =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'globalTick',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"plugin"`
 */
export const readAlgebraVirtualPoolPlugin = /*#__PURE__*/ createReadContract({
  abi: algebraVirtualPoolAbi,
  functionName: 'plugin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"prevTimestamp"`
 */
export const readAlgebraVirtualPoolPrevTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'prevTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rateLimits"`
 */
export const readAlgebraVirtualPoolRateLimits =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rateLimits',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rewardRates"`
 */
export const readAlgebraVirtualPoolRewardRates =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rewardRates',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"rewardReserves"`
 */
export const readAlgebraVirtualPoolRewardReserves =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'rewardReserves',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"ticks"`
 */
export const readAlgebraVirtualPoolTicks = /*#__PURE__*/ createReadContract({
  abi: algebraVirtualPoolAbi,
  functionName: 'ticks',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"totalRewardGrowth"`
 */
export const readAlgebraVirtualPoolTotalRewardGrowth =
  /*#__PURE__*/ createReadContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'totalRewardGrowth',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const writeAlgebraVirtualPool = /*#__PURE__*/ createWriteContract({
  abi: algebraVirtualPoolAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"addRewards"`
 */
export const writeAlgebraVirtualPoolAddRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"applyLiquidityDeltaToPosition"`
 */
export const writeAlgebraVirtualPoolApplyLiquidityDeltaToPosition =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'applyLiquidityDeltaToPosition',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"crossTo"`
 */
export const writeAlgebraVirtualPoolCrossTo = /*#__PURE__*/ createWriteContract(
  { abi: algebraVirtualPoolAbi, functionName: 'crossTo' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivate"`
 */
export const writeAlgebraVirtualPoolDeactivate =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivate',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"decreaseRewards"`
 */
export const writeAlgebraVirtualPoolDecreaseRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'decreaseRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"distributeRewards"`
 */
export const writeAlgebraVirtualPoolDistributeRewards =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'distributeRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setDynamicRateLimits"`
 */
export const writeAlgebraVirtualPoolSetDynamicRateLimits =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setDynamicRateLimits',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setRates"`
 */
export const writeAlgebraVirtualPoolSetRates =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setWeights"`
 */
export const writeAlgebraVirtualPoolSetWeights =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setWeights',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"switchDynamicRate"`
 */
export const writeAlgebraVirtualPoolSwitchDynamicRate =
  /*#__PURE__*/ createWriteContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'switchDynamicRate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__
 */
export const simulateAlgebraVirtualPool = /*#__PURE__*/ createSimulateContract({
  abi: algebraVirtualPoolAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"addRewards"`
 */
export const simulateAlgebraVirtualPoolAddRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'addRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"applyLiquidityDeltaToPosition"`
 */
export const simulateAlgebraVirtualPoolApplyLiquidityDeltaToPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'applyLiquidityDeltaToPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"crossTo"`
 */
export const simulateAlgebraVirtualPoolCrossTo =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'crossTo',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"deactivate"`
 */
export const simulateAlgebraVirtualPoolDeactivate =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'deactivate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"decreaseRewards"`
 */
export const simulateAlgebraVirtualPoolDecreaseRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'decreaseRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"distributeRewards"`
 */
export const simulateAlgebraVirtualPoolDistributeRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'distributeRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setDynamicRateLimits"`
 */
export const simulateAlgebraVirtualPoolSetDynamicRateLimits =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setDynamicRateLimits',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setRates"`
 */
export const simulateAlgebraVirtualPoolSetRates =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setRates',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"setWeights"`
 */
export const simulateAlgebraVirtualPoolSetWeights =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'setWeights',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link algebraVirtualPoolAbi}__ and `functionName` set to `"switchDynamicRate"`
 */
export const simulateAlgebraVirtualPoolSwitchDynamicRate =
  /*#__PURE__*/ createSimulateContract({
    abi: algebraVirtualPoolAbi,
    functionName: 'switchDynamicRate',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const readFarmingCenter = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"deposits"`
 *
 *
 */
export const readFarmingCenterDeposits = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'deposits',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"eternalFarming"`
 *
 *
 */
export const readFarmingCenterEternalFarming = /*#__PURE__*/ createReadContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'eternalFarming',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"incentiveKeys"`
 *
 *
 */
export const readFarmingCenterIncentiveKeys = /*#__PURE__*/ createReadContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'incentiveKeys',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"nonfungiblePositionManager"`
 *
 *
 */
export const readFarmingCenterNonfungiblePositionManager =
  /*#__PURE__*/ createReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'nonfungiblePositionManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"virtualPoolAddresses"`
 *
 *
 */
export const readFarmingCenterVirtualPoolAddresses =
  /*#__PURE__*/ createReadContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'virtualPoolAddresses',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const writeFarmingCenter = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 *
 *
 */
export const writeFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 *
 *
 */
export const writeFarmingCenterBurnPosition = /*#__PURE__*/ createWriteContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const writeFarmingCenterClaimReward = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'claimReward',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const writeFarmingCenterCollectRewards =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 *
 *
 */
export const writeFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 *
 *
 */
export const writeFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const writeFarmingCenterEnterFarming = /*#__PURE__*/ createWriteContract(
  {
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const writeFarmingCenterExitFarming = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'exitFarming',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 *
 *
 */
export const writeFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createWriteContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 *
 *
 */
export const writeFarmingCenterMulticall = /*#__PURE__*/ createWriteContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
  functionName: 'multicall',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__
 *
 *
 */
export const simulateFarmingCenter = /*#__PURE__*/ createSimulateContract({
  abi: farmingCenterAbi,
  address: farmingCenterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"applyLiquidityDelta"`
 *
 *
 */
export const simulateFarmingCenterApplyLiquidityDelta =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'applyLiquidityDelta',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"burnPosition"`
 *
 *
 */
export const simulateFarmingCenterBurnPosition =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'burnPosition',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"claimReward"`
 *
 *
 */
export const simulateFarmingCenterClaimReward =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"collectRewards"`
 *
 *
 */
export const simulateFarmingCenterCollectRewards =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'collectRewards',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"connectVirtualPool"`
 *
 *
 */
export const simulateFarmingCenterConnectVirtualPool =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'connectVirtualPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"decreaseLiquidity"`
 *
 *
 */
export const simulateFarmingCenterDecreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'decreaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"enterFarming"`
 *
 *
 */
export const simulateFarmingCenterEnterFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'enterFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"exitFarming"`
 *
 *
 */
export const simulateFarmingCenterExitFarming =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'exitFarming',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"increaseLiquidity"`
 *
 *
 */
export const simulateFarmingCenterIncreaseLiquidity =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'increaseLiquidity',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link farmingCenterAbi}__ and `functionName` set to `"multicall"`
 *
 *
 */
export const simulateFarmingCenterMulticall =
  /*#__PURE__*/ createSimulateContract({
    abi: farmingCenterAbi,
    address: farmingCenterAddress,
    functionName: 'multicall',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const readPluginFactory = /*#__PURE__*/ createReadContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"ALGEBRA_BASE_PLUGIN_FACTORY_ADMINISTRATOR"`
 *
 *
 */
export const readPluginFactoryAlgebraBasePluginFactoryAdministrator =
  /*#__PURE__*/ createReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'ALGEBRA_BASE_PLUGIN_FACTORY_ADMINISTRATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"afterCreatePoolHook"`
 *
 *
 */
export const readPluginFactoryAfterCreatePoolHook =
  /*#__PURE__*/ createReadContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'afterCreatePoolHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"algebraFactory"`
 *
 *
 */
export const readPluginFactoryAlgebraFactory = /*#__PURE__*/ createReadContract(
  {
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'algebraFactory',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"defaultBaseFee"`
 *
 *
 */
export const readPluginFactoryDefaultBaseFee = /*#__PURE__*/ createReadContract(
  {
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'defaultBaseFee',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"farmingAddress"`
 *
 *
 */
export const readPluginFactoryFarmingAddress = /*#__PURE__*/ createReadContract(
  {
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'farmingAddress',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"pluginByPool"`
 *
 *
 */
export const readPluginFactoryPluginByPool = /*#__PURE__*/ createReadContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
  functionName: 'pluginByPool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const writePluginFactory = /*#__PURE__*/ createWriteContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 *
 *
 */
export const writePluginFactoryBeforeCreatePoolHook =
  /*#__PURE__*/ createWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"createPluginForExistingPool"`
 *
 *
 */
export const writePluginFactoryCreatePluginForExistingPool =
  /*#__PURE__*/ createWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'createPluginForExistingPool',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setDefaultBaseFee"`
 *
 *
 */
export const writePluginFactorySetDefaultBaseFee =
  /*#__PURE__*/ createWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setDefaultBaseFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 *
 *
 */
export const writePluginFactorySetFarmingAddress =
  /*#__PURE__*/ createWriteContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const simulatePluginFactory = /*#__PURE__*/ createSimulateContract({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"beforeCreatePoolHook"`
 *
 *
 */
export const simulatePluginFactoryBeforeCreatePoolHook =
  /*#__PURE__*/ createSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'beforeCreatePoolHook',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"createPluginForExistingPool"`
 *
 *
 */
export const simulatePluginFactoryCreatePluginForExistingPool =
  /*#__PURE__*/ createSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'createPluginForExistingPool',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setDefaultBaseFee"`
 *
 *
 */
export const simulatePluginFactorySetDefaultBaseFee =
  /*#__PURE__*/ createSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setDefaultBaseFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pluginFactoryAbi}__ and `functionName` set to `"setFarmingAddress"`
 *
 *
 */
export const simulatePluginFactorySetFarmingAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    functionName: 'setFarmingAddress',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__
 *
 *
 */
export const watchPluginFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pluginFactoryAbi,
  address: pluginFactoryAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__ and `eventName` set to `"DefaultBaseFee"`
 *
 *
 */
export const watchPluginFactoryDefaultBaseFeeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    eventName: 'DefaultBaseFee',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pluginFactoryAbi}__ and `eventName` set to `"FarmingAddress"`
 *
 *
 */
export const watchPluginFactoryFarmingAddressEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pluginFactoryAbi,
    address: pluginFactoryAddress,
    eventName: 'FarmingAddress',
  })
