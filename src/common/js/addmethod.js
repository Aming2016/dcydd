function addevent(objct){
       this.$http.post(this.$url.URL.EVENTADD,{
        dataMap: objct.data,
        eventType:objct.type
       }) 
       .then(res=>{
        console.log(res)
       })
};
export {
      addevent  
};