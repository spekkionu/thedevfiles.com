import React from "react"
import {graphql} from "gatsby"
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import PostArchive from "../components/post-archive";
import config from "../../data/config";

const YearArchive = ({pageContext, data}) => {
    const {year} = pageContext
    const { edges } = data.allMarkdownRemark

    return (
        <Layout>
            <Helmet
                title={year + ' Blog Archive | The Dev Files'}
            >
                <link rel="canonical" href={config.siteUrl + '/' + year + '/'} />
            </Helmet>
            <div className="page card">
                <header className="page__header">
                    <h1 className="page__title card__title">Blog Archive: {year}</h1>
                </header>
                <div className="page__body">
                    {edges.map(({ node }) => {
                        return (
                            <PostArchive key={node.id} post={node}/>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}


export default YearArchive

export const pageQuery = graphql`
  query($year: Int) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { year: { eq: $year }, published: {eq: true} } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 500)
          frontmatter {
            date
            published:date(formatString: "MMMM Do, YYYY")
            year:date(formatString: "YYYY")
            path
            title
            tags
          }
        }
      }
    }
  }
`
