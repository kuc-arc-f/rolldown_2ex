import AgentUtil  from '../lib/AgentUtil';

// price-list-up-agent 200
export async function PriceListUpAgent(inputText){
  try{
    let target = inputText.replace(/[^0-9]/g, '')
    console.log("target=", target);
    if(!target){
      throw new Error("Error, target=NULL");
    }

    let text = "";
    const step1num = Number(target);
    let valid = AgentUtil.validateNumber(step1num)
    console.log("step1num.valid=", valid);
    if(valid === false){
      throw new Error("Error, validateNumber is NG");
    }
    text += "### Step1: 指定価格以上のリストを表示します。" + "\n";
    let cmd = `getPriceListUp 価格: ${step1num} 円以上の。リストを markdown記法の表形式で表示して欲しい`;
    console.log("step1cmd=", cmd);
    text += await AgentUtil.sendTool(cmd);
    //Step-2
    cmd = `getPriceUpTotal 価格: ${step1num} 円以上`;
    console.log("step2cmd=", cmd);
    text += "### Step2: 指定価格以上の合計金額を表示します。" + "\n";
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

