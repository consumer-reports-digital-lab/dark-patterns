import React from "react"
// import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { usePartners } from '../../hooks/usePartners'

const Partners = () => {
  const { partners } = usePartners()

  return (
    <div id="partners">
      <div className="row">
        <div className="col-12">
          <h2>Partners</h2>
        </div>
      </div>
      <div className="row">
        {/* {partners && partners.map(partner => {
          const {id, title, partnerOptions: {logoImage}} = partner
          const imageData = getImage(logoImage)
          return (
            <div key={id} className="col-4 my-5">
              {title}
              <br/>
              {imageData && (
                <GatsbyImage
                  image={imageData}
                  alt={title}
                />
              )}



            </div>
          )
        })} */}

        <div className="col-4 my-5 d-flex">
            <img src="/img/cr-id.svg" className="img-fluid" />
        </div>
        <div className="col-4 my-5">
            <img src="/img/dp-id.svg" className="img-fluid"  />
        </div>
      </div>
    </div>
  )
}

Partners.propTypes = {
  // partners: PropTypes.instanceOf(Array)
}

Partners.defaultProps = {
  // partners: []
}

export default Partners
