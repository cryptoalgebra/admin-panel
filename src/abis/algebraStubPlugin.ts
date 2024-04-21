export const algebraStubPluginABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_factory',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'afterFlashHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'afterInitializeHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'afterPositionHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'afterSwapHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'beforeFlashHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'beforeInitializeHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'beforePositionHookDisabled',
        type: 'error',
    },
    {
        inputs: [],
        name: 'beforeSwapHookDisabled',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'newPluginConfig',
                type: 'uint8',
            },
        ],
        name: 'newPluginConfig',
        type: 'event',
    },
    {
        inputs: [],
        name: 'ALGEBRA_BASE_PLUGIN_MANAGER',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'afterFlash',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint160',
                name: '',
                type: 'uint160',
            },
            {
                internalType: 'int24',
                name: '',
                type: 'int24',
            },
        ],
        name: 'afterInitialize',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'int24',
                name: '',
                type: 'int24',
            },
            {
                internalType: 'int24',
                name: '',
                type: 'int24',
            },
            {
                internalType: 'int128',
                name: '',
                type: 'int128',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'afterModifyPosition',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
            {
                internalType: 'uint160',
                name: '',
                type: 'uint160',
            },
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'afterSwap',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'beforeFlash',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint160',
                name: '',
                type: 'uint160',
            },
        ],
        name: 'beforeInitialize',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'int24',
                name: '',
                type: 'int24',
            },
            {
                internalType: 'int24',
                name: '',
                type: 'int24',
            },
            {
                internalType: 'int128',
                name: '',
                type: 'int128',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'beforeModifyPosition',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
            {
                internalType: 'uint160',
                name: '',
                type: 'uint160',
            },
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'beforeSwap',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'defaultPluginConfig',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pluginConfig',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: '_pluginConfig',
                type: 'uint8',
            },
        ],
        name: 'setNewPluginConfig',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;
