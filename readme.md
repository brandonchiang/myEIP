# Deploy 的語法

## webapi

`dotnet publish -c Release`


## angular

`ng build --prod`


# 目前的版本

## dotnet 

>2.1.502

## angular 

>7.0.4

# deploy 到 IIS(local)

1. 分別執行 第1節的2段指令
2. 將 bin\Release\netcoreapp2.1\publish copy 到 IIS 的資料夾下
3. 將 ClientApp\dist\EIP copy 到 IIS 的資料夾下
4. 將 web.config 內的 

```xml
<aspNetCore processPath="dotnet" arguments=".\myEIP.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
```

改成 

```xml
<aspNetCore processPath="C:\Program Files\dotnet\dotnet.exe" arguments=".\myEIP.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
```

5. 在 iis 中「新增網站」，再設權限給  IIS_IUSRS , 就完成了


# deploy 到 IIS(server: 192.168.1.113)

1. 發現還是會出錯。原因在於 web.config 裡面如果有底下這一行，網站就開不起來

``` xml
<aspNetCore processPath="C:\Program Files\dotnet\dotnet.exe" arguments=".\myEIP.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
```

2. 後來google 到 [這篇](https://docs.microsoft.com/zh-tw/aspnet/core/host-and-deploy/iis/troubleshoot?view=aspnetcore-2.2#aspnet-core-module-stdout-log), 才知道要加個 logs 的資料夾
   
3. 然後在 log 中，終於看到真正的錯誤原因：
   > warn: Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
      Failed to determine the https port for redirect.

4. 所以還要來研究[如何安裝 https](https://blog.johnwu.cc/article/iis-install-ssl-certificate.html) 了