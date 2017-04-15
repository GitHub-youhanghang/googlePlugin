   $(document).ready(function() {



       //左侧书签列表调用
       $(".youhanghang-content .youhanghang-menu ul li").menu();

       // $('body').append('<button id="llllll">dd</button>').on('click',function(){
       //    alert()
       // })
       //左侧书签的打开与关闭，
       var BookmarksIsOpen = false;
       $('#swithBookmarksBtn').on('click', function(event) {
           console.log('点击了')
           event.stopPropagation();
           var _this = $(this);
           if (BookmarksIsOpen) {
               $('#youhanghangContent').animate({
                   left: -350
               }, 400, function() {
                   _this.animate({
                       opacity: 0
                   }, 'fast');
               });
               $(this).find('i').removeClass('icon-angle-left').addClass('icon-angle-right');
               BookmarksIsOpen = false;
           } else {
               $('#youhanghangContent').animate({
                   left: 0
               }, 400, function() {
                   _this.animate({
                       opacity: 0
                   }, 'fast');
               });
               $(this).find('i').removeClass('icon-angle-right').addClass('icon-angle-left');
               BookmarksIsOpen = true;
           }

       })

       $('#swithBookmarksBtn').on('mouseover', function(event) {
           event.stopPropagation();

           $(this).css('opacity', 1);
       })
       $('#swithBookmarksBtn').on('mouseout', function(event) {
           event.stopPropagation();

           $(this).css('opacity', 0);
       })
       $(window).on('click', function(event) {

           $('#youhanghangContent').animate({
               left: -350
           }, 400);
           $('#swithBookmarksBtn').find('i').removeClass('icon-angle-left').addClass('icon-angle-right');
           BookmarksIsOpen = false;
       });

       $('#youhanghangContent').on('click', function(event) {
           event.stopPropagation();
       })
       $('#home').on('click', function() {
           // openNewIframe('http://youhanghang.com/StaticPage/PC/newTab.html', '主页');
           // $('#swithBookmarksBtn').trigger('click');
       })




       //添加书签
       $('#addBookMarks').on('click', function() {

           var curHref = window.location.href;
           var curTitle = document.title;;
           $('.youhanghang-box').show();
           $('.youhanghang-addClassBox').show().animate({
                   top: 0
               },
               400,
               function() {
                   /* stuff to do after animation is complete */

               });
           //c初始化分类select 方法在addHref.js定义
           initSelects();
           //初始化selects以后//再给selectClass1绑定事件

           //初始化表单数据
           $('#linkTitle').val(curTitle);
           $('#linkHref').val(curHref);

       })



       var isDeleting = false;
       //显示删除X号
       $('#editBookmarks').on('click', function() {
               if (!isDeleting) {
                   $('#youhanghangMenu').find('.iconDel').each(function() {
                       $(this).show();
                       isDeleting = true;
                   })
               }else{

                    $('#youhanghangMenu').find('.iconDel').each(function() {
                       $(this).hide();
                       isDeleting = false;
                   })               
               }

           })
           //删除书签


       $('#youhanghangMenu').find('.iconDel').on('click', function(event) {
           event.stopPropagation();
           if (isDeleting) {
               var aObj = $(this).next('a');
               //3种情况，一级标题，一级二级标题，一级二级三级标题
               var firstTitle = aObj.attr('data-firsttitle');
               var secondTitle = aObj.attr('data-secondtitle');
               var thirdTitle = aObj.attr('data-thirdtitle');
               console.log(firstTitle)
               console.log(secondTitle)
               console.log(thirdTitle)
               chrome.storage.sync.get('data', function(result) {
                   if (result) {
                       var data = result.data;
                   }

               });

               if (firstTitle && !secondTitle && !thirdTitle) {
                   data.splice(firstTitle, 1);
                   chrome.storage.sync.set({ 'data': data }, function() {
                       //do something
                      

                   });
                    renderAll();
                    window.location.reload();
               }
               if (firstTitle && secondTitle && !thirdTitle) {
                   data[firstTitle].firstCon.splice(secondTitle, 1);
                   chrome.storage.sync.set({ 'data': data }, function() {
                       //do something
                     

                   });
                     renderAll();
                     window.location.reload();
               }
               if (firstTitle && secondTitle && thirdTitle) {
                   data[firstTitle].firstCon[secondTitle].secondCon.splice(thirdTitle, 1);
                   chrome.storage.sync.set({ 'data': data }, function() {
                       //do something
                      

                   });
                    renderAll();
                    window.location.reload();
               }
           }


       });






       //结束
   });
