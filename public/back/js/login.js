$(function () {
  // 需求：
  //  1.表单校验
  //    （1）进行表单校验配置
  //       1.校验要求：
  //        （1）用户名不能为空，长度为2-6位
  //        （2）密码不能为空，长度为6-12位
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      },
    }

  });
  //  2.注册表单校验成功事件，在事件中阻止默认成功的表单提交
  //    通过ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    // console.log("阻止默认的提交，通过ajax提交");
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          // 用户名不存在
          // 创建实例：$('#form').data("bootstrapValidator")
          // updateStatus()  更新状态
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 配置规则, 用于提示
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })

  });
  // 3.重置
  $('[type="reset"]').click(function () {
    $('#form').data("bootstrapValidator").resetForm();
  })
})