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
                animeImgsrc: "",
                //animeid: "",
                author: "",
                releasedate: "",
                desc: ""
            }


        },
        methods: {

            makeSure: function() {
                this.active = 0;
            },
            next: function() {
                if (this.active == 0) {
                    // //上传完图片之后点击的下一步
                    // var that = this;
                    // axios.get("http://localhost:8899/mantan-content/content/findAnimeid").then(function(response) {
                    //     //console.log(response.data)
                    //     that.upAnimeResult.upAnimeId = response.data.upAnimeId;
                    // })
                    if (this.animeInfo.name != "" && this.animeInfo.author != "") {
                        var that = this;
                        axios.post("http://localhost:8899/mantan-content/content/uploadAnimeZong", this.animeInfo)
                            .then(function(response) {
                                //console.log(response.data)
                                that.upAnimeResult.upAnimeId = response.data.upAnimeId;
                                if (that.upAnimeResult.upAnimeId != "") {
                                    that.active++
                                }
                            })
                    }


                }
                if (this.active == 1) {
                    var that = this;
                    axios.get("http://localhost:8899/mantan-content/content/findLastAnime/" + this.upAnimeResult.upAnimeId)
                        .then(function(response) {
                            //console.log(response.data)
                            that.animeInfo = response.data;
                            if (that.animeInfo.animeImgsrc != "") {
                                that.active++
                            }
                        })

                }
                if (this.active == 2) {
                    var that = this;
                    axios.get("http://localhost:8899/mantan-content/content/deleteLastAnime/" + this.upAnimeResult.upAnimeId)
                        .then(function(response) {
                            that.active = 0;
                        })


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