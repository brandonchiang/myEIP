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

# deploy 到 IIS

1. 分別執行 第1節的2段指令
2. 將 bin\Release\netcoreapp2.1\publish copy 到 IIS 的資料夾下
3. 將 ClientApp\dist\EIP copy 到 IIS 的資料夾下
4. 將 web.config 內的 

```config
<aspNetCore processPath="dotnet" arguments=".\myEIP.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
```

改成 

```config
<aspNetCore processPath="C:\Program Files\dotnet\dotnet.exe" arguments=".\myEIP.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" />
```

5. 在 iis 中「新增網站」，再設權限給  IIS_IUSRS , 就完成了