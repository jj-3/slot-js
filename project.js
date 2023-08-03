//1. 入金する
//2.賭けるライン数を決定する
//3. ユーザーがいくら賭けているかの判断
//4.スロットを回す（抽選）
//5.ユーザーが勝ったかどうかを確認する
//6.ユーザーに賞金を与える
//7.ユーザーの掛け金をゼロにして再度始めからプレー

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("入金額を決めてね: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("入金額が無効です。もう一度お試しください。");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("賭けるライン数を入力してね(1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("行数が無効です。もう一度お試しください。");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("ラインごとの掛け金を入力してください: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again.");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("最終残高は$" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("勝利！, $" + winnings.toString());

    if (balance <= 0) {
      console.log("残高がゼロ!");
      break;
    }

    const playAgain = prompt("ゲームを続ける (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();