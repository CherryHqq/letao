$(function () {
  // 第一个ajax发送请求时开启进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  // 全部ajax请求完成时关闭进度条
  $(document).ajaxStop(function(){
    // 模拟网络延迟
    setTimeout(function(){
      NProgress.done();
    },500)
  })
})