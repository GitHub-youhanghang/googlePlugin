  // var wsCache = new WebStorageCache();

  // var data = [{ firstTitle: "前端2", firstCon: [{ secondTitle: "js", secondCon: [{ thirdTitle: "baidu", href: "https://www.baidu.com" }] }, { secondTitle: "js", secondCon: [{ thirdTitle: "baidu", href: "https://www.baidu.com" }] }, { secondTitle: "js", secondCon: [{ thirdTitle: "baidu", href: "https://www.baidu.com" }] }] }, { firstTitle: "电脑", firstCon: [{ secondTitle: "111", secondCon: [{ thirdTitle: "baidu1", href: "https://www.baidu.com" }, { thirdTitle: "baidu2", href: "https://www.baidu.com" }] }, { secondTitle: "222", secondCon: [{ thirdTitle: "baidu2", href: "https://www.baidu.com" }] }] }];

var data=[];

  // chrome.storage.sync.set({ 'data': data }, function() {
  //     //do something

  // });
  chrome.storage.sync.get('data', function(result) {

      if (!result.data) {
          chrome.storage.sync.set({ 'data': data }, function() {
              //do something

          });
      } else {
          data = result.data;

      }


  });

  // console.log(data);

  $('body').append('<div id="youhanghangContent" class="youhanghang-content"><h2><a id="editBookmarks" title="编辑书签" class="icono-trash new"></a><a id="addBookMarks" title="添加书签" class="icono-plus new"></a></h2><div id="swithBookmarksBtn" class="swith-bookmarks-btn" ></div><div id="youhanghangMenu" class="youhanghang-menu" ></div></div>');


  $('body').append('<div class="youhanghang-box"></div><div class="youhanghang-addClassBox"><form id="addForm" class="addForm"><div class="addForm-inlineBlock"><div><label for="linkTitle">标题</label><input type="text" name="linkTitle" id="linkTitle"></div><div><label for="linkHref">地址</label><input type="text" name="linkHref" id="linkHref"> </div><div><label>选择分类</label><select name="selectClass" id="selectClass1"></select><select name="selectClass2" id="selectClass2"></select></div><div><label for="linkHref">当前分类</label><input class="add-class-input short" type="text" name="className1" id="className1" placeholder="第一层目录"><input class="add-class-input short" type="text" name="className2" id="className2" placeholder="第二层目录"><input id="save" class="save-link" type="button" value="保存退出"><input id="cancel" class="cancel-link" type="button" value="取消"><span class="j-alert red ">请填写完整信息!</span></div></div></form></div>');

  function obj2string(o) {
      var r = [];
      if (typeof o == "string") {
          return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
      }
      if (typeof o == "object") {
          if (!o.sort) {
              for (var i in o) {
                  r.push(i + ":" + obj2string(o[i]));
              }
              if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                  r.push("toString:" + o.toString.toString());
              }
              r = "{" + r.join() + "}";
          } else {
              for (var i = 0; i < o.length; i++) {
                  r.push(obj2string(o[i]))
              }
              r = "[" + r.join() + "]";
          }
          return r;
      }
      return o.toString();
  }
