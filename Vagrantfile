# -*- mode: ruby -*-
# vi: set ft=ruby :

$provision_script = <<SCRIPT
echo "Installing Server"
apt-get update
apt-get install -y build-essential software-properties-common tmux curl wget htop nano vim

echo "Installing MongoDB..."
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org=2.6.7 mongodb-org-server=2.6.7 mongodb-org-shell=2.6.7 mongodb-org-mongos=2.6.7 mongodb-org-tools=2.6.7

echo "Installing Redis..."
apt-get install -y redis-server redis-tools

echo "Installing Node.JS..."
gpg --keyserver pool.sks-keyservers.net --recv-keys 7937DFD2AB06298B2293C3187D33FF9D0246406D 114F43EE0176B71C7BC219DD50A3051F888C628D
NODE_VERSION=0.12.0
NPM_VERSION=2.5.0
curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz"
curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
gpg --verify SHASUMS256.txt.asc
grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c -
tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1
rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc
npm install -g npm@"$NPM_VERSION"
npm cache clear
SCRIPT

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false

  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.network "forwarded_port", guest: 8080, host: 8080   # API Server
  config.vm.network "forwarded_port", guest: 27017, host: 27017 # MongoDB
  config.vm.network "forwarded_port", guest: 6379, host: 6379   # Redis

  config.vm.synced_folder ".", "/home/socialights"

  config.vm.provision "shell", inline: $provision_script
end
