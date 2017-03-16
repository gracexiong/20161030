/* 
* @Author: Marte
* @Date:   2017-03-16 09:01:17
* @Last Modified by:   Marte
* @Last Modified time: 2017-03-16 09:20:14
*/

$(document).ready(function(){
    $("#send").click(function(){
        $("#send-form").show();
    });
    $("#send-btn").click(function(){
        $("#send-form").hide();
        $.ajax({
            url:"wish.php?",
            type:"get",
            dataType:"json",
            data:{
                act:"add",
                username:$("#username").val(),
                content:$("#content").val()
            },
            success:function(str){
                var json=eval('('+str+')');
                console.log(json);
            },
            error:function(str){
                console.log(str);
                alert("发表愿望失败！");
            }
        });
    });
});