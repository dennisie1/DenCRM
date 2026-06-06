@echo off
echo Deploying DenCRM...
cd C:\DenCRM
git pull origin main
cd C:\DenCRM\src
copy C:\DenCRM\crm-app.jsx C:\DenCRM\src\crm-app.jsx /Y
copy C:\DenCRM\api.js C:\DenCRM\src\api.js /Y
cd C:\DenCRM
npm run build
xcopy C:\DenCRM\dist\* C:\inetpub\wwwroot\ /E /Y /I
echo Deploy complete!