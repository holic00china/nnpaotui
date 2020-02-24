# Host: localhost  (Version: 5.5.53)
# Date: 2019-11-30 13:08:02
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "alipay"
#

CREATE TABLE `alipay` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(20) DEFAULT NULL,
  `money` int(10) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "alipay"
#

INSERT INTO `alipay` VALUES (1,'132',20),(2,'15977653223',20),(3,'15010943659',100),(4,'132',0),(5,'132',0),(6,'3121',0),(7,'142',50),(8,'142',0);

#
# Structure for table "bbs"
#

CREATE TABLE `bbs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(50) DEFAULT NULL,
  `money` int(5) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

#
# Data for table "bbs"
#

INSERT INTO `bbs` VALUES (1,'这是第一条留言',NULL,0),(2,'寻找今天晚自习代课，加Q762410830',NULL,1),(3,'第三条测试是否可见',NULL,1),(4,'412421',5,0),(5,'412421',5,1),(6,'第四天测试',5,0),(7,'出售二手手机有意加VX******',5,2),(8,'留言',5,2),(9,'留言',5,1),(10,'留言',5,0),(17,'1122',5,2),(18,'哈哈哈哈哈哈',5,0),(19,'哈哈哈哈哈哈',5,0),(20,'好热好热好热',5,0),(21,'tttt',5,0),(22,'老子要发留言',5,1);

#
# Structure for table "category"
#

CREATE TABLE `category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `cate` varchar(10) NOT NULL DEFAULT '',
  `ww` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "category"
#

INSERT INTO `category` VALUES (1,'快递',NULL),(2,'带饭',NULL),(3,'留言',NULL);

#
# Structure for table "ordery"
#

CREATE TABLE `ordery` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) DEFAULT '',
  `arriveAddress` varchar(40) DEFAULT '',
  `getcode` varchar(10) DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `categoryId` int(11) DEFAULT '0',
  `statu` int(11) DEFAULT '0' COMMENT '状态',
  `tel` varchar(11) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `etel` varchar(11) DEFAULT NULL COMMENT '小哥电话',
  `achieveTime` varchar(20) DEFAULT NULL COMMENT '完成时间',
  `runname` varchar(20) DEFAULT NULL,
  `usernickname` varchar(20) DEFAULT NULL,
  `money` decimal(10,2) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

#
# Data for table "ordery"
#

INSERT INTO `ordery` VALUES (32,'汉科一巷','长江大学','1234','马瑞',1,1,'15071019433','2019/10/22 19:42:19','15071019433',NULL,'礼清',NULL,15.00,NULL),(33,'321','432','324','342',0,1,'432','432','15071019433',NULL,'礼清',NULL,NULL,NULL),(34,'正儿八经取快递','中通','9999','王世音',1,0,'15666453344','2019/10/26 11:43:24','15071019433',NULL,'',NULL,1.50,NULL),(35,'湖北省武汉市','京东快递派','0123','王思聪',1,0,'16666666666','2019/10/26 15:03:28','15071019433',NULL,'',NULL,NULL,NULL),(36,'带饭','寝室','','马瑞',2,0,'12345678999','2019/10/28 11:30:00','15071019433',NULL,'',NULL,NULL,NULL),(37,'带饭','寝室里','','王',2,0,'12349986565','2019/10/28 11:32:05','15071019433',NULL,'',NULL,NULL,NULL),(38,'带饭','寝室','','马瑞',2,0,'16985856323','2019/10/28 11:32:52','15071019433',NULL,'',NULL,NULL,NULL),(39,'带饭','食堂',NULL,'林允儿',2,1,'12346979799','2019/10/28 11:34:14','15071019433',NULL,'',NULL,NULL,NULL),(40,'jintianqukuaidi','今晚打老虎','1221','陈奕迅',1,1,'13895392103','2019/10/31 12:50:21','15071019433',NULL,'','',NULL,NULL),(41,'cioeaicai','qerijqwjfa','dqoiwqj','jdiqwjdq',1,1,'eqoieqo','2019/10/31 12:52:54','15071019433',NULL,'','礼清',10.00,NULL),(42,'的walk的挖掘了','公然侮辱为个人请问','日期日期','它舞台我',1,1,'15998665666','2019/10/31 18:55:41','15071019433',NULL,'','礼清',5.00,NULL),(43,'测试','地址1','1088','王',1,0,'13596869595','2019/11/08 15:59:58',NULL,NULL,NULL,'礼清',3.00,1),(44,'带东西','王',NULL,'王',2,0,'123','2019/11/08 16:02:27',NULL,NULL,NULL,NULL,NULL,0),(45,'网吧','网吧','10000','萧敬腾',1,0,'123456','2019/11/17 11:56:26',NULL,NULL,NULL,'礼清',1.50,0),(46,'31212','121','122','121',1,0,'21','2019/11/17 12:47:13',NULL,NULL,NULL,'礼清',1.50,0),(47,'41','142','124','124',1,0,'142','2019/11/17 12:52:02',NULL,NULL,NULL,'礼清',3.00,0),(48,'aaa','aaaa','aaa','aa',1,0,'aa','2019/11/20 12:47:16',NULL,NULL,NULL,'礼清',1.50,0);

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(4) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `tel` varchar(11) DEFAULT '',
  `pic1` varchar(100) DEFAULT NULL,
  `pic2` varchar(100) DEFAULT NULL,
  `money` decimal(10,2) DEFAULT NULL,
  `identity` varchar(18) DEFAULT NULL,
  `authority` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'帅哥','二五','13635758908',NULL,NULL,10.00,'422822199811010011',1),(2,NULL,'礼清42','',NULL,NULL,10.00,NULL,0),(3,NULL,'礼清53252','',NULL,NULL,10.00,NULL,0),(4,NULL,'礼清423','',NULL,NULL,10.00,NULL,0),(5,'maru','礼清','15071019433',NULL,NULL,12.00,'422822199811010011',1);
