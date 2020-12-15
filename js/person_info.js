window.onload = function() {
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

            postInput: false,
            postItemInput: false,
            editInfo: false,
            user: {
                id: 0,
                username: "",
                password: "",
                roleid: 3
            },
            userZong: {
                id: "",
                username: "",
                password: "",
                roleid: "",
                realName: "",
                birthday: "",
                sex: "",
                address: "",
                phone: "",
                emil: "",
                hoppy: "",
            },
            postInfo: {
                id: "",
                postContext: "",
                postId: "",
                floor: "",
                fromUid: "",
                fromUname: "",
                toUid: "",
                toUname: "",
                postTime: "",

            },
            postList: [],

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
            login: function() {
                if (this.user.username == "" || this.user.password == "") {
                    this.loginMsg = "用户名或密码不能为空";
                    return false;
                }
                var that = this;

                axios.post(this.baseUrl + "/user/login", this.user)
                    .then(function(response) {
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
                    }, function(err) {
                        that.loginMsg = "请求出错";
                    })
            },

            //注册
            register: function() {

                if (this.user.username == "" || this.user.password == "") {
                    this.registerMsg = "用户名或密码不能为空";
                    return false;
                }
                var that = this;

                axios.post(this.baseUrl + "/user/register", this.user)
                    .then(function(response) {
                        if (response.data == "注册成功") {

                            that.registerMsg = "";
                            that.showRegister = false;
                            that.open1("恭喜您注册成功，快去登录叭");

                        } else {
                            that.registerMsg = response.data;
                        }


                        console.log(response.data);
                    }, function(err) {
                        that.loginMsg = "请求出错";
                    })

            },

            loginout: function() {

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


            //通过id查找用户信息
            findAnimeById: function(id) {
                var that = this;
                axios.get("http://localhost:8899/mantan-content/content/findAnimeAboutByAnimeId/" + id).then(function(response) {
                    //console.log(response.data)
                    that.animeInfo = response.data;
                    console.log(that.animeInfo);

                })
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
            var animeId = window.location.search.split("=")[1];
            //this.findAnimeById(animeId);





        },
        updataed() {

        },

        watch: {

        }

    })

}