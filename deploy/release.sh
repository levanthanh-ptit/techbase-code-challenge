# HOST_KEY and HOST_IP are load to env variable (like Github secrets injected in Github Actions)

tar -cvzf deploy/bundle.tar.gz dist package.json yarn.lock nginx.site ecosystem.config.js
echo -e "${HOST_KEY}" > id_rsa
cat id_rsa
chmod 600 id_rsa
scp -i id_rsa -o StrictHostKeyChecking=no deploy/bundle.tar.gz root@$HOST_IP:/var/www/host.com/subfolder
ssh -i id_rsa -o StrictHostKeyChecking=no root@$HOST_IP << EOF
  cd /var/www/host.com/subfolder
  rm -rf dist
  tar -xvzf bundle.tar.gz
  yarn install --production
  pm2 startOrRestart ecosystem.config.js
  mv -f nginx.site sub.host.com
  cp -f sub.host.com /etc/nginx/sites-available
  ln -rsf /etc/nginx/sites-available/sub.host.com /etc/nginx/sites-enabled/
  sudo service nginx restart
EOF
