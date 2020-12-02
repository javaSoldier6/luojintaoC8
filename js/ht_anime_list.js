window.onload = function() {
    var app = new Vue({
        el: "#animeList",
        data: {
            formLabelWidth: "", //上传图片组件离父div的左边距
            dialogVisible: false,
            animeInfo: {
                animeid: "",
                author: "",
                releasedate: "",
                desc: ""
            },
            search: "",
            pagination: {
                total: 10,
                pageSize: 10,
                pageNum: 1,
            },
            animeList: [{
                    // id: "0",                        动漫id
                    // name: "anime",                  动漫名称
                    // animeImgsrc: "img/logo.png",    动漫图片路径
                    // hotNum: 666,                    热力值
                    // desc: "",                       剧情简介
                    // author: "",                     动漫作者
                    // releasedate: ""                 上映时间

                },

            ],


        },
        methods: {
            formLabelWidth: function() {},
            //动漫资讯编辑事件
            editAnime: function(animeInfo) {

                this.animeInfo.id = animeInfo.id;
                this.animeInfo.name = animeInfo.name;
                this.animeInfo.author = animeInfo.author;
                this.animeInfo.desc = animeInfo.desc;
                this.animeInfo.releasedate = animeInfo.releasedate;
                this.dialogVisible = true;

            },
            handleClose: function(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //发送ajax请求修改动漫总信息
            updateAnimeZong: function() {
                var that = this;
                axios.post("http://localhost:8899/mantan-content/content/updateAnimeZong", this.animeInfo)
                    .then(function(response) {
                        that.findAnimeListSerch();
                        that.dialogVisible = false
                    })

            },


            //搜索按钮绑定事件
            searchDm: function() {
                this.findAnimeListSerch(this.pagination.pageNum);
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
            findAnimeListSerch: function() {
                var that = this;
                var keyword = "空";
                if (this.search != "") {
                    keyword = this.search;
                }
                axios.get("http://localhost:8899/mantan-content/content/selectAnimeZongSearch/" + this.pagination.pageNum + "/" + keyword).then(function(response) {
                    //console.log(response.data)
                    that.pagination.total = response.data.total;
                    that.animeList = response.data.result;
                    console.log(response.data.total);
                    console.log(that.pagination.total);
                    console.log(that.pagination.pageSize);
                })
            },
            updateAnimeInfo: function(info) {
                console.log(11111);
                this.animeInfo.animeid = info.id;
                this.animeInfo.author = info.author;
                this.animeInfo.releasedate = info.releasedate;
                this.animeInfo.desc = info.desc;
                this.afterInfo = true;
                this.beforeInfo = !this.afterInfo;

            },
            deleteAnime: function(id) {
                var that = this;
                if (confirm("确定要删除该动漫资讯吗？")) {
                    axios.get("http://localhost:8899/mantan-content/content/deleteLastAnime/" + id)
                        .then(function(response) {
                            that.findAnimeListSerch();
                        })

                }

            }

        },
        created() {
            this.findAnimeListSerch();

        },
    })
}