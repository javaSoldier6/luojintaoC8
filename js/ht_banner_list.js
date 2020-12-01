window.onload = function() {
    var app = new Vue({
        el: "#bannerList",
        data: {
            dialogFormVisible: false,
            dialogFormVisible2: false,
            formLabelWidth: '120px',
            search: '',
            user: {},
            tableData: [],
            banner: {
                id: "",
                src: "",
                url: "",
            },

        },
        methods: {
            handleEdit: function(index, row) {
                //console.log(index, row.id);
                this.banner.id = row.id;
                this.banner.url = row.url;
                this.dialogFormVisible2 = true;

            },
            handleDelete: function(index, row) {
                if (!confirm("确定要删除这条轮播图吗？")) {
                    return false;
                }
                console.log(index, row.id);
                console.log(row.src.substring(row.src.indexOf("banner/")));
                var imgpath = row.src.substring(row.src.indexOf("banner/"));
                this.deleteBanner(row.id, imgpath);
                this.findBannerList();






            },
            cancel: function() {},
            handleCheck: function(index, row) {

                this.$alert("<img style='height:300px;width:400px;' src='" + row.src + "'>", '轮播图图片', {
                    dangerouslyUseHTMLString: true
                });
                console.log(index, row.src);
            },
            findBannerList: function() {
                var that = this;
                axios.get("http://localhost:8899/mantan-content/content/findBannerList?_=" + Math.random()).then(function(response) {
                    //console.log(response.data)
                    that.tableData = response.data;
                })
            },
            deleteBanner: function(id, imgpath) {
                var that = this;
                axios.post("http://localhost:8899/mantan-content/content/deleteBannerById", { "id": id, "src": imgpath }).then(function(response) {
                    that.findBannerList();

                })
            },
            flshBanner: function() {
                this.findBannerList();
                this.dialogFormVisible = false;
            },
            updateUrl: function() {
                console.log("newBanner.url: " + this.banner.url)
                    // if (this.banner.url == "") {
                    //     return false;
                    // }
                var that = this;
                axios.post("http://localhost:8899/mantan-content/content/updateUrl", this.banner)
                    .then(function(response) {
                        that.findBannerList();
                    });

                this.dialogFormVisible2 = false;
            }


        },
        created() {
            // load: { alert("XXXXXXXXXXXXXXXX") };
            //获取cookie信息传给页面user
            // var id = getCookie("userid");
            // console.log("id:" + id)
            // var username = getCookie("username");
            // var password = getCookie("password");
            // var roleid = getCookie("roleid");

            // if (id != "" && username != "" && password != "" && roleid != "") {
            //     this.user.id = id;
            //     this.user.username = username;
            //     this.user.password = password;
            //     this.user.roleid = roleid;
            // };
            this.findBannerList();

        },
    })
}