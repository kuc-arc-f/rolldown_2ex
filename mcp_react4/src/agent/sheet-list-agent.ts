import AgentUtil  from '../lib/AgentUtil';

export async function SheetListAgent(){
  try{
    let text = "### Step1: リストを markdown記法の表形式で表示" + "\n";
    text += await AgentUtil.sendTool("getSheetTestで、リストを markdown記法の表形式で表示して欲しい");

    text += "### Step2: 一覧のCSVダウンロードのリンク表示" + "\n";;
    text += await AgentUtil.sendTool("getSheetCsvで。一覧のCSVダウンロードのリンク表示して欲しい。");

    return text;
  }catch(e){
    console.error(e);
    throw new Error('Error , SheetListAgent');
  }
}
