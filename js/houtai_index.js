window.onload = function() {
    var app = new Vue({
        el: "#app",
        data: {
            user: {}

        },
        methods: {
            toPage: function(src) {
                document.getElementsByTagName("iframe")[0].src = src;

            },
            handleOpen: function(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose: function(key, keyPath) {
                //console.log(key, keyPath);
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
            }

        },
    })
}