CodeFog功能如下
通过指定的源路径，找到源路径的所有js代码，先通过terser进行压缩和混淆，再通过javascript-obfuscator进行强混淆和加密。

1，安装需要的nodejs包，全局执行以下内容
npm install terser -g
npm install javascript-obfuscator -g

2，找到CodeFog.js文件所在路径，并执行以下命令
node app.js 源路径 目标输出路径

3，执行完后的【目标输出路径】下时混淆后的代码。