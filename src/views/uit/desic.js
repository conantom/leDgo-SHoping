//防抖
export function debounce(fn,delay) {
    // 记录上一次的延时器
    var timer = null;
    var delay = delay || 4000;
    return function() {
      var args = arguments;//保存函数参数
      var context = this;//保存this上下文
    //   console.log(context.text);
  
      // 清除上一次延时器
      clearTimeout(timer)
      timer = setTimeout(function() {
          fn.apply(context,args)
      }, delay);
   }
}

