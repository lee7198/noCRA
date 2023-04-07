const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  //번들링 할 파일 확장자
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  //번들링 진입점
  output: {
    path: path.resolve(__dirname, "build"), // 빌드되는 파일들이 만들어지는 위치, __dirname: 현재 디렉토리
    filename: "bundle.js", //번들 이름
  },

  module: {
    rules: [
      {
        test: /\\.(ts|js)x?$/, //loader를 적용할 파일 정규식 명시
        use: [
          //사용할 loader
          {
            //es6 > es5 변환 (transpiler)
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/, //loader를 배치시킬 파일 명시
      },
      {
        test: /\\.tsx?$/,
        use: ["ts-loader"],
        exclude: ["/node_modules"],
      },
      {
        test: /\\.css$/,
        //css-loader: css를 js처럼 사용할 수 있도록 처리, style-loader: js로 처리된 스타일시트 코드를 html에 적용
        use: ["style-loader", "css-loader"],
        //use에 선언된 가장 오른쪽 로더가 먼저 실행 (오른쪽에서 왼쪽 순으로)
      },
      {
        test: /\\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },

  //webpack 서버 설정
  devServer: {
    static: path.join(__dirname, "build"),
    port: 8088,
  },

  plugins: [
    //분리된 css, js 파일들을 각각 html에 link 자동화
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
    }),

    //output.path 디렉토리에 있는 이전에 빌드된 결과물 삭제
    new CleanWebpackPlugin(),
  ],
};
