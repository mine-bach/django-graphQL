Start Project
=======

## Prerequisites


### Install mysql

```
$ sudo apt install mysql-server
$ sudo mysql
mysql> CREATE DATABASE floral_db;
mysql> CREATE USER 'floral'@'localhost' IDENTIFIED WITH mysql_native_password BY 'floral';
mysql> GRANT ALL ON floral_db.* TO 'floral'@'localhost';
```

### Install needed library (Linux / Unbuntu)


Using virtualenv is recommended :

```
sudo apt install python3-pip
sudo pip3 install virtualenv
sudo pip3 install virtualenvwrapper
```

In ~/.bashrc :
```
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh
VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3.6
```
```
$ mkvirtualenv floral
$ workon floral
```

At the end of .bashrc :
```
workon foral
```


Installing Packages :

```
$ pip3 install -r requirements.txt
```

Install npm:
```
sudo apt-get install nodejs
sudo install npm
```
### Install project

Fill DATABASE:

```
$ python manage.py migrate
$ python manage.py shell
>>> from user.models import User
>>> User.objects.create(last_name="nom", first_name="prénom", password="password", username="username", email="email")
```

### Run project


You can now launch the local server :

```
$ python manage.py runserver 
```

and open new terminal

```
$ cd la-conciergerie-floral
$ npm run serve
```

Now, access this server at this address http://localhost:8080.

You should have access to the graphql interface site http://localhost:8000/graphql