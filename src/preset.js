// 自定义事件 
// 解决匿名函数无法解绑事件的问题 
EventTarget.prototype.evtMaps = {
  // evtName: [ handle, ], 
}
EventTarget.prototype.on = function(evtName,handle){
  if ( !this.evtMaps[evtName] ) {
    this.evtMaps[evtName] = []
  }
  this.evtMaps[evtName].push(handle)
  
  this.addEventListener(evtName,handle)
}
EventTarget.prototype.off = function(evtName,handle){
  if (handle) {
    this.removeEventListener(evtName,handle)
  }
  else {
    let handles = this.evtMaps[evtName]; 
    handles && handles.forEach((itm,idx)=>{
      this.removeEventListener(evtName,itm); 
    })
  }
}


