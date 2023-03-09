const express=require("express")
// 引入jtw
const jwt=require("jsonwebtoken")
// 解析token
var {expressjwt:jwts, expressjwt}=require('express-jwt')
// const expressJwt=require("express-jwt")
const app=express()
app.use(express.static("public"))
const pool=require("./pool")
const SECR_KEY="haha2023"

// 验证token
let jwtAuth =jwts({ secret:SECR_KEY, algorithms: ["HS256"] }).unless({path:"/index"})
app.use(jwtAuth);
// 拦截器
app.use((err,req,res,next)=>{
  // 对报错进行处理  ↓没有携带token
  if (err.name=="UnauthorizedError") {
        res.send({
      code:401,
      data:"请登录"
    })
  }
  next()
})
 // 校验密码....(此处省略), 如果校验成功, 生成jwt
app.get("/index",(req,res)=>{
  console.log(req.query);
var sql="select * from emp where ename=?"
pool.query(sql,[req.query],(err,result)=>{
    if(err) throw err
     // 参数1: 生成到token中的信息
  // 参数2: 密钥
  // 参数3: token的有效时间: 60, "2 days", "10h", "7d"
    const token=jwt.sign(
        {
        // 用户名
          user:req.query,
        // 用户权限
          permissions:1
        },
        SECR_KEY,
        // 认证时间  超过时间之后需要重新登录
        {expiresIn: 10},
    )
    console.log("！！！！！！！！！！",token)
    res.send({
        code:200,
        yanzehgn:token
    })
})
})

app.get(
  "/one",
  // token信息解析                     加密方式
  // jwts({ secret:SECR_KEY, algorithms: ["HS256"] }),
 (req, res)=>{
  // req.auth 里面存储的是token的信息
  // 这里进行权限的验证  看看是不是vip
    // if (!req.auth.permissions){
    //   res.send({
    //     code:401,
    //     data:"登录超时 请重新登录"
    //   })
    // };
    res.send({
      code:200,
      data:"登录陈宫"
    });
  }
);


app.get('/two',(req,res)=>{
  res.send("123456")
})
app.listen(8088,()=>{
    console.log("star******");
})