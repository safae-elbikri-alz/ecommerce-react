import React, { Component, createContext } from 'react'
import { Provider } from 'react-redux';
import client from './Contentful'
import store from "./redux/store";

const productContext = createContext()

class ContextProvider extends Component {
    constructor(){
        this.state={
            products:[],
            clickedProduct:'',
            singleProduct:'',
            featuredProduct:[],
            cart:[],
            cartCount:0,
            cartTotal:0,
            minPrice:0,
            maxPrice:0,
            priceRange:0,
            fullheightpage:false,
        }
    }

    getData =async () =>{
        try{
            let response = await client.getEntries({content_type: 'jewelryStore'})
            this.formData(response.items)
        }
        catch(error){
            console.log(error);
        }
    }

    formData = (data) =>{
        let tempProducts = data.map(item=>{
            const id = item.sys.id
            const fav = false
            let image = item.fields.image.map(img=>{
                return img.fields.file.url
            })
            let product = {...item.fields,id,image,fav}
           return product
        })
        let priceList = tempProducts.map(item => item.price)
        let minPrice = Math.min(...priceList)
        let maxPrice = Math.max(...priceList)
        let category=[]
        tempProducts.map(item => {
            let cat = item.category
            cat.map(item=> category.push(item))
            return category
        })
        
        let cart = localStorage.getItem('cart') !=='' && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let cartSubtotal = localStorage.getItem('cartSubtotal') !=='' && localStorage.getItem('cartSubtotal') ? JSON.parse(localStorage.getItem('cartSubtotal')) : 0
        let cartTotal = localStorage.getItem('cartTotal') !=='' && localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : 0
        let cartTax = localStorage.getItem('cartTax') !=='' && localStorage.getItem('cartTax') ? JSON.parse(localStorage.getItem('cartTax')) : 0
        let cartCount = localStorage.getItem('cartCount') !=='' && localStorage.getItem('cartCount') ? JSON.parse(localStorage.getItem('cartCount')) : 0
        let products = localStorage.getItem('products') !=='' && localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : tempProducts
        //unique category list
        let uniqueCat = [...new Set(category)]
        let featuredProduct = tempProducts.filter(item => item.featured === true)

        this.setState({
            products,
            filteredList:products,
            featuredProduct,
            category:uniqueCat,
            minPrice,
            maxPrice,
            cart,
            cartSubtotal,
            cartTotal,
            cartTax,
            cartCount,
            SelectMaxPrice:maxPrice,
            priceRange: maxPrice
        })
    }
    componentDidMount(){   
        this.getData()
        this.getBlogData()
    }


    addtocart = (id) =>{
        let tempProducts = this.state.products
        let clickedProduct = tempProducts.find(item => item.id === id)
        clickedProduct.incart =true
        clickedProduct.count++
        clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
        this.setState({
            clickedProduct,
            cart: [...this.state.cart,clickedProduct],
            cartCount: this.state.cartCount+1,
            cartTotal : this.state.cartTotal + clickedProduct.total
        },this.getTotal)
    }


    increament = (id) =>{
        let tempProducts = [...this.state.products]
        let clickedProduct = tempProducts.find(item => item.id === id)
        if(!clickedProduct.incart){
            return this.addtocart(id)
        }
        clickedProduct.count++
        clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
        let cart = tempProducts.filter(item => item.incart === true)
        this.setState({
            products:tempProducts,
            clickedProduct,
            cart
        },this.getTotal)
    }


    decreament = (id) =>{
        let tempProducts = [...this.state.products]
        let clickedProduct = tempProducts.find(item => item.id === id)
        if(!clickedProduct || clickedProduct===''){
           return null
        }
        if(clickedProduct.count === 1){
            this.removeItem(id)
        }
        else if(clickedProduct.count>1){
            clickedProduct.count--
            clickedProduct.total = (clickedProduct.saleprice ? clickedProduct.saleprice :clickedProduct.price) * clickedProduct.count
            let cart = tempProducts.filter(item => item.incart === true)
            this.setState({
                products:tempProducts,
                clickedProduct,
                cart
            },this.getTotal)
        }
    }


    removeItem = (id) =>{
        let tempProduct = [...this.state.products]
        let clickedProduct = tempProduct.find(item => item.id === id)
        clickedProduct.count =0
        clickedProduct.total = 0
        clickedProduct.incart = false

        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item =>  item.id !== id)
        this.setState({
            products: tempProduct,
            cart: tempCart
        },this.getTotal)
    }

    getTotal = () =>{
        let tempCart = this.state.cart
        let cartCount =0
        let cartSubtotal =0
        let cartTotal =0
        tempCart.map(item =>{
            cartCount += item.count
            cartSubtotal += item.total
            return (cartCount, cartSubtotal)
        })
        let cartTax = Number((cartSubtotal * .12).toFixed(2))
        cartTotal = Number(((cartTax + cartSubtotal).toFixed(2)))
        localStorage.setItem('cart', JSON.stringify(tempCart))
        localStorage.setItem('cartSubtotal', JSON.stringify(cartSubtotal))
        localStorage.setItem('cartCount', JSON.stringify(cartCount))
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
        localStorage.setItem('cartTax', JSON.stringify(cartTax))
        localStorage.setItem('products', JSON.stringify(this.state.products))
        this.setState({
            cartCount, cartTotal, cartTax, cartSubtotal
        })
    }
    
    clearCart = () =>{
        let tempProduct = [...this.state.products]
        tempProduct.map(item =>{
            if(item.incart){
                item.count =0
                item.total = 0
                item.incart = false
            }
        })
        this.setState({
            products: tempProduct,
            cart:[]
        },this.getTotal)
    }


    // fullPage=(bool)=>{
    //     this.setState({
    //         fullheightpage:bool
    //     })
    // }


    render() {
        return (
            <Provider store={store}>
                <productContext.Provider value={{...this.state, 
                    addtocart:this.addtocart,
                    increament:this.increament,
                    decreament:this.decreament,
                    removeItem:this.removeItem,
                    fullPage:this.fullPage,
                    clearCart:this.clearCart,
                    getBlog : this.getBlog}}>
                    {this.props.children}
                </productContext.Provider>
            </Provider>
        )
    }
}

export {ContextProvider , productContext}