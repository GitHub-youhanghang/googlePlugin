// /**********************收藏网址****************************/

// // var data = [{
// //     'firstTitle': '前端',
// //     'firstCon': [{
// //         'secondTitle': 'CSS',
// //         'secondCon': [{
// //             'thirdTitle': 'baidu',
// //             'href': 'https://www.baidu.com'
// //         }]
// //     }],
// // }];  
// //初始化select


function renderAll() {
    chrome.storage.sync.get('data', function(result) {

        if (result) {
            var data = result.data;
            var con = $('#youhanghangMenu');

            var htmlStr = '';

         
            htmlStr += '<ul>';
            for (var i = 0; i < data.length; i++) {
                htmlStr += '<li><i class="icono-cross iconDel"></i>';
                htmlStr += '<a data-firstTitle="'+i+'">' + data[i].firstTitle + '</a>';
                htmlStr += '<ul>';
                for (var j = 0; j < data[i].firstCon.length; j++) {
                    htmlStr += '<li><i class="icono-cross iconDel"></i>';
                    htmlStr += '<a data-firstTitle="'+i+'" data-secondTitle="'+j+'">' + data[i].firstCon[j].secondTitle + '</a>';
                    htmlStr += '<ul>';
                    for (var k = 0; k < data[i].firstCon[j].secondCon.length; k++) {

                        htmlStr += '<li><i class="icono-cross iconDel"></i><a data-firstTitle="'+i+'" data-secondTitle="'+j+'" data-thirdTitle="'+k+'" class="hasHref" href="' + data[i].firstCon[j].secondCon[k].href + '">' + data[i].firstCon[j].secondCon[k].thirdTitle + '</a>'+'</li>';

                    }
                    htmlStr += '</ul>';
                    htmlStr += '</li>';
                }
                htmlStr += '</ul>';
                htmlStr += '</li>';
            }
            htmlStr += '</ul>';
           


            con.html(htmlStr);
        }


    });


    

}
renderAll();

//select联动
$('#selectClass1').on('change', function() {
    chrome.storage.sync.get('data', function(result) {
        if (result) {
            var data = result.data;
            //清空第二个select
            $('#selectClass2').html('');
            var className1Text = $('#selectClass1').find('option:selected').text();
            var options2 = '';
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].firstTitle == className1Text) {
                        for (var j = 0; j < data[i].firstCon.length; j++) {
                            options2 += '<option>' + data[i].firstCon[j].secondTitle + '</option>';
                        }
                        if (data[i].firstCon[0]) {
                            $('#className2').val(data[i].firstCon[0].secondTitle);
                        }

                        break;
                    };
                }
                $('#selectClass2')[0].innerHTML = options2;

            }
            $('#className1').val(className1Text);


        }

    });


})

$('#selectClass2').on('change', function() {
    var className2Text = $(this).find('option:selected').text();
    $('#className2').val(className2Text);
})

$('#cancel,.youhanghang-box').on('click', function(e) {

    $('.youhanghang-box').hide();

    $('.youhanghang-addClassBox').animate({
            top: -150
        },
        400,
        function() {
            $(this).hide();
            /* stuff to do after animation is complete */

        });
    e.stopPropagation();

})


//添加内容
$('#save').on('click', function(e) {
    var title = $('#linkTitle').val();
    var href = $('#linkHref').val();
    var className1 = $('#className1').val();
    var className2 = $('#className2').val();

    var titleIsNull = title.replace(/(^s*)|(s*$)/g, "").length == 0;
    var hrefIsNull = href.replace(/(^s*)|(s*$)/g, "").length == 0;
    var className1IsNull = className1.replace(/(^s*)|(s*$)/g, "").length == 0;
    var className2IsNull = className2.replace(/(^s*)|(s*$)/g, "").length == 0;

    if (titleIsNull || hrefIsNull || className1IsNull || className2IsNull) {
        $('.j-alert').show(function() {
            setTimeout(function() {
                $('.j-alert').hide();
            }, 3000)
        });
        return;
    }
    console.log('一级分类:' + className1 + '2级分类:' + className2);
    console.log('标题:' + title);
    console.log('地址:' + href);




    chrome.storage.sync.get('data', function(result) {
        if (result) {
            var data = result.data;
            var isAdd = false;
            //获取的分类有三种情况
            var hasFirstTitle = false;
            var hasAllTitle = false;
            outer:
                for (var i = 0; i < data.length; i++) {
                    // console.log('遍历当前分类：' + data[i].firstTitle)

                    if (className1 == data[i].firstTitle) {
                        hasFirstTitle = true;
                        for (var y = 0; y < data[i].firstCon.length; y++) {
                            //如果当前有这么两级分类就直接添加，如果没有就创建新的分类，怎么判断没有？获取数组.indexOf('当前分类的值')<0则表示要新建
                            if (className2 == data[i].firstCon[y].secondTitle) {
                                hasAllTitle = true;
                                data[i].firstCon[y].secondCon.push({
                                    'thirdTitle': title,
                                    'href': href
                                });
                                isAdd = true;
                                break outer;
                            }
                        }


                    }

                }

            if (!isAdd) {
                if (!hasFirstTitle && !hasAllTitle) {
                    data.push({ 'firstTitle': className1, 'firstCon': [{ 'secondTitle': className2, 'secondCon': [{ 'thirdTitle': title, 'href': href }] }] });
                    isAdd = true;
                }
                if (hasFirstTitle && !hasAllTitle) {
                    for (var i = 0; i < data.length; i++) {
                        // console.log('遍历当前分类：' + data[i].firstTitle)
                        if (className1 == data[i].firstTitle) {
                            data[i].firstCon.push({ 'secondTitle': className2, secondCon: [{ 'thirdTitle': title, 'href': href }] });
                            isAdd = true;
                        }

                    }
                }

            }
            if (isAdd) {
                //保存data
                // wsCache.replace('data', data);
                console.log(data);
                chrome.storage.sync.set({ 'data': data }, function() {
                    //do something
                    console.log('更新书签数据成功');
                    renderAll();
                });
                //退出
                $('.youhanghang-box').hide();
                $('.youhanghang-addClassBox').hide();
                e.stopPropagation();
                window.location.reload();
            }

        }

    });




})





function initSelects() {
    chrome.storage.sync.get('data', function(result) {
        if (result) {
            var data = result.data;
            $('#selectClass1')[0] = '';
            $('#selectClass2')[0] = '';
            var options = '';
            var options2 = '';
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    options += '<option value=' + i + '>' + data[i].firstTitle + '</option>';
                }
                if (data[0]) {
                    for (var j = 0; j < data[0].firstCon.length; j++) {
                        options2 += '<option>' + data[0].firstCon[j].secondTitle + '</option>';
                    }
                }

                $('#selectClass1')[0].innerHTML = options;
                $('#selectClass2')[0].innerHTML = options2;
                if (data[0]) {
                    $('#className1').val(data[0].firstTitle);
                    $('#className2').val(data[0].firstCon[0].secondTitle);
                }

            }

        }

    });
}
/*************************收藏网址结束*******************/


