import React,{Component} from 'react'
var axios = require('axios') //API libary ajax
import ItemForm from './item-form'
import '../css/add-item.css'

class AddItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      name: '',
      onHand: 0,
      par: 0,
      orderQty: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(){
    this.setState({open: true})
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event){
    event.preventDefault()
    var name = event.target.name.value
    var onHand = event.target.onHand.value
    var par = event.target.par.value
    var orderQty = event.target.orderQty.value
    try{
      var item = await axios.post('/api/items', {
        name: name,
        onHand: onHand,
        par: par,
        orderQty: orderQty
      })
      this.props.update(item.data)
      this.setState({open: false})
    }catch(err){
      console.error(err)
    }
  }
  render(){
    return(
      <div>
        {this.state.open ? (
          <ItemForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            item={this.state.item}
          />
        ):(
          <div>
            <button id='add-item'
              onClick={this.handleClick}>
              +
            </button>
            <h3> Add Item </h3>
          </div>
        )}
      </div>
    )
  }
}

export default AddItem



    // if(a) {return a} else {return b}
    //      return a ? a : b   (**shorthand for return a === true ? a : b)
