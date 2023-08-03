//クラス(雛形)とインスタンスについて

class character {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    introduce() {
        console.log(`${this.name}, ${this.type}`);
    }
}

//class（雛形）から作られたオブジェクトをインスタンスという（インスタンス化）
const shinji = new character('ikari shinji', 'syogouki');
const ayanami = new character('ayanami rei', 'zerogouki');
const asuka = new character('sikinami asuka', 'nigouki');

console.log(shinji);
console.log(shinji.name);

//クラスの継承

//別のクラスを拡張して（内容を引き継いで）新たにクラスをつくる
class MyCharacter extends character {
    constructor(name, type, atk, hp) {
        super(name, type);
        this.atk = atk;
        this.hp = hp;
    }
    getStatus() {
        return {
            atk: this.atk,
            hp: this.hp
        };
    }
}

//const shinji = new MyCharacter('ikari shinji', 'syogouki', 100, 40);
//mycharacterの中にintroduceというメソッドはないが、継承したcharacterクラスにはあるのでintroduceが使える
shinji.introduce();
console.log(shinji.getStatus());