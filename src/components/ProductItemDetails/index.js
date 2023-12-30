import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import './index.css'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

class ProductItemDetails extends Component {
  state = {
    isLoading: true,
    details: [],
    cartValue: 1,
    similarProductsDetails: [],
    hasError: false,
  }

  componentDidMount = () => {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({isLoading: false})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(productDetailsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.style,
        totalReviews: data.total_reviews,
      }

      this.setState({
        isLoading: false,
        details: updatedData,
        similarProductsDetails: updatedData.similarProducts,
        hasError: false,
      })
    } else {
      console.log('error got')
      this.setState({hasError: true})
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({cartValue: prevState.cartValue + 1}))
  }

  onDecrease = () => {
    const {cartValue} = this.state
    if (cartValue > 1) {
      this.setState(prevState => ({cartValue: prevState.cartValue - 1}))
    }
  }

  onContinue = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div className="loader-css" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductItemDetails = () => {
    const {details, cartValue, similarProductsDetails} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = details

    return (
      <>
        <div className="details-con">
          <img src={imageUrl} alt="product" className="product-img" />
          <div className="product-card">
            <h1 className="product-main-head">{title}</h1>
            <p className="price">{`Rs ${price}/-`}</p>
            <div className="rating-con">
              <div className="rating-card">
                <p className="rating-value">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p className="review-para">{`${totalReviews} Reviews`}</p>
            </div>
            <p className="desc">{description}</p>
            <div className="comb-con">
              <h1 className="head">Available: </h1>
              <p className="para">{availability}</p>
            </div>
            <div className="comb-con">
              <h1 className="head">Brand: </h1>
              <p className="para">{brand}</p>
            </div>
            <hr />
            <div className="plus-minus-con">
              <button
                type="button"
                data-testid="plus"
                className="btn"
                aria-label="Decrease Quantity"
                onClick={this.onDecrease}
              >
                <BsDashSquare />
              </button>

              <p className="cart">{cartValue}</p>
              <button
                type="button"
                data-testid="plus"
                className="btn"
                aria-label="Increase Quantity"
                onClick={this.onIncrease}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="add-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products">
          <h1 className="simii-head">Similar Products</h1>
          <ul className="cona">
            {similarProductsDetails.map(eachProduct => (
              <SimilarProductItem key={eachProduct.id} data={eachProduct} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderErrorPage = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="fail-img"
      />
      <h1 className="fail-head">Product Not Found</h1>
      <button type="button" className="add-btn" onClick={this.onContinue}>
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {isLoading, hasError} = this.state
    let content
    if (isLoading === true) {
      content = this.renderLoader()
    } else if (hasError === true) {
      content = this.renderErrorPage()
    } else {
      content = this.renderProductItemDetails()
    }

    return (
      <div className="bg-custom-details">
        <Header />
        {content}
      </div>
    )
  }
}

export default ProductItemDetails
