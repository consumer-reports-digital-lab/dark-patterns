import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from "html-react-parser"
import ExampleCard from '../components/examples/ExampleCard'
import CTA from '../components/about/CTA'
import Layout from '../containers/Layout'
import SEO from '../containers/seo'

const Category = ({ data: { category } }) => {
  const {
    name,
    description,
    examples,
    categoryFeaturedImage: {
      featuredImage
    }
  } = category

  const imageData = getImage(featuredImage?.localFile)
  return (
    <Layout>
      <SEO pageSEO={category.seo} />
      <section className="pt-5">
        <div className="container mt-n5">
          <div className="row mb-4">
            <div className="col-12">
              <Link to="/harms" className="back-btn">View All Harms</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-8 col-lg-7">
              <h1>{name}</h1>
              <p>{description}</p>
              <Link to="/report" className="btn btn-primary">Report a Pattern</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light category-example">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              {imageData ? (
                <GatsbyImage
                  image={imageData}
                  alt={`${name} Example`}
                  className="img-fluid"
                />
              ) : (
                <img src="/img/placeholder-example-interior.png" alt="" className="img-fluid" />
              )}
            </div>
            <div className="col-12 col-lg-6">
              <div className="p-5 border-start border-5 border-primary my-5">
                {description ? (
                  <p>{parse(description)}</p>
                ) : (
                  <p>This app asks to collect data, but does not offer a way for the user to decline data collection.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {examples && examples.nodes.length > 0 ? (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Sightings</h2>
              </div>
            </div>
            <div className="row">
              {examples.nodes.map(example => {
                if (Object.keys(example).length === 0) return
                return (
                  <div key={example.id} className="col-12 col-md-4 my-4">
                    <ExampleCard example={example} className="card-light" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <CTA />
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryQuery($id: String!) {
    # selecting the current page by id
    category: wpCategory(id: { eq: $id }) {
      id
      name
      description
      categoryFeaturedImage {
        featuredImageDescription
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, quality: 100, layout: CONSTRAINED)
            }
          }
        }
      }
      examples {
        nodes {
          ...ExampleSummary
        }
      }
      ...CategorySEO
    }
  }
`

export default Category
