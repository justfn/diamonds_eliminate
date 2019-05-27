import {
  getRandom
} from "./utils.js";

function layoutInit(obj){
  obj.list = []; 
  obj.isPause = false; 
  obj.isGameOver = false; 
  // 需在指定时间内开启多个游戏,否则不增加难度系数 
  obj.gameStartTime = Date.now(); 
  obj.hardLevel = 33; // 难度系数 
}

export class Layout {
  constructor(rows,cols,time,gameWrap,isStart) {
    this._rows = rows // 行数 
    this._cols = cols // 列数 
    this._time = time // 下落时间 
    this._gameWrap = gameWrap // 
    
    this.constructor.list.push( this ); 
    if (!isStart) { return this; }
    
    // 可能出现的块 
    this.blocks = [
      // ****
      {
        position: [
          //  [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 0, 2, ],
              [ 0, 3, ],
            ],
            range: [0,cols-4],
          },
          {
            position: [
              [ 0, 0, ],
              [ 1, 0, ],
              [ 2, 0, ],
              [ 3, 0, ],
            ],
            range: [0,cols-1],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      // **
      // ** 
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 1, 0, ],
              [ 1, 1, ],
            ],
            range: [0,cols-2],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      // *
      // **
      //  *
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 0, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 2, 1, ],
            ],
            range: [0,cols-2],
          },
          {
            position: [
              [ 0, 1, ],
              [ 0, 2, ],
              [ 1, 0, ],
              [ 1, 1, ],
            ],
            range: [0,cols-3],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      //  *
      // **
      // *
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 1, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 2, 0, ],
            ],
            range: [0,cols-2],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 1, 1, ],
              [ 1, 2, ],
            ],
            range: [0,cols-3],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      // *
      // ***
      //  
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 0, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 1, 2, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 1, 0, ],
              [ 2, 0, ],
            ],
            range: [0,cols-2],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 0, 2, ],
              [ 1, 2, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 1, ],
              [ 1, 1, ],
              [ 2, 0, ],
              [ 2, 1, ],
            ],
            range: [0,cols-2],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      //   *
      // ***
      //  
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 2, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 1, 2, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 0, ],
              [ 1, 0, ],
              [ 2, 0, ],
              [ 2, 1, ],
            ],
            range: [0,cols-2],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 0, 2, ],
              [ 1, 0, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 1, 1, ],
              [ 2, 1, ],
            ],
            range: [0,cols-2],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
      //  *
      // ***
      //  
      {
        position: [
          // [ 行, 列 ] 
        ],
        styleList: [
          {
            position: [
              [ 0, 1, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 1, 2, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 0, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 2, 0, ],
            ],
            range: [0,cols-2],
          },
          {
            position: [
              [ 0, 0, ],
              [ 0, 1, ],
              [ 0, 2, ],
              [ 1, 1, ],
            ],
            range: [0,cols-3],
          },
          {
            position: [
              [ 0, 1, ],
              [ 1, 0, ],
              [ 1, 1, ],
              [ 2, 1, ],
            ],
            range: [0,cols-2],
          },
        ],
        styleIdx: 0,
        isDone: false, 
      },
    ]
    // 当前块  
    this.currentBlock = null; 
    this.score = 0; 
    
    let state = [
      // [ // 行 
      //   <element>, // 单元格 
      //   ..., 
      // ]
    ];  
    this._wrap = null; // 格子外层容器 
    this.elem = this.insertElems(); 
    for (var i = 0; i < rows; i++) {
      let row = document.createElement("div")
      row.setAttribute("class","row")
      // row.setAttribute("data-num",i)
      this._wrap.appendChild(row)
      state.push([])
      for (var j = 0; j < cols; j++) {
        let cell = document.createElement("div")
        cell.setAttribute("class","cell")
        row.appendChild(cell)
        state[i].push(cell)
      }
    }
    this.state = state; 
    
    
    // 启动游戏 
    this.bindEvents();
    gameWrap.appendChild(this.elem)
    this.createBlock();
  }
  
  insertElems(){
    let layoutEl = document.createElement("div")
    layoutEl.setAttribute("class","layout")
    
    this._wrap = document.createElement("div")
    this._wrap.setAttribute("class","wrap")
    layoutEl.appendChild(this._wrap)
    
    return layoutEl;
  }
  bindEvents(){
    // 操作的映射 
    this._evtHandler = (evt)=>{
      // console.log(evt);
      let code = evt.code 
      if ( code!=='F5'&&code!=='F12') { evt.preventDefault(); }
      
      if (!this[code] || this.constructor.isGameOver ) { return ; }
      
      this[code](this.currentBlock,1);
    }
    window.addEventListener("keydown",this._evtHandler)
  }
  createBlock(){
    let blkRdm = getRandom(0,this.blocks.length-1)
    // let block = JSON.parse(JSON.stringify(this.blocks[0]))
    this.currentBlock = JSON.parse(JSON.stringify(this.blocks[blkRdm]))
    this.currentBlock.styleIdx = getRandom(0,this.currentBlock.styleList.length-1)
    this.currentBlock.position = JSON.parse(JSON.stringify(
      this.currentBlock.styleList[this.currentBlock.styleIdx].position)
    ); 
    let style = this.currentBlock.styleList[this.currentBlock.styleIdx] 
    let rdm = getRandom(style.range[0],style.range[1])
    this.currentBlock.position.forEach((itm,idx)=>{
      itm[1] += rdm; 
      let cell = this.state[itm[0]][itm[1]];
      cell.setAttribute("bg","true")
      cell.setAttribute("active","true")
    })
    this.currentBlock = this.currentBlock;
    this.autoDown(this.currentBlock)
    // return block;
  }
  autoDown(block){
      setTimeout(()=>{
        if ( block.isDone ) {return ; }
        
        this.ArrowDown(block,1)
        this.autoDown(block); 
      },this._time)
  }
  
  clearBlock(block){
    block.position.forEach((itm,idx)=>{
      let cell = this.state[ itm[0] ][ itm[1] ]
      cell.removeAttribute("bg")
      cell.removeAttribute("active")
    })
  }
  ArrowUp(block){  // 旋转方块 
    if (this.constructor.isPause ) { return ; }
    
    let preStyle = block.styleList[block.styleIdx%block.styleList.length].position; 
    let nextStyle = block.styleList[(block.styleIdx+1)%block.styleList.length].position; 
    // 切换的条件 
    let isRotate = block.position.every((itm,idx)=>{
      let rIdx = itm[0]+nextStyle[idx][0]-preStyle[idx][0]
      let cIdx = itm[1]+nextStyle[idx][1]-preStyle[idx][1]
      let r = this.state[rIdx]
      return r && r[cIdx] && (!r[cIdx].getAttribute("bg") || r[cIdx].getAttribute("active"))
    })
    if ( isRotate ) {
      this.clearBlock(block)
      block.styleIdx += 1; 
      block.position.forEach((itm,idx)=>{
        itm[0] +=  nextStyle[idx][0]-preStyle[idx][0]
        itm[1] +=  nextStyle[idx][1]-preStyle[idx][1]
        let cell = this.state[itm[0]][itm[1]]
        cell.setAttribute("bg","true")
        cell.setAttribute("active","true")
      })
    }
  }
  ArrowLeft(block,step){  // 左移方块 
    let bol = block.position.every((itm,idx)=>{
      let cell = this.state[itm[0]][itm[1]-step]; 
      
      return cell && ( cell.getAttribute("active") || !cell.getAttribute("bg") )
    } )
    if (!bol || block.isDone || this.constructor.isPause ) { return ; }
    
    this.clearBlock(block)
    block.position.forEach((itm,idx)=>{
      itm[1] -= step
      let cell = this.state[itm[0]][itm[1]]
      cell.setAttribute("bg","true")
      cell.setAttribute("active","true")
    })
  }
  ArrowRight(block,step){  // 右移方块 
    let bol = block.position.every((itm,idx)=>{
      let cell = this.state[itm[0]][itm[1]+step]
      return cell && ( cell.getAttribute("active") || !cell.getAttribute("bg") )
    } )
    if (!bol || block.isDone || this.constructor.isPause) { return ; }
    
    this.clearBlock(block)
    block.position.forEach((itm,idx)=>{
      itm[1] += step
      let cell = this.state[itm[0]][itm[1]]
      cell.setAttribute("bg","true")
      cell.setAttribute("active","true")
    })
  }
  ArrowDown(block,step){  // 下移方块 
    if ( block.isDone || this.constructor.isPause ) { return ; }
    
    let bol = block.position.every((itm,idx)=>{
      let row = this.state[itm[0]+step]
      return row && ( row[itm[1]].getAttribute("active") || !row[itm[1]].getAttribute("bg"))
    } )
    if ( bol ) {
      this.clearBlock(block);
      block.position.forEach((itm,idx)=>{
        itm[0] += step
        let cell = this.state[itm[0]][itm[1]]
        cell.setAttribute("bg","true")
        cell.setAttribute("active","true")
      })
    }
    else {
      this.bottomCall(block); 
    }
  }
  Space(block){  // 方块快速到底 
    // return ;
    let len = block.position.reduce((retVal,itm,idx)=>{ 
      let row1 = this.state.slice(itm[0]).findIndex((itm1,idx1)=>{ 
        return itm1[itm[1]].getAttribute("bg")&&!itm1[itm[1]].getAttribute("active")   
      } )
      row1 = row1===-1?this._rows:row1+itm[0];
      row1 -= itm[0]
      return (retVal-row1>0) ? row1 : retVal;
    }, 99999999)
    this.ArrowDown(block,len-1);
    this.bottomCall(block); 
  }
  bottomCall(block){  // 触底后的回调 
    block.isDone = true; 
    this.uodateDoneBlock(block);
    this.constructor.isGameOver = this.checkGameOver();
    if ( this.constructor.isGameOver ) {
      this.gameOverAnimation()
      return ;
    }
    
    this.eliminateRows()
    this.createBlock();
  }
  
  // 更新已触底的块 
  uodateDoneBlock(block){
    block.position.forEach((itm,idx)=>{
      let cell = this.state[itm[0]][itm[1]]
      cell.removeAttribute("active")
    })
  }
  // 消除行 
  eliminateRows(){
    this.state.forEach((row,idx)=>{
      let bol = row.every((cell)=>{
        return cell.getAttribute("bg")
      })
      if ( !bol ) { return ; }
      
      row.forEach((cell)=>{
        cell.removeAttribute("bg")
      })
      this.state.splice(idx,1)
      this.state.splice(0,0,row)
      this._wrap.prepend(this._wrap.querySelectorAll(".row")[idx])
      this.score++; 
    })
  }
  
  // 检查游戏是否结束
  checkGameOver(){
    // return !block.position.every((itm,idx)=>{
    //   let row = this.state[ itm[0]+1 ]
    //   return row && ( row[itm[1]].getAttribute("active") || !row[itm[1]].getAttribute("bg") )
    // })
    return this.constructor.isGameOver || this.state[0].some((itm,idx)=>{
      return itm.getAttribute("bg")
    })
  }
  // 游戏结束动画 
  gameOverAnimation(){
    let state = this.state 
    // 动画1 
    // let arr1 = []
    // state.forEach((row,idx)=>{
    //   if (idx%2 === 1) {
    //     row.reduceRight((retV,cell)=>{ 
    //       arr1.push(cell)
    //     },'')
    //   }
    //   else {
    //     row.forEach((cell)=>{
    //       arr1.push(cell)
    //     })
    //   }
    // })
    // let _a = (idx)=>{
    //   arr1[idx].setAttribute("bg",'')
    //   if ( idx+1 < arr1.length  ) {
    //     setTimeout(function(){ _a(idx+1) },8)
    //   }
    //   else {
    //     let div = document.createElement("div")
    //     div.textContent = `最终得数: ${this.score}`;
    //     div.setAttribute("class",'score')
    //     this._wrap.appendChild(div)
    //     arr1.forEach((cell)=>{
    //       cell.removeAttribute("bg")
    //     })
    //   }
    // }
    // _a(0)
    
    // 动画2 
    let a = 0; 
    let _b = (idx,num)=>{
      state[idx].forEach((cell,idx)=>{
        if (num>0) {
          cell.setAttribute("bg","")
        }
        else {
          cell.removeAttribute("bg") 
        }
      })
      if ( idx+num < state.length && idx+num >= 0 ) {
        setTimeout(()=>{ _b(idx+num,num) },14)
      }
      else {
        a++; 
        setTimeout(()=>{ 
          if ( idx > 0   ) { _b(state.length-1,-1) }
        },128)
        if (a===2) {
          setTimeout(()=>{
            let div = document.createElement("div")
            div.textContent = `得分: ${this.score}`;
            div.setAttribute("class",'score')
            this.elem.appendChild(div)
            
            let score = 0 
            this.constructor.list.forEach((itm,idx)=>{
              score += itm.score
            })
            score += score*(this.constructor.list.length-1)*this.constructor.hardLevel; 
            document.querySelector(".finaScroe").textContent = `最终得分: ${score}`;
          },123)
        }
      }
    }
    _b(0,1)
  }
  
  static bindGlobalEvents(startBtn,pauseBtn,addGame,finaScroe){
    startBtn.addEventListener("click",(evt)=>{
      this.list.forEach((itm)=>{
        itm.elem && itm.elem.remove();
        window.removeEventListener("keydown",itm._evtHandler)
      })
      let instance = this.list[0];
      
      layoutInit(this); 
      finaScroe.textContent = '当前难度积分奖励系数为: 0'
      new this(instance._rows, instance._cols, instance._time, instance._gameWrap, true);
    })
    pauseBtn.addEventListener("click",(evt)=>{
      if ( this.isPause ) { pauseBtn.textContent = '暂停' }
      else { pauseBtn.textContent = '继续' }
      
      this.isPause  = !this.isPause
    })
    addGame.addEventListener("click",(evt)=>{
      if ( this.isGameOver ) { 
        alert('游戏已结束!'); 
        return ; 
      }
      
      let instance = this.list[0];
      if ( Date.now() - this.gameStartTime > 7*1000 ) {
        window.alert('需在游戏开始的前 7s 内增加难度,否则不增加奖励分!');
        this.hardLevel = 0; 
        finaScroe.textContent = `当前难度积分奖励系数为: ${this.hardLevel}` 
        new this(instance._rows, instance._cols, instance._time, instance._gameWrap, true);
        return ;
      }
      // 此时list中还未push,故不减一 
      finaScroe.textContent = `当前难度积分奖励系数为: ${this.list.length*this.hardLevel}` 
      new this(instance._rows, instance._cols, instance._time, instance._gameWrap, true);
    })
  }
}
layoutInit(Layout); 






















