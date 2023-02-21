const experss = require('express')
const route = experss.Router()
const jwt = require('jsonwebtoken')
const date = require('date-and-time')


const img = require('../db/cloudinary')
const users = require('../module/usersModule')
const cars = require('../module/carModule')
const driveres = require('../module/driverModule')
const product  = require('../module/productsModule')


const baceimgUri = "C:/Users/ananiya muluken/Pictures"

require('dotenv').config()

// home router
route.get('/homePage', async(req, res)=>{
    res.render("home.ejs")
})
route.get('/', async(req, res)=>{
    if(req.cookies.Token != "null"){
        res.redirect('/homePage')
    }else{
        res.render('loginform.ejs')
    }
    // if(cookie === 'undefined'){
    // }else{
    //     try {
    //         res.render('home.ejs')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } 
    
})

// log in and lgo out  router

route.get('/logout', async (req, res)=>{
    console.log(req.cookies);
    res.cookie(`Token`,"null",{
        expires: new Date('5 11 2055'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.redirect('/')
})



route.post('/login-var', async (req, res)=>{
    try{
        const user = req.body
        const file = await users.findOne({passWorde: user.password, email: user.email})
        if (file != null) {
            const id = file._id
            res.cookie(`Token`,`${id}`,{
                expires: new Date('5 11 2023'),
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            res.send({error:false})
        }else{
            res.send({error:true})
        }
    }catch(error){
        console.log(error);
    }
})


// user get and set routers
route.post('/get/:key', async(req, res)=>{
    
    const key = req.params.key
    try {
        
        if (key) {
            if(key === "pro"){
                const id = req.cookies.Token
                const data= await users.findOne({_id:id})
                const imgfile = await img.getimg(data.imgPublicKey)
                res.status(200).json({imgfile,data})
                
    
            }else if (key === "staff") {
                const data = await users.find(req.body)
                res.status(200).json(data)
                
    
            }else if(key === "car"){
                const data = await cars.find(req.body)
                res.status(200).json(data)
                
                
            }else if(key === "driver"){
                const data = await driveres.find(req.body)
                res.status(200).json(data)
            }else if(key === "img"){
                const id = req.body
                const query = req.query.for
                if(query === "dirver"){
                    
                    const {imgPublicKey} = await driveres.findOne(id) 
                    const imgfile = await img.getimg(imgPublicKey)
                    res.status(200).json(imgfile)
                }
                if(query === 'staff'){
                    const {imgPublicKey} = await users.findOne(id) 
                    const imgfile = await img.getimg(imgPublicKey)
                    res.status(200).json(imgfile)
                }
            }
        }
    } catch (error) {
        res.status(404).send("erro");
    }
})
route.post('/Register/:key', async(req, res)=>{
        const key = req.params.key
        if (key === "staff"){
            const {data, imgname}= req.body
            const imguplod = await img.uplodImage(baceimgUri+imgname)
            data.imgPublicKey = imguplod
            const userinfo = users.create(data)
        
        }else if (key === "driver") {

            const {data, carpro, imgname} = req.body
            const car = await cars.findOne(carpro)
            const imguplod = await img.uplodImage(baceimgUri+imgname)
            data.carAs = car._id
            data.imgPublicKey = imguplod
            const test = await driveres.create(data)
            await cars.updateOne({_id: car._id}, {instock: car.instock - 1})
            console.log(test);
        
        }else if(key === "car"){
            
            const data = req.body
            const carMod = await cars.findOne({name: data.name, model: data.model})

            if(carMod){
                await cars.updateOne({_id:carMod._id},{instock:data.instock+carMod.instock})
                console.log("exists");
            }else{
                await cars.create(req.body)
            }

        } 
        
        return


    // data.DOb = date.format((data.DOB), 'DD/MM/YYYY')
    // console.log(date.format((new Date()), 'DD/MM/YYYY'));
    
    // const {imgPublicKey} = await users.create(req.body)
    // const test = await img.uplodImage(baceimgUri+req.body.imgname)
    // console.log(test);

    
})

route.patch('/edit/:key', async(req, res)=>{
    const  key = req.params.key
    try {
        if(key){
            if(key == "staff"){
                const {data, AddInfo} = req.body
                await users.updateOne(AddInfo,data)
                res.status(200).send("seccess")
            }else if (key == "dirver") {
                const {data, AddInfo} = req.body
                const {carAs: Ocar} = await driveres.findOne({_id: AddInfo.user_id})
                
                const {_id: Ncar, instock:Nst} = await cars.findOne({name:AddInfo.carname, model:AddInfo.carmodel})
                await cars.updateOne({_id:Ncar}, {instock: Nst-1})

                const{instock} = await cars.findOne({_id: Ocar})
                await cars.updateOne({_id: Ocar}, {instock:instock+1})
                data.carAs = Ncar
                const test = await driveres.updateOne({_id:AddInfo.user_id},data)

                console.log(data);
                
            }
        }
    } catch (error) {
        res.status(404).send("err")
    }
})
module.exports = route