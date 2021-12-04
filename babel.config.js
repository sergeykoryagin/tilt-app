module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver', {
                    root: ['./src'],
                    alias: {
                        assets: './assets',
                        components: './src/components',
                        screens: './src/screens',
                        constants: './src/constants',
                        hooks: './src/hooks',
                        utils: './src/utils',
                        navigation: './src/navigation',
                        interfaces: './src/interfaces',
                        stores: './src/stores',
                        services: './src/services',
                        context: './src/context'
                    },
                }
            ]
        ]
    };
};
