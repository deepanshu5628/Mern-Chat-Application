export async function apiconnector(method,url,body,headers,params){
    let res=await fetch(url,{
        method:method,
        headers:headers? headers:{"Content-Type":"application/json"},
        body:body?JSON.stringify(body):null,
        params:params? params:null,
        
    });

    let data=await res.json();
    return data;
}