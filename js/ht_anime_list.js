window.onload = function() {
    var app = new Vue({
        el: "#animeList",
        data: {
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
                    // id: "0",
                    // name: "anime",
                    // animeImgsrc: "img/logo.png",
                    // hotNum: 666,
                    // desc: "",
                    // author: "",
                    // releasedate: ""

                },

            ],


        },
        methods: {
            //格式化时间
            formatTime: function(date, fmt) {
                var date = new Date(date);
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                var o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (var k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        var str = o[k] + '';
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return fmt;
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

            }

        },
        created() {
            this.findAnimeListSerch();

        },
    })
}