    // 函数中的参数分别为 cookie 的名称、值以及过期天数
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }


    // 函数中的参数为 要获取的cookie键的名称。
    function getCookie(userName) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(userName + "=");
            if (c_start != -1) {
                c_start = c_start + userName.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }