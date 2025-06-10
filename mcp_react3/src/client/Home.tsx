
import {useState}  from 'react';
import { marked } from 'marked';
import AgentUtil from './lib/AgentUtil';

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
      //console.log("validAgent=", AgentUtil.validAgentName(inText.trim()));
      setIsLoading(true);
      const agentName = AgentUtil.validAgentName(inText.trim());
      if(agentName){
        const item = {messages: inText, agent_name: agentName};
        const body: any = JSON.stringify(item);		
        const res = await fetch("/api/agent", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},      
          body: body
        });
        setIsLoading(false);
        if(res.ok === false){
          throw new Error("res.OK = NG");
        }
        const json = await res.json();
        console.log(json);
        let htm = marked.parse(json.text);
        setText(htm);
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
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto gap-4">
      <h1 className="text-2xl font-bold">Agent-Chat</h1>
      <div className="flex flex-col gap-2">
        <input
          id="input_text"
          type="text"
          className="w-full p-2 border border-gray-300 rounded dark:disabled:bg-gray-700"
          placeholder="Type your message..."
        />
        <button
          type="button"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-700"
          onClick={()=>{chatStart()}}
        > GO
        </button>
        <div>
        {isLoading ? (
          <div 
          className="animate-spin rounded-full h-8 w-8 mx-4 border-t-4 border-b-4 border-blue-500">
          </div>
        ): null}
        </div>
        <div dangerouslySetInnerHTML={{ __html: text }} id="get_text_wrap"
        className="mb-8 p-2 bg-gray-100" />
        <hr className="my-1" />
      </div>
    </div>
  );
}