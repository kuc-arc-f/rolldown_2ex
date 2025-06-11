import AgentUtil  from '../lib/AgentUtil';

function extractNumbers(prompt) {
  // 1. 正規表現で全ての連続する数字を取得
  const matches = prompt.match(/\d+/g);
  // 2. 見つかった文字列を数値に変換し、配列で返す
  return matches ? matches.map(x => parseInt(x, 10)) : [];
}

// price-list-updown-agent 最低金額: 100 円 , 最高金額: 200 円
export async function PriceListUpdownAgent(inputText){
  try{
    //let target = inputText.replace(/[^0-9]/g, '')
    const target = extractNumbers(inputText);
    console.log(target);
    if(!target[0] || !target[1]){
      throw new Error("Error, target array NULL");
    }
    const lowPrice = target[0];
    const highPrice = target[1];

    let text = "";
    text += "### Step1: 指定価格範囲のリストを表示します。" + "\n";
    let cmd = `getPriceUpDown 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円。markdown記法の表形式で表示して欲しい`;
   console.log("step1cmd=", cmd);
    text += await AgentUtil.sendTool(cmd);
    text += "\n";
    text += "***\n";
 
    //Step-2
    cmd = `getPriceUpDownTotal 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円の、合計値を返す`;
    console.log("step2cmd=", cmd);
    text += "### Step2: 指定価格範囲の合計金額を表示します。" + "\n";
    text += await AgentUtil.sendTool(cmd);
 
    return text;
  }catch(e){
    console.error(e);
    throw new Error('Error , PriceListUpAgent');
  }
}
/*
let text = "### Step1: 送信パラメータを確認" + "\n";
let cmd = `getPriceParam ${target}`;
console.log("step1cmd=", cmd);
target = await  AgentUtil.sendTool(cmd);
target = target.replace(/[^0-9]/g, '')
text += "価格：" + step1num + "円以上\n";
*/

