window.onload = function() {
    var app = new Vue({
        el: "#addAnime",
        data: {
            active: 0,

            usernameIsExits: false,

            loginUser: {
                id: "",
                username: "",
                password: "",
                roleid: ""

            },
            userZong: {
                id: "",
                username: "",
                password: "",
                roleid: "3",
                realName: "",
                birthday: "",
                sex: "",
                address: "",
                phone: "",
                emil: "",
                hoppy: "",
            },

        },
        methods: {
            showRole: function(roleid) {
                var role = "";
                if (roleid == 1) {
                    role = "超级管理员"
                }
                if (roleid == 2) {
                    role = "管理员"
                }
                if (roleid == 3) {
                    role = "普通用户"
                }
                return role;
            },


            makeSure: function() {
                //发送添加用户请求
                var that = this;
                axios.post("http://localhost:8899/mantan-content/user/saveUser", this.userZong)
                    .then(function(response) {
                        that.active++;
                    })

            },

            next: function() {
                //添加user表的内容
                if (this.userZong.username != "" && this.userZong.password != "" && this.usernameIsExits == false) {

                    this.active++;
                }
            },
            next1: function() {
                //添加具体信息
                this.active++
            },

            next2: function() {
                //重新添加
                this.active = 0
            },
            nextSusess: function() {
                this.userZong = {};
                this.active = 0
            }



        },
        created() {

            //获取cookie信息传给页面user
            var id = getCookie("userid");
            var username = getCookie("username");
            var roleid = getCookie("roleid");

            if (id != "" && username != "" && roleid != "") {
                this.loginUser.id = id;
                this.loginUser.username = username;
                this.loginUser.roleid = roleid;
            }
        },
        watch: {

            //监听用户名看是用户名是否被占用
            'userZong.username': {
                handler: function() {
                    var that = this;
                    //do something
                    console.log("监听:" + this.userZong.username);
                    if (this.userZong.username != "") {

                        axios.get("http://localhost:8899/mantan-content/user/usernameIsExits/" + this.userZong.username)
                            .then(function(response) {
                                that.usernameIsExits = response.data;
                            }, function(err) {

                            })
                    }

                },
            }


        },
    })
}