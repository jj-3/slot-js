//文字列を数値に変換する
number = NUmve(value);
number = parseINt(str, radix);
number = Number.parseInt(str, radix);
number = Number.parseFloat(str);

const obj = { 
    name: "ike",
    number: 123,
    //以下のようにオブジェクトの中で利用する関数のことをメソッドという
    func () {
    const func2 = () => {
        return;
      }
    }
};

obj.name();

//アロー関数は、関数式の書き方として使えるもの（関数宣言とは別）
const getArea = (引数) => {
    return area; 
};

getArea(引数);


// for (初期化式　条件式　増分式){
//     実行する文
// }
// for (let i = 1; i <= 10; i++) {
//     result += i;
//


function sumNumber(...args) {
    let result = 0;
    args.forEach(arg => {
        result += arg;
    });
    return result;
}

console.log(sumNumber(1,2,3));

const animals = {
    cat: 'nya-'
};

Object.keys(animals).forEach(k => {
    console.log(k);
} )