//将观察者放在闭包中，当页面加载就立即执行
var Observer = (function() {
    //防止消息队列暴漏而被篡改故将消息容器作为静态私有变量保存
    var __message = {}
    return {
        //注册信息接口
        regist: function(type, fn) {
            if (typeof __message[type] === 'undefined') {
                __message[type] = [fn]
            } else {
                __message[type].push(fn)
            }
        },
        //发布信息接口
        fire: function(type, args) {
            //如果该消息没有注册，则返回
            if (!__message[type]) return;
            //定义消息信息
            var events = {
                type: type,  //消息类型
                args: args   //消息携带数据
            }
            i = 0;           //消息动作循环变量
            len = __message[type].length;
            //循环消息动作
            for(;i<len;i++){
                //依次执行注册的消息对应的动作系列
                __message[type][i].call(this,events)
            }
        },
        //移除信息接口
        remove: function(type,fn) {
            //如果消息动作队列存在
            if(__message[type] instanceof Array){
                //从最后一个消息动作遍历
                var i = __message[type].length-1;
                for(;i>=0;i--){
                    //如果存在该动作则在消息动作序列中移除相应动作
                    __message[type][i] === fn && __message[type].splice(i,1)
                }
            } 
        }
    }
})()

Observer.regist('test',function(e){
    console.log(e.type,e.args.msg);
})
Observer.fire('test',{msg:'传递参数'});   //test传递参数