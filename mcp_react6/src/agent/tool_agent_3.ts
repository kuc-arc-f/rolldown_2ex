import AgentUtil  from '../lib/AgentUtil';

//tool_agent_3
export function toolAgent3(){
  try{
    const items = [
      { 
        text: `今日の日付 わかります？` ,
        title: "Step1: 現在の日付を表示します。" + "\n"
      } , 
      { 
        text: `お茶 120 JPY をAPI送信して欲しい。` ,
        title: "Step2: 項目名、価格を API送信します。" + "\n"
      } , 
    ];

    return items;
  }catch(e){
    console.error(e);
    throw new Error('Error , toolAgent3');
  }
}

