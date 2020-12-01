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
            search: "",
            msg: "",

            user: {
                id: 0,
                username: "",
                password: "",
                roleid: 3
            },
            bannerList: [{
                id: "",
                src: "img/logo.png",
                url: "https://www.bilibili.com/",
            }],
            // paiming: [{
            //     id: 0,
            //     name: "",
            //     animeImgsrc: "",
            //     hotNum: 0

            // }],
            paiming: [],
            pagination: {
                total: 10,
                pageSize: 10,
                pageNum: 1,
            },

            animeList: [{
                id: "0",
                name: "anime",
                animeImgsrc: "img/logo.png",
                hotNum: 666

            }]




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
            //搜索按钮绑定事件
            searchDm: function() {
                findAnimeListSerch(this.pagination.pageNum);
            },
            findAnimeById: function(animeId) {
                alert("查看详情的动漫资讯id是：" + animeId)
            },
            //页码改变事件
            pageChange: function(newPageNum) {
                console.log(newPageNum);
                this.pagination.pageNum = newPageNum;
                this.findAnimeListSerch();

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
            //请求轮播图信息
            findBannerList: function() {
                var that = this;
                axios.get(this.baseUrl + "/content/findBannerList").then(function(response) {
                    //console.log(response.data)
                    that.bannerList = response.data;
                })
            },
            //请求动漫热力榜信息
            findAnimePaiHang: function() {
                var that = this;
                axios.get(this.baseUrl + "/content/findAnimePaiHang").then(function(response) {
                    //console.log(response.data)
                    that.paiming = response.data;
                })
            },
            findAnimeInfo: function(id) {
                alert("要查看动漫详情的id是" + id);
            },
            //请求动漫资讯以及搜索动漫资讯
            findAnimeListSerch: function() {
                var that = this;
                var keyword = "空";
                if (this.search != "") {
                    keyword = this.search;
                }
                axios.get(this.baseUrl + "/content/findAinimeByPageAndSearch/" + this.pagination.pageNum + "/" + keyword).then(function(response) {
                    //console.log(response.data)
                    that.pagination.total = response.data.total;
                    that.animeList = response.data.result;
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
            //加载轮播图
            this.findBannerList();
            //加载动漫热力榜
            this.findAnimePaiHang();
            //加载动漫资讯
            this.findAnimeListSerch();


        },
        updataed() {

        },

        watch: {
            // pagination: {
            //     pageNum(newNum) {
            //         //console.log(pageNum);
            //         this.findAnimeListSerch(pageNum);
            //     }
            // }

        }

    })

}