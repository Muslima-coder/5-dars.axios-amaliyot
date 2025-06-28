let elList = document.querySelector(".item-list")

// Modal 
let elModalWarapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

elList.innerHTML.innerHTML = `
    <img class="w-[30px] h-[30px]" src="./images/loading-white.png" alt="loading img" />
`

const api = "https://fakestoreapi.com/products"

const TOKEN = "7735446333:AAH_VCudufhqk9bKcKrtDjdG6zBrIleeWEk"
const CHAT_ID = "6495634802"
const API_Message = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

//Get products
const getProducts = () => axios(api).then(res => renderProducts(res.data, elList))
getProducts()

//Render products
function renderProducts(arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] rounded-[30px] overflow-hidden p-4 bg-[#2e2e48] shadow-md"
        elItem.innerHTML = `
        <img class="h-[300px] mb-3 mx-auto" src="${item.image} alt="img" " />
        <h2 class="text-[#f5f5f5] font-bold text-[18px] line-clamp-1 mb-2">${item.title}</h2>
        <p class="text-[#f5f5f5] font-semibold text-[16px] line-clamp-1 mb-1">${item.description}</p>
        <strong class="text-[#f5f5f5] text-[18px]  mb-2 inline-block">${item.price}$ </strong>
        <button onclick="handleOrder(${item.id})" class="w-full cursor-pointer hover:scale-[1.03] hover:bg-transparent hover:text-[#8a2be2] border-[2px] border-[#8a2be2] duration-300 py-2 rounded-md bg-[#8a2be2] text-white font-semibold ">Order</button>
        `
        list.append(elItem)
    })
}

//order part
function handleOrder(id){
    elModalWarapper.classList.remove("scale-0")
    elModalInner.innerHTML = `<img class="w-[30px] h-[30px]" src="./images/loading-white.png" alt="loading img" />`
    elModalInner.className = "bg-[#1c1c2b] p-5 rounded-[25px]"
    axios(`${api}/${id}`).then(res => {
        elModalInner.innerHTML = `
        <div class="flex gap-[30px] ">
        <img class="h-[400px] w-[300px] rounded-[10px]" src="${res.data.image} alt="img" " width="300" height="300" />
        <div class="w-[300px]">
        <h2 class=" text-[#f5f5f5] font-bold text-[18px] line-clamp-1 mb-2">${res.data.title}</h2>
        <p class=" text-[#f5f5f5] font-semibold text-[16px] line-clamp-1 mb-1">${res.data.description}</p>
        <strong class=" text-[#f5f5f5] text-[18px]  mb-2 inline-block">${res.data.price}$ </strong>
        <form class="order-form space-y-3" autocomplete="off">
        <input type="text" class="text-[#f5f5f5] bg-[#2e2e48] p-3 rounded-md outline-none shadow-md focus:shadow-[#8a2be2] w-full " placeholder="Enter name" name="name"  />
        <input type="tel" class="text-[#f5f5f5] bg-[#2e2e48] p-3 rounded-md outline-none shadow-md focus:shadow-[#8a2be2] w-full " placeholder="Enter phone number" name="phone"  />
        <input type="text" class="text-[#f5f5f5] bg-[#2e2e48] p-3 rounded-md outline-none shadow-md focus:shadow-[#8a2be2] w-full " placeholder="Enter address" name="address"  />
        <button type="submit" class="w-full cursor-pointer hover:scale-[1.03] hover:bg-transparent hover:text-[#8a2be2] border-[2px] border-[#8a2be2] duration-300 py-2 rounded-md bg-[#8a2be2] text-white font-semibold ">Order</button>
        </form>
        </div>
        </div>
        `
        let elOrderForm = document.querySelector(".order-form")
        elOrderForm.addEventListener("submit", function(e) {
            e.preventDefault()
            let message = `<b>Title: ${res.data.title}</b> \n`
            message += `<b>Description: ${res.data.description}</b> \n`
            message += `<b>Price: ${res.data.price}</b> \n`
            message += `--------------------------- \n`
            message += `<b>Name: ${e.target.name.value}</b> \n`
            message += `<b>Phone: ${e.target.phone.value}</b> \n`
            message += `<b>Address: ${e.target.address.value}</b> \n`

            const data = {
                parse_mode:"html",
                chat_id:CHAT_ID,
                photo:res.data.image,
                caption:message
            }       
            
            axios.post(API_Message, data).then(() => elModalWarapper.classList.add("scale-0"))
        })
    })
}

//Order part 
elModalWarapper.addEventListener("click", (e) => e.target.id == "wrapper" ? elModalWarapper.classList.add("scale-0") : "")



