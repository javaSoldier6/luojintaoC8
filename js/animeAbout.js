window.onload = function () {
    var app = new Vue({
        el: '#main',
        data: {
            // nav: ['首页', '漫友中心', '后台中心', '下载APP'],
            baseUrl: "http://localhost:8899/mantan-content",
            showLogin: false,
            showRegister: false,
            loginMsg: "",
            registerMsg: "",
            loginSuccess: false,
            show3: false,

            user: {
                id: 0,
                username: "",
                password: "",
                roleid: 3
            },
            comments: [
                {
                    id: "",//数据id
                    uname: "大哥",// 用户名
                    uid: "001",// 用户id
                    answercontext: "我是最大的评论，抢个沙发",// 评论内容
                    animeid: "1",// 动漫id
                    floorstate: "1",// 楼层标识
                    answertime: "2020年12月12日12点00分"// 时间
                },
                {
                    id: "",//数据id
                    uname: "傻逼才取名大哥",// 用户名
                    uid: "002",// 用户id
                    answercontext: "抢你妹的沙发",// 评论内容
                    animeid: "1",// 动漫id
                    floorstate: "1.1",// 楼层标识
                    answertime: "2020年12月12日12点00分"// 时间
                },
                {
                    id: "",//数据id
                    uname: "大哥的小弟",// 用户名
                    uid: "003",// 用户id
                    answercontext: "你为什么骂我大哥",// 评论内容
                    animeid: "1",// 动漫id
                    floorstate: "1.2.1",// 楼层标识
                    answertime: "2020年12月12日12点00分"// 时间
                },
                {
                    id: "",//数据id
                    uname: "楼上都是傻逼",// 用户名
                    uid: "004",// 用户id
                    answercontext: "评论如名字【吃瓜】",// 评论内容
                    animeid: "1",// 动漫id
                    floorstate: "2",// 楼层标识
                    answertime: "2020年12月12日12点00分"// 时间
                }
            ]



        },
        methods: {
            // 函数中的参数分别为 cookie 的名称、值以及过期天数

            //注册成功消息提示
            open1(msg) {
                const h = this.$createElement;

                this.$notify({
                    title: '温馨提示',
                    message: h('i', { style: 'color: teal' }, msg)
                });
            },

            //登录
            login: function () {
                if (this.user.username == "" || this.user.password == "") {
                    this.loginMsg = "用户名或密码不能为空";
                    return false;
                }
                var that = this;

                axios.post(this.baseUrl + "/user/login", this.user)
                    .then(function (response) {
                        if (!response.data) {
                            that.loginMsg = "用户名或密码错误";
                            return false;
                        }
                        that.user = response.data;

                        console.log(response.data);
                        //将登录信息保存cookie(有效期为七天)
                        setCookie("userid", that.user.id, 7);
                        setCookie("username", that.user.username, 7);
                        setCookie("password", that.user.password, 7);
                        setCookie("roleid", that.user.roleid, 7);

                        that.loginMsg = "";
                        that.showLogin = false;
                        that.loginSuccess = true;
                        that.open1("登录成功，七天之内不用重新登录哟")
                    }, function (err) {
                        that.loginMsg = "请求出错";
                    })
            },

            //注册
            register: function () {

                if (this.user.username == "" || this.user.password == "") {
                    this.registerMsg = "用户名或密码不能为空";
                    return false;
                }
                var that = this;

                axios.post(this.baseUrl + "/user/register", this.user)
                    .then(function (response) {
                        if (response.data == "注册成功") {

                            that.registerMsg = "";
                            that.showRegister = false;
                            that.open1("恭喜您注册成功，快去登录叭");

                        } else {
                            that.registerMsg = response.data;
                        }


                        console.log(response.data);
                    }, function (err) {
                        that.loginMsg = "请求出错";
                    })

            },

            loginout: function () {

                //获取cookie信息
                var id = getCookie("userid");
                var username = getCookie("username");
                var password = getCookie("password");
                var roleid = getCookie("roleid");

                if (id != "" && username != "" && password != "" && roleid != "") {

                    //将登录信息保存cookie(有效期为七天)
                    setCookie("userid", this.user.id, -1);
                    setCookie("username", this.user.username, -1);
                    setCookie("password", this.user.password, -1);
                    setCookie("roleid", this.user.roleid, -1);
                    this.user = {};
                    //登录状态设为false
                    this.loginSuccess = false;
                }
            },
            // 拆解楼层编号为数组
            splitFloor: function (e) {
                return e.split(".")
            },
            // 最大的楼层
            big: function () {
                var a = []
                for (const i in this.comments) {
                    if (this.comments.hasOwnProperty(i)) {
                        // comments[i];
                        if (this.splitFloor(this.comments[i].floorstate).length == 1) {
                            // console.log(this.splitFloor(this.comments[i].floorstate));
                            a.push(this.comments[i])
                        }
                    }
                }
                return a
            },
            // 子楼层
            small: function (index) {
                // console.log(index);
                var b = []
                for (const i in this.comments) {
                    if (this.comments.hasOwnProperty(i)) {
                        // comments[i];
                        if (this.splitFloor(this.comments[i].floorstate)[0] == index && this.splitFloor(this.comments[i].floorstate).length > 1) {
                            // console.log(this.splitFloor(this.comments[i].floorstate));
                            b.push(this.comments[i])
                        }
                    }
                }
                return b
            },
            // 显示回复对象
            showName: function (obj) {
                if (this.splitFloor(obj.floorstate)[2]) {
                    // console.log(this.splitFloor(this.comments[i].floorstate));
                    var str=this.splitFloor(obj.floorstate)[0]+"."+this.splitFloor(obj.floorstate)[2]
                    console.log(str);
                    for (const i in this.comments) {
                        if (this.comments.hasOwnProperty(i)) {
                            console.log(this.comments[i].floorstate);
                            // comments[i];
                            if (this.comments[i].floorstate==str) {
                                console.log(111111);
                                console.log(this.comments[i].floorstate);
                                console.log(this.comments[i].uname);
                                return this.comments[i].uname
                            }
                            // else{
                            //     return null
                            // }
                        }
                    }
                }else{
                    return null
                }
            }



        },
        created() {
            // load: { alert("XXXXXXXXXXXXXXXX") };
            //获取cookie信息传给页面user
            var id = getCookie("userid");
            var username = getCookie("username");
            var password = getCookie("password");
            var roleid = getCookie("roleid");

            if (id != "" && username != "" && password != "" && roleid != "") {
                this.user.id = id;
                this.user.username = username;
                this.user.password = password;
                this.user.roleid = roleid;
                //登录状态设为true
                this.loginSuccess = true;
            }



        },
        updataed() {

        },

        watch: {

        }

    })

}