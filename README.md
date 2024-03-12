
**Setup: Create Custom Domains with Certs**

1. Modify your etc/hosts to point the following domains at localhost:
   
        1. sudo vi /etc/hosts
        2. Add
            127.0.0.1       connect-workspace.com
            127.0.0.1       customer-softphone.com
3. brew install mkcert
4. mkcert -install
5. in the project root directory run: 
        mkcert connect-workspace.com customer-softphone.com
6. npm install

**Running Demo**
npm run start