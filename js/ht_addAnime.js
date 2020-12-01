window.onload = function() {
    var app = new Vue({
        el: "#addAnime",
        data: {
            upAnimeResult: {
                upAnimeId: "",
                uploadedMsg: "",
                code: "",
            },

            active: 0,
            formLabelWidth: "", //上传图片组件离父div的左边距
            animeInfo: {
                id: "",
                name: "",
                animeImgsrc: "http://127.0.0.1:9000/imgfile/anime/20201127/zjdcts.webp",
                //animeid: "",
                author: "",
                releasedate: "",
                desc: ""
            }


        },
        methods: {
            next: function() {
                if (this.active == 0) {
                    //上传完图片之后点击的下一步
                    var that = this;
                    axios.get("http://localhost:8899/mantan-content/content/findAnimeid").then(function(response) {
                        //console.log(response.data)
                        that.upAnimeResult.upAnimeId = response.data.upAnimeId;
                    })

                }
                if (this.active < 2) {
                    this.active++;
                } else {
                    this.active = 0;
                }

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

        },
        created() {


        },
    })
}