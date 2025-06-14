import AgentUtil  from '../lib/AgentUtil';

// price-list-up-agent 200
export function PriceListUpAgent(inputText){
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

    const items = [
      { 
        text: `getPriceListUp 価格: ${step1num} 円以上の。リストを markdown記法の表形式で表示して欲しい` ,
        title: "Step1: 指定価格以上のリストを表示します。" + "\n"
      } , 
      { 
        text: `getPriceUpTotal 価格: ${step1num} 円以上` ,
        title: "Step2: 指定価格以上の合計金額を表示します。" + "\n"
      } , 
    ];

    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , firstAgent');
  }
}

