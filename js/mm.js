let citys,weatherobj;

$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=",
    dataType:"jsonp",
    success:function(obj){
        citys = obj.data;
        $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php? format=js",function(){
            getFullWeather(citys.city);
        });
    }
});

function getFullWeather(nowcity){
    let cc = $('.now_city');
    cc.html(nowcity);

    $.ajax({
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
        dataType:"jsonp",
        success:function(obj){
            weatherobj = obj.data;
            console.log(weatherobj);
            $('.now_air_quality').html(weatherobj.weather.quality_level);
            $('.tm').html(weatherobj.weather.current_temperature)
        }
    });


}