
import { useState , useEffect }  from 'react';
import { marked } from 'marked';
import AgentUtil from './lib/AgentUtil';
import ApiUtil from '../lib/ApiUtil';
import { toolSampleAgent } from '../agent/tool-sample-agent';
import { toolAgent3 } from '../agent/tool_agent_3';

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [toolText, setToolText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialAdk = async () => {
      try{
        await AgentUtil.initialAgent("", "tool_agent_3");
      }catch(e){
        console.error(e);
      }
    };
    initialAdk();
  }, []);

  const chatStart = async function(){
    try{    
      setText("");
      setIsLoading(false);
      const elem = document.getElementById("input_text") as HTMLInputElement;
      let inText = "";
      let inToolText = "";
      if(elem){
        inText = elem.value;
      };
      const elemToolText = document.getElementById("tool_text") as HTMLInputElement;
      if(elemToolText){
        inToolText = elemToolText.value;
      }

      console.log("inText=", inText);
      console.log("inToolText=", inToolText);
      if(!inText){ return; }
      setIsLoading(true);
      const agentName = AgentUtil.validAgentName(inText.trim());
      console.log("agentName=", agentName);
      if(agentName){
        let items = [];
        if(agentName === "tool_agent_3"){
          items = toolAgent3();
        }
        console.log(items);

        let htmAll = "";
        let itemCount = 1;
        const agentSendProc = async function(){
          for(const row of items) {
            htmAll += `<div class="label character-label w-full">${row.title}</div>`;
            console.log(row);
            let res = null;
            if(itemCount === 2){
              res = await AgentUtil.postAgent(inToolText, "tool_agent_3");
            }else{
              res = await AgentUtil.postAgent(row.text, "tool_agent_3");
            }
            itemCount += 1; 
            console.log(res);
            htmAll += `<div class="chat-bubble character-bubble w-full">`;
            htmAll += marked.parse(res.text);
            htmAll +=  `</div>`
            //console.log(htmAll);
            setText(htmAll);
          };
          setIsLoading(false);
        }
        agentSendProc();
        return;
      }
    } catch(e){
      console.error(e);
    }
  }

  return (
  <div className="mb-[200px]">
    <div className="flex flex-col w-full max-w-3xl py-4 mx-auto gap-4">
      <div className="flex flex-col gap-2 px-4 bg-white">
        <h1 className="text-2xl font-bold">Agent-Chat</h1>
        <input
          id="input_text"
          type="text"
          value="tool_agent_3"
          className="w-full p-2 border border-gray-300 rounded dark:disabled:bg-gray-700"
          placeholder="Type your message..."
        />
        <hr />
        <input
          id="tool_text"
          type="text"
          defaultValue="お茶 110 JPY をAPI送信して欲しい。"
          className="w-full p-2 border border-gray-300 rounded dark:disabled:bg-gray-700"
          placeholder="Type your message..."
        />
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 disabled:bg-gray-700"
          onClick={()=>{chatStart()}}
        > GO
        </button>

      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: text }} id="get_text_wrap"
          className="mb-8 p-2" />
        {isLoading ? (
          <div 
          className="animate-spin rounded-full h-8 w-8 mx-4 border-t-4 border-b-4 border-blue-500">
          </div>
        ): null}
      </div>

    </div>
  </div>

  );
}