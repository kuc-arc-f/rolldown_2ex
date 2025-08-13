const CrudIndex = {
  /**
  *
  * @param
  *
  * @return
  */
  post: async function(item: any, path: string): Promise<any>
  {
    try {
      const url = process.env.PUBLIC_API_URL;
      const apiKey = process.env.PUBLIC_API_KEY;
//console.log("#getList.apiKey=" + apiKey);
      console.log("#getList.url=" , url+ path);

      item.api_key = apiKey;
      const body: any = JSON.stringify(item);		
      const res = await fetch(url + path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status !== 200) {
        console.error("error, status <> 200");
        throw new Error(await res.text());
      }
      //if (json.ret !==  LibConfig.OK_CODE) {
      //  console.error("Error, json.ret <> OK");
      //  return {};
      //} 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  },
  
  getTotalCount : function (items: any[]): any  
  {
    try{
      let retCount = 0;
      items.forEach(item => {
//        console.log("count= ", item.count);
        retCount = retCount + item.count;
      });
      return retCount;
    } catch (e) {
      console.error(e);
      throw new Error("Error, getTotalCount");
    } 
  }  ,
}  
export default CrudIndex;