//Ajax通信とはグーグル・マップのような非同期通信を行うためのもの

setTimeout(() => {
    target.textContent = 'クリックされた';
},3000)

//fetch、thenはpromiseというものが用意されているので、apiからレスポンスを受け取ってから処理をするためのもの
fetch('https://')
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
    });

//thenを使っていくと入れ子になって処理の階層が深くなる場合にasyncを使うと防げる
async function func () {
    const response = await fetch (
    `https://`
    );
    const data = await response.json();
    console.log(data);
}
