window.onload = function() {
    var app = new Vue({
        el: "#userList",
        data: {
            dialogVisible: false,
            dialogEditVisible: false,
            direction: 'ltr', //抽屉打开方式
            search: "",
            pagination: {
                total: 10,
                pageSize: 10,
                pageNum: 1,
            },
            userList: [],
            loginUser: {
                id: "",
                username: "",
                password: "",
                roleid: ""

            },
            user: {
                id: "",
                username: "",
                password: "",
                roleid: ""

            },
            // userItem: {
            //     id: "",
            //     uid: "",
            //     realName: "",
            //     birthday: "",
            //     sex: "",
            //     address: "",
            //     phone: "",
            //     emil: "",
            //     hoppy: ""
            // },
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
            }


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
            //关闭事件
            handleClose: function(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //搜索按钮绑定事件
            searchUser: function() {
                this.findUserListSerch();
            },
            //查看详细信息绑定事件
            handleCheck: function(index, row) {
                this.userZong.roleid = row.roleid;
                this.findUserItemById(row.id);
                this.dialogVisible = true;

                // this.$alert("<img style='height:300px;width:400px;' src='" + row.src + "'>", '轮播图图片', {
                //     dangerouslyUseHTMLString: true
                // });
                console.log(index, row.id);
            },

            //编辑用户按钮绑定事件
            handleEdit: function(index, row) {
                console.log(index, row.id);
                this.userZong.id = row.id;
                this.userZong.username = row.username;
                this.userZong.password = row.password;
                this.userZong.roleid = row.roleid + "";
                this.userZong.uid = row.id;
                //请求该id用户的详细信息
                this.findUserItemById(row.id);

                this.dialogEditVisible = true;


            },
            //提交编辑内容
            updateUser: function() {
                var that = this;
                axios.post("http://localhost:8899/mantan-content/user/updateUserAndUserItem", this.userZong)
                    .then(function(response) {
                        that.findUserListSerch();
                        that.dialogEditVisible = false;
                    })
            },
            //删除用户按钮绑定事件
            handleDelete: function(index, row) {
                console.log(index, row.id);
                this.deleteUserById(row.id);
                this.findUserListSerch();
                // console.log(row.src.substring(row.src.indexOf("banner/")));
                // var imgpath = row.src.substring(row.src.indexOf("banner/"));
                // this.deleteBanner(row.id, imgpath);
                // this.findBannerList();



            },
            cancel: function() {},

            //页码改变事件
            pageChange: function(newPageNum) {
                console.log(newPageNum);
                this.findUserListSerch();

            },
            //查找用户请求
            findUserListSerch: function() {
                var that = this;
                var keyword = "空";
                if (this.search != "") {
                    keyword = this.search;
                }
                axios.get("http://localhost:8899/mantan-content/user/findUserListByPageAndSearch/" + this.pagination.pageNum + "/" + keyword).then(function(response) {
                    //console.log(response.data)
                    that.pagination.total = response.data.total;
                    that.userList = response.data.result;
                    console.log(response.data.total);
                    console.log(that.pagination.total);
                    console.log(that.pagination.pageSize);
                })
            },
            //根据用户id查找用户详细信息请求
            findUserItemById: function(id) {
                var that = this;
                axios.get("http://localhost:8899/mantan-content/user/findUserItemById/" + id).then(function(response) {
                    //console.log(response.data)
                    console.log(response.data)
                    that.userZong.realName = response.data.realName;
                    that.userZong.birthday = response.data.birthday;
                    that.userZong.sex = response.data.sex;
                    that.userZong.address = response.data.address;
                    that.userZong.phone = response.data.phone;
                    that.userZong.emil = response.data.emil;
                    that.userZong.hoppy = response.data.hoppy;

                })

            },

            //删除用户请求
            deleteUserById: function(id) {
                var that = this;
                if (confirm("确定要删除该用户信息吗？")) {
                    axios.get("http://localhost:8899/mantan-content/user/deleteUserById/" + id)
                        .then(function(response) {
                            that.findUserListSerch();
                        })

                }

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


            this.findUserListSerch();
        },
    })
}