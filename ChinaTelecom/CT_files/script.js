$(function (){
    var paramName = "parameter";//参数名
    var tag = '';//标记值
	//默认参数值
	var parameter = getQueryString(paramName);
	if(parameter == ''){//默认参数值为空
        var paramArray = [1,2,3,4,5];//默认存在业务来源参数数组
        for (var index = 0; index < paramArray.length; index++) {
            tag = paramArray[index];
            parameter = getQueryString(paramName + tag);
            if(parameter != ''){
                sendMessageTag(parameter,tag);
                break;//直接退出
            }
        }
        //默认的request请求即没有业务数据
        if(parameter == ''){
            sendMessageRequest();
        }
	}else{
	    //默认的参数-无法识别来源
        sendMessageTag(parameter,tag);
	}

	
    function doSuit(el, pageWidth, pageHeight) {
        var h = pageHeight
        var w = pageWidth
        var iw = window.innerWidth
        var ih = window.innerHeight
        // el.style.transformOrigin = '0 0'
        // el.style.overflow = 'hidden'
        // el.style.transform = `scale(${iw / w},${ih / h})`
    }
	
    function autoSuit(el, pageWidth, pageHeight) {
        // doSuit(el, pageWidth, pageHeight)

        // window.addEventListener('resize', () => {
        //     doSuit(el, pageWidth, pageHeight)
        // })
    }

    if(window.innerWidth < 1600){
        // autoSuit(document.body, 1600, 900)
    }

    document.body.style.opacity = 1

    //console.log(window.innerWidth,111)

})

function getQueryString(name){ 
     var reg  = new   RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
     var r  =  window.location.search.substr(1).match(reg); 
     if(r!=null){
		return  r[2]; 
	 }  
	 return ''; 
}

//pararmter
function sendMessageTag(parameter,tag) {
    try {
        $.ajax({
            url: "/warning",
            type: "POST",
            data: {parameter: parameter, tag: tag},
            success: function (data) {
                //console.log('success',data)
            },
            error: function (err) {
                //console.log('fail',err)
            }
        });
    } catch (e) {
        console.log('fail', e)
    }
}

//request
function sendMessageRequest(){
	try {

		$.ajax({
			url:"/warning",
			type:"GET",
            cache: false,
			success:function(data){
			//console.log('success',data)
			},
            error:function(err) {
               //console.log('fail',err)
            }
		});	 
	} catch (e) {
		console.log('fail',e)
	}
}