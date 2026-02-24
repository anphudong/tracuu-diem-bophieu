<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tra cứu điểm bỏ phiếu</title>

<style>
body{
    margin:0;
    font-family:Arial, sans-serif;
    background:linear-gradient(135deg,#8b0000,#b30000);
    color:white;
}

.header{
    background:#c40000;
    padding:20px;
    text-align:center;
    font-weight:bold;
    font-size:20px;
    border-bottom:3px solid gold;
}

.container{
    max-width:700px;
    margin:40px auto;
    background:rgba(255,255,255,0.1);
    padding:30px;
    border-radius:15px;
    box-shadow:0 0 20px rgba(0,0,0,0.4);
}

h2{
    text-align:center;
    margin-bottom:30px;
}

label{
    font-weight:bold;
}

input{
    width:100%;
    padding:12px;
    margin:10px 0 20px 0;
    border-radius:8px;
    border:none;
    font-size:16px;
}

.result-box{
    background:rgba(255,255,255,0.2);
    padding:15px;
    border-radius:10px;
    margin-bottom:15px;
}

.result-title{
    font-size:13px;
    opacity:0.8;
}

.result-content{
    font-size:16px;
    font-weight:bold;
    color:gold;
}

button{
    width:100%;
    padding:15px;
    background:gold;
    border:none;
    border-radius:10px;
    font-weight:bold;
    font-size:16px;
    cursor:pointer;
}

button:hover{
    background:#ffcc00;
}
</style>
</head>

<body>

<div class="header">
HỆ THỐNG TRA CỨU ĐỊA ĐIỂM BỎ PHIẾU
</div>

<div class="container">
<h2>TRA CỨU THEO KHU PHỐ (1 - 66)</h2>

<label>Nhập số Khu phố:</label>
<input type="number" id="khupho" min="1" max="66" placeholder="Nhập từ 1 đến 66">

<div class="result-box">
<div class="result-title">KHU VỰC BỎ PHIẾU</div>
<div class="result-content" id="khuvuc">---</div>
</div>

<div class="result-box">
<div class="result-title">ĐƠN VỊ BẦU CỬ</div>
<div class="result-content" id="donvi">---</div>
</div>

<div class="result-box">
<div class="result-title">ĐỊA ĐIỂM BỎ PHIẾU</div>
<div class="result-content" id="diadiem">---</div>
</div>

<button onclick="xemBanDo()">XEM VỊ TRÍ BẢN ĐỒ</button>

</div>

<script>



const data = {

1:{khuvuc:"Khu vực bỏ phiếu số 01",donvi:"Đơn vị bầu cử số 01",diadiem:"Trường Mầm non Hoàn Mỹ 2 (234a, đường Vườn Lài, Khu phố 3)",map:"https://maps.app.goo.gl/cN3icTxtBNcqeAJx9"},
2:{khuvuc:"Khu vực bỏ phiếu số 02",donvi:"Đơn vị bầu cử số 01",diadiem:"Trường Quốc tế Bamboo (301/14, đường Vườn Lài, Khu phố 2)",map:"https://maps.app.goo.gl/qe9ZPjxiAbpANbbMA"},
3:{khuvuc:"Khu vực bỏ phiếu số 03",donvi:"Đơn vị bầu cử số 01",diadiem:"Văn phòng Khu phố 4",map:"https://maps.app.goo.gl/n8fciPuo7jm59F9s6"},
4:{khuvuc:"Khu vực bỏ phiếu số 04",donvi:"Đơn vị bầu cử số 01",diadiem:"Trường Mầm non Sơn Ca 8 (140/57, đường Vườn Lài, Khu phố 5)",map:"https://maps.app.goo.gl/eU99rp7RtY9jRdqF8"},
5:{khuvuc:"Khu vực bỏ phiếu số 05",donvi:"Đơn vị bầu cử số 02",diadiem:"Nhà ông Phạm Văn Tuấn (Số 45, đường TL04, Khu phố 32)",map:""},
6:{khuvuc:"Khu vực bỏ phiếu số 06",donvi:"Đơn vị bầu cử số 02",diadiem:"Văn phòng Khu phố 34 (đường TL48, Khu phố 34)",map:""},
7:{khuvuc:"Khu vực bỏ phiếu số 07",donvi:"Đơn vị bầu cử số 02",diadiem:"Văn phòng Khu phố 35 và Khu phố 36",map:""},
8:{khuvuc:"Khu vực bỏ phiếu số 08",donvi:"Đơn vị bầu cử số 02",diadiem:"Trường Cao đẳng Kinh tế - Công nghệ TP. Hồ Chí Minh",map:"https://maps.app.goo.gl/BaWNbLR8Eehjk6cb7"},
9:{khuvuc:"Khu vực bỏ phiếu số 09",donvi:"Đơn vị bầu cử số 02",diadiem:"Nhà bà Cao Ngọc Ánh (Số 27, hẻm 12, đường Đỗ Mười)",map:""},
10:{khuvuc:"Khu vực bỏ phiếu số 10",donvi:"Đơn vị bầu cử số 03",diadiem:"Chung cư An Phú Đông (Số 92/20 đường Vườn Lài, Khu phố 12)",map:"https://maps.app.goo.gl/hEZHdecC2EHu543i8"},
11:{khuvuc:"Khu vực bỏ phiếu số 11",donvi:"Đơn vị bầu cử số 03",diadiem:"Trường Mầm non Bông Hồng",map:"https://maps.app.goo.gl/qLUZJ5rJxav2qmB77"},
12:{khuvuc:"Khu vực bỏ phiếu số 12",donvi:"Đơn vị bầu cử số 03",diadiem:"Văn phòng Khu phố 10,11,12",map:"https://maps.app.goo.gl/kvTpRuWLLiNV8TRu9"},
13:{khuvuc:"Khu vực bỏ phiếu số 13",donvi:"Đơn vị bầu cử số 03",diadiem:"Trường Đại học Nguyễn Tất Thành (331, đường Đỗ Mười)",map:"https://maps.app.goo.gl/gsZUC5nvfm7MUhGe8"},
14:{khuvuc:"Khu vực bỏ phiếu số 14",donvi:"Đơn vị bầu cử số 04",diadiem:"Nhà ông Trần Văn Chung (1664/1B, Khu phố 14)",map:""},
15:{khuvuc:"Khu vực bỏ phiếu số 15",donvi:"Đơn vị bầu cử số 04",diadiem:"Ban Chỉ huy Quân sự phường (Số 288, đường An Phú Đông 03, Khu phố 17)",map:"https://maps.app.goo.gl/BGDp5nXJrTQ5fz3f8"},
16:{khuvuc:"Khu vực bỏ phiếu số 16",donvi:"Đơn vị bầu cử số 04",diadiem:"Trường Tiểu học Võ Thị Thừa (Số 30/6, An Phú Đông 12, Khu phố 19)",map:"https://maps.app.goo.gl/JzWv9t2dUCJ9L16v7"},
17:{khuvuc:"Khu vực bỏ phiếu số 17",donvi:"Đơn vị bầu cử số 04",diadiem:"Văn phòng Khu phố 18,19,20,21",map:""},
18:{khuvuc:"Khu vực bỏ phiếu số 18",donvi:"Đơn vị bầu cử số 05",diadiem:"Nhà bà Cao Thị Kim Hoa (953/3E, đường An Phú Đông 35, Khu phố 22)",map:""},
19:{khuvuc:"Khu vực bỏ phiếu số 19",donvi:"Đơn vị bầu cử số 05",diadiem:"Văn phòng Khu phố 23",map:""},
20:{khuvuc:"Khu vực bỏ phiếu số 20",donvi:"Đơn vị bầu cử số 05",diadiem:"Văn phòng Khu phố 24,25",map:""},
21:{khuvuc:"Khu vực bỏ phiếu số 21",donvi:"Đơn vị bầu cử số 05",diadiem:"Nhà ông Nguyễn Chánh Thi (938/3G, Khu phố 27)",map:""},
22:{khuvuc:"Khu vực bỏ phiếu số 22",donvi:"Đơn vị bầu cử số 05",diadiem:"Nhà bà Nguyễn Thị Kim Cúc (Khu phố 28)",map:""},
23:{khuvuc:"Khu vực bỏ phiếu số 23",donvi:"Đơn vị bầu cử số 06",diadiem:"Nhà Truyền thống Chiến khu An Phú Đông",map:"https://maps.app.goo.gl/RFb8xk39Pa1EuWFNA"},
24:{khuvuc:"Khu vực bỏ phiếu số 24",donvi:"Đơn vị bầu cử số 06",diadiem:"Nhà khách Chung cư Thạnh Lộc",map:""},
25:{khuvuc:"Khu vực bỏ phiếu số 25",donvi:"Đơn vị bầu cử số 06",diadiem:"Nhà ông Đỗ Văn Mạnh (Số 93, TL15, Khu phố 52)",map:""},
26:{khuvuc:"Khu vực bỏ phiếu số 26",donvi:"Đơn vị bầu cử số 06",diadiem:"Văn phòng Khu phố 53 (Đường TL15, KP53)",map:""},
27:{khuvuc:"Khu vực bỏ phiếu số 27",donvi:"Đơn vị bầu cử số 07",diadiem:"Nhà bà Hứa Thị An Trinh – Phó Khu phố 31",map:""},
28:{khuvuc:"Khu vực bỏ phiếu số 28",donvi:"Đơn vị bầu cử số 07",diadiem:"Nhà ông Nguyễn Phú Quốc (Số 60, TL15, KP40)",map:""},
29:{khuvuc:"Khu vực bỏ phiếu số 29",donvi:"Đơn vị bầu cử số 07",diadiem:"Trung tâm học tập cộng đồng phường An Phú Đông (295/3 Hà Huy Giáp)",map:""},
30:{khuvuc:"Khu vực bỏ phiếu số 30",donvi:"Đơn vị bầu cử số 07",diadiem:"Văn phòng Khu phố 43 (343 Hà Huy Giáp)",map:""},
31:{khuvuc:"Khu vực bỏ phiếu số 31",donvi:"Đơn vị bầu cử số 08",diadiem:"Nhà ông Nguyễn Ngọc Kiệt (42A TL19, KP44)",map:""},
32:{khuvuc:"Khu vực bỏ phiếu số 32",donvi:"Đơn vị bầu cử số 08",diadiem:"Trường Mầm non Ngôi Sao Toàn Cầu (396 Hà Huy Giáp, KP45)",map:""},
33:{khuvuc:"Khu vực bỏ phiếu số 33",donvi:"Đơn vị bầu cử số 08",diadiem:"Văn phòng Khu phố 46 (71 TL22, KP46)",map:""},
34:{khuvuc:"Khu vực bỏ phiếu số 34",donvi:"Đơn vị bầu cử số 08",diadiem:"Trường Mầm non Bông Sen (2/2 TL29, KP47)",map:""},
35:{khuvuc:"Khu vực bỏ phiếu số 35",donvi:"Đơn vị bầu cử số 08",diadiem:"Văn phòng Khu phố 49 (TL19, KP49)",map:""},
36:{khuvuc:"Khu vực bỏ phiếu số 36",donvi:"Đơn vị bầu cử số 09",diadiem:"Văn phòng Khu phố 55 (Đình Giao Khẩu TL31)",map:""},
37:{khuvuc:"Khu vực bỏ phiếu số 37",donvi:"Đơn vị bầu cử số 09",diadiem:"Nhà bà Hồ Ngọc Tuyến (183 TL29, KP56)",map:""},
38:{khuvuc:"Khu vực bỏ phiếu số 38",donvi:"Đơn vị bầu cử số 09",diadiem:"Văn phòng Khu phố 57 (TL25)",map:""},
39:{khuvuc:"Khu vực bỏ phiếu số 39",donvi:"Đơn vị bầu cử số 09",diadiem:"Trường Tiểu học Hà Huy Giáp (84/1 Nguyễn Thị Sáu, KP58)",map:"https://maps.app.goo.gl/mxg9oqEWRXZoq9L77"},
40:{khuvuc:"Khu vực bỏ phiếu số 40",donvi:"Đơn vị bầu cử số 09",diadiem:"Văn phòng Khu phố 60 (4/91 hẻm 18 TL41)",map:""},
41:{khuvuc:"Khu vực bỏ phiếu số 41",donvi:"Đơn vị bầu cử số 10",diadiem:"Trường THCS – THPT Trần Cao Vân (88/20/20 TL40, KP61)",map:""},
42:{khuvuc:"Khu vực bỏ phiếu số 42",donvi:"Đơn vị bầu cử số 10",diadiem:"Văn phòng Khu phố 62 (592A Hà Huy Giáp)",map:""},
43:{khuvuc:"Khu vực bỏ phiếu số 43",donvi:"Đơn vị bầu cử số 10",diadiem:"Đình An Phước (TL47, KP64)",map:""},
44:{khuvuc:"Khu vực bỏ phiếu số 44",donvi:"Đơn vị bầu cử số 10",diadiem:"Văn phòng Khu phố 65 (Hẻm 984)",map:""},
45:{khuvuc:"Khu vực bỏ phiếu số 45",donvi:"Đơn vị bầu cử số 10",diadiem:"Nhà bà Phạm Thị Kiều Hạnh (34/5 TL56, KP66)",map:""},
46:{khuvuc:"Khu vực bỏ phiếu số 46",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
47:{khuvuc:"Khu vực bỏ phiếu số 47",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
48:{khuvuc:"Khu vực bỏ phiếu số 48",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
49:{khuvuc:"Khu vực bỏ phiếu số 49",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
50:{khuvuc:"Khu vực bỏ phiếu số 50",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
51:{khuvuc:"Khu vực bỏ phiếu số 51",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
52:{khuvuc:"Khu vực bỏ phiếu số 52",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
53:{khuvuc:"Khu vực bỏ phiếu số 53",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
54:{khuvuc:"Khu vực bỏ phiếu số 54",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
55:{khuvuc:"Khu vực bỏ phiếu số 55",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
56:{khuvuc:"Khu vực bỏ phiếu số 56",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
57:{khuvuc:"Khu vực bỏ phiếu số 57",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
58:{khuvuc:"Khu vực bỏ phiếu số 58",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
59:{khuvuc:"Khu vực bỏ phiếu số 59",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
60:{khuvuc:"Khu vực bỏ phiếu số 60",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
61:{khuvuc:"Khu vực bỏ phiếu số 61",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
62:{khuvuc:"Khu vực bỏ phiếu số 62",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
63:{khuvuc:"Khu vực bỏ phiếu số 63",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
64:{khuvuc:"Khu vực bỏ phiếu số 64",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
65:{khuvuc:"Khu vực bỏ phiếu số 65",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""},
66:{khuvuc:"Khu vực bỏ phiếu số 66",donvi:"Đơn vị bầu cử bổ sung",diadiem:"---",map:""}

};


let currentMap = "";

document.getElementById("khupho").addEventListener("input", function(){

    let value = this.value;

    if(data[value]){
        document.getElementById("khuvuc").innerText = data[value].khuvuc;
        document.getElementById("donvi").innerText = data[value].donvi;
        document.getElementById("diadiem").innerText = data[value].diadiem;
        currentMap = data[value].map;
    }else{
        document.getElementById("khuvuc").innerText = "---";
        document.getElementById("donvi").innerText = "---";
        document.getElementById("diadiem").innerText = "---";
        currentMap = "";
    }

});

function xemBanDo(){
    if(currentMap){
        window.open(currentMap, "_blank");
    }else{
        alert("Vui lòng nhập đúng Khu phố!");
    }
}

</script>

</body>
</html>
