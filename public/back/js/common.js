$(function () {
  // 第一个ajax发送请求时开启进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  // 全部ajax请求完成时关闭进度条
  $(document).ajaxStop(function () {
    // 模拟网络延迟
    setTimeout(function () {
      NProgress.done();
    }, 500)
  });
  // 公用的功能：
  // 1.左侧二级切换功能
  // 给category注册点击事件，点击下一个兄弟元素显示
  $('#category').click(function () {
    $(this).next().stop().slideToggle();
  })
  // 2.左侧菜单切换功能
  // 点击左侧小图标实现切换功能
  // 给icon_left注册点击事件
  $('.lt_topbar .icon_left').click(function () {
    // alert(1111);
    // toggleClass切换类
    // .lt-aside的left改为-180px,lt_topbar,lt_main改为padding-left:0
    $('.lt-aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  })
  // 3.公共退出功能
  // 点击右侧小图标弹出模态框
  // 给icon_right注册点击事件
  $('.lt_topbar .icon_right').click(function () {
    $('#logoutModal').modal('show');
  })
  // 点击退出按钮事件
  $('#logoutBtn').click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    })
  })
})