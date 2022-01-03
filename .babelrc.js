module.exports={
    presets : ['@babel/preset-env'], //일일히 따로 명시해야하는 자바스크립트 기능을 한꺼번에지원해주는 패키지
    plugins:[
        ['@babel/plugin-transform-runtime'] //비동기처리를 위해 
    ]
}