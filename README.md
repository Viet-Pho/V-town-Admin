Requirement:
- Node 12
- Cloud MySQL ko cần cài đặt
- TypeScript và tx-node

Cài đặt các Modules và thư viện cần thiết
- yarn

Lấy config database từ Hoàng và ghi đè vào /src/shared/constants/Database.ts

Chạy Project
- yarn dev
- test thử với endpoints: localhost:3000/api/users/110/fetch?name=xxx

API sẽ viết ở /src/pages/api. Sau khi compile xong thì api sẽ ở route /api/...

Viết các phương thức GET, POST, PATCH, PUT xem thêm ở dây https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/api/user/%5Bid%5D.js
