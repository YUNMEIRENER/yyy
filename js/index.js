let citys, weatherobj;

$.ajax({
    url: "https://www.toutiao.com/stream/widget/local_weather/city/",
    dataType: "jsonp",
    success: function (obj) {

        citys = obj.data;

        $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php? format=js", function () {
            getFullWeather(citys.city);
        });

        for (let i in citys) {
            let section = document.createElement('section');
            let citys_tile = document.createElement('h1');
            citys_tile.className = "citys_tile";
            citys_tile.innerHTML = i;
            section.appendChild(citys_tile);

            for (let j in citys[i]) {
                let citys_con = document.createElement('ul');
                citys_con.className = 'citys_ul';
                let citys_list = document.createElement('li');
                citys_list.className = 'citys_listt';
                let li = document.createElement('li');
                citys_list.innerHTML = j;
                citys_con.appendChild(citys_list);
                section.appendChild(citys_con);
            }
            $('.citys_box').append(section);
        }


        $('.citys_listt').on('click', function () {

            let citydata = this.innerHTML;
            console.log(citydata);
            getFullWeather(citydata);
            $('.citys').css('display', 'none');
        });

        $('.wzy').on('click', function () {
            let citydata = this.innerHTML;
            console.log(citydata);
            getFullWeather(citydata);
            $('.citys').css('display', 'none');
        });
    },
    error: function(){
    		$('.tm').html('错误');
    }
    
});


function getFullWeather(nowcity) {
    let cc = $('.now_city');
    cc.html(nowcity);

    $.ajax({
        url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=" + nowcity,
        dataType: "jsonp",
        success: function (obj) {
            weatherobj = obj.data;
            $('.now_air_quality').html(weatherobj.weather.quality_level);
            $('.tm').html(weatherobj.weather.current_temperature);
            $('.now_weather').html(weatherobj.weather.dat_condition);
            $('.today_temp_max').html(weatherobj.weather.dat_high_temperature);
            $('.today_temp_min').html(weatherobj.weather.dat_low_temperature);
            $('.today_weather').html(weatherobj.weather.day_condition);
            $('.tomorrow_weather').html(weatherobj.weather.tomorrow_condition);
            $('.tomorrow_temp_max').html(weatherobj.weather.tomorrow_high_temperature);
            $('.tomorrow_temp_min').html(weatherobj.weather.tomorrow_low_temperature);
            today();
            week();
        }
    });
}

function today() {
    $('.hours_content').empty();
    let hours_array = weatherobj.weather.hourly_forecast;

    for (let i = 0; i < hours_array.length; i++) {
        let hours_list = document.createElement('li');
        let hours_time = document.createElement('span');
        hours_time.className = 'hours_time';

        let hours_img = document.createElement('img');
        hours_img.className = 'hours_img';

        let hours_temp = document.createElement('temp');
        hours_temp.className = 'hours_temp';

        hours_list.appendChild(hours_time);
        hours_list.appendChild(hours_img);
        hours_list.appendChild(hours_temp);

        $('.hours_content').append(hours_list);

        hours_time.innerHTML = hours_array[i].hour + ":00";

        hours_img.setAttribute('src', "img/" + hours_array[i].weather_icon_id + ".png");
        hours_temp.innerHTML = hours_array[i].temperature + "°";

    }
}

function week() {
    let week_arry = weatherobj.weather.forecast_list;
    if (!!week_arry) {
        $('.future_content').empty();

        for (let j = 0; j < week_arry.length; j++) {
            // 创建元素并添加到页面中
            let week_list = document.createElement('li');
            week_list.className = 'future_temp';
            let week_time = document.createElement('span');
            week_time.className = 'week_time';
            let week_high = document.createElement('span');
            week_high.className = 'week_high';
            let week_low = document.createElement('span');
            week_low.className = 'week_low';
            let week_img = document.createElement('img');
            week_img.className = 'week_img';
            let week_windc = document.createElement('span');
            week_windc.className = 'week_windc';
            let week_windl = document.createElement('span');
            week_windl.className = 'week_windl';

            week_list.appendChild(week_time);
            week_list.appendChild(week_img);
            week_list.appendChild(week_high);
            week_list.appendChild(week_windc);
            week_list.appendChild(week_windl);
            week_list.appendChild(week_low);
            $('.future_content').append(week_list);

            // 当下的时间week
            week_time.innerHTML = week_arry[j].date.substring(5, 10);
            week_img.setAttribute('src', "img/" + week_arry[j].weather_icon_id + ".png");
            week_high.innerHTML = week_arry[j].high_temperature + "°";
            week_windc.innerHTML = week_arry[j].condition;
            week_windl.innerHTML = week_arry[j].wind_direction;


        }
    }
}

$(document).ready(function () {

    $('.now_city').html('太原');
    $(".now_city").click(function () {
        $(".citys").css('display', 'block');
    });

    $(".confirm").on("click", function () {
        if (this.innerText === "取消") {
            $(".citys").css('display', 'none');

        }
    });
    $(".search").on("focus", function () {
        $(".confirm").html('确认');
    });
    $(".search").on("blur", function () {
        $(".confirm").html('取消');
    });

    $('.confirm').on('click', function () {
        let value = $('.search').val();
        console.log(citys);

        if (citys.hasOwnProperty(value)){
            getFullWeather(value);
            return;
        }else {
            for (let key in citys) {
                if (citys[key].hasOwnProperty(value)) {
                    console.log('找到');
                    getFullWeather(value);
                    return;
                }
            }
            console.log('错误');
            $(".citys").css('display', 'block');
        }
    })
});