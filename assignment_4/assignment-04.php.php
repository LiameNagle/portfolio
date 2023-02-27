<!DOCTYPE html>
<html>
<body>

<h1>backEnd responces</h1>
<!-- w3 schools  -->
<!-- "webcourse.cs.nuim.ie",
  user: "u210277",
  password: "teipi8Aiz6wee5oh",
  database: "teipi8Aiz6wee5oh-->
<?php
$servername = "webcourse.cs.nuim.ie";
$username = "u210277";
$password = "teipi8Aiz6wee5oh";
$dbname = "cs230_u210277";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$titals = array("Master",",Miss","Miss","Mr","Mx","Mrs");
$fname = array("Andrew","Jhon","Zara","Peater","Jmaes","David","Liam","Aaron","Danial","Matt","Lindsy","Bridget","Tomas","Jhon","Margret","Niel");
$lname = array("Nagle","Tomson","Perterson","Ford","Nagle","Keaton","Yamamori","Loyd","Smith","May","Ritchard","Pratt","Holland","Downey","philly","Baker");
$add1 = array("ocean","beach","mounatin","summerset","O'connol","Parnell");
$add2 = array("Drive","Road","Street","Park","Bolovard","Quay");
$cap = array("Antrim","Armagh","Carlow","Cavan","Clare","Cork","Derry","Donegal","Down","Dublin","Fermanagh","Galway");
$counties = array('Antrim','Armagh','Carlow','Cavan','Clare','Cork','Derry','Donegal','Down','Dublin','Fermanagh','Galway','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick','Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo','Tipperary','Tyrone','Waterford','Westmeath','Wexford','Wicklow');

$stmt = $conn->prepare("INSERT INTO USER (Tital,Firstname, Surname,moblie,Emailaddress,
AddressLine1,AddressLine2,Town,CountyCity,Eircoade)
VALUES (?,?,?,?,?,?,?,?,?,?)");

$stmt->bind_param("sssissssss",$titalsinsert,$fnameinsert,$lnameinsert,$mobile,$Email,$address1,$address2,$town,$cc,$eir);
for($i = 0; $i < 6 ;$i++){
$fnameid =rand(0,5);
$titalid =rand(0,5);
$lnameid = rand(0,5);
$mobile = rand(1000000,999999999);
$curcap =$cap[rand(0,count($cap))];
$curcount=$counties[rand(0,count($counties))];
$titalsinsert = $titals[$titalid];
$fnameinsert = $fname[$fnameid];
$lnameinsert= $lname[$lnameid];
$Email = "".$fname[1]."".$lname[1]."".rand(0,9)."@gmail.com";
$address1 ="CO'".$curcap." ".$curcount."";
$address2="".rand(0,100)." ".$add1[1]." ".$add2[1];
$cc ="".$curcount."";
$town="".$curcap."";
$eir = "EA".rand(0,9)."S".rand(0,20)."";
$stmt->execute();
echo "".mysqli_error($conn);
}

#$selctfn = $fname[rand(0,7)];
#$sqlwhere = "SELECT Firstname FROM USER WHERE Firstname = ".$selctfn." "
#$res = $conn->query($sqlwhere);
#if ($res->num_rows > 0) {// w3 schools 
  // output data of each row
 # while($row = $res->fetch_assoc()) {
 #   echo "Name: " . $row["firstname"];
 # }
#} else {
#  echo "0 results";
#}
$stmt->close();
$conn->close();
?>

</body>
</html>