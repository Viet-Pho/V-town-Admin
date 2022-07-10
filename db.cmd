cd ~
ssh root@178.128.29.118


mysql -u root -p
P@ssW0rd

CREATE USER 'root'@'' IDENTIFIED BY 'P@ssW0rd';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'';

ALTER USER 'root'@'' IDENTIFIED WITH mysql_native_password BY 'P@ssW0rd';

flush PRIVILEGES;

101.173.215.67

101.173.215.67