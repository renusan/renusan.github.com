/**
 * zQuery
 * @authors Rus (rusyue@gmail.com)
 * @date    2016-06-21 14:52:30
 * @version 1.0
 */

define(function(){
function zQuery(arg){
   this.element=[];
   this.domString='';

   switch(typeof arg){
       case 'function':
           domReady(arg);
       break;
       case 'string':
           if(arg.indexOf('>')!=-1){
               this.domString=arg;
           }else{
               this.element=getEle(arg);
           }
       break;
       default:
           this.element.push(arg);
       break;
   }

}
//隐藏
zQuery.prototype.hide=function(){
    for(var i=0;i<this.element.length;i++){
        this.element[i].style.display='none';
    }
};
//显示
zQuery.prototype.show=function(){
    for(var i=0;i<this.element.length;i++){
        this.element[i].style.display='block';
    }
};
//添加样式
zQuery.prototype.css=function(name,value){
    if(arguments.length==2){
        for(var i=0;i<this.element.length;i++){
            this.element[i].style[name]=value;
        }
    }else{
        if(typeof name=='string'){
            return getStyle(this.element[0],name);
        }else{
            var json=name;
            for(var i=0;i<this.element.length;i++){
                for(var name in json){
                    this.element[i].style[name]=json[name];
                }
            }
        }
    }
};

//设置自定义属性
zQuery.prototype.attr=function(name,value){
    if(arguments.length==2){
        for(var i=0;i<this.element.length;i++){
            this.element[i].setAttribute(name,value);
        }
    }else{
        if(typeof name=='string'){
            return this.element[0].getAttribute(name);
        }else{
            var json=name;
            for(var i=0;i<this.element.length;i++){
                for(var name in json){
                    this.element[i].setAttribute(name,json[name]);
                }
            }
        }
    }
};
//移入
zQuery.prototype.mouseenter=function(fn){
    for(var i=0;i<this.element.length;i++){
        addEvent(this.element[i],'mouseover',function(ev){
            var oEvent=ev||event;
            var from=oEvent.fromElement || oEvent.relatedTarget;
            if(this.contains(from))return;
            fn && fn.apply(this,arguments);
        });
    }
};
//移出
zQuery.prototype.mouseleave=function(fn){
    for(var i=0;i<this.element.length;i++){
        addEvent(this.element[i],'mouseout',function(ev){
            var oEvent=ev||event;
            var to=oEvent.toElement || oEvent.relatedTarget;
            if(this.contains(to))return;
            fn && fn.apply(this,arguments);
        });
    }
};
// 批量加事件
'click  mouseover mouseout mousedown mousemove mouseup mousewheel contextmenu dblclick change keydown keyup focus blur input load scroll resize readystatechange'.replace(/\w+/g,function(sEv){
    zQuery.prototype[sEv]=function(fn){

        for(var i=0;i<this.element.length;i++){
            addEvent(this.element[i],sEv,fn);
        }
    }
});
zQuery.prototype.hover=function(fnOver,fnOut){
    this.mouseenter(fnOver);
    this.mouseleave(fnOut);
};
zQuery.prototype.bind=function(sEv,fn){
    for(var i=0;i<this.element.length;i++){
        addEvent(this.element[i],sEv,fn);
    }
};
//运动
zQuery.prototype.animate=function(json,options){
    for(var i=0;i<this.element.length;i++){
        tween(this.element[i],json,options);
    }
};
//html
zQuery.prototype.html=function(str){
    if(str || str==''){
        for(var i=0;i<this.element.length;i++){
            this.element[i].innerHTML=str;
        }
    }else{
        return this.element[0].innerHTML;
    }
};
//value
zQuery.prototype.val=function(str){
    if(str || str==''){
        for(var i=0;i<this.element.length;i++){
            this.element[i].value=str;
        }
    }else{
        return this.element[0].value;
    }
};
//get
zQuery.prototype.get=function(n){
    return this.element[n];
};
//eq
zQuery.prototype.eq=function(n){
    return $(this.element[n]);
};
//创建  添加到元素里面后边
zQuery.prototype.appendTo=function(str){
    var aParent=getEle(str);
    for(var i=0;i<aParent.length;i++){
        aParent[i].insertAdjacentHTML('beforeEnd',this.domString);
    }
};
//添加到元素里面前边
zQuery.prototype.prependTo=function(str){
    var aParent=getEle(str);
    for(var i=0;i<aParent.length;i++){
        aParent[i].insertAdjacentHTML('afterBegin',this.domString)
    }
};
//添加到元素外边后边
zQuery.prototype.insertAfter=function(str){
    var aParent=getEle(str);
    for(var i=0;i<aParent.length;i++){
        aParent[i].insertAdjacentHTML('afterEnd',this.domString);
    }
};
//添加到元素的外边前边
zQuery.prototype.insertBefore=function(str){
    var aParent=getEle(str);
    for(var i=0;i<aParent.length;i++){
        aParent[i].insertAdjacentHTML('beforeBegin',this.domString);
    }
};
//删除元素
zQuery.prototype.remove=function(){
    for(var i=0;i<this.element.length;i++){
        this.element[i].parentNode.removeChild(this.element[i]);
    }
};
//添加class
zQuery.prototype.addClass=function(sClass){
    var re=new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<this.element.length;i++){
        if(this.element[i].className){
            if(!re.test(this.element[i].className)){
              this.element[i].className+=' '+sClass;
            }
        }else{
            this.element[i].className=sClass;
        }
    }
};
//删除class
zQuery.prototype.removeClass=function(sClass){
    var re=new RegExp('\\b'+sClass+'\\b')
    for(var i=0;i<this.element.length;i++){
        if(re.test(this.element[i].className)){
            this.element[i].className=this.element[i].className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/,' ');
        }
    }
};
zQuery.prototype.index=function(){
    var obj=this.element[this.element.length-1];
    var aSbling=obj.parentNode.children;

    for(var i=0;i<aSbling.length;i++){
        if(aSbling[i]==obj){
            return i;
        }
    }

};
//判断有没有class
zQuery.prototype.hasClass=function(sClass){
    var re=new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<this.element.length;i++){
        if(re.test(this.element[i].className)){
            return true;
        }
    }
};
//ajax
$.ajax=zQuery.ajax=function(json){
    ajax(json);
};
$.getScript=zQuery.getScript=function(json){
    jsonp(json);
};
//获取样式
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
//加载页面
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',fn,false);
    }else{
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
    }
}
function $(arg){
    return new zQuery(arg);
}
//添加绑定事件
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,function(ev){
            if(fn.apply(this,arguments)==false){
                ev.preventDefault();
                ev.cancelBubble=true;
            }
        },false);
    }else{
        obj.attachEvent('on'+sEv,function(ev){
            if(fn.apply(this,arguments)==false){
                ev.preventDefault();
                ev.cancelBubble=true;
            }
        });
    }
}








function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var arr=[];
        var re=new RegExp('\\b'+sClass+'\\b');
        var aEle=oParent.getElementsByTagName('*');
        for(var i=0;i<aEle.length;i++){
            if(re.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
function getStr(aParent,str){
    var aChild=[];
    for(var i=0;i<aParent.length;i++){
        switch(str.charAt(0)){
            case '#':
                var obj=document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.':
                var aEle=getByClass(aParent[i],str.substring(1));
                for(var j=0;j<aEle.length;j++){
                    aChild.push(aEle[j]);
                }
                break;
            default:
                // ul li.ac  li:first  li:eq(1)
                if(/\w+\.\w+/.test(str)){
                    var aStr=str.split('.');
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    var re=new RegExp('\\b'+aStr[1]+'\\b');
                    for(var j=0;j<aEle.length;j++){
                        if(re.test(aEle[j].className)){
                            //aChild[j]=aEle[j];
                            aChild.push(aEle[j]);
                        }
                    }
                    //  ul li:first ul li:eq(1)
                }else if(/\w+:\w+(\(\d+\))?/.test(str)){
                    var aStr=str.split(/:|\(|\)/g);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    switch(aStr[1]){
                        case 'first':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length-1]);
                            break;
                        case 'even':
                            for(var j=0;j<aEle.length;j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'odd':
                            for(var j=1;j<aEle.length;j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'eq':
                            var n=aStr[2];
                            aChild.push(aEle[n]);
//                                               li:lt(2)
                            break;
                        case 'lt':
                            var n=aStr[2];
                            for(var j=0;j<n;j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'gt':
                            var n=aStr[2];
                            for(var j=n;j<aEle.length;j++){
                                aChild.push(aEle[j]);
                            }

                    }
                    //input[type=button];
                }else if(/\w+\[\w+=\w+\]/.test(str)){
                    var aStr=str.split(/\[|\]|=/g);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    for(var j=0;j<aEle.length;j++){
                        if(aEle[j].getAttribute(aStr[1])==aStr[2]){
                            aChild.push(aEle[j]);
                        }
                    }
                }else{
                    var aEle=aParent[i].getElementsByTagName(str);
                    for(var j=0;j<aEle.length;j++){
                        aChild.push(aEle[j]);
                    }
                }

                break;

        }
    }

    return aChild;
}

function getEle(str){
    var arr=str.replace(/^\s+|\s+$/g,'').split(/\s+/);
    var aParent=[document];
    var aChild=[];
    for(var i=0;i<arr.length;i++){
        aChild=getStr(aParent,arr[i]);

        aParent=aChild;
    }

    return aChild;

}

var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function
    (t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-
    2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*
    ((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t
    +b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function
    (t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:
{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d)
{return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)
{return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function
    (t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-
        1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t
    +b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -
        c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin
    (t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos
    (Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow
(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-
        10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}
    if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--
                t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-
    1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)
        *t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-
    1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function
    (t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||
    a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -
        (a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function
    (t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||
    a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return
    (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function
    (t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}
    if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if
    (t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}
    return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:
{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)
    *t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*
    ((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined)
{s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*
    ((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return
    c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<
    (1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=
        (1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t
    +0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t
    +0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return
    Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-
        d,0,c,d)*0.5+c*0.5+b}}}};
//t  当前时间  当前时间走了多少
//b  初始值   当前走了多少
//c  现在位置  距离
//d  总时间   总时间
//var cur=fx(t,b,c,d);

function tween(obj,json,options){
    clearInterval(obj.timer);
    options=options || {};
    options.duration=options.duration || 700;
    options.easing=options.easing || Tween.Quart.easeOut

    var iCount=Math.ceil(options.duration/30);
    var start={};

    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));
    }

    var n=0;
    obj.timer=setInterval(function(){
        n++;
        //t  当前时间  当前时间走了多少
        //b  初始值   当前走了多少
        //c  现在位置  距离
        //d  总时间   总时间
        for(var name in json){
            var cur=options.easing(options.duration/iCount*n,start[name],json[name]-
                start[name],options.duration);
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }
        if(n==iCount){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);

}

function jsonp(json){
    json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.cbName=json.cbName || 'cb';

    var fnName='jsonp'+Math.random();
    fnName=fnName.replace('.','');

    window[fnName]=function(a){
        json.success && json.success(a);

        oHead.removeChild(oS);
    };

    json.data[json.cbName]=fnName;

    var arr=[];
    for(var name in json.data){
        arr.push(name+'='+json.data[name]);
    }

    var str=arr.join('&');

    var oS=document.createElement('script');
    oS.src=json.url+'?'+str;
    var oHead=document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}
function json2url(json){
    json.t=Math.random();

    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(json){
    json=json || {};
    if(!json.url){
        alert('用法不合理');
        return;
    }
    json.type=json.type || 'GET';
    json.time=json.time || 3000;
    json.data=json.data || {};


    var timer=null;
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type.toUpperCase()){
        case 'GET':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'POST':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
            clearTimeout(timer);
        }
    };

    //超时
    timer=setTimeout(function(){
        //json.fnTimeOut && json.fnTimeOut();
        if(!json.fnTimeOut){
            alert('网络不给力');
        }else{
            json.fnTimeOut();
        }
        oAjax.onreadystatechange=null;
    },json.time);
}


  return $;
});

