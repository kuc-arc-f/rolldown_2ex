import { marked } from 'marked';

const resultText = "";

const AgentUtil = {

  validAgent: function (message: string){
    let ret = false;

    if(message.indexOf("sheet-list-agent") >= 0){
      return true;
    }
    return ret;
  },

  /*
  *
  * @param
  *
  * @return
  */
  startAgent: async function(){
    try{
      let text = "### Step1: リストを markdown記法の表形式で表示" + "\n";
      let json = await this.postAgent("getSheetTestで、リストを markdown記法の表形式で表示して欲しい");
      text += json.text;
      //text += "\n" + "***" + "\n";

      text += "### Step2: 一覧のCSVダウンロードのリンク表示" + "\n";;
      json = await this.postAgent("getSheetCsvで。一覧のCSVダウンロードのリンク表示して欲しい。");
      text += json.text;

      let htm = marked.parse(text);
      return htm;
    }catch(e){
      console.error(e);
      throw new Error('Error , startAgent');
    }
  },

  /*
  *
  * @param
  *
  * @return
  */
  postAgent: async function(inText: string) {
    try{
      const item = {messages: inText};
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/chat", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json();
      console.log(json);
      //const htm = marked.parse(json.text);
      return json
    }catch(e){
      console.error(s);
      throw new Error('Error , postAgent');
    }
  } ,

}

export default AgentUtil;
