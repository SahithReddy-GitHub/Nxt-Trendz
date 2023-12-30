import './index.css'

const SimilarProductItem = props => {
  const {data} = props
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
  const {brand, imageUrl, price, rating, title} = updatedData

  return (
    <li className="simi-con">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="simi-img"
      />
      <p className="simi-head">{title}</p>
      <p className="simi-para">{`by ${brand}`}</p>
      <div className="simi-card">
        <p className="price-new">{`Rs ${price}/-`}</p>
        <div className="rating-card">
          <p className="rating-value">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
