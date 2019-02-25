const path = require('path');

module.exports = () => {
    return {
        entry: './src/index',
        resolve: {
            extensions: [
                '.js', '.jsx'
            ],
            modules: ['node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'stage-0', 'react']
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }]
                }
            ]
        }
    }
};