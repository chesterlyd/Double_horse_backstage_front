/* eslint-disable */
import Main from '../components/main';
export default [
  {
    name: "Login",
    path: "/login",
    component: () => import('../view/login.vue'),
    meta: {
      notInMain: true,
      breadcrumb: []
    }
  },
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    children: [
      {
        name: "Admin",
        path: "admin",
        component: () => import('../view/admin/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "管理员设置"
            }
          ],
          title: "管理员设置"
        }
      },
      {
        name: "Admin_login_log",
        path: "admin_login_log",
        component: () => import('../view/admin_login_log/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "登录日志"
            }
          ],
          title: "登录日志"
        }
      },
      {
        name: "Auth_group",
        path: "auth_group",
        component: () => import('../view/auth_group/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "用户角色"
            }
          ],
          title: "用户角色"
        }
      },
      {
        name: "Customer",
        path: "customer",
        component: () => import('../view/customer/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "客服管理"
            }
          ],
          title: "客服管理"
        }
      },
      {
        name: "Express",
        path: "express",
        component: () => import('../view/express/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "快递管理"
            }
          ],
          title: "快递管理"
        }
      },
      {
        name: "Log_income",
        path: "log_income",
        component: () => import('../view/log_income/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "收益记录"
            }
          ],
          title: "收益记录"
        }
      },
      {
        name: "Log_transfer",
        path: "log_transfer",
        component: () => import('../view/log_transfer/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "转账记录"
            }
          ],
          title: "转账记录"
        }
      },
      {
        name: "Log_withdraw",
        path: "log_withdraw",
        component: () => import('../view/log_withdraw/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "提现记录"
            }
          ],
          title: "提现记录"
        }
      },
      {
        name: "Member",
        path: "member",
        component: () => import('../view/member/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "会员管理"
            }
          ],
          title: "会员管理"
        }
      },
      {
        name: "Product",
        path: "product",
        component: () => import('../view/product/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "商品管理"
            }
          ],
          title: "商品管理"
        }
      },
      {
        name: "Product_order",
        path: "product_order",
        component: () => import('../view/product_order/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "待发货订单"
            }
          ],
          title: "待发货订单"
        }
      },
      {
        name: "Setting",
        path: "setting",
        component: () => import('../view/setting/index.vue'),
        meta: {
          breadcrumb: [
            {
              title: "系统设置"
            }
          ],
          title: "系统设置"
        }
      },
      {
        name: "Example",
        path: "example",
        component: () => import('../view/example.vue')
      },
      {
        name: "Home",
        path: "home",
        component: () => import('../view/home.vue'),
        meta: {
          title: "首页",
          breadcrumb: [
            {
              title: "首页"
            }
          ]
        }
      },
      {
        name: "Admin_login_logAdd",
        path: "admin_login_log/add",
        component: () => import('../view/admin_login_log/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "登录日志",
              to: "/admin_login_log"
            },
            {
              title: "添加"
            }
          ],
          title: "添加登录日志"
        }
      },
      {
        name: "Admin_login_logEdit",
        path: "admin_login_log/edit",
        component: () => import('../view/admin_login_log/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "登录日志",
              to: "/admin_login_log"
            },
            {
              title: "修改"
            }
          ],
          title: "修改登录日志"
        }
      },
      {
        name: "AdminAdd",
        path: "admin/add",
        component: () => import('../view/admin/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "管理员设置",
              to: "/admin"
            },
            {
              title: "添加"
            }
          ],
          title: "添加管理员"
        }
      },
      {
        name: "AdminEdit",
        path: "admin/edit",
        component: () => import('../view/admin/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "管理员设置",
              to: "/admin"
            },
            {
              title: "修改"
            }
          ],
          title: "修改管理员"
        }
      },
      {
        name: "Auth_groupAdd",
        path: "auth_group/add",
        component: () => import('../view/auth_group/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "用户角色",
              to: "/auth_group"
            },
            {
              title: "添加"
            }
          ],
          title: "添加用户角色"
        }
      },
      {
        name: "Auth_groupEdit",
        path: "auth_group/edit",
        component: () => import('../view/auth_group/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "用户角色",
              to: "/auth_group"
            },
            {
              title: "修改"
            }
          ],
          title: "修改用户角色"
        }
      },
      {
        name: "CustomerAdd",
        path: "customer/add",
        component: () => import('../view/customer/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "客服管理",
              to: "/customer"
            },
            {
              title: "添加客服"
            }
          ],
          title: "添加客服"
        }
      },
      {
        name: "CustomerEdit",
        path: "customer/edit",
        component: () => import('../view/customer/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/customer"
            },
            {
              title: "修改客服"
            }
          ],
          title: "修改客服"
        }
      },
      {
        name: "ExpressAdd",
        path: "express/add",
        component: () => import('../view/express/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "快递管理",
              to: "/express"
            },
            {
              title: "添加快递公司"
            }
          ],
          title: "添加快递公司"
        }
      },
      {
        name: "ExpressEdit",
        path: "express/edit",
        component: () => import('../view/express/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "快递管理",
              to: "/express"
            },
            {
              title: "修改快递公司"
            }
          ],
          title: "修改快递公司"
        }
      },
      {
        name: "Log_incomeAdd",
        path: "log_income/add",
        component: () => import('../view/log_income/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_income"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "Log_incomeEdit",
        path: "log_income/edit",
        component: () => import('../view/log_income/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_income"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      },
      {
        name: "Log_transferAdd",
        path: "log_transfer/add",
        component: () => import('../view/log_transfer/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_transfer"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "Log_transferEdit",
        path: "log_transfer/edit",
        component: () => import('../view/log_transfer/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_transfer"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      },
      {
        name: "Log_withdrawAdd",
        path: "log_withdraw/add",
        component: () => import('../view/log_withdraw/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_withdraw"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "Log_withdrawEdit",
        path: "log_withdraw/edit",
        component: () => import('../view/log_withdraw/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/log_withdraw"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      },
      {
        name: "MemberAdd",
        path: "member/add",
        component: () => import('../view/member/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/member"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "MemberComplainUser",
        path: "member/complainUser",
        component: () => import('../view/member/complainUser.vue'),
        meta: {
          breadcrumb: [
            {
              title: "会员管理",
              to: "/member"
            },
            {
              title: "已封号会员"
            }
          ],
          title: "已封号会员"
        }
      },
      {
        name: "MemberEdit",
        path: "member/edit",
        component: () => import('../view/member/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/member"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      },
      {
        name: "MemberRecharge",
        path: "member/recharge",
        component: () => import('../view/member/recharge.vue'),
        meta: {
          breadcrumb: [
            {
              title: "会员管理",
              to: "/member"
            },
            {
              title: "积分充值"
            }
          ],
          title: "积分充值"
        }
      },
      {
        name: "Product_orderAdd",
        path: "product_order/add",
        component: () => import('../view/product_order/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "待发货订单",
              to: "/product_order"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "Product_orderEdit",
        path: "product_order/edit",
        component: () => import('../view/product_order/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: null,
              to: "/product_order"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      },
      {
        name: "Product_orderShipped",
        path: "product_order/shipped",
        component: () => import('../view/product_order/shipped.vue'),
        meta: {
          breadcrumb: [
            {
              title: "已发货订单"
            }
          ],
          title: "已发货订单"
        }
      },
      {
        name: "ProductAdd",
        path: "product/add",
        component: () => import('../view/product/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "商品管理",
              to: "/product"
            },
            {
              title: "添加商品"
            }
          ],
          title: "添加商品"
        }
      },
      {
        name: "ProductEdit",
        path: "product/edit",
        component: () => import('../view/product/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "商品管理",
              to: "/product"
            },
            {
              title: "修改商品"
            }
          ],
          title: "修改商品"
        }
      },
      {
        name: "SettingAdd",
        path: "setting/add",
        component: () => import('../view/setting/add.vue'),
        meta: {
          breadcrumb: [
            {
              title: "系统设置",
              to: "/setting"
            },
            {
              title: "添加"
            }
          ],
          title: "添加"
        }
      },
      {
        name: "SettingEdit",
        path: "setting/edit",
        component: () => import('../view/setting/edit.vue'),
        meta: {
          breadcrumb: [
            {
              title: "系统设置",
              to: "/setting"
            },
            {
              title: "修改"
            }
          ],
          title: "修改"
        }
      }
    ]
  }
];