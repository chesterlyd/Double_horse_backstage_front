/**
 * {
 *  title: { String|Number }
 *         显示在侧边栏、面包屑和标签栏的文字
 *  icon: (-) 该页面在左侧菜单处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  to: { String|Object }跳转链接，可传入router-link支持的任何参数
 *  target:(-) 原生a标签的target属性
 * }
 */

export default [{
  title: '文档',
  to: 'https://lison16.github.io/iview-admin-doc/#/',
  icon: 'ios-book',
  target: '_blank'
},
  {
    title: '会员管理',
    icon: 'ios-cog',
    children: [
      {
        title: "会员管理",
        to: "/member"
      },
      {
        title: "已封号会员",
        to: "/member/complainUser"
      }
    ]
  },
  // {
  //   title: '权限设置',
  //   icon: 'ios-cog',
  //   children: [{
  //     title: '管理员设置',
  //     to: '/admin'
  //   },
  //     {
  //       title: '用户角色',
  //       to: '/auth_group'
  //     }
  //   ]
  // },
  {
    title: '商品管理',
    icon: 'ios-cog',
    to: '/product'
  },
  {
    title: '快递管理',
    icon: 'ios-cog',
    to: '/express'
  },
  {
    title: '订单管理',
    icon: 'ios-cog',
    children: [
      {
        title: "待发货订单",
        to: "/product_order"
      },
      {
        title: '已发货订单',
        to: "/product_order/shipped"
      },
    ]
  },
  {
    title: '客服管理',
    icon: 'ios-cog',
    children: [
      {
        title: "客服管理",
        to: "/customer"
      },
      // {
      //   title: '已发货订单',
      //   to: "/product_order"
      // },
    ]
  },
  {
    title: '记录',
    icon: 'ios-cog',
    children: [
      {
        title: '收益记录',
        to: '/log_income'
      },
      {
        title: "转账记录",
        to: "/log_transfer"
      },
      {
        title: "提现记录",
        to: "/log_withdraw"
      }
    ]
  },
  {
    title: '系统设置',
    icon: 'ios-cog',
    children: [
      {
        title: '系统设置',
        to: '/setting'
      },
    ]
  }
]
