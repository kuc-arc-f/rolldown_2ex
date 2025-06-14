import AgentUtil  from '../lib/AgentUtil';

function extractNumbers(prompt) {
  // 1. 正規表現で全ての連続する数字を取得
  const matches = prompt.match(/\d+/g);
  // 2. 見つかった文字列を数値に変換し、配列で返す
  return matches ? matches.map(x => parseInt(x, 10)) : [];
}

// price-list-updown-agent 最低金額: 100 円 , 最高金額: 200 円
export function PriceListUpdownAgent(inputText){
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
    let cmd_1 = `getPriceUpDown 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円。markdown記法の表形式で表示して欲しい`;
    //console.log("step1cmd=", cmd_1);
    let cmd_2 = `getPriceUpDownTotal 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円の、合計値を返す`;
    //console.log("step2cmd=", cmd_2);
    let cmd_3 = `getPriceUpDownMin 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円の範囲内で最低値を返す`;
    console.log("step3cmd=", cmd_3);
    let cmd_4 = `getPriceUpDownMax 最低金額: ${lowPrice} 円 , 最高金額: ${highPrice} 円の範囲内で最高値を返す`;
    console.log("step3cmd=", cmd_4);
 
    const items = [
      { 
        text: cmd_1 , 
        title: "Step1: 指定価格範囲のリストを表示します。" + "\n"
      } , 
      { 
        text: cmd_2 , 
        title: "Step2: 指定価格範囲の合計金額を表示します。" + "\n"
      } , 
      { 
        text: cmd_3 , 
        title: "Step3: 指定価格範囲の最低値を表示します。" + "\n"
      } , 
      { 
        text: cmd_4 , 
        title: "Step4: 指定価格範囲の最高値を表示します。" + "\n"
      } ,

    ];
    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , PriceListUpdownAgent');
  }
}


