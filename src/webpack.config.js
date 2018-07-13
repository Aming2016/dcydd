module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    loaders: [
        {test: /\.js?$/, loaders: ['babel-loader']}, //babel加载器可以把jsx的语法转换为js的语法，也可以把es6的语法标准转换es5的语法标准
        {text: /\.less$/, logders: ['less-loader']}
 
    ],
}