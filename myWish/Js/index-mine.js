/* 
* @Author: Marte
* @Date:   2017-03-13 13:59:43
* @Last Modified by:   Marte
* @Last Modified time: 2017-03-16 13:48:03
*/

$(document).ready(function(){
    //var oIndex=100;
    function rnd(n,m){
        return parseInt(Math.random()*(m-n)+n);
    }
    function toDou(id){
        if(id<10){
            return "NO0000"+id;
        }else if(id>=10 && id<100){
            return "NO000"+id;
        }else if(id>=100 && id<1000){
            return "NO00"+id;
        }else if(id>=1000 && id<10000){
            return "NO0"+id;
        }else if(id>=10000 ){
            return "NO"+id;
        }
    }
    function fixZero(num,length){     
        var str=""+num; 
        var len=str.length;    
        var s=""; 
        for(var i=length;i>len;i--){ s+="0"; } 
        return s+str;
    }    
    function   formatDate(now)   { 
        var   now= new Date(now*1000);     
        var   year=now.getFullYear();  //年   
        var   month=now.getMonth()+1; //月    
        var   date=now.getDate();//天    
        var   hour=now.getHours();//小时
        var   minute=now.getMinutes();//分钟    
        var   second=now.getSeconds();//秒数 
        var data = year+"年"+fixZero(month,2)+"月"+fixZero(date,2)+"日"+fixZero(hour,2)+":"+fixZero(minute,2)+":"+fixZero(second,2); 
        return data;
    }

    $("#send").click(function(){
        $("#send-form").show();
    });
    $("#send-btn").click(function(){
        var oUser=$("#username").val();
        var oContent=$("#content").val();
        if(!oUser || !oContent){
            alert("请输入昵称和愿望！");
        }else{
            $("#send-form").hide();
            $.ajax({
                url:"wish.php",
                dataType:"text",          
                data:{
                    act:"add",
                    username:oUser,
                    content:oContent
                },
                success :function(str){
                    
                    var json=eval('('+str+')');
                    $("#main").html($('#main').html()+
                            '<dl>\
                            <dt>\
                                <span class="username">'+oUser+'</span>\
                                <span class="num">'+toDou(json.id)+'</span>\
                            </dt>\
                            <dd class="content">'+oContent+'</dd>\
                            <dd class="bottom">\
                                <span class="time">'+formatDate(json.time)+'</span>\
                                <a href="javascript:;" class="close"></a>\
                            </dd>\
                            </dl>'
                        ).children("dl").last().addClass('paper a'+rnd(1,6)).css({
                            "left":rnd(0,$("#main").width()-$("#main dl").width()),
                            "top":rnd(0,$(window).height()-$("#main dl").outerHeight()-$("#top").outerHeight())
                    }).siblings().click(function(){
                        //oIndex+=oIndex;
                        //$(this).css("zIndex", oIndex);
                    }).find("a").click(function(){
                        $(this).parents("dl").hide();
                        $.ajax({
                            url:"wish.php",
                            dataType:"text",
                            data:{
                                act:"delete",
                                id:"id"
                            },
                            success:function(str){
                                if(str.error==0){
                                    $(this).parents("dl").remove();
                                }
                            }
                        });
                    });
                        //console.log($("#content").val());
                },
                error: function(str) {
                       //console.log(str);     
                }
            });
        }
        //console.log($("#send-form input").val());
    });
    getWish();
    function getWish(){
        $.ajax({
            url:"wish.php",
            dataType:"text",
            data:{
                act:"get",
            },
            success:function(str){
                /*{error:0, msg:[{'id':1, 'username':'xxx', 'content':'xxx', time: 1435567718},{},{},{}.......]}*/
                var json=eval('('+str+')');
                //console.log(json.msg[2].id);
                if(json){
                    $.each(json.msg,function(i){
                    //console.log(json.msg[i].id);
                    $("#main").html($('#main').html()+
                        '<dl>\
                        <dt>\
                            <span class="username">'+json.msg[i].username+'</span>\
                            <span class="num">'+toDou(json.msg[i].id)+'</span>\
                        </dt>\
                        <dd class="content">'+json.msg[i].content+'</dd>\
                        <dd class="bottom">\
                            <span class="time">'+formatDate(json.msg[i].time)+'</span>\
                            <a href="javascript:;" class="close"></a>\
                        </dd>\
                        </dl>'
                    ).children("dl").last().addClass('paper a'+rnd(1,6)).css({
                        "left":rnd(0,$("#main").width()-$("#main dl").width()),
                        "top":rnd(0,$(window).height()-$("#main dl").outerHeight()-$("#top").outerHeight())
                    }).siblings().click(function(){
                        //oIndex+=oIndex;
                        //$(this).css("zIndex", oIndex);
                    }).find("a").click(function(){
                        $(this).parents("dl").hide();
                        $.ajax({
                            url:"wish.php",
                            dataType:"text",
                            data:{
                                act:"delete",
                                id:"id"
                            },
                            success:function(str){
                                if(str.error==0){
                                    $(this).parents("dl").remove();
                                }
                            }
                        });
                    });
                   // console.log(json.msg[i].id);
                });  
                }else{
                    alert();
                }
                
            },
            error:function(){}

        });
        
    };
    function delWish(){
        
    }
});