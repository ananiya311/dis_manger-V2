// reg emp js///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const Fname = document.getElementById('Fname')
const Lname = document.getElementById('Lname')
const Sex = document.getElementById('sex')

const Dob = document.getElementById('DOB')
const dateErr = document.getElementById('dateErr')

const filePhate = document.getElementById('filePhate')

const HomeNo = document.getElementById('Homeno')
const homenErr = document.getElementById('homenErr')

const kebela = document.getElementById('kebela')
const kabErr = document.getElementById('kabErr')

const city = document.getElementById('city')
const Subcity = document.getElementById('subCity')

const phoneNumber1 = document.getElementById('phone')
const phoneNumber2 = document.getElementById('phone2')
const phErr = document.getElementById('phErr')

const email = document.getElementById('email')
const errmE = document.getElementById('errmE')
const anconEmail = document.getElementById('anconEmail')

const password = document.getElementById('password')
const Cpassword = document.getElementById('passwordC')
const errmP = document.getElementById('errmP')

const edu = document.getElementById('edu')

const Register = document.getElementById('reg')
const cancel = document.getElementById('can')

const proPic = document.getElementById('proPic')
const proann = document.getElementById('proann')
const errmIm = document.getElementById('errmIm')

const populateFilds = async ()=>{
     proPic.hidden = true
     proann.hidden = false
     const {data}= await axios.post('get/pro')
     proPic.src = `${data.imgfile.url}`
     proann.hidden = true
     proPic.hidden = false
}
populateFilds()
const varinput = (arry, Idob, IhomeNo, Ikebela, IphoneNumber1, IphoneNumber2, IfilePhate)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
               alert("Enter in all the fields provided")
               return false
          }else{
               continue
          }  
     }

     var date = Idob.value.split('-')[0]
     if (date > 2000) {
          alert('the date you entered is invalid')
          dateErr.innerHTML = "the date you enter is invalid"
          return false
     }
     
     if(IhomeNo.value != "new"){
          var homen = IhomeNo.value.split('-')
          if(homen.length == 2){
               if (parseInt(homen[0]) || parseInt(homen[0]) == homen[0] || !parseInt(homen[1]) || parseInt(homen[1]) != homen[1]) {
                    alert('Home number is invalid')
                    homenErr.innerHTML = "Home number is invalid"
                    return false
               }
               
          }else{
               alert('Home number is invalid')
               return false  
          }
     }

     const kab = Ikebela.value.split('-')
     if(kab.length == 2){
          if(parseInt(kab[0]) == '0'){
               if(!parseInt(kab[0]) && parseInt(kab[0]) != kab[0] || !parseInt(kab[1]) && parseInt(kab[1]) != kab[1]){
                    alert('kabela is nvalid')
                    kabErr.innerHTML = "invalid value"
                    return false
               }
          }else{
               alert('kabela is invalid')
               return false
          }
     }else{
          alert('kabela is invalid')
          return false
     }

     if(IphoneNumber1.value != IphoneNumber2.value){
          const ph1 = IphoneNumber1.value.split('')
          const ph2 = IphoneNumber2.value.split('')
     
          if(ph1.length == 10 && ph2.length == 10){
               if(ph1[0] != 0 && ph1[0] != 9){
                    alert('invalid phone number')
                    return false
               }
               if(ph2[0] != 0 && ph2[0] != 9){
                    alert('invalid phone number')
                    return false
     
               }
          }else{
               alert('invalid phone number')
               return false
          }

     }else{
          alert('the phone numbers can not be semillar')
          return false
     }

     const fileP = IfilePhate.value.split('//')[0].split('.')[1]
     if(fileP == 'jfif' || fileP == 'jpeg' || fileP == 'PNG'){
          
     }else{
          alert('invalid data type it must have .jfif, .jpeg or .png as an extintion')
          return false
          
     }
     return true
}

const Varemail = async (to = "S") =>{
     if (to == "S") {
          console.log("asdfasdf");

          anconEmail.hidden = false
          const {data: data1} = await axios.post('get/staff', {
               email: email.value
          })
          const {data: data2} = await axios.post('get/driver',{
               email: email.value
          })
          console.log(data1, data2);
     
          anconEmail.hidden = true
          if(data1.length != 0 || data2.length != 0){
               alert('Email is already in use')
               console.log(data1, data2, "innn");
               return false
          }
     
          if(password.value == Cpassword.value){
               const pp = password.value.split('')
               if(pp.length < 12 && pp.length < 12){
                    alert('the password is to short')
                    return false
               }
     
               if(pp.length > 20 && pp.length > 20){
                    alert('the epassword is to long')
                    return false
               }
     
     
          }else{
               alert('the password dose not match')
               return false
          }
     }else{
          const {data: data1} = await axios.post('get/staff', {
               email: Demail.value
          })
          
          const {data: data2} = await axios.post('get/driver',{
               email: Demail.value
          })
          
          if(data1.length != 0 || data2.length != 0){
               console.log(data2);
               alert('Email is already in use')
               return false
          }
     }

     return true
     
}
Register.addEventListener('click', async ()=>{
     const info = [Fname.value, Lname.value, filePhate.value, kebela.value, phoneNumber1.value, phoneNumber2.value, email.value, password.value, Cpassword.value, edu.value, Dob.value]
     const vari = varinput(info, Dob, HomeNo, kebela, phoneNumber1, phoneNumber2, filePhate)
     if(vari){
          const vare = await Varemail()
          if(vare){        
               const returnData = await axios.post('/Register/staff',{
                    data:{
                         firstName:Fname.value,
                         lastName:Lname.value,
                         sex:Sex.value,
                         DOB:Dob.value,
                         city:city.value,
                         Kabala:kebela.value,
                         homeNum:HomeNo.value,
                         education:edu.value,
                         phoneNumber1:phoneNumber1.value,
                         phoneNumber2:phoneNumber2.value,
                         subcity:Subcity.value,
                         email:email.value,
                         passWorde:password.value,
                    },
                    imgname:filePhate.value.split('fakepath')[1]
               })
          }
     }
})


// reg Driver js///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const DFname = document.getElementById('DFname')
const DLname = document.getElementById('DLname')
const DSex = document.getElementById('Dsex')
const DDob = document.getElementById('DDOB')

const DfilePhate = document.getElementById('DfilePhate')

const DHomeNo = document.getElementById('DHomeno')
const Dkebela = document.getElementById('Dkebela')

const Dcity = document.getElementById('Dcity')
const DSubcity = document.getElementById('DsubCity')

const DphoneNumber1 = document.getElementById('Dphone')
const DphoneNumber2 = document.getElementById('Dphone2')

const Demail = document.getElementById('Demail')
const Dpassword = document.getElementById('Dpassword')
const DCpassword = document.getElementById('DpasswordC')

const car = document.getElementById('car')
const Dmodel = document.getElementById('Dmodel')


const DRegister = document.getElementById('Dreg')
const Dcancel = document.getElementById('Dcan')

const carNameP = async ()=>{
     
     const{data} = await axios.post('/get/car',{
          instock:{"$gt":0}
     })
     if (data.length > 0) {
          var html = ''
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].name) == -1){
                    temp.push(data[index].name)
               }
               
          }
          for (let index = 0; index < temp.length; index++) {
               html += `<option>${temp[index]}</option>`;
          }
          car.innerHTML = html
          modelNameP()
     }else{
          car.innerHTML = '<option>no car found</option>'
     }

} 
carNameP()
const modelNameP = async()=>{

     if(car.value != ''){
          const {data} = await axios.post('/get/car',{
               name: car.value,
               instock: {'$gt':0}
          })
          var html2 = ''
          for (let index = 0; index < data.length; index++) {
               html2 += `<option>${data[index].model}</option>`;
          }
          Dmodel.innerHTML = html2
     }else{
          Dmodel.innerHTML = "no models"
     }
     
     
}

car.addEventListener('change', ()=>{
     modelNameP()
})
DRegister.addEventListener('click', async()=>{
     const Dusers = [DFname.value, DLname.value, DfilePhate.value, DHomeNo.value, Dkebela.value, DphoneNumber1.value, DphoneNumber2.value, DDob.value]
     const Empty = varinput(Dusers, DDob, DHomeNo, Dkebela, DphoneNumber1, DphoneNumber2, DfilePhate)
     if (Empty) {
          const evar = await Varemail("D")
          if(evar){
               const filename = DfilePhate.value
               const reg = await axios.post('/Register/driver',{
               data:{ 
                    firstName:DFname.value,
                    lastName:DLname.value,
                    sex:DSex.value,
                    DOB:DDob.value,
                    city:city.value,
                    Kabala:Dkebela.value,
                    homeNum:DHomeNo.value,
                    phoneNumber1:DphoneNumber1.value,
                    phoneNumber2:DphoneNumber2.value,
                    email:Demail.value,
                    subcity:DSubcity.value,
                    },
                    carpro:{
                         name:car.value,
                         model:parseInt(Dmodel.value)
                    },
                    imgname:filename.split('fakepath')[1]
               })
          }
     }
})


// car reg js/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const Cname = document.getElementById('name')
const model = document.getElementById('model')
const max = document.getElementById('max')
const min = document.getElementById('min')

const quan = document.getElementById('quan')

const EMmodel = document.getElementById('EMmodel')
const EMIVmodel = document.getElementById('EMIVmodel')
const EMmin = document.getElementById('EMmin')
const EMmax = document.getElementById('EMmax')
const EMquan = document.getElementById('EMquan')
const gErr = document.getElementById('gErr')


const Cregister = document.getElementById('Creg')
const Ccancel = document.getElementById('Ccan')

const typeCastCheck = (arry, Imodel, Imax, Imin, Iquan)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
               alert("Enter in all the fields provided")
               return false
          }else{
               continue
          }  
     }
     if(parseInt(Imodel.value) != Imodel.value){
          EMmodel.hidden = false
          setTimeout(() => {
               EMmodel.hidden = true
          }, 2000);
          return false
     }else{
          if (Imodel.value.length != 4 || Imodel.value[0] == 0) {
               EMIVmodel.hidden = false
               setTimeout(() => {
                    EMIVmodel.hidden = true
               }, 3000);
          }else{

               if(parseInt(Imax.value) != Imax.value){
                    EMmax.hidden = false
                    setTimeout(() => {
                         EMmax.hidden = true
                    }, 2000);
                    return false
               }else{
     
                    if(parseInt(Imin.value) != Imin.value){
                         EMmin.hidden = false
                         setTimeout(() => {
                              EMmin.hidden = true
                         }, 2000);
                         return false
                    }else{
     
                         if(parseInt(Iquan.value) != Iquan.value){
                              EMquan.hidden = false
                              setTimeout(() => {
                                   EMquan.hidden = true
                              }, 2000)
                              return false
                         }else{
                              return true
                         }
                    }
               }
          }
     }
}

Cname.addEventListener('keyup', async()=>{
     if (model.value) {
         
          const data = await axios.post('/get/car',{
               name:Cname.value,
               model:model.value
          })
          
          if(data.data.length > 0){
               max.disabled = true
               min.disabled = true
               max.value = data.data[0].MaxPaylodeLimt
               min.value = data.data[0].minPaylodeLimt 
          }else{
               max.disabled = false
               min.disabled = false
               
          }
     }else{
          
     }
})

model.addEventListener('keyup', async()=>{
     if (Cname.value) {
          const data = await axios.post('/get/car',{
               name:Cname.value,
               model:model.value
          })
          if(data.data.length > 0){
               max.disabled = true
               min.disabled = true
               max.value = data.data[0].MaxPaylodeLimt
               min.value = data.data[0].minPaylodeLimt
          }else{
               max.disabled = false
               min.disabled = false
               max.value = null
               min.value = null
          }
     }else{
          
          
     }
})

Cregister.addEventListener('click', async()=>{
     const test = await axios.post('/get/car')
     const cardata = [Cname.value, model.value, max.value, min.value, quan.value]
     const typecast = typeCastCheck(cardata, model, max, min, quan)
     if(typecast){
          const fpu = parseInt(max.value) * 0.5
          if(max.value != min.value && parseInt(min.value) < parseInt(max.value) && parseInt(min.value) >= fpu){
               await axios.post('/Register/car',{
                    name:Cname.value,
                    model:parseInt(model.value),
                    MaxPaylodeLimt:parseInt(max.value),
                    minPaylodeLimt:parseInt(min.value),
                    instock:parseInt(quan.value)
               })   
          }else{
               if(max.value == min.value){
                    gErr.innerHTML = "The max and min value can not be the same"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               }else if (parseInt(min.value) > parseInt(max.value)) {
                    gErr.innerHTML = "The min value cannot be grater than the max"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               } else {
                    gErr.innerHTML = "The min value cannot be less than 50% of max value"
                    gErr.hidden = false
                    setTimeout(() => {
                         gErr.hidden = true
                    }, 3000);
               }
          }
     }

          
})



// edit form ////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
const searchValue = document.getElementById('serchinput')
const statusS = document.getElementById('status')
const search = document.getElementById('button-addon2')

const EFname = document.getElementById('EFname')
const ELname = document.getElementById('ELname')

const ESex = document.getElementById('Esex')
const EDob = document.getElementById('EDOB')

const EHomeNo = document.getElementById('EHomeno')
const Ekebela = document.getElementById('Ekebela')
const EsubCity = document.getElementById('EsubCity')

const EphoneNumber1 = document.getElementById('Ephone')
const EphoneNumber2 = document.getElementById('Ephone2')

const carass = document.getElementById('carass')

const header = document.getElementById('header')

const userpic = document.getElementById('userpic')

const Ecar = document.getElementById('Ecar')
const Emodel = document.getElementById('Emodel')

const Eregister = document.getElementById('Ereg')
const Ecancel = document.getElementById('Ecan')

const carNameP2 = async ()=>{
     
     const{data} = await axios.post('/get/car',{
          instock:{"$gt":0}
     })
     if (data.length > 0) {
          var html = ''
          var temp = []
          for (let index = 0; index < data.length; index++) {
               if(temp.indexOf(data[index].name) == -1){
                    temp.push(data[index].name)
               }
               
          }
          for (let index = 0; index < temp.length; index++) {
               html += `<option>${temp[index]}</option>`;
          }
          Ecar.innerHTML = html
          modelNameP2()
     }else{
          Ecar.innerHTML = '<option>no car found</option>'
     }

} 
carNameP2()

Ecar.addEventListener('change', ()=>{
     modelNameP2()
})

const modelNameP2 = async()=>{

     if(car.value != ''){
          const {data} = await axios.post('/get/car',{
               name: Ecar.value,
               instock: {'$gt':0}
          })
          var html2 = ''
          for (let index = 0; index < data.length; index++) {
               html2 += `<option>${data[index].model}</option>`;
          }
          Emodel.innerHTML = html2
     }else{
          Emodel.innerHTML = "no models"
     }
     
     
}

const inputCeck = (IhomeNo, Ikebela ,IphoneNumber1, IphoneNumber2, Idob)=>{
     if(IhomeNo.value != "new"){
          var homen = IhomeNo.value.split('-')
          if(homen.length == 2){
               if (parseInt(homen[0]) || parseInt(homen[0]) == homen[0] || !parseInt(homen[1]) || parseInt(homen[1]) != homen[1]) {
                    alert('Home number is invalid')
                    return false
               }
               
          }else{
               alert('Home number is invalid')
               return false  
          }
     }

     const kab = Ikebela.value.split('-')
     if(kab.length == 2){
          if(parseInt(kab[0]) == '0'){
               if(!parseInt(kab[0]) && parseInt(kab[0]) != kab[0] || !parseInt(kab[1]) && parseInt(kab[1]) != kab[1]){
                    alert('kabela is nvalid')
                    return false
               }
          }else{
               alert('kabela is invalid')
               return false
          }
     }else{
          alert('kabela is invalid')
          return false
     }

     var date = Idob.value.split('-')[0]
     if (date > 2000) {
          alert('the date you entered is invalid')
          dateErr.innerHTML = "the date you enter is invalid"
          return false
     }

     if(IphoneNumber1.value != IphoneNumber2.value){
          const ph1 = IphoneNumber1.value.split('')
          const ph2 = IphoneNumber2.value.split('')
     
          if(ph1.length == 10 && ph2.length == 10){
               if(ph1[0] != 0 && ph1[0] != 9){
                    alert('invalid phone number')
                    return false
               }
               if(ph2[0] != 0 && ph2[0] != 9){
                    alert('invalid phone number')
                    return false
     
               }
          }else{
               alert('invalid phone number')
               return false
          }

     }else{
          alert('the phone numbers can not be semillar')
          return false
     }
     return true
}

const isempty = (arry)=>{
     for (let index = 0; index < arry.length; index++) {
          const element = arry[index];
          if(element == undefined || element == ""){
               alert("Enter in all the fields provided")
               return false
          }else{
               continue
          }  
     }
     return true
}

const populat = async()=>{
    if(statusS.value == "Staff member"){
          await axios.post('get/staff', {
               _id:searchValue.value
          }).then(async (data)=>{
               
               if(data.data.length > 0){
                    console.log(data.data[0].firstName);
                    EFname.value = data.data[0].firstName
                    ELname.value = data.data[0].lastName
                    ESex.value = data.data[0].sex
                    EDob.value = data.data[0].DOB.split('T')[0]
                    EHomeNo.value = data.data[0].homeNum
                    Ekebela.value = data.data[0].Kabala
                    EsubCity.value = data.data[0].subcity
                    EphoneNumber1.value = data.data[0].phoneNumber1
                    EphoneNumber2.value = data.data[0].phoneNumber2
                    console.log(data.data[0]._id);
                    await axios.post('get/img?for=staff',{
                         _id: data.data[0]._id
                    }).then((data)=>{
                         userpic.src = `${data.data.url}`
                         userpic.hidden = false
                    }).catch((err)=>{
                         console.log(err);
                    })
               }else{
                    alert("user not found")
               }
             
          }).catch((err)=>{console.log(err);})
    }else{
          await axios.post('get/driver', {
               _id: searchValue.value
          }).then(async (data)=>{
               if(data.data.length > 0){
               EFname.value = data.data[0].firstName
               ELname.value = data.data[0].lastName
               ESex.value = data.data[0].sex
               EDob.value = data.data[0].DOB.split('T')[0]
               EHomeNo.value = data.data[0].homeNum
               Ekebela.value = data.data[0].Kabala
               EsubCity.value = data.data[0].subcity
               EphoneNumber1.value = data.data[0].phoneNumber1
               EphoneNumber2.value = data.data[0].phoneNumber2
               console.log( data.data[0]._id)
               await axios.post('get/img?for=dirver',{
                    _id: data.data[0]._id
               }).then((data)=>{
                    userpic.src = `${data.data.url}`
                    userpic.hidden = false
               }).catch((err)=>{
                    console.log(err);
               })
               await axios.post('get/car', {
                    _id: data.data[0].carAs
               }).then(async (data)=>{
                    console.log(data.data);
                    Ecar.value = data.data[0].name
                    await modelNameP2()
                    Emodel.value = data.data[0].model
               })
          }else{
               alert("driver not found")
          }
             
          }).catch((err)=>{console.log(err);})
          
    }
}

search.addEventListener('click', ()=>{
     if(searchValue.value){
          populat()
     }else{
          alert("search")
     }
})

statusS.addEventListener('change', ()=>{
     if(statusS.value == "Driver"){
          carNameP2()
          header.innerHTML = "<h3>Driver edit form</h3>"
          carass.hidden = false
          EFname.value = null
               ELname.value = null
               ESex.value = "Male"
               EDob.value = null
               EHomeNo.value = "new"
               Ekebela.value = null
               EsubCity.value = "Bole"
               EphoneNumber1.value = null
               EphoneNumber2.value = null
     }else{
          header.innerHTML = "<h3>Staff edit form</h3>"
          carass.hidden = true
          ELname.value = null
               ESex.value = "Male"
               EDob.value = null
               EHomeNo.value = "new"
               Ekebela.value = null
               EsubCity.value = "Bole"
               EphoneNumber1.value = null
               EphoneNumber2.value = null
               Ecar.value = null
               Emodel.value = null
     }
})

Eregister.addEventListener('click', async ()=>{
     const data = [EFname.value, ELname.value, EHomeNo.value, Ekebela.value, EsubCity.value, EphoneNumber1.value, EphoneNumber2.value]

     if(isempty(data)){
          if(inputCeck(EHomeNo, Ekebela, EphoneNumber1, EphoneNumber2, EDob)){
               if(statusS.value == "Staff member"){
                    console.log(EsubCity.value);
                    await axios.patch('/edit/staff',{
                        data:{
                              firstName: EFname.value,
                              lastName: ELname.value,
                              sex: ESex.value,
                              DOB: EDob.value,
                              subcity: EsubCity.value,
                              Kabala: Ekebela.value,
                              homeNum:EHomeNo.value,
                              phoneNumber1: EphoneNumber1.value,
                              phoneNumber2: EphoneNumber2.value
                         },AddInfo:{
                              _id: searchValue.value
                         }
                    }).then(()=>{
                         console.log("user edited")
                    }).catch((err)=>{
                         console.log(err);
                    })
               }else{
                    await axios.patch('/edit/dirver',{
                         data:{
                              firstName: EFname.value,
                              lastName: ELname.value,
                              sex: ESex.value,
                              DOB: EDob.value,
                              subcity: EsubCity.value,
                              Kabala: Ekebela.value,
                              homeNum:EHomeNo.value,
                              phoneNumber1: EphoneNumber1.value,
                              phoneNumber2: EphoneNumber2.value
                         },
                         AddInfo:{
                              carname: Ecar.value,
                              carmodel: Emodel.value,
                              user_id: searchValue.value
                         }

                    }).then(()=>{
                         console.log("driver edited")
                    }).catch((err)=>{
                         console.log(err);
                    }) 
               }
          }
     }
})








// const test = document.querySelectorAll('.header2')




// const observer = new IntersectionObserver((ob)=>{
//     ob.forEach(en=>{
//         if(en.isIntersecting){
//             en.target.style.animationName = "tra"
//         }else{
//             en.target.classList.remove('test')
//         }
//     })
// })

// test.forEach((re)=>observer.observe(re))


// const testScroll = ()=>{
//     window.scrollTo(0,0)
// }


const date = ()=>{
     axios.post('/test')
}

