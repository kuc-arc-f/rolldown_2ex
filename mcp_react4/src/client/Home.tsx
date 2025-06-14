
import {useState}  from 'react';
import { marked } from 'marked';
import AgentUtil from './lib/AgentUtil';
import ApiUtil from '../lib/ApiUtil';
import { firstAgent } from '../agent/first-agent';
import { PriceListUpAgent } from '../agent/price-list-up-agent';
import { PriceListUpdownAgent } from '../agent/price-list-updown-agent';

export default function Chat() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const chatStart = async function(){
    try{    
      setText("");
      setIsLoading(false);
      const elem = document.getElementById("input_text") as HTMLInputElement;
      let inText = "";
      if(elem){
        inText = elem.value;
      };
      console.log("inText=", inText);
      if(!inText){ return; }
      setIsLoading(true);
      const agentName = AgentUtil.validAgentName(inText.trim());
      console.log("agentName=", AgentUtil.validAgentName(inText.trim()));
      if(agentName){
        let items = [];
        if(agentName === "first-agent"){
          items = firstAgent();
        }
        if(agentName === "price-list-up-agent"){
          items = PriceListUpAgent(inText);
        }
        if(agentName === "price-list-updown-agent"){
          items = PriceListUpdownAgent(inText);
        }
        console.log(items);

        let htmAll = "";
        const agentSendProc = async function(){
          for(const row of items) {
            //htmAll += marked.parse(row.title);
            htmAll += `<div class="label character-label w-full">${row.title}</div>`;
            console.log(row);
            let res = await ApiUtil.post({messages: row.text }, "/api/chat");
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
      const item = {messages: inText};
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/chat", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      setIsLoading(false);
      const json = await res.json();
      console.log(json);
      let htm = marked.parse(json.text);
      console.log(htm);
      //@ts-ignore
      setText(htm);
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