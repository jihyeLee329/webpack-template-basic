const path = require('path') //전역모듈, 언제든지 쓸 수 있음.
//path라는 전역 모듈을 가져와 path 변수에 할당. 

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    //파일을 읽어들이기 시작하는 진입점 설정
    //parcel index.html ===> parcel 번들러의 진입점을 index.html로 설정한거임
    //기본적으로 웹팩은 html 이 아닌 js 파일로 
    entry:'./js/main.js',
    //결과물(번들)을 반환하는 설정
    output : {
        //build 명령어 돌리면 생성되는 dist 폴더와 같은 개념으로 생각
        //웹팩 동작시키면 어떠한 경로에 결과물 만들어서 내어줄건지,
        //node.js 에서 요구하는 절대 경로가 필요함. 
        // path:path.resolve(__dirname, 'dist'), 
        // //resolve는 1번째 인수와 2번째 인수를 합쳐주는 역할
        // //__dirname 또한 node.js에서 언제든 사용할 수 있는 변수. 
        // //__dirname 현재 파일이 있는 그 경로를 지칭. webpack.config.js 파일이 있는 경로를 뜻함
        //근데 path 따로 지정 안하면 자동으로 dist란 폴더가 생성됨. 
        
        // //그 결과를 main.js로 entry에서 지정한 파일 이름과 동일하게 지정해줄 수 있음.
        // //결론 : entry로 웹브라우저에서 동작할 수 있드록 컴파일 할 파일 경로를 가져와서 
        // //build(상품화) 할 때, main.js를 복사하여 app.js란 파일로 만들어 dist 이란 폴더에 복붙한다.
        // filename : 'main.js',
        //filename 역시 따로 지정 안해주면, entry에서 사용한 파일 이름 그대로 생성해줌 
        clean: true //새롭게 build 명령 돌렸을 때 기존에 생성한 파일은 지워준다.
    },

    module :{
        rules : [
            {
                test:/\.s?css$/, //.css 로 끝나는 파일을 찾는 정규식 $이 앞의 문자로 끝나는 이란 의미
                use:[ // 해석되는 순서는 맨 아래서부터
                    'style-loader',// 해석된 css를 html의 <style>에 삽입해주는 패키지
                    'css-loader', //단순 js 파일에서 css파일을 불러들어올 뿐 해석될 수 없으므로, 
                    //js 파일에서 불러온 css를 해석해주기 위한 패키지
                    'postcss-loader', //공급업체(브라우저별) 접두사 붙여주기
                    'sass-loader' //scss 파일 해석해서 
                ] 
            },
            {
                test : /\.js$/,
                use:[
                    'babel-loader'
                ]
            }
        ]
    },



    //번들링 후 결과물의 처리 방식 등 다양한 플러그인드을 설정
    plugins : [
        new HtmlPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns : [
                {from : 'static'}
            ]
        })
    ],
    devServer : {
        host:'localhost'
    }
}