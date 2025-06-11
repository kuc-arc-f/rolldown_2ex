import AgentUtil  from '../lib/AgentUtil';

// first-agent
export async function firstAgent(inputText){
  try{
    let text = "";
    text += "### Step1: サイコロを振ります。" + "\n";
    let cmd = `firstGetRandom 6`;
    console.log("step1cmd=", cmd);
    text += await AgentUtil.sendTool(cmd);
    text += "***\n";
    //Step-2
    cmd = `firstGetDate`;
    console.log("step2cmd=", cmd);
    text += "### Step2: 現在の 日付を返します。" + "\n";
    text += await AgentUtil.sendTool(cmd);
    text += "\n" + "***\n";
    //Step-3
    cmd = `firstGetTime`;
    console.log("step3cmd=", cmd);
    text += "### Step3: 現在の 時間を返します。" + "\n";
    text += await AgentUtil.sendTool(cmd);
    text += "\n" + "***\n";
    
    console.log(text);

    return text;
  }catch(e){
    console.error(e);
    throw new Error('Error , firstAgent');
  }
}

