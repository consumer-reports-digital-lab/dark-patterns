import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import parse from "html-react-parser"
import ZoomImage from 'react-medium-image-zoom'
import CTA from '../components/about/CTA'
import RelatedExamples from '../components/examples/RelatedExamples'
import Layout from '../containers/Layout'
import SEO from '../containers/seo'

const Example = ({ data: { example } }) => {
  const {
    title,
    date,
    patternAttributes: {
      affiliatedCompany,
      description,
      sourceLink,
    },
    industries,
    featuredImage: {
      node: {
        localFile
      }
    },
    tags,
    categories

  } = example


  return (
    <Layout>
      <SEO pageSEO={example.seo} />
      <section className="pt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <Link to="/sightings" className="back-btn">View All</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 ">
              <div className="row">
                <div className="col-12">
                  <h2>{title}</h2>
                </div>
              </div>
              <div className="row  mt-5">
                <div className="col-4">
                  <h4>Company</h4>
                  <p >{affiliatedCompany}</p>
                </div>

                <div className="col-4">
                  <h4>Date</h4>
                  <p >{date}</p>
                </div>

                <div className="col-4">
                  <h4>Industry</h4>
                  {industries && industries.nodes.map(industry => {
                    const { id, name } = industry
                    return (
                      <p key={id} >{name}</p>
                    )
                  })}
                </div>
              </div>
              <div className="row my-5">
                <div className="col-12">
                  <h4>Description</h4>
                  {description && parse(description)}
                </div>
              </div>
              {sourceLink && (
                <div className="row">
                  <div className="col-12">
                    <h4>Where can you find this?</h4>
                    {sourceLink.startsWith('http')
                      ? <a href={sourceLink} target="_blank">View Dark Pattern</a>
                      : <p >{sourceLink}</p>
                    }
                  </div>
                </div>
              )}


              <div className="row my-5">
                <div className="col-12">
                  <h4>Harm Type(s)</h4>
                  <ul className="list-primary">
                    {categories && categories.nodes.map(category => {
                      const { id, name } = category
                      return (
                        <li key={id}>{name}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {tags.nodes.length > 0 && (
                <div className="row my-4">
                  <div className="col-12">
                    <h4>Tags</h4>
                    {tags && tags.nodes.map(tag => {
                      const { id, name } = tag
                      return <div key={id} className="tag">{name}</div>
                    })}
                  </div>
                </div>
              )}


            </div>

            {localFile && (
              <div className="col-12 col-md-6">
                <div className="magnify">
                  <ZoomImage overlayBgColorEnd={`rgba(0,0,0,0.7)`}>
                    <GatsbyImage image={getImage(localFile)} alt={title} />
                  </ZoomImage>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTA />

      <RelatedExamples example={example} heading={`More Sightings`} />

    </Layout>
  )
}

export const pageQuery = graphql`
  query ExampleQuery($id: String!) {
    example: wpExample(id: { eq: $id }) {
      ...ExampleDetails
      ...ExampleSEO
    }
  }
`
export default Example
